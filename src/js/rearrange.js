export default function rearrange(arr) {
	let obj = arr.reduce((acc, item) => {
		for (const key in item) {
			if (acc[key]) acc[key].add(item[key]);
			else acc[key] = new Set([item[key]])
		}
		return acc;
	}, {});

	for (const key in obj) {
		obj[key] = [...obj[key]];
	}
	return obj;
}