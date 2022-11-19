export default function (callback, wait = 500) {
	let last = 0;
	return function (...args) {
		const now = new Date().getTime();
		if (now - last < wait) {
			return;
		}
		last = now;
		return callback(...agrs);
	}
};