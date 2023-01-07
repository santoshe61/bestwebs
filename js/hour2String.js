export default function hour2String(hoursORdateFrom, dateTo) {
	let num = hoursORdateFrom;
	if (dateTo) {
		if (!(dateTo instanceof Date)) dateTo = new Date(dateTo);
		if (!(hoursORdateFrom instanceof Date)) hoursORdateFrom = new Date(hoursORdateFrom);
		num = (dateTo - hoursORdateFrom) / 3600000;
	}
	let numberText = {
		[24 * 365]: "year",
		[24 * 30]: "month",
		24: "day",
		1: "hour",
	}
	let numberValues = Object.keys(numberText).map(keys => Number(keys)).sort((a, b) => b - a);
	// console.log(numberValues)
	let text = ''
	for (const numberValue of numberValues) {
		const count = Math.trunc(num / numberValue)
		if (count < 1) continue

		// if (numberValue > 24) text += hour2String(count) + ' '

		text += count + " " + numberText[numberValue] + (count > 1 ? 's ' : ' ')
		num -= count * numberValue
	}
	if (num !== 0) console.log('Something went wrong! num = ' + num)

	return text.trim()
}