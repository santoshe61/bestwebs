
import sha512 from "./sha512.js";
import crypto from "crypto";

export function validateToken(req, callback) {
	return new Promise((resolve, reject) => {
		const browser = req.headers["user-agent"];
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || 0;

		const Token = req.headers.authorization;
		let [id, passwordHash] = Buffer.from(Token || "", "base64").toString("utf8").split(":");
		if (id && passwordHash) {
			console.log(id, passwordHash, browser, ip)
			callback(+id)
				.then(([pass, user]) => {
					console.log(pass, user)
					if (
						crypto.timingSafeEqual(
							Buffer.from(sha512(pass + browser + ip), "utf8"),
							Buffer.from(passwordHash, "utf8")
						)
					) {
						resolve({ user, browser, ip });
					} else reject(new Error("Incorrect or expired authorization token"));
				})
				.catch((err) => {
					console.log(err)
					reject(new Error("Incorrect or expired authorization token 2"));
				});
		} else reject(new Error("Invalid authorization token"));
	})
}

export function validateLogin(id, password, salt, req) {
	if (
		crypto.timingSafeEqual(
			Buffer.from(sha512(req.body.Password + salt), "utf8"),
			Buffer.from(password, "utf8")
		)
	) {
		const browser = req.headers["user-agent"];
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || 0;
		return Buffer.from(id + ":" + sha512(password + browser + ip), "utf8").toString("base64")
	} else return false;
}

export function createHash(password) {
	let str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
	let rand = Math.random() * 100;
	let random = str.slice(parseInt(rand), 10);
	let salt = sha512(random);
	if (!password) password = sha512(random);
	return {
		salt,
		password: sha512(password + salt),
		random
	}
}