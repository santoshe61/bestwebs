export default function sha512 (e) {
	let sha512_k;
	let hexcase = 0;
	function rstr_sha512(e) {
		return binb2rstr(binb_sha512(rstr2binb(e), 8 * e.length));
	}
	function rstr2hex(e) {
		for (
			var t,
			n = hexcase ? "0123456789ABCDEF" : "0123456789abcdef",
			i = "",
			r = 0;
			r < e.length;
			r++
		)
			(t = e.charCodeAt(r)), (i += n.charAt((t >>> 4) & 15) + n.charAt(15 & t));
		return i;
	}
	function str2rstr_utf8(e) {
		for (var t, n, i = "", r = -1; ++r < e.length;)
			(t = e.charCodeAt(r)),
				(n = r + 1 < e.length ? e.charCodeAt(r + 1) : 0),
				55296 <= t &&
				t <= 56319 &&
				56320 <= n &&
				n <= 57343 &&
				((t = 65536 + ((1023 & t) << 10) + (1023 & n)), r++),
				t <= 127
					? (i += String.fromCharCode(t))
					: t <= 2047
						? (i += String.fromCharCode(192 | ((t >>> 6) & 31), 128 | (63 & t)))
						: t <= 65535
							? (i += String.fromCharCode(
								224 | ((t >>> 12) & 15),
								128 | ((t >>> 6) & 63),
								128 | (63 & t)
							))
							: t <= 2097151 &&
							(i += String.fromCharCode(
								240 | ((t >>> 18) & 7),
								128 | ((t >>> 12) & 63),
								128 | ((t >>> 6) & 63),
								128 | (63 & t)
							));
		return i;
	}
	function rstr2binb(e) {
		for (var t = Array(e.length >> 2), n = 0; n < t.length; n++) t[n] = 0;
		for (n = 0; n < 8 * e.length; n += 8)
			t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << (24 - (n % 32));
		return t;
	}
	function binb2rstr(e) {
		for (var t = "", n = 0; n < 32 * e.length; n += 8)
			t += String.fromCharCode((e[n >> 5] >>> (24 - (n % 32))) & 255);
		return t;
	}
	function binb_sha512(e, t) {
		null == sha512_k &&
			(sha512_k = new Array(
				new int64(1116352408, -685199838),
				new int64(1899447441, 602891725),
				new int64(-1245643825, -330482897),
				new int64(-373957723, -2121671748),
				new int64(961987163, -213338824),
				new int64(1508970993, -1241133031),
				new int64(-1841331548, -1357295717),
				new int64(-1424204075, -630357736),
				new int64(-670586216, -1560083902),
				new int64(310598401, 1164996542),
				new int64(607225278, 1323610764),
				new int64(1426881987, -704662302),
				new int64(1925078388, -226784913),
				new int64(-2132889090, 991336113),
				new int64(-1680079193, 633803317),
				new int64(-1046744716, -815192428),
				new int64(-459576895, -1628353838),
				new int64(-272742522, 944711139),
				new int64(264347078, -1953704523),
				new int64(604807628, 2007800933),
				new int64(770255983, 1495990901),
				new int64(1249150122, 1856431235),
				new int64(1555081692, -1119749164),
				new int64(1996064986, -2096016459),
				new int64(-1740746414, -295247957),
				new int64(-1473132947, 766784016),
				new int64(-1341970488, -1728372417),
				new int64(-1084653625, -1091629340),
				new int64(-958395405, 1034457026),
				new int64(-710438585, -1828018395),
				new int64(113926993, -536640913),
				new int64(338241895, 168717936),
				new int64(666307205, 1188179964),
				new int64(773529912, 1546045734),
				new int64(1294757372, 1522805485),
				new int64(1396182291, -1651133473),
				new int64(1695183700, -1951439906),
				new int64(1986661051, 1014477480),
				new int64(-2117940946, 1206759142),
				new int64(-1838011259, 344077627),
				new int64(-1564481375, 1290863460),
				new int64(-1474664885, -1136513023),
				new int64(-1035236496, -789014639),
				new int64(-949202525, 106217008),
				new int64(-778901479, -688958952),
				new int64(-694614492, 1432725776),
				new int64(-200395387, 1467031594),
				new int64(275423344, 851169720),
				new int64(430227734, -1194143544),
				new int64(506948616, 1363258195),
				new int64(659060556, -544281703),
				new int64(883997877, -509917016),
				new int64(958139571, -976659869),
				new int64(1322822218, -482243893),
				new int64(1537002063, 2003034995),
				new int64(1747873779, -692930397),
				new int64(1955562222, 1575990012),
				new int64(2024104815, 1125592928),
				new int64(-2067236844, -1578062990),
				new int64(-1933114872, 442776044),
				new int64(-1866530822, 593698344),
				new int64(-1538233109, -561857047),
				new int64(-1090935817, -1295615723),
				new int64(-965641998, -479046869),
				new int64(-903397682, -366583396),
				new int64(-779700025, 566280711),
				new int64(-354779690, -840897762),
				new int64(-176337025, -294727304),
				new int64(116418474, 1914138554),
				new int64(174292421, -1563912026),
				new int64(289380356, -1090974290),
				new int64(460393269, 320620315),
				new int64(685471733, 587496836),
				new int64(852142971, 1086792851),
				new int64(1017036298, 365543100),
				new int64(1126000580, -1676669620),
				new int64(1288033470, -885112138),
				new int64(1501505948, -60457430),
				new int64(1607167915, 987167468),
				new int64(1816402316, 1246189591)
			));
		var n,
			i,
			r = new Array(
				new int64(1779033703, -205731576),
				new int64(-1150833019, -2067093701),
				new int64(1013904242, -23791573),
				new int64(-1521486534, 1595750129),
				new int64(1359893119, -1377402159),
				new int64(-1694144372, 725511199),
				new int64(528734635, -79577749),
				new int64(1541459225, 327033209)
			),
			a = new int64(0, 0),
			o = new int64(0, 0),
			s = new int64(0, 0),
			l = new int64(0, 0),
			c = new int64(0, 0),
			d = new int64(0, 0),
			u = new int64(0, 0),
			p = new int64(0, 0),
			h = new int64(0, 0),
			b = new int64(0, 0),
			m = new int64(0, 0),
			w = new int64(0, 0),
			f = new int64(0, 0),
			g = new int64(0, 0),
			y = new int64(0, 0),
			v = new int64(0, 0),
			x = new int64(0, 0),
			k = new Array(80);
		for (i = 0; i < 80; i++) k[i] = new int64(0, 0);
		for (
			e[t >> 5] |= 128 << (24 - (31 & t)),
			e[31 + (((t + 128) >> 10) << 5)] = t,
			i = 0;
			i < e.length;
			i += 32
		) {
			for (
				int64copy(s, r[0]),
				int64copy(l, r[1]),
				int64copy(c, r[2]),
				int64copy(d, r[3]),
				int64copy(u, r[4]),
				int64copy(p, r[5]),
				int64copy(h, r[6]),
				int64copy(b, r[7]),
				n = 0;
				n < 16;
				n++
			)
				(k[n].h = e[i + 2 * n]), (k[n].l = e[i + 2 * n + 1]);
			for (n = 16; n < 80; n++)
				int64rrot(y, k[n - 2], 19),
					int64revrrot(v, k[n - 2], 29),
					int64shr(x, k[n - 2], 6),
					(w.l = y.l ^ v.l ^ x.l),
					(w.h = y.h ^ v.h ^ x.h),
					int64rrot(y, k[n - 15], 1),
					int64rrot(v, k[n - 15], 8),
					int64shr(x, k[n - 15], 7),
					(m.l = y.l ^ v.l ^ x.l),
					(m.h = y.h ^ v.h ^ x.h),
					int64add4(k[n], w, k[n - 7], m, k[n - 16]);
			for (n = 0; n < 80; n++)
				(f.l = (u.l & p.l) ^ (~u.l & h.l)),
					(f.h = (u.h & p.h) ^ (~u.h & h.h)),
					int64rrot(y, u, 14),
					int64rrot(v, u, 18),
					int64revrrot(x, u, 9),
					(w.l = y.l ^ v.l ^ x.l),
					(w.h = y.h ^ v.h ^ x.h),
					int64rrot(y, s, 28),
					int64revrrot(v, s, 2),
					int64revrrot(x, s, 7),
					(m.l = y.l ^ v.l ^ x.l),
					(m.h = y.h ^ v.h ^ x.h),
					(g.l = (s.l & l.l) ^ (s.l & c.l) ^ (l.l & c.l)),
					(g.h = (s.h & l.h) ^ (s.h & c.h) ^ (l.h & c.h)),
					int64add5(a, b, w, f, sha512_k[n], k[n]),
					int64add(o, m, g),
					int64copy(b, h),
					int64copy(h, p),
					int64copy(p, u),
					int64add(u, d, a),
					int64copy(d, c),
					int64copy(c, l),
					int64copy(l, s),
					int64add(s, a, o);
			int64add(r[0], r[0], s),
				int64add(r[1], r[1], l),
				int64add(r[2], r[2], c),
				int64add(r[3], r[3], d),
				int64add(r[4], r[4], u),
				int64add(r[5], r[5], p),
				int64add(r[6], r[6], h),
				int64add(r[7], r[7], b);
		}
		var T = new Array(16);
		for (i = 0; i < 8; i++) (T[2 * i] = r[i].h), (T[2 * i + 1] = r[i].l);
		return T;
	}
	function int64(e, t) {
		(this.h = e), (this.l = t);
	}
	function int64copy(e, t) {
		(e.h = t.h), (e.l = t.l);
	}
	function int64rrot(e, t, n) {
		(e.l = (t.l >>> n) | (t.h << (32 - n))),
			(e.h = (t.h >>> n) | (t.l << (32 - n)));
	}
	function int64revrrot(e, t, n) {
		(e.l = (t.h >>> n) | (t.l << (32 - n))),
			(e.h = (t.l >>> n) | (t.h << (32 - n)));
	}
	function int64shr(e, t, n) {
		(e.l = (t.l >>> n) | (t.h << (32 - n))), (e.h = t.h >>> n);
	}
	function int64add(e, t, n) {
		var i = (65535 & t.l) + (65535 & n.l),
			r = (t.l >>> 16) + (n.l >>> 16) + (i >>> 16),
			a = (65535 & t.h) + (65535 & n.h) + (r >>> 16),
			o = (t.h >>> 16) + (n.h >>> 16) + (a >>> 16);
		(e.l = (65535 & i) | (r << 16)), (e.h = (65535 & a) | (o << 16));
	}
	function int64add4(e, t, n, i, r) {
		var a = (65535 & t.l) + (65535 & n.l) + (65535 & i.l) + (65535 & r.l),
			o =
				(t.l >>> 16) + (n.l >>> 16) + (i.l >>> 16) + (r.l >>> 16) + (a >>> 16),
			s =
				(65535 & t.h) +
				(65535 & n.h) +
				(65535 & i.h) +
				(65535 & r.h) +
				(o >>> 16),
			l =
				(t.h >>> 16) + (n.h >>> 16) + (i.h >>> 16) + (r.h >>> 16) + (s >>> 16);
		(e.l = (65535 & a) | (o << 16)), (e.h = (65535 & s) | (l << 16));
	}
	function int64add5(e, t, n, i, r, a) {
		var o =
			(65535 & t.l) +
			(65535 & n.l) +
			(65535 & i.l) +
			(65535 & r.l) +
			(65535 & a.l),
			s =
				(t.l >>> 16) +
				(n.l >>> 16) +
				(i.l >>> 16) +
				(r.l >>> 16) +
				(a.l >>> 16) +
				(o >>> 16),
			l =
				(65535 & t.h) +
				(65535 & n.h) +
				(65535 & i.h) +
				(65535 & r.h) +
				(65535 & a.h) +
				(s >>> 16),
			c =
				(t.h >>> 16) +
				(n.h >>> 16) +
				(i.h >>> 16) +
				(r.h >>> 16) +
				(a.h >>> 16) +
				(l >>> 16);
		(e.l = (65535 & o) | (s << 16)), (e.h = (65535 & l) | (c << 16));
	}
	return rstr2hex(rstr_sha512(str2rstr_utf8(e)));
};