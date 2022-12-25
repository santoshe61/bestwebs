export function permalink(text) {
	return text.replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase();
}
export default { permalink }