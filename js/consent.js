import storage from "./storage.js";
export default function consentModal(config = {
	message: "We use cookies and other tracking/storage technologies to improve your browsing experience, By using our application, you consent to our use of these technologies.",
	button: "Accept",
	tnc: "https://en.wikipedia.org/wiki/HTTP_cookie",
	type: "cookie-consent"
}) {
	// if (storage(config.type)) return;
	let bwconsent = document.createElement("div");
	bwconsent.className = "bwconsent";

	let container = document.createElement("div");
	container.className = "bwconsent__container";

	if (config.title) {
		let h5 = document.createElement("h4");
		h5.className = "bwconsent__title";
		h5.innerHTML = config.title;
		container.appendChild(h5);
	}

	let para = document.createElement("p");
	para.className = "bwconsent__message";
	para.innerHTML = `${config.message} <a href="${config.tnc}" target="_blank">Click here</a> to know more  `;
	container.appendChild(para);

	let action = document.createElement("div");
	action.className = "bwconsent__action";

	let close = document.createElement("button");
	close.className = "bwbutton bwbutton--warning bwconsent__close-button";
	close.type = "button"
	close.innerHTML = config.button;

	action.appendChild(close);

	bwconsent.appendChild(container);
	bwconsent.appendChild(action);
	document.getElementsByTagName("body")[0].appendChild(bwconsent);
	return new Promise((resolve, reject) => {
		close.addEventListener("click", function (e) {
			storage(config.type, true);
			bwconsent.remove();
			resolve();
		})
	});
}
