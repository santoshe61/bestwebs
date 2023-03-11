// stylesheet
if (globalThis.window) {
	import("./style.css");
	import("./utils/custom-scripts.js").then((script) => script.default());
}

// core js
export { default as http } from "./js/http.js";
export { default as auth } from "./js/auth.js";
export { default as sha512 } from "./js/sha512.js";
export { default as events } from "./js/events.js";
export { default as storage } from "./js/storage.js";
export { default as debounce } from "./js/debounce.js";
export { default as throttle } from "./js/throttle.js";
export { default as noty } from "./js/noty.js";
export { default as browser } from "./js/browser.js";
export { default as validations } from "./js/validations.js";
export { default as sleep } from "./js/sleep.js";
export { default as loader } from "./js/loader.js";
export { default as random } from "./js/random.js";
export { default as percentValue } from "./js/percentValue.js";
export * as login from "./js/login.js";
export { default as reqResInterceptor } from "./js/reqResInterceptor.js";
export { default as consent } from "./js/consent.js";
export { default as hour2String } from "./js/hour2String.js";
export { default as number2String } from "./js/number2String.js";
export { default as rearrange } from "./js/rearrange.js";
export { default as date } from "./js/date.js";
export { default as image } from "./js/image.js";
export { default as size } from "./js/size.js";
export { default as text } from "./js/text.js";
export { default as waitFor } from "./js/waitFor.js";

// node js

// vue js
export { default as directives } from "./vue/directives.js";
