
export default function (req, res, next) {
	req.meta = req.body.meta;
	delete req.body.meta;
	let originaljson = res.json;
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
		if (process.env.NODE_ENV === "development") {
			request.params = req.params;
			request.headers = req.headers;
		}
		originaljson.call(res, { body, meta, request });
	};

	if (!req.query?.search) req.query.search = {};
	else {
		try {
			req.query.search = JSON.parse(decodeURI(req.query.search));
		} catch (error) {
			req.query.search = {};
		}
	}

	if (!req.query?.page) req.query.page = 1;

	if (!req.query?.pagelength)
		req.query.pagelength = +process.env.DEFAULT_ROW_COUNT || 50;

	if (req.params.module != "auth") {
		const [Mobile, Password] = Buffer.from(req.get("Authorization") ?? "", 'base64').toString('utf-8').split(":");
		// console.log(Mobile, Password, req.get("Authorization"));
		query("SELECT Mobile, Password FROM Users WHERE Mobile = :Mobile", { Mobile }).then(([row]) => {
			if (row && (row?.Password == Password)) {
				req.authUser = row;
				req.body.Operator_ID = row.Mobile;
				next();
			} else {
				res.json(null, { status: "danger", message: "Require login, please login first ...", redirect: "/login" })
			}
		}).catch(err => {
			res.json(null, { status: "danger", message: "Require login, please login first ...", redirect: "/login" })
		})
	} else next();
};