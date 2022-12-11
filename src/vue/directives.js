export default function directives(app) {
	app.directive("case", function (el, binding) {
		// UPPERCASE
		if (binding == "upper") el.value = el.value.toUpperCase()
		// lowercase
		else if (binding == "lower") el.value = el.value.toLowerCase()
		// PascalCase
		else if (binding == "pascal") el.value = el.value.split(/[-_,\s]+/).map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join('');
		// camelCase
		else if (binding == "camel") {
			el.value = el.value.split(/[-_,\s]+/).map((w, i) => {
				return i == 0 ? w.toLowerCase() : w[0].toUpperCase() + w.substring(1).toLowerCase();
			}).join('');
		}
		// snake_case
		else if (binding == "snake") el.value = el.value.split(/[-_,\s]+/).map(w => w.toLowerCase()).join("_")
		// kebab-case
		else if (binding == "kebab") el.value = el.value.split(/[-_,\s]+/).map(w => w.toLowerCase()).join("-")
		// Title case
		else if (binding == "title" || binding == "sentence") el.value = el.value[0].toUpperCase() + el.value.substring(1).toLowerCase()
		// Capital Case
		else if (binding == "capital" || binding == "capitalize") el.value.split(/[-_\s]+/).map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');
	})
}