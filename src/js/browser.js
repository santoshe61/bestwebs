export default function browser () {
	let e,
		t = navigator.userAgent,
		n = !1,
		i =
			t.match(
				/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
			) || [],
		r = "-",
		a = "-",
		o = [
			{ s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
			{ s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
			{ s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
			{ s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
			{ s: "Windows Vista", r: /Windows NT 6.0/ },
			{ s: "Windows Server 2003", r: /Windows NT 5.2/ },
			{ s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
			{ s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
			{ s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
			{ s: "Windows 98", r: /(Windows 98|Win98)/ },
			{ s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
			{
				s: "Windows NT 4.0",
				r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
			},
			{ s: "Windows CE", r: /Windows CE/ },
			{ s: "Windows 3.11", r: /Win16/ },
			{ s: "Android", r: /Android/ },
			{ s: "Open BSD", r: /OpenBSD/ },
			{ s: "Sun OS", r: /SunOS/ },
			{ s: "Chrome OS", r: /CrOS/ },
			{ s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
			{ s: "iOS", r: /(iPhone|iPad|iPod)/ },
			{ s: "Mac OS X", r: /Mac OS X/ },
			{ s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
			{ s: "QNX", r: /QNX/ },
			{ s: "UNIX", r: /UNIX/ },
			{ s: "BeOS", r: /BeOS/ },
			{ s: "OS/2", r: /OS\/2/ },
			{
				s: "Search Bot",
				r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
			},
		];
	for (var s in o) {
		var l = o[s];
		if (l.r.test(t)) {
			r = l.s;
			break;
		}
	}
	return (
		/Windows/.test(r)
			? ((a = /Windows (.*)/.exec(r)[1]), (r = "Windows"))
			: "Mac OS X" === r
				? (a = /Mac OS X (10[\.\_\d]+)/.exec(t)[1])
				: "Android" === r
					? (a = /Android ([\.\_\d]+)/.exec(t)[1])
					: "iOS" === r &&
					((a = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer)),
						(a = a[1] + "." + a[2] + "." + (0 | a[3]))),
		/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(t) && (n = !0),
		/trident/i.test(i[1])
			? ((e = /\brv[ :]+(\d+)/g.exec(t) || []),
			{
				isMobile: n,
				name: "IE",
				version: e[1] || "",
				os: r,
				osVersion: a,
				user_agent: t,
			})
			: "Chrome" === i[1] && ((e = t.match(/\bOPR|Edge\/(\d+)/)), null != e)
				? {
					isMobile: n,
					name: "Opera",
					version: e[1],
					os: r,
					osVersion: a,
					user_agent: t,
				}
				: ((i = i[2]
					? [i[1], i[2]]
					: [navigator.appName, navigator.appVersion, "-?"]),
					null != (e = t.match(/version\/(\d+)/i)) && i.splice(1, 1, e[1]),
				{
					isMobile: n,
					name: i[0],
					version: i[1],
					os: r,
					osVersion: a,
					user_agent: t,
				})
	);
}