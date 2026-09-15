/* ===== Gregorian calendar adapter (same API as jalali.js) for the English version ===== */
(function (global) {
  'use strict';
  function toJalaali(gy, gm, gd) {
    if (gy instanceof Date) { gd = gy.getDate(); gm = gy.getMonth() + 1; gy = gy.getFullYear(); }
    return { jy: gy, jm: gm, jd: gd };
  }
  function toGregorian(jy, jm, jd) { return { gy: jy, gm: jm, gd: jd }; }
  function isLeapJalaali(y) { return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0); }
  function jalaaliMonthLength(y, m) { return new Date(y, m, 0).getDate(); }

  global.Jalali = {
    toJalaali: toJalaali,
    toGregorian: toGregorian,
    isLeapJalaali: isLeapJalaali,
    jalaaliMonthLength: jalaaliMonthLength
  };
})(window);
