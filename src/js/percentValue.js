export default function percentValue(value, percent, isIncluded = false) {
	if (isIncluded) return {
		included: value,
		excluded: +(value * 100 / (100 + percent)).toFixed(2),
	}
	else return {
		included: +(value * (100 + percent) / 100).toFixed(2),
		excluded: value,
	}
}