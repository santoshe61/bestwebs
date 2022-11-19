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
	if (meta?.callback) window?.[meta.callback]?.();
}
function dispatchEvent(type, detail) {
	window.dispatchEvent(new CustomEvent(type, { detail }));
}
/**
* make fetch request
* @param {String} url
* @param {Object} options
* @return {Promise} fetchedRequest
*/
export function useFetch(url, options) {
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
	const customFetch = fetch.bind(window);
	const controller = new AbortController();
	options.signal = controller.signal;
	customFetch.abort = () => controller.abort();
	return customFetch(url, options).then(async (res) => {
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
	const req = new XMLHttpRequest();
	return new Promise((resolve, reject) => {
		req.open(options.method, url, true);
		if (options.headers) {
			Object.entries(options.headers).forEach(([key, value]) => {
				req.setRequestHeader(key, value)
			});
		}
		if (options.type == "json") req.responseType = 'json';
		req.onload = function () {
			req.body = req.response;
			if (req.status >= 400) {
				reject(req);
			} else resolve(req);
		}
		req.onerror = function () {
			req.body = req.response;
			reject(req);
		}

		if (options.upload) {
			req.setRequestHeader("Content-Type", "application/octet-stream");
			req.upload.addEventListener("progress", (event) => {
				// if (event.lengthComputable) options.upload(event.loaded, event.total);
				options.upload(event.loaded, event.total);
			});
		}
		if (options.download) {
			req.addEventListener("progress", (event) => {
				// if (event.lengthComputable) options.download(event.loaded, event.total);
				options.download(event.loaded, event.total);
			});
		}
		req.send(options.body);
	});
}

export function $http(url, options) {
	dispatchEvent("bw:loading", true);
	const authUser = auth();
	options.headers = {
		// Accept: "application/json",
		"Content-Type": options.body instanceof HTMLElement ? "multipart/form-data" : 'application/json', //, application/x-www-form-urlencoded, text/plain
		pragma: "no-cache",
		"cache-control": "no-cache",
		Authorization: authUser?.Token || "",
		...(options?.headers || {})
	}
	if (options.query && typeof options.query === "object") {
		url += (url.includes("?") ? "&" : "?") + new URLSearchParams(options.query);
	}
	if (options.body instanceof HTMLElement) {
		options.body = new FormData(options.body);
		if (options.body.get("password")) {
			options.body.set("password", sha512(options.body.get("password")));
		}
		if (options.body.get("cpassword")) options.body.delete("cpassword");
	} else if (typeof options.body === "object") options.body = JSON.stringify(options.body);
	return (!window?.fetch || options.xhr ? useXHR(url, options) : useFetch(url, options))
		.catch((error) => {
			// dispatchEvent("bw:alert", {
			// 	error,
			// 	status: error.status || "error",
			// 	message: error.message || "Unable to complete network request",
			// });
			// dispatchEvent("bw:loading", false);
			handleResponse(error?.meta || error);
			throw new Error(error);
		})
		.then((res) => {
			handleResponse(res?.meta);
			if (res.status >= 400) throw new Error(res);
			return res;
		});
}

export const debouncedHTTP = debounce($http);

export default {
	get(url, options = {}) {
		return $http(url, options)
	},
	delete(url, options = {}) {
		return $http(url, {
			method: "DELETE",
			...options
		})
	},
	post(url, body, options = {}) {
		return $http(url, {
			method: "POST",
			body,
			...options
		})
	},
	put(url, body, options = {}) {
		return $http(url, {
			method: "PUT",
			body,
			...options
		})
	},
	patch(url, body, options = {}) {
		return $http(url, {
			method: "PATCH",
			body,
			...options
		})
	},
};