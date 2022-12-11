export default function rearrange(arr) {
	return arr.reduce((acc, item) => {
		for (const key in item) {
			if (acc[key]) acc[key].push(item[key]);
			else acc[key] = [item[key]]
		}
		return acc;
	}, {});
}