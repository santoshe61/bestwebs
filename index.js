// stylesheet
if (globalThis.window) {
	import("./src/style.css");
	import("./src/utils/custom-scripts.js").then((script) => script.default());
}

// core js
export { default as http } from "./src/js/http.js";
export { default as auth } from "./src/js/auth.js";
export { default as sha512 } from "./src/js/sha512.js";
export { default as events } from "./src/js/events.js";
export { default as storage } from "./src/js/storage.js";
export { default as debounce } from "./src/js/debounce.js";
export { default as throttle } from "./src/js/throttle.js";
export { default as noty } from "./src/js/noty.js";
export { default as browser } from "./src/js/browser.js";
export { default as validations } from "./src/js/validations.js";
export { default as sleep } from "./src/js/sleep.js";
export { default as loader } from "./src/js/loader.js";
export { default as random } from "./src/js/random.js";
export { default as percentValue } from "./src/js/percentValue.js";
export * as login from "./src/js/login.js";
export { default as reqResInterceptor } from "./src/js/reqResInterceptor.js";
export { default as consent } from "./src/js/consent.js";
export { default as hour2String } from "./src/js/hour2String.js";
export { default as number2String } from "./src/js/number2String.js";
export { default as rearrange } from "./src/js/rearrange.js";
export { default as date } from "./src/js/date.js";
export { default as image } from "./src/js/image.js";
export { default as size } from "./src/js/size.js";

// vue js
export { default as directives } from "./src/vue/directives.js";
