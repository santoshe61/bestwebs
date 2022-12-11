
// const jwt = require("jsonwebtoken");
const sha512 = require("../js/sha512");
const User = require("../modules/user/model");
const crypto = require("crypto");
const getPermissionLevel = require("../config/getPermissionLevel");

module.exports = function auth(req, res, next) {
	// if (process.env.NODE_ENV === "development") {
	//   console.log("skiped auth middleware");
	//   return next();
	// }
	if (!req.headers.authorization) {
		return res.status(401).json({
			message: "User not logged in 1",
			status: "danger",
			redirect: "/logout",
		});
	}
	const Token = req.headers["authorization"]?.split(" ")?.[1];
	const browser = req.headers["user-agent"];
	const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || 0;
	let [id, password] = Buffer.from(Token, "base64").toString("utf8").split(":");
	console.log(id, password);
	if (id && password) {
		return User.findById(id)
			.then((usr) => {
				if (!usr) {
					return res.status(401).json(false, {
						message: "Invalid Login, please login again 2",
						staus: "danger",
						redirect: "/logout",
					});
				} else if (usr.Status < 2) {
					return res.status(401).json(false, {
						message: "Inactive Account, contact system admin 3",
						staus: "danger",
						redirect: "/logout",
					});
					// Check if password checksum is corect
				} else if (
					crypto.timingSafeEqual(
						Buffer.from(sha512(usr.pass + browser + ip), "utf8"),
						Buffer.from(password, "utf8")
					)
				) {
					usr = usr._doc;
					usr.permission = getPermissionLevel(
						req.params.module,
						usr.Permissions
					);
					delete usr.pass;
					delete usr.salt;
					req.user = usr;
					if (req.method == "POST") req.body.Operator_ID = usr._id;
					return next();
				}
				res
					.status(401)
					.json(false, { message: "Invalid Credentials 1", staus: "danger" });
			})
			.catch((err) => {
				// if error occured with database query
				res.status(401).json(err.message, {
					message: "Invalid Credentials 2",
					staus: "danger",
				});
			});
	} else {
		// if no auth headers in request
		return res.status(401).json({
			message: "User not logged in 4",
			status: "danger",
			redirect: "/logout",
		});
	}
};
