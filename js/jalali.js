/* ================= Jalali (Persian) calendar utilities ================= */
(function (global) {
  var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
    1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];

  function div(a, b) { return ~~(a / b); }
  function mod(a, b) { return a - ~~(a / b) * b; }

  function jalCal(jy) {
    var bl = breaks.length, gy = jy + 621, leapJ = -14, jp = breaks[0], jm, jump, leap, leapG, march, n, i;
    if (jy < jp || jy >= breaks[bl - 1]) throw new Error('Invalid Jalaali year ' + jy);
    for (i = 1; i < bl; i += 1) {
      jm = breaks[i];
      jump = jm - jp;
      if (jy < jm) break;
      leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
      jp = jm;
    }
    n = jy - jp;
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
    leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
    march = 20 + leapJ - leapG;
    if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) leap = 4;
    return { leap: leap, gy: gy, march: march };
  }

  function g2d(gy, gm, gd) {
    var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
      div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
  }

  function d2g(jdn) {
    var j, i, gd, gm, gy;
    j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    i = div(mod(j, 1461), 4) * 5 + 308;
    gd = div(mod(i, 153), 5) + 1;
    gm = mod(div(i, 153), 12) + 1;
    gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return { gy: gy, gm: gm, gd: gd };
  }

  function j2d(jy, jm, jd) {
    var r = jalCal(jy);
    return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
  }

  function d2j(jdn) {
    var gy = d2g(jdn).gy, jy = gy - 621, r = jalCal(jy),
      jdn1f = g2d(gy, 3, r.march), jd, jm, k;
    k = jdn - jdn1f;
    if (k >= 0) {
      if (k <= 185) { jm = 1 + div(k, 31); jd = mod(k, 31) + 1; return { jy: jy, jm: jm, jd: jd }; }
      k -= 186;
    } else { jy -= 1; k += 179; if (r.leap === 1) k += 1; }
    jm = 7 + div(k, 30); jd = mod(k, 30) + 1;
    return { jy: jy, jm: jm, jd: jd };
  }

  function toJalaali(gy, gm, gd) {
    if (gy instanceof Date) { gd = gy.getDate(); gm = gy.getMonth() + 1; gy = gy.getFullYear(); }
    return d2j(g2d(gy, gm, gd));
  }
  function toGregorian(jy, jm, jd) { return d2g(j2d(jy, jm, jd)); }

  function isLeapJalaali(jy) { return jalCal(jy).leap === 0; }
  function jalaaliMonthLength(jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    return isLeapJalaali(jy) ? 30 : 29;
  }

  var MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  var WEEKDAYS = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  var WEEKDAYS_SHORT = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function jalaaliToKey(jy, jm, jd) { return jy + '/' + pad(jm) + '/' + pad(jd); }
  function dateToKey(date) { var j = toJalaali(date); return jalaaliToKey(j.jy, j.jm, j.jd); }

  function parseKey(key) {
    var p = key.split('/'); return { jy: +p[0], jm: +p[1], jd: +p[2] };
  }
  function keyToDate(key) {
    var p = parseKey(key); var g = toGregorian(p.jy, p.jm, p.jd);
    return new Date(g.gy, g.gm - 1, g.gd);
  }
  // weekday index: 0 = Saturday ... 6 = Friday
  function keyWeekday(key) {
    var d = keyToDate(key).getDay(); // 0 Sun .. 6 Sat
    return (d + 1) % 7;
  }
  function formatKey(key, withWeekday) {
    var p = parseKey(key);
    var s = p.jd + ' ' + MONTHS[p.jm - 1] + ' ' + p.jy;
    if (withWeekday) s = WEEKDAYS[keyWeekday(key)] + '، ' + s;
    return s;
  }
  function todayKey() { return dateToKey(new Date()); }

  function addDaysToKey(key, days) {
    var d = keyToDate(key); d.setDate(d.getDate() + days); return dateToKey(d);
  }
  function addMonths(jy, jm, delta) {
    var total = (jy * 12 + (jm - 1)) + delta;
    return { jy: Math.floor(total / 12), jm: (mod(total, 12)) + 1 };
  }

  // Returns the Saturday-starting week (7 keys) containing key
  function weekOf(key) {
    var wd = keyWeekday(key);
    var sat = addDaysToKey(key, -wd);
    var out = [];
    for (var i = 0; i < 7; i++) out.push(addDaysToKey(sat, i));
    return out;
  }

  // Month grid (Saturday-start). Returns array of {key, jy, jm, jd, inMonth}
  function monthGrid(jy, jm) {
    var firstKey = jalaaliToKey(jy, jm, 1);
    var startWd = keyWeekday(firstKey);
    var startKey = addDaysToKey(firstKey, -startWd);
    var cells = [];
    for (var i = 0; i < 42; i++) {
      var k = addDaysToKey(startKey, i);
      var p = parseKey(k);
      cells.push({ key: k, jy: p.jy, jm: p.jm, jd: p.jd, inMonth: p.jm === jm && p.jy === jy });
    }
    return cells;
  }

  global.Jalali = {
    toJalaali: toJalaali, toGregorian: toGregorian,
    isLeapJalaali: isLeapJalaali, jalaaliMonthLength: jalaaliMonthLength,
    MONTHS: MONTHS, WEEKDAYS: WEEKDAYS, WEEKDAYS_SHORT: WEEKDAYS_SHORT,
    toKey: jalaaliToKey, dateToKey: dateToKey, parseKey: parseKey, keyToDate: keyToDate,
    keyWeekday: keyWeekday, formatKey: formatKey, todayKey: todayKey,
    addDaysToKey: addDaysToKey, addMonths: addMonths, weekOf: weekOf, monthGrid: monthGrid,
    pad: pad
  };
})(window);
