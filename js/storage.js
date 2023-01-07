export function cookies(name, value, options = {}) {
	// Delete Cookie if name provided but value is null
	if (value === null) {
		document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
		return true;
	}
	// Set Cookie if name and value both provided (not null and not boolean)
	else if (value !== null && value !== undefined) {
		let today = new Date();
		options = Object.assign(
			{},
			{
				path: "/",
				time: 24 * 60 * 60,
			},
			options
		);
		let expires = today.setHours(today.getHours() + options.time / 3600);
		document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=${options.path}`;
		return true;
	}

	// Get Cookie if Name provided but value is undefined/not-provided
	else if (name) {
		let decodedCookie = decodeURIComponent(document.cookie)
		try {
			return JSON.parse(
				("; " + decodedCookie)
					.split("; " + name + "=")
					.pop()
					.split(";")
					.shift()
			);
		} catch (event) {
			return ("; " + decodedCookie)
				.split("; " + name + "=")
				.pop()
				.split(";")
				.shift();
		}
	}
	// Get Cookies Object containing all cookies if both of params are null
	else {
		let cookies = {};
		let ca = decodeURIComponent(document.cookie).split("; ");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i].split(/=(.+)/);
			try {
				cookies[c[0]] = JSON.parse(c[1]);
			} catch (e) {
				cookies[c[0]] = c[1];
			}
		}
		return cookies;
	}
}
// get, set or remove local, session, cookie storage
export default function storage (name, value, options = { type: "local" }) {
	let store;
	if (options.type === "cookie") {
		return cookies(name, value, options)
	} else if (options.type === "session") store = window.sessionStorage;
	else store = window.localStorage;
	// Set Storage if name and value both provided (not null and not boolean)
	if (value !== undefined && value !== null)
		store.setItem(name, JSON.stringify(value));
	// Delete Storage if name provided but value is False or Null ## if need to set to false then use zero empty string
	else if (value === null) store.removeItem(name);
	// Get Storage if Name provided but value is undefined/not-provided
	else if (name) {
		try {
			return JSON.parse(store.getItem(name)) || undefined;
		} catch (e) {
			return store.getItem(name) || undefined;
		}
		// Get Storage Object containing all cookies if none of params provided
	} else return store;
};