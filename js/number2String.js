/********************************************************
* @function    : numberToWords()
* @purpose     : Converts Unsigned Integers to Words
*                Using String Triplet Array.
* @version     : 1.0.0
* @author      : Santosh Ojha
* @date        : 12 December 2022
* @param       : {number} [integer numeric or string]
* @param       : {isMillion} [boolean]
* @returns     : {string} The wordified number string
********************************************************/

const Ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
	"Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
	Tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety", "Hundred"],
	Scale = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion"];
//==================================

const numberToWordsUS = (n = 0) => {
	if (n == 0) return "Zero";                                   // check for zero
	n = ("0".repeat(2 * (n += "").length % 3) + n).match(/.{3}/g);   // create triplets array
	if (n.length > Scale.length) return "Too Large";             // check if larger than scale array
	let out = ""; return n.forEach((Triplet, pos) => {             // loop into array for each triplet
		if (+Triplet) {
			out += ' ' + (+Triplet[0] ? Ones[+Triplet[0]] + ' ' + Tens[10] : "") +
				' ' + (+Triplet.substr(1) < 20 ? Ones[+Triplet.substr(1)] :
					Tens[+Triplet[1]] + (+Triplet[2] ? "-" : "") + Ones[+Triplet[2]]) +
				' ' + Scale[n.length - pos - 1];
		}
	}), out.replace(/\s+/g, ' ').trim();
};                         // lazy job using trim()
//==================================



const numberText = {
	1: 'One',
	2: 'Two',
	3: 'Three',
	4: 'Four',
	5: 'Five',
	6: 'Six',
	7: 'Seven',
	8: 'Eight',
	9: 'Nine',
	10: 'Ten',
	11: 'Eleven',
	12: 'Twelve',
	13: 'Thirteen',
	14: 'Fourteen',
	15: 'Fifteen',
	16: 'Sixteen',
	17: 'Seventeen',
	18: 'Eighteen',
	19: 'Nineteen',
	20: 'Twenty',
	30: 'Thirty',
	40: 'Forty',
	50: 'Fifty',
	60: 'Sixty',
	70: 'Seventy',
	80: 'Eighty',
	90: 'Ninety',
	100: 'Hundred',
	1000: 'Thousand',
	100000: 'Lac',
	10000000: 'Crore',
}

const numberValues = Object.keys(numberText)
	.map((val) => Number(val))
	.sort((a, b) => b - a)

const numberToWordsIN = (n) => {
	if (n === 0) return 'zero'
	if (n < 0) return 'negative ' + numberToWordsIN(-n)

	let num = n
	let text = ''

	for (const numberValue of numberValues) {
		const count = Math.trunc(num / numberValue)

		if (count < 1) continue

		if (numberValue >= 100) text += numberToWordsIN(count) + ' '

		text += numberText[numberValue] + ' '
		num -= count * numberValue
	}

	if (num !== 0) throw Error('Something went wrong!')

	return text.trim()
}
export default function number2String(num, isMilion) {
	return isMilion ? numberToWordsUS(num) : numberToWordsIN(num);
}