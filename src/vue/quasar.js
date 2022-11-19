// https://v0-17.quasar-framework.org/guide/app-plugins.html

export default ({ app, router, store, Vue }) => {
	// 1. bw:alert
	// 2. bw:redirect
	// 3. bw:loading
	window.addEventListener("bw:redirect", function (url) {
		router.push(url);
	});
	window.addEventListener("bw:loading", function (url) {
		store.dispatch(url);
	});
	window.addEventListener("bw:alert", function (url) {
		store.dispatch(url);
	});
}