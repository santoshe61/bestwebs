import sleep from "./sleep.js";

export default async function waitFor(cb, gap = 1) {
	while (!cb()) {
		await sleep(gap);
	}
	console.log("Exiting waitFor");
	// if (!cb()) {
	// 	waitFor(cb, gap);
	// } else {
	// 	return true;
	// }
}