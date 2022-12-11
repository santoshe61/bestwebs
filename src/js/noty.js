let container;

function addNoty(type, message, config) {
	if (!(container = document.querySelector(".bwnoty.bwnoty__container"))) {
		container = document.createElement("div");
		container.className = "bwnoty bwnoty__container";
		document.getElementsByTagName("body")[0].appendChild(container);
	}

	let removeTimeout;
	let item = document.createElement("div");
	item.className = `bwnoty__item bwnoty--${type}`;
	item.title = "Double click to free/unfreeze this notification";
	item.addEventListener("dblclick", function (e) {
		// return console.log(this.classList.toggle("bwnoty__item-freezed"));
		if (this.classList.toggle("bwnoty__item-freezed")) {
			clearTimeout(removeTimeout);
		} else {
			removeNoty();
		}

	});

	function removeNoty() {
		removeTimeout = setTimeout(() => {
			item.remove();
		}, config.timeout * 1000);
	}
	removeNoty();



	if (config.title) {
		let h5 = document.createElement("h4");
		h5.className = "bwnoty__item__title";
		h5.innerHTML = config.title;
		item.appendChild(h5);
	}

	let para = document.createElement("p");
	para.className = "bwnoty__item__message";
	para.innerHTML = message;
	item.appendChild(para);

	let close = document.createElement("button");
	close.className = "bwnoty__item__close-button";
	close.innerHTML = "&#10006;";
	close.addEventListener("click", function (e) {
		item.remove();
		clearTimeout(removeTimeout);
	})
	item.appendChild(close);

	container.appendChild(item);
}

export default function noty(type, message, config) {
	if (typeof type === 'object') {
		config = message || {};
		message = type.message;
		type = type.type;
	} else if (message === undefined) {
		message = type;
		type = "warning";
	}
	config = {
		timeout: 10,
		...config
	}
	addNoty(type, message, config);
}

// noty("positive", "You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely. You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely.");

// noty("negative", "You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely. You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely.", {title: "When using setTimeout do you have to clearTimeout?"});

// noty("warning", "You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely. You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely.", { title: "When using setTimeout do you have to clearTimeout?" });


// noty("dark", "You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely. You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely.", { title: "When using setTimeout do you have to clearTimeout?" });

// noty("accent", "You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely. You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely.", { title: "When using setTimeout do you have to clearTimeout?" });

// noty("info", "You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely. You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely.", { title: "When using setTimeout do you have to clearTimeout?" });

// noty("primary", "You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely. You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely.", { title: "When using setTimeout do you have to clearTimeout?" });

// noty("secondary", "You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely. You don't actually need to use clearTimeout, you only use it if you wish to cancel the timeout you already set before it happens. It's usually more practical to use clearInterval with setInterval because setInterval usually runs indefinitely.", { title: "When using setTimeout do you have to clearTimeout?" });