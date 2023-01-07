let defaultConfig = {
	key: "authUser",
	storage: "local",
}
export default function auth(value, config = {}) {
	defaultConfig = config = {
		...defaultConfig,
		...config
	};
	let storage = `${config.storage}Storage`;
	let currentValue = JSON.parse(window[storage].getItem(config.key));
	if (value) {
		window[storage].setItem(config.key, JSON.stringify(value));
		return value;
	} else if (value === null) {
		window[storage].removeItem(config.key);
	}
	return currentValue;
}