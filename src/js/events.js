import noty from "./noty";
import loader from "./loader";

/**
* capture below events on wondow

	1. bw:alert
	2. bw:redirect
	3. bw:loading
*/
function events(router, store) {
	window.addEventListener("bw:alert", function ({ detail }) {
		console.log(detail);
		noty(detail.status, detail.message, { title: detail.title });
	});
	if (router) {
		window.addEventListener("bw:redirect", function ({ detail }) {
			router.push(detail);
		});
	}
	if (store) {
		window.addEventListener("bw:loading", function ({ detail }) {
			loader(detail);
			if (store._isOptionsAPI === undefined) {
				store.dispatch("loading", detail);
			} else {
				store?.loading?.(detail);
			}
		});
	}
}

export default events;