import sha512 from './sha512.js'
import debounce from "./debounce.js";
import auth from "./auth.js";
/**
* make fetch request
this plugin will dispatch below events to wondow

	1. bw:alert
	2. bw:redirect
	3. bw:loading

*/
function handleResponse(meta) {
	dispatchEvent("bw:loading", false);
	if (meta?.message) dispatchEvent("bw:alert", { status: meta.status || "warning", message: meta.message });
	if (meta?.redirect) dispatchEvent("bw:redirect", meta.redirect);
	if (meta?.console) console.log("%cFROM SERVER ", "color:red;", ...(meta.console instanceof Array ? meta.console : [meta.console]));
	if (meta?.callback) globalThis?.[meta.callback]?.();
}
function dispatchEvent(type, detail) {
	globalThis.dispatchEvent(new CustomEvent(type, { detail }));
}
/**
* make fetch request
* @param {String} url
* @param {Object} options
* @return {Promise} fetchedRequest
*/
export function useFetch(url, options) {
	const controller = new AbortController();
	options.signal = controller.signal;
	options.abort = () => controller.abort();
	options = {
		// non fetch props
		type: "json",
		// fetch related props
		// method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "force-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: dataObjOrForm instanceof HTMLElement ? new FormData() : , // body data type must match "Content-Type" header
		...options,
	};
	return fetch(url, options).then(async (res) => {
		let output = {
			status: res.status,
			ok: res.ok,
			...await res[options.type]()
		};
		if (res.ok) return output;
		else throw output;
	})

}

export function useXHR(url, options) {
	const XHRReq = new XMLHttpRequest();
	options.abort = () => XHRReq.abort();
	return new Promise((resolve, reject) => {
		XHRReq.open(options.method, url, true);
		if (options.headers) {
			Object.entries(options.headers).forEach(([key, value]) => {
				XHRReq.setRequestHeader(key, value)
			});
		}
		if (options.type == "json") XHRReq.responseType = 'json';
		XHRReq.onload = function () {
			XHRReq.body = XHRReq.response;
			if (XHRReq.status >= 400) {
				reject(XHRReq);
			} else resolve(XHRReq);
		}
		XHRReq.onerror = function () {
			XHRReq.body = XHRReq.response;
			reject(XHRReq);
		}

		if (options.onprogress) {
			// XHRReq.setRequestHeader("Content-Type", "application/octet-stream");
			XHRReq.upload.addEventListener("progress", (event) => {
				if (event.lengthComputable) return options.onprogress({ loaded: event.loaded, total: event.total, progress: event.loaded / event.total, type: "upload" });
				options.onprogress({ loaded: 0, total: 1, progress: 1, type: "upload" });
			});
			XHRReq.addEventListener("progress", (event) => {
				if (event.lengthComputable) return options.download({ loaded: event.loaded, total: event.total, progress: event.loaded / event.total, type: "download" });
				options.download({ loaded: 0, total: 1, progress: 1, type: "download" });
			});
		}
		XHRReq.send(options.body);
	});
}

export function $http(url, options) {
	dispatchEvent("bw:loading", true);
	options.headers = {
		// Accept: "application/json",
		"Content-Type": options.body instanceof HTMLElement ? "multipart/form-data" : 'application/json', //, application/x-www-form-urlencoded, text/plain
		pragma: "no-cache",
		"cache-control": "no-cache",
		...(options?.headers || {})
	}
	for (const key in options.headers) {
		if (Object.hasOwnProperty.call(options.headers, key) && options.headers[key] === null) {
			delete options.headers[key];
		}
	}
	const authUser = auth();
	if (!options.noAuth && authUser) options.headers.Authorization = authUser?.Token || "";
	console.log(options.query)
	if (options.query?.where && typeof options.query.where === "object") {
		url += (url.includes("?") ? "&where=" : "?where=") + encodeURI(JSON.stringify(options.query.where));
		delete options.query.where;
	}
	if (options.query && typeof options.query === "object") {
		url += (url.includes("?") ? "&" : "?") + new URLSearchParams(options.query);
	}
	delete options.query;
	delete options.where;
	if (options.body instanceof HTMLElement) {
		options.body = new FormData(options.body);
		if (options.body.get("password")) {
			options.body.set("password", sha512(options.body.get("password")));
		}
		if (options.body.get("cpassword")) options.body.delete("cpassword");
	} else if (typeof options.body === "object") options.body = JSON.stringify(options.body);
	return (!globalThis?.fetch || options.xhr ? useXHR(url, options) : useFetch(url, options))
		.catch((error) => {
			handleResponse(error?.meta || error);
			// console.log(error)
			throw error;
		})
		.then((res) => {
			handleResponse(res?.meta);
			if (res.status >= 400) throw res;
			return res;
		});
}
globalThis.$http = $http;
export const debouncedHTTP = debounce($http);

export default {
	get(url, options = {}) {
		return $http(url, options)
	},
	delete(url, options = {}) {
		options.method = "DELETE";
		return $http(url, options);
	},
	post(url, body, options = {}) {
		options.method = "POST";
		options.body = body;
		return $http(url, options);
	},
	put(url, body, options = {}) {
		options.method = "PUT";
		options.body = body;
		return $http(url, options);
	},
	patch(url, body, options = {}) {
		options.method = "PATCH";
		options.body = body;
		return $http(url, options);
	},
};