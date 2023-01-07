function detectURLs(text) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return text.match(urlRegex)
}

// detectURLs("Visit www.cluemediator.com and subscribe us on https://www.cluemediator.com/subscribe for regular updates.")
// Output: ["www.cluemediator.com", "https://www.cluemediator.com/subscribe"]



function replaceURLs(text) {
	if (!text) return;

	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return text.replace(urlRegex, function (url) {
		var hyperlink = url;
		if (!hyperlink.match('^https?:\/\/')) {
			hyperlink = 'http://' + hyperlink;
		}
		return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
	});
}

// replaceURLs("Visit www.cluemediator.com and subscribe us on https://www.cluemediator.com/subscribe for regular updates.")
// Output: Visit <a href="http://www.cluemediator.com" target="_blank" rel="noopener noreferrer">www.cluemediator.c


function replaceURLs(text) {
	if (!text) return;

	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return text.replace(urlRegex, function (url) {
		var hyperlink = url;
		if (!hyperlink.match('^https?:\/\/')) {
			hyperlink = 'http://' + hyperlink;
		}
		return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
	});
}

// replaceURLs("Visit www.cluemediator.com and subscribe us on https://www.cluemediator.com/subscribe for regular updates.")
// Output: Visit <a href="http://www.cluemediator.com" target="_blank" rel="noopener noreferrer">www.cluemediator.c