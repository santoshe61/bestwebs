export const required = (v) => {
	// Start - Code to use required as function like required(true) or required(false)
	if (v === true)
		return (d) =>
			(d !== "" && d !== undefined && d !== null) || "This field is required";
	else if (v === false) return () => true;
	// END
	try {
		if (typeof v === "number") v = `${v}`;
		else v = v.trim();
	} catch (e) {
		return "This field is required";
	}
	return (
		(v !== "" && v !== undefined && v !== null) || "This field is required"
	);
};

export const email = (v) =>
	!v
		? true
		: /^[0-9a-zA-Z-.]+@[0-9a-zA-Z-]+\.[0-9a-zA-Z-.]+$/.test(v) ||
		"This should be valid email address";

export const upi = (v) =>
	!v
		? true
		: /^[0-9a-zA-Z_-]+@[0-9a-zA-Z]+$/.test(v) ||
		"This should be valid UPI address";
export const mobile = (v) =>
	!v
		? true
		: /^[6-9][0-9]{9}$/.test(v) ||
		"This should be valid 10 digit mobile number without country code";
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
		? v.length >= limit || `This field requires ${limit} or more characters`
		: true;

export const maxLength = (limit) => (v) =>
	v
		? v.length <= limit || `This field requires ${limit} or less characters`
		: true;

export const min = (limit) => (v) =>
	v ? v >= limit || `This should be ${limit} or more ` : true;

export const max = (limit) => (v) =>
	v ? v <= limit || `This should be ${limit} or less ` : true;

export const custom =
	(regex, msg = "Invalid value provided") =>
		(v) =>
			v ? new RegExp(regex).test(v) || msg : true;

export const number = (min, max) => (v) => {
	if (v === "" || v === undefined) return true;
	let minimum = parseFloat(min);
	let maximum = parseFloat(max);
	v = parseFloat(v);
	return (
		(v >= minimum && v <= maximum) ||
		`This should be a number between ${min} and ${max}`
	);
};

export const text = (minimumLength, maximumLength, pattern = /^[0-9a-zA-Z\s!@#$%*()-+_='":,.<>?/]+$/) => (v) => {
	minimumLength = parseInt(minimumLength);
	maximumLength = parseInt(maximumLength);
	return v
		? (pattern.test(v) &&
			`${v}`.trim().length >= minimumLength &&
			`${v}`.trim().length <= maximumLength) ||
		`Should be ${minimumLength} to ${maximumLength} chars and must not contain [&] or Invalid characters`
		: true;
};

export const match = (existing) => (v) =>
	existing == v || "This value is not matching";

export const alphaFirst = (v) =>
	!v ? true : !/^[0-9](.*)+$/.test(v) || "Fist letter can not be a number";

export const lpad = (num, prefix = "", places = 6) => {
	return prefix + String(num).padStart(places, "0");
};

export const filecount =
	(min = 1, max = 1) =>
		(v) => {
			if (v) return v.length >= min && v.length <= max;
			return true;
		};


export default { required, email, mobile, username, gstin, pan, aadhar, ifsc, minLength, maxLength, min, max, custom, number, text, match, alphaFirst, lpad, filecount, upi };