import { query } from "./db.js"
import { login } from "bestwebs";
import client from "../../config/app.secret.mjs";
// import getPermissionLevel from "./PermissionIndex.js";
import crypto from "crypto";

export default function (req, res, next) {
	req.meta = req.body.meta;
	delete req.body.meta;
	let originaljson = res.json;
	let module = req.params.module;
	res.json = function (body, meta = {}, status) {
		if (!body) {
			res.status(status || 400);
			if (!meta.message) {
				meta.message = "No results found";
				meta.status = "danger";
				if (process.env.NODE_ENV !== "development") delete meta.error;
				body = [];
			}
		} else res.status(status || 200);
		let request = {
			body: req.body,
			query: req.query,
			meta: req.meta,
		}
		if (process.env.NODE_ENV !== 'production') {
			request.params = req.params;
			request.headers = req.headers;
		}
		originaljson.call(res, { body, meta, request });
	};
	req.columns = function ($schema, permission) {
		if (req.query.columns.length < 2) return "*";
		return req.query.columns.split(",").filter(col => permission >= $schema[col]?.get).join(", ");
	}
	req.where = function () {
		let pagelength = +(req.query.pagelength || 5);
		let start = (+(req.query.page || 1) - 1) * pagelength;
		try {
			let whereCols = req.query.where;
			if (typeof whereCols === "string") {
				whereCols = JSON.parse(decodeURI(whereCols));
			}
			console.log(whereCols);
			if (!whereCols) throw new Error("Invalid where condition");
			let sql = [];
			for (const cols in whereCols) {
				let value = whereCols[cols];
				let ORs = [];
				delete whereCols[cols];
				cols.split(",").forEach(col => {
					whereCols[col] = value;
					if (value.includes("%")) ORs.push(` (${col} LIKE :${col}) `);
					else ORs.push(` ${col} = :${col}`);
				})
				sql.push("(" + ORs.join(" OR ") + ")");
			}
			return [` WHERE ${sql.join(" AND ")} LIMIT ${start}, ${pagelength}`, whereCols];
		} catch (error) {
			return [` LIMIT ${start}, ${pagelength} `, {}];
		}
	}
	if (!req.query.columns) req.query.columns = "*";
	if (process.env.NODE_ENV !== 'production') {
		req.authUser = {
			"User_ID": 1,
			"Center_ID": 1,
			"Access_Group_ID": 10,
			"Name": "Santosh",
			"Role": "Developer",
			"Mobile": 9718181389,
			"Email": "santosh@bestwebs.in",
			"Permissions": "99999999999999999999",
			"Permission": 9,
			"Details": null,
			"Level": 255,
			"Status": 2,
			"Rating": "10.00",
			"Token": "MTo4OGM1N2MwYzYxZDUxZjUxODYyNGMxZjE3YjhkOTFlMTE5MjJlOGQzN2M5YzZiMzgyY2I4YzRmMjhkNjhiYzRkZGU4YjcwZGUyNzFiMzE0YzIzNzUyYTUyYzcwNTRmN2VkOTlmYTgxMjlmNjc5MmY0ODJmOWQ5OTc1MzZlM2ZiOA==",
			"Operator": "Santosh [#U1]"
		};
		req.auth = function (requiredPermission, requiredLevel) {
			return { permission: requiredPermission, level: requiredLevel };
		}
		if (req.method == "POST") req.body.Operator = `${req.authUser.Name.slice(0, 13)}[#U${req.authUser.User_ID}]`;
		return next();
	}
	if (module != "auth") {
		login.validateToken(req, function (id) {
			return query("SELECT User_ID, Center_ID, Access_Group_ID, Name, pass, salt, Permissions, Level, Status FROM Users WHERE User_ID = :id AND status > -100 LIMIT 1", { id })
				.then(function (rows) {
					// console.log(id, rows)
					if (rows.length !== 1) throw new Error("Invalid Credentials");
					return [rows[0].pass, rows[0]];
				}).catch(err => console.log(err))
		}).then(({ user }) => {
			delete user.pass;
			delete user.salt;
			req.authUser = user;
			req.authUser.Operator = `${user.Name.slice(0, 13)}[#U${user.User_ID}]`;
			req.auth = function (requiredPermission, requiredLevel) {
				let permission = user.Permissions[client.PermissionIndex[module]];
				if (permission < requiredPermission || user.Level < requiredLevel) {
					res.status(400).json(null, {
						message: "You do not have access to this resource, please contact admin",
						status: "danger",
					});
					throw new Error("You do not have access to this resource, please contact admin");
				} else return { permission, level: user.Level };
			}
			next();
		}).catch((err) => {
			res.status(400).json(null, {
				message: err.message,
				status: "danger",
				// redirect: "/login"
			})
		});
	} else next();
};
