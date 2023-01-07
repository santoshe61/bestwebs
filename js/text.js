export const permalink = (text) => text.replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase().trim();
export const upper = (text) => text.toUpperCase().trim();
export const lower = (text) => text.toLowerCase().trim();
export const pasca = (text) => text.split(/[-_,\s]+/).map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join('').trim();
export const snake = (text) => text.split(/[-_,\s]+/).map(w => w.toLowerCase()).join("_").trim();
export const kebab = (text) => text.split(/[-_,\s]+/).map(w => w.toLowerCase()).join("-").trim();
export const title = (text) => text[0].toUpperCase() + text.substring(1).toLowerCase().trim();
export const sentence = title;
export const capital = (text) => text.split(/[-_\s]+/).map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ').trim();
export const capitalize = capital;
export const camel = (text) => text.split(/[-_,\s]+/).map((w, i) => i == 0 ? w.toLowerCase() : w[0].toUpperCase() + w.substring(1).toLowerCase()).join('').trim();

export default { permalink, upper, lower, pasca, snake, kebab, title, sentence, capital, capitalize, camel };