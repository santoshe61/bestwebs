class date extends Date {
	constructor(_date) {
		_date = _date ? super(_date) : super();
		this._date = _date;
	}
	format(requiredFormat) {
		if (requiredFormat == "DD/MM/YYYY") return super.toLocaleDateString("en-IN");
		return super.toJSON().slice(0, 10);
		// return super.toLocaleDateString('en-CA');

	}
	after(duration, key) {
		return this.add(+duration, key);
	}
	add(duration, key) {
		if (key.toLowerCase().includes("day")) {
			super.setDate(super.getDate() + +duration);
			return this;
		} else if (key.toLowerCase().includes("month")) {
			super.setMonth(super.getMonth() + +duration);
			return this;
		} else if (key.toLowerCase().includes("year")) {
			super.setFullYear(super.getFullYear() + +duration);
			return this;
		} else if (key.toLowerCase().includes("hour")) {
			super.setHours(super.getHours() + +duration);
			return this;
		} else if (key.toLowerCase().includes("minute")) {
			super.setMinutes(super.getMinutes() + +duration);
			return this;
		} else if (key.toLowerCase().includes("second")) {
			super.setSeconds(super.getSeconds() + +duration);
			return this;
		}
		console.error("invalid addition type provided");
		return this;
	}
	diff(date2) {
		if (date2) {
			return (this._date - new Date(date2)) / (3600000 * 24);
		} else {
			return (this._date - new Date()) / (3600000 * 24);
		}
	}
}


export default date;