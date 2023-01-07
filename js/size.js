export default function size(sizeInBytes) {
	sizeInBytes = +sizeInBytes;
	let factor = 0;
	if ((factor = (sizeInBytes / (1024 * 1024 * 1024))) >= 1) {
		return factor.toFixed(2) + " GB";
	} else if ((factor = (sizeInBytes / (1024 * 1024))) >= 1) {
		return factor.toFixed(2) + " MB";
	} else if ((factor = (sizeInBytes / (1024))) >= 1) {
		return factor.toFixed(2) + " KB";
	} else return sizeInBytes + " B";
}