export default function debounce (callback, wait = 500, immediate = false) {
	let timeout = null;
	return function () {
		const callNow = immediate && !timeout;
		const next = () => callback.apply(this, arguments);
		clearTimeout(timeout);
		timeout = setTimeout(next, wait);
		if (callNow) next();
	};
};