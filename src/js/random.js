export default function random(min, max, precision) {
	if (precision) {
		return +((min + Math.random() * (max - min)).toFixed(precision));
	}
	return parseInt(min + Math.random() * (max - min));
}