function createLoader() {
	let container;
	if (container = document.querySelector(".bwloader__container")) return container;
	let loaderIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background:#ffffff00;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
	<circle cx="50" cy="50" r="32" stroke-width="8" stroke="#0c7fbb" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
	<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
	</circle>
	</svg>
	`;
	container = document.createElement("div");
	container.className = "bwloader__container";
	// container.style.display = "none";

	let loaderDiv = document.createElement("div");
	loaderDiv.className = "bwloader";
	loaderDiv.innerHTML = loaderIcon;

	let closeBtn = document.createElement("div");
	closeBtn.className = "bwloader__close-button";
	closeBtn.innerHTML = "&#10006;";
	closeBtn.addEventListener("click", () => {
		container.style.display = "none";
	});

	container.appendChild(closeBtn);
	container.appendChild(loaderDiv);

	document.getElementsByTagName("body")[0].appendChild(container);
	return container;
}

export default function loader(isLoading) {
	let container;
	if (isLoading) {
		createLoader().style.display = "block";
	} else if (container = document.querySelector(".bwloader__container")) {
		document.querySelector(".bwloader__container").style.display = "none";
	}
	return !isLoading;
}