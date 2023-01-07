/*
Carefull  things-
1. FALSY VALUES =>  0, '',  NaN, null, undefined,  false
2. +undefined = parseInt(undefined) = NaN
3. parseInt(null) = NaN <--- BUT --->  +null = 0
4. parseInt(false) = NaN <--- BUT ---> +false = 0
5. parseInt(Infinity) = NaN <--- BUT ---> +Infinity = Infinity
6. parseInt('123dsadf') = 123 <--- BUT ---> +'123dsadf' = NaN
*/
export const required = (v) => {
	// console.log(v)
	// Start - Code to use required as function like required(true) or required(false)
	if (v === true)
		return (d) =>
			(d !== "" && d !== undefined && d !== null) || "This field is required";
	else if (v === false) return () => true;
	// END
	else if (v === undefined || v === null || (v !== 0 && !v)) return "This field is required";
	else if (typeof v === "number" || typeof v === "string") !!`${v}`.trim().length || "This field is required";
	else if (v instanceof Map || v instanceof Set) return !!v.size || "This field is required";
	else if (typeof v === "object") return !!Object.values(v).length || "This field is required";
	else return !v || "This field is required"
};

export const email = (v) =>
	!v
		? true
		: /^[0-9a-zA-Z-.]+@[0-9a-zA-Z-]+\.[0-9a-zA-Z-.]+$/.test(v) ||
		"This should be valid email address";

export const upi = (v) =>
	!v
		? true
		: /^[0-9a-zA-Z_-]+@[0-9a-zA-Z]{3,10}$/.test(v) ||
		"This should be valid UPI address";
export const mobile = (v) =>
	!v
		? true
		: /^[6-9][0-9]{9}$/.test(v) ||
		"This should be valid 10 digit mobile number without country code";

export const phone = (v) =>
	!v
		? true
		: /^[0-9][1-9][0-9]{7,13}$/.test(v) ||
		"This should be valid landline or mobile number with std code";
export const username = (v) =>
	!v
		? true
		: /^[6-9][0-9]{9}$/.test(v) ||
		/^[0-9a-zA-Z-.]+@[0-9a-zA-Z-]+\.[0-9a-zA-Z-.]+$/.test(v) ||
		"This should be valid Email or 10 digit mobile number without country code";
export const gstin = (v) =>
	!v
		? true
		: /^[0-3][0-9][a-zA-Z]{5}[0-9]{4}[a-zA-Z][0-9][a-zA-Z]{2}$/.test(v) ||
		"Should be a valid Indian GSTIN Number";
export const pan = (v) =>
	!v
		? true
		: /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]$/.test(v) ||
		"Should be a valid Indian PAN Number";

export const aadhar = (v) =>
	!v
		? true
		: /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/.test(
			v
		) || "Should be a valid UIDAI AADHAR Number";

export const ifsc = (v) =>
	!v
		? true
		: /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/.test(v) ||
		"Should be a valid Bank IFSC Code";

export const minLength = (limit) => (v) =>
	v
		? v.length >= limit || `Requires ${limit} or more characters`
		: true;

export const maxLength = (limit) => (v) =>
	v
		? v.length <= limit || `Requires ${limit} or less characters`
		: true;

export const min = (limit) => (v) =>
	(v || v === 0) ? +v >= limit || `Should be ${limit} or more ` : true;

export const max = (limit) => (v) =>
	(v || v === 0) ? +v <= limit || `Should be ${limit} or less ` : true;

export const custom =
	(regex, msg = "Invalid value provided") =>
		(v) =>
			v ? new RegExp(regex).test(v) || msg : true;

export const number = (min, max) => (v) => {
	if (!v && v !== 0) return true;
	v = parseFloat(v);
	if (parseFloat(max) || max === 0) return (
		(v >= parseFloat(min) && v <= parseFloat(max)) ||
		`Should be a number between ${min} and ${max}`
	);
	else return (
		(v >= parseFloat(min)) ||
		`Should be ${min} or more `
	);
};

export const text = (minimumLength, maximumLength, pattern = /(.*)+$/ig) => (v) => {
	minimumLength = parseInt(minimumLength);
	maximumLength = parseInt(maximumLength);
	return v
		? (pattern.test(v) &&
			`${v}`.trim().length >= minimumLength &&
			`${v}`.trim().length <= maximumLength) ||
		`Should be a text of ${minimumLength} to ${maximumLength} chars, no special characters`
		: true;
};

export const match = (existing) => (v) =>
	existing == v || "This value is not matching";

export const alphaFirst = (v) =>
	!v ? true : !/^[0-9](.*)+$/.test(v) || "Fist letter can not be a number";


export const filecount =
	(min = 1, max = 1) =>
		(v) => {
			if (v) return v.length >= min && v.length <= max;
			return true;
		};

// helpers
export const lpad = (num, prefix = "", places = 6) => {
	return prefix + String(num).padStart(places, "0");
};

export default { required, email, mobile, username, gstin, pan, aadhar, ifsc, minLength, maxLength, min, max, custom, number, text, match, alphaFirst, lpad, filecount, upi, phone };