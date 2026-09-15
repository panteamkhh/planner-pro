/* ===== پلنر تخصصی — منطق برنامه (آفلاین، لوکال‌هاست) ===== */
(function () {
  'use strict';

  var J = window.Jalali;
  var STORE_KEY = 'yasiplann.planner.v1';

  var MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  var WEEKDAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  var FA = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  var THEMES = [
    { id: 'coffee', name: 'کافه', colors: ['#7c4b39', '#f3ece1', '#c9a27e', '#4a3a30'] },
    { id: 'matcha', name: 'ماچا', colors: ['#5c7a4e', '#eef2e6', '#9db88a', '#3c4a37'] },
    { id: 'rose', name: 'رز', colors: ['#a8545f', '#f7ecec', '#d8a3aa', '#4d3636'] },
    { id: 'ocean', name: 'اقیانوس', colors: ['#3f6f96', '#e9eff4', '#8fb2ce', '#33434f'] },
    { id: 'violet', name: 'بنفش', colors: ['#6f4f9e', '#f0ebf5', '#b39ddb', '#41364f'] },
    { id: 'sand', name: 'شنی', colors: ['#9a7b3f', '#f5efe3', '#d8c39a', '#4f4231'] },
    { id: 'mint', name: 'نعنا', colors: ['#3f8a78', '#e8f3f0', '#8fc9bb', '#30443f'] },
    { id: 'night', name: 'شبانه', colors: ['#c79a6b', '#1e1b19', '#4a4038', '#ece3d8'] },
    { id: 'coral', name: 'مرجانی', colors: ['#d9663f', '#fbeee8', '#f6d6c8', '#4a2f28'] },
    { id: 'forest', name: 'جنگلی', colors: ['#3f6b4f', '#e9f0ea', '#cfe0d3', '#2c3b31'] },
    { id: 'bubblegum', name: 'آدامسی', colors: ['#c65b9c', '#fbeaf3', '#f4d0e4', '#46293a'] },
    { id: 'lemon', name: 'لیمویی', colors: ['#b8912f', '#f8f2dd', '#efe2b4', '#453a20'] },
    { id: 'steel', name: 'فولادی', colors: ['#556070', '#eaedf1', '#d2d8e0', '#2e343d'] },
    { id: 'sepia', name: 'سپیا', colors: ['#7a5b3a', '#f0e7d8', '#e0d0b4', '#40342a'] }
  ];

  var STYLES = [
    { id: 'classic', name: 'کلاسیک' },
    { id: 'minimal', name: 'مینیمال' },
    { id: 'glass', name: 'شیشه‌ای' },
    { id: 'compact', name: 'فشرده' },
    { id: 'outline', name: 'خطی' }
  ];

  var COLORS = [
    { id: 'blue', v: 'var(--c-blue)' }, { id: 'teal', v: 'var(--c-teal)' },
    { id: 'amber', v: 'var(--c-amber)' }, { id: 'purple', v: 'var(--c-purple)' },
    { id: 'green', v: 'var(--c-green)' }, { id: 'red', v: 'var(--c-red)' }
  ];

  var MOODS = ['😞', '😕', '😐', '🙂', '😄'];
  var MOOD_LABELS = ['خیلی بد', 'بد', 'معمولی', 'خوب', 'عالی'];

  var ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    week: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16M3 9h18"/>',
    cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',
    loop: '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 12a8 8 0 0 1-13.7 5.6L4 16"/><path d="M20 4v4h-4M4 20v-4h4"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z"/><path d="M8 3v18"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
    route: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.5"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14h2"/>',
    table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 10v10M15 10v10"/>',
    note: '<path d="M5 3h9l5 5v13H5z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    chart: '<path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="3" height="5"/><rect x="12" y="8" width="3" height="9"/><rect x="17" y="5" width="3" height="12"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h10M18 18h2"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    check: '<path d="M5 12l4 4 10-10"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    up: '<path d="M6 15l6-6 6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>',
    edit: '<path d="M4 20h4L20 8l-4-4L4 16z"/><path d="M14 6l4 4"/>',
    star: '<path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 5.9L12 16.8 6.7 19.4l1.1-5.9L3.4 9.3l6-.8z"/>',
    bell: '<path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    moon: '<path d="M20 14a8 8 0 1 1-9-11 6.5 6.5 0 0 0 9 11z"/>',
    fire: '<path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-5 2 1 4 1 4-4z"/>',
    download: '<path d="M12 3v12M7 11l5 5 5-5M4 21h16"/>',
    upload: '<path d="M12 21V9M7 13l5-5 5 5M4 3h16"/>',
    droplet: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    body: '<circle cx="12" cy="6.5" r="3.2"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>',
    play: '<path d="M7 4l12 8-12 8z"/>',
    reset: '<path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4"/>'
  };

  function icon(name, cls) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="' + (cls || '') + '">' + (ICONS[name] || '') + '</svg>';
  }

  var NAV = [
    { id: 'dashboard', name: 'داشبورد', icon: 'grid' },
    { id: 'today', name: 'امروز', icon: 'sun' },
    { id: 'week', name: 'هفته', icon: 'week' },
    { id: 'month', name: 'ماه', icon: 'cal' },
    { id: 'goals', name: 'اهداف', icon: 'target' },
    { id: 'habits', name: 'عادت‌ها', icon: 'loop' },
    { id: 'library', name: 'کتابخانه', icon: 'book' },
    { id: 'history', name: 'تاریخچه', icon: 'clock' },
    { id: 'path', name: 'مسیر', icon: 'route' },
    { id: 'money', name: 'مالی', icon: 'wallet' },
    { id: 'schedule', name: 'برنامه هفتگی', icon: 'table' },
    { id: 'notes', name: 'یادداشت', icon: 'note' },
    { id: 'stats', name: 'آمار', icon: 'chart' },
    { id: 'settings', name: 'تنظیمات', icon: 'sliders' }
  ];

  /* ================= ابزارها ================= */
  function pad2(n) { return String(n).padStart(2, '0'); }
  function faNum(n) { return String(n).replace(/[0-9]/g, function (d) { return FA[+d]; }); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function jkey(jy, jm, jd) { return jy + '/' + pad2(jm) + '/' + pad2(jd); }
  function parseKey(k) { var p = String(k).split('/'); return { jy: +p[0], jm: +p[1], jd: +p[2] }; }
  function jDate(jy, jm, jd) { var g = J.toGregorian(jy, jm, jd); return new Date(g.gy, g.gm - 1, g.gd, 12, 0, 0); }
  function keyFromDate(d) { var j = J.toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate()); return jkey(j.jy, j.jm, j.jd); }
  function fromKey(k) { var o = parseKey(k); return jDate(o.jy, o.jm, o.jd); }
  function todayKey() { return keyFromDate(new Date()); }
  function weekdayIdx(k) { return (fromKey(k).getDay() + 1) % 7; }
  function addDays(k, n) { var d = fromKey(k); d.setDate(d.getDate() + n); return keyFromDate(d); }
  function weekStart(k) { return addDays(k, -weekdayIdx(k)); }
  function monthKey(k) { var o = parseKey(k); return o.jy + '/' + pad2(o.jm); }
  function fmtKey(k) { if (!k) { return ''; } return faNum(k); }
  function longDate(k) { var o = parseKey(k); return WEEKDAYS[weekdayIdx(k)] + ' ' + faNum(o.jd) + ' ' + MONTHS[o.jm - 1] + ' ' + faNum(o.jy); }
  function daysBetween(a, b) { return Math.round((fromKey(b) - fromKey(a)) / 86400000); }

  /* ================= وضعیت ================= */
  var state = null;

  function defaultState() {
    return {
      version: 1, name: '', theme: 'coffee', style: 'classic', mode: 'light',
      navOrder: [], navHidden: [],
      categories: [
        { id: 'work', name: 'کار و شغل', color: 'var(--c-blue)', subs: [{ id: 'w-meet', name: 'جلسه‌ها' }, { id: 'w-proj', name: 'پروژه‌ها' }, { id: 'w-mail', name: 'ایمیل و پیگیری' }] },
        { id: 'study', name: 'یادگیری', color: 'var(--c-teal)', subs: [{ id: 's-lang', name: 'زبان' }, { id: 's-skill', name: 'مهارت تازه' }] },
        { id: 'daily', name: 'روزانه', color: 'var(--c-amber)', subs: [{ id: 'd-read', name: 'مطالعه شبانه' }, { id: 'd-sport', name: 'ورزش' }] },
        { id: 'personal', name: 'شخصی', color: 'var(--c-purple)', subs: [{ id: 'p-family', name: 'خانواده' }, { id: 'p-fun', name: 'تفریح' }] },
        { id: 'health', name: 'سلامتی', color: 'var(--c-green)', subs: [{ id: 'h-diet', name: 'رژیم' }, { id: 'h-water', name: 'آب' }] }
      ],
      goals: [], tasks: [], reminders: [], notes: [], books: [],
      habits: [
        { id: uid(), title: 'مطالعه شبانه', categoryId: 'daily', history: {} },
        { id: uid(), title: 'ورزش', categoryId: 'daily', history: {} },
        { id: uid(), title: 'نوشیدن آب', categoryId: 'health', history: {} }
      ],
      days: {}, weeks: {}, months: {}, xpLog: {},
      money: { accounts: [{ id: uid(), name: 'حساب اصلی', balance: 0 }], transactions: [], budgets: [], debts: [] },
      schedule: { rows: [{ id: uid(), time: '08:00', cells: ['', '', '', '', '', '', ''] }, { id: uid(), time: '10:00', cells: ['', '', '', '', '', '', ''] }, { id: uid(), time: '18:00', cells: ['', '', '', '', '', '', ''] }] },
      settings: { streakCategory: 'work' }
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      state = raw ? Object.assign(defaultState(), JSON.parse(raw)) : defaultState();
    } catch (e) { state = defaultState(); }
    if (!state.settings) { state.settings = { streakCategory: 'work' }; }
    if (!state.style) { state.style = 'classic'; }
    if (!state.mode) { state.mode = 'light'; }
    if (!state.navOrder) { state.navOrder = []; }
    if (!state.navHidden) { state.navHidden = []; }
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore quota */ }
  }

  /* ================= UI state ================= */
  var ui = { view: 'dashboard', cursor: todayKey(), month: null, moneyTab: 'summary', libFilter: 'all' };

  function setView(v) {
    ui.view = v;
    if (v === 'month' || v === 'stats') {
      var o = parseKey(ui.cursor);
      ui.month = { jy: o.jy, jm: o.jm };
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
  }

  /* ================= دسته ================= */
  function cat(id) { return state.categories.find(function (c) { return c.id === id; }) || { id: '', name: 'بدون دسته', color: 'var(--muted)', subs: [] }; }
  function subName(cid, sid) { var c = cat(cid); var s = (c.subs || []).find(function (x) { return x.id === sid; }); return s ? s.name : ''; }
  function prioLabel(p) { return p === 'high' ? 'زیاد' : p === 'low' ? 'کم' : 'متوسط'; }

  /* ================= تسک‌ها ================= */
  function tasksForDate(k) {
    var wk = weekStart(k), wd = weekdayIdx(k);
    return state.tasks.filter(function (t) {
      if (t.repeat === 'routine') { return (t.days || []).indexOf(wd) >= 0; }
      return t.weekKey === wk && (t.day === wd || t.day === -1);
    });
  }

  function isDone(t, k) { return !!(t.done && t.done[k]); }

  function toggleTask(id, k) {
    var t = state.tasks.find(function (x) { return x.id === id; });
    if (!t) { return; }
    t.done = t.done || {};
    if (t.done[k]) { delete t.done[k]; } else { t.done[k] = true; }
    save(); render();
  }

  function doneDates(categoryId) {
    var set = {};
    state.tasks.forEach(function (t) {
      if (categoryId && t.categoryId !== categoryId) { return; }
      Object.keys(t.done || {}).forEach(function (k) { if (t.done[k]) { set[k] = 1; } });
    });
    return set;
  }

  function streakOfDateSet(set) {
    var cur = todayKey(), n = 0;
    if (!set[cur]) {
      var y = addDays(cur, -1);
      if (!set[y]) { return 0; }
      cur = y;
    }
    while (set[cur]) { n++; cur = addDays(cur, -1); }
    return n;
  }

  function totalXP() {
    var xp = 0;
    state.tasks.forEach(function (t) {
      var c = Object.keys(t.done || {}).filter(function (k) { return t.done[k]; }).length;
      xp += c * (t.xp || 0);
    });
    return xp;
  }

  function totalHours() {
    var mins = 0;
    state.tasks.forEach(function (t) {
      var c = Object.keys(t.done || {}).filter(function (k) { return t.done[k]; }).length;
      mins += c * (t.duration || 0);
    });
    return Math.round(mins / 60 * 10) / 10;
  }

  function hoursForDate(k) {
    var mins = 0;
    tasksForDate(k).forEach(function (t) { if (isDone(t, k)) { mins += (t.duration || 0); } });
    return mins;
  }

  function activeDays() {
    var set = {};
    state.tasks.forEach(function (t) { Object.keys(t.done || {}).forEach(function (k) { if (t.done[k]) { set[k] = 1; } }); });
    return Object.keys(set).length;
  }

  function avgSleep() {
    var vals = Object.keys(state.days).map(function (k) { return state.days[k].sleep; }).filter(function (v) { return typeof v === 'number' && v > 0; });
    if (!vals.length) { return 0; }
    return Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length * 10) / 10;
  }

  /* ================= رندر اصلی ================= */
  function render() {
    applyTheme();
    renderNav();
    var v = document.getElementById('view');
    var html = '';
    switch (ui.view) {
      case 'today': html = viewToday(); break;
      case 'week': html = viewWeek(); break;
      case 'month': html = viewMonth(); break;
      case 'goals': html = viewGoals(); break;
      case 'habits': html = viewHabits(); break;
      case 'library': html = viewLibrary(); break;
      case 'history': html = viewHistory(); break;
      case 'path': html = viewPath(); break;
      case 'money': html = viewMoney(); break;
      case 'schedule': html = viewSchedule(); break;
      case 'notes': html = viewNotes(); break;
      case 'stats': html = viewStats(); break;
      case 'settings': html = viewSettings(); break;
      default: html = viewDashboard();
    }
    v.innerHTML = html;
    document.getElementById('footerNote').textContent = state.name ? ('پلنر ' + state.name + ' — ذخیره‌سازی آفلاین روی همین دستگاه') : 'داده‌ها به‌صورت آفلاین در همین مرورگر ذخیره می‌شوند';
  }

  function applyTheme() {
    document.body.setAttribute('data-theme', state.theme || 'coffee');
    document.body.setAttribute('data-style', state.style || 'classic');
    document.body.setAttribute('data-mode', state.mode || 'light');
    var mb = document.getElementById('modeToggle');
    if (mb) { mb.innerHTML = icon((state.mode || 'light') === 'dark' ? 'sun' : 'moon'); }
  }

  function navList() {
    var order = (state.navOrder && state.navOrder.length) ? state.navOrder.slice() : NAV.map(function (n) { return n.id; });
    NAV.forEach(function (n) { if (order.indexOf(n.id) < 0) { order.push(n.id); } });
    var hidden = state.navHidden || [];
    return order.map(function (id) { return NAV.filter(function (n) { return n.id === id; })[0]; })
      .filter(function (n) { return n && hidden.indexOf(n.id) < 0; });
  }

  function navOrderUI() {
    var order = (state.navOrder && state.navOrder.length) ? state.navOrder.slice() : NAV.map(function (n) { return n.id; });
    NAV.forEach(function (n) { if (order.indexOf(n.id) < 0) { order.push(n.id); } });
    var hidden = state.navHidden || [];
    return order.map(function (id, idx) {
      var n = NAV.filter(function (x) { return x.id === id; })[0];
      if (!n) { return ''; }
      var isHidden = hidden.indexOf(id) >= 0;
      return '<div class="list-row" style="margin-bottom:6px">' +
        '<span class="grow" style="font-weight:700">' + n.name + '</span>' +
        '<button class="icon-btn" data-act="nav-up" data-id="' + id + '"' + (idx === 0 ? ' disabled style="opacity:.3"' : '') + '>' + icon('up') + '</button>' +
        '<button class="icon-btn" data-act="nav-down" data-id="' + id + '"' + (idx === order.length - 1 ? ' disabled style="opacity:.3"' : '') + '>' + icon('down') + '</button>' +
        '<button class="btn ghost tiny" data-act="nav-toggle" data-id="' + id + '">' + (isHidden ? 'نمایش' : 'مخفی') + '</button>' +
        '</div>';
    }).join('');
  }

  function renderNav() {
    document.getElementById('nav').innerHTML = navList().map(function (n) {
      return '<button class="nav-item ' + (ui.view === n.id ? 'active' : '') + '" data-act="nav" data-view="' + n.id + '">' + icon(n.icon) + '<span>' + n.name + '</span></button>';
    }).join('');
  }

  function head(title, sub, actions) {
    return '<div class="panel-head"><h2>' + title + '</h2>' + (sub ? '<span class="sub">' + sub + '</span>' : '') + '<span class="spacer"></span>' + (actions || '') + '</div>';
  }

  function taskHTML(t, k, opts) {
    opts = opts || {};
    var c = cat(t.categoryId);
    var dn = isDone(t, k);
    var meta = [];
    if (t.duration) { meta.push(faNum(t.duration) + ' دقیقه'); }
    if (t.xp) { meta.push(faNum(t.xp) + ' XP'); }
    if (subName(t.categoryId, t.subId)) { meta.push(esc(subName(t.categoryId, t.subId))); }
    return '<div class="task ' + (dn ? 'done' : '') + '" style="border-right-color:' + c.color + '">' +
      '<button class="checkbox ' + (dn ? 'on' : '') + '" data-act="toggle-task" data-id="' + t.id + '" data-key="' + k + '">' + icon('check') + '</button>' +
      '<div class="t-body"><div class="t-title">' + esc(t.title) + '</div>' +
      '<div class="t-meta"><span class="chip" style="background:' + c.color + '22;color:' + c.color + '">' + esc(c.name) + '</span>' +
      (meta.length ? '<span>' + meta.join(' • ') + '</span>' : '') +
      '<span class="badge ' + (t.priority || 'medium') + '">' + prioLabel(t.priority) + '</span></div></div>' +
      '<div style="display:flex;gap:4px">' +
      '<button class="icon-btn" data-act="edit-task" data-id="' + t.id + '">' + icon('edit') + '</button>' +
      (opts.movable ? '<button class="icon-btn" data-act="move-task" data-id="' + t.id + '" title="انتقال به هفته بعد">' + icon('right') + '</button>' : '') +
      '<button class="icon-btn" data-act="del-task" data-id="' + t.id + '">' + icon('trash') + '</button>' +
      '</div></div>';
  }

  function moodHTML(k) {
    var d = state.days[k] || {};
    return '<div class="mood-row">' + MOODS.map(function (m, i) {
      var v = i + 1;
      return '<button type="button" class="mood-btn' + (d.mood === v ? ' active' : '') + '" data-act="set-mood" data-key="' + k + '" data-mood="' + v + '" title="' + MOOD_LABELS[i] + '">' + m + '</button>';
    }).join('') + '</div>';
  }

  function moodOptions(sel) {
    var out = '<option value="0"' + (!sel ? ' selected' : '') + '>—</option>';
    MOODS.forEach(function (m, i) { out += '<option value="' + (i + 1) + '"' + (sel === i + 1 ? ' selected' : '') + '>' + m + ' ' + MOOD_LABELS[i] + '</option>'; });
    return out;
  }

  function habit30Grid(h) {
    var today = todayKey();
    var start = addDays(today, -29);
    var cells = '';
    for (var i = 0; i < 30; i++) {
      var k = addDays(start, i);
      var on = !!(h.history && h.history[k]);
      var dd = parseKey(k);
      cells += '<button type="button" class="h30' + (on ? ' on' : '') + (k === today ? ' today' : '') + '" data-act="toggle-habit-inline" data-id="' + h.id + '" data-key="' + k + '" title="' + longDate(k) + '">' +
        '<span class="h30-d">' + faNum(dd.jd) + '</span></button>';
    }
    return '<div class="h30-grid">' + cells + '</div>';
  }

  function weekTaskHTML(t, k) {
    var c = cat(t.categoryId);
    var dn = isDone(t, k);
    return '<div class="wtask ' + (dn ? 'done' : '') + '">' +
      '<button class="checkbox ' + (dn ? 'on' : '') + '" data-act="toggle-task" data-id="' + t.id + '" data-key="' + k + '">' + icon('check') + '</button>' +
      '<div class="wtask-body">' +
      '<div class="wtask-title">' + esc(t.title) + '</div>' +
      '<div class="wtask-meta"><i class="wtask-dot" style="background:' + c.color + '"></i>' + esc(c.name) + (t.duration ? ' • ' + faNum(t.duration) + ' دقیقه' : '') + '</div>' +
      '</div>' +
      '<div class="wtask-actions">' +
      '<button class="icon-btn" data-act="edit-task" data-id="' + t.id + '">' + icon('edit') + '</button>' +
      '<button class="icon-btn" data-act="del-task" data-id="' + t.id + '">' + icon('trash') + '</button>' +
      '</div></div>';
  }

  /* ================= داشبورد ================= */
  function viewDashboard() {
    var tk = todayKey();
    var todays = tasksForDate(tk);
    var doneToday = todays.filter(function (x) { return isDone(x, tk); }).length;
    var ratio = todays.length ? doneToday / todays.length : 0;
    var sc = cat(state.settings.streakCategory);
    var streak = streakOfDateSet(doneDates(state.settings.streakCategory));

    var html = '';
    html += '<div class="panel"><div class="panel-head"><h2>سلام' + (state.name ? ' ' + esc(state.name) : '') + '</h2><span class="sub">' + longDate(tk) + '</span><span class="spacer"></span>' +
      '<button class="btn ghost" data-act="nav" data-view="today">' + icon('sun') + 'امروز</button></div>' +
      '<div class="grid cols-4">' +
      statCard(faNum(activeDays()), 'روزهای فعال') +
      statCard(faNum(totalHours()) + 'س', 'ساعت کل کار') +
      statCard(faNum(totalXP()), 'امتیاز XP') +
      statCard(faNum(streak) + ' روز', 'استریک ' + esc(sc.name)) +
      '</div></div>';

    html += '<div class="grid cols-2">';
    html += '<div class="panel">' + head('کارهای امروز', faNum(doneToday) + ' از ' + faNum(todays.length) + ' انجام شده',
      '<button class="btn ghost" data-act="add-task" data-key="' + tk + '">' + icon('plus') + 'کار جدید</button>') +
      '<div class="progressbar" style="margin-bottom:12px"><span style="width:' + Math.round(ratio * 100) + '%"></span></div>' +
      (todays.length ? todays.map(function (x) { return taskHTML(x, tk); }).join('') : '<div class="empty">برای امروز کاری ثبت نشده — یک کار جدید بساز.</div>') +
      '</div>';
    html += '<div class="panel">' + head('هیت‌مپ هفته', 'میزان تحقق برنامه‌ریزی') + heatmap() + '</div>';
    html += '</div>';

    html += '<div class="panel">' + head('پیشرفت اهداف', state.goals.length ? '' : 'هنوز هدفی نساخته‌ای') +
      (state.goals.length ? state.goals.slice(0, 4).map(function (g) { return goalRow(g); }).join('') :
        '<div class="empty"><button class="btn" data-act="nav" data-view="goals">' + icon('target') + 'ساخت هدف</button></div>') +
      '</div>';

    html += '<div class="panel">' + head('یادآورها', '',
      '<button class="btn ghost" data-act="add-reminder">' + icon('bell') + 'یادآور جدید</button>') +
      (state.reminders.length ? state.reminders.map(function (r) {
        return '<div class="list-row"><button class="checkbox ' + (r.done ? 'on' : '') + '" data-act="toggle-reminder" data-id="' + r.id + '">' + icon('check') + '</button>' +
          '<div class="grow ' + (r.done ? 'muted' : '') + '">' + esc(r.text) + (r.time ? ' <span class="chip">' + esc(r.time) + '</span>' : '') + '</div>' +
          '<button class="icon-btn" data-act="del-reminder" data-id="' + r.id + '">' + icon('trash') + '</button></div>';
      }).join('') : '<div class="empty">یادآوری ثبت نشده.</div>') +
      '</div>';

    html += '<div class="panel">' + head('توزیع کارها بر اساس دسته', '') + categoryBars() + '</div>';
    return html;
  }

  function statCard(v, l) { return '<div class="stat-card"><div class="v">' + v + '</div><div class="l">' + l + '</div></div>'; }

  function heatmap() {
    var tk = todayKey(), start = addDays(weekStart(tk), -7 * 7);
    var cells = '';
    for (var w = 0; w < 8; w++) {
      for (var d = 0; d < 7; d++) {
        var k = addDays(start, w * 7 + d);
        var list = tasksForDate(k);
        var done = list.filter(function (x) { return isDone(x, k); }).length;
        var r = list.length ? done / list.length : 0;
        var bg = r === 0 ? 'var(--border)' : 'var(--accent)';
        var op = r === 0 ? 1 : (0.3 + 0.7 * r);
        cells += '<div class="heat-cell" title="' + fmtKey(k) + ' — ' + Math.round(r * 100) + '%" style="background:' + bg + ';opacity:' + op + '"></div>';
      }
    }
    return '<div class="heat">' + cells + '</div>';
  }

  function categoryBars() {
    var totals = {};
    state.tasks.forEach(function (t) {
      var c = Object.keys(t.done || {}).filter(function (k) { return t.done[k]; }).length;
      if (!c) { return; }
      totals[t.categoryId] = (totals[t.categoryId] || 0) + c * (t.duration || 30);
    });
    var arr = Object.keys(totals).map(function (id) { return { id: id, v: totals[id] }; }).sort(function (a, b) { return b.v - a.v; });
    if (!arr.length) { return '<div class="empty">هنوز کاری تیک نخورده.</div>'; }
    var max = arr[0].v;
    return arr.map(function (x) {
      var c = cat(x.id);
      return '<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>' + esc(c.name) + '</span><span class="muted">' + faNum(Math.round(x.v / 60 * 10) / 10) + ' ساعت</span></div>' +
        '<div class="progressbar"><span style="width:' + Math.round(x.v / max * 100) + '%;background:' + c.color + '"></span></div></div>';
    }).join('');
  }

  function goalRow(g) {
    var p = goalProgress(g);
    return '<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:5px">' +
      '<span style="font-weight:700">' + esc(g.title) + '</span>' +
      '<span class="muted tiny">' + faNum(p) + '٪' + (g.deadline ? ' • ' + deadlineText(g.deadline) : '') + '</span></div>' +
      '<div class="progressbar"><span style="width:' + p + '%"></span></div></div>';
  }

  function goalProgress(g) {
    var acts = g.actions || [];
    if (!acts.length) { return 0; }
    var d = acts.filter(function (a) { return a.done; }).length;
    return Math.round(d / acts.length * 100);
  }

  function deadlineText(dl) {
    var diff = daysBetween(todayKey(), dl);
    if (diff > 0) { return faNum(diff) + ' روز مانده (' + fmtKey(dl) + ')'; }
    if (diff === 0) { return 'امروز (' + fmtKey(dl) + ')'; }
    return faNum(-diff) + ' روز گذشته';
  }

  /* ================= امروز ================= */
  function viewToday() {
    var k = ui.cursor, tk = todayKey();
    var d = state.days[k] || {};
    var tasks = tasksForDate(k);
    var done = tasks.filter(function (x) { return isDone(x, k); }).length;
    var mins = hoursForDate(k);

    var html = '<div class="panel"><div class="panel-head">' +
      '<button class="icon-btn" data-act="day-prev">' + icon('right') + '</button>' +
      '<h2>' + longDate(k) + (k === tk ? ' <span class="chip">امروز</span>' : '') + '</h2>' +
      '<button class="icon-btn" data-act="day-next">' + icon('left') + '</button>' +
      '<span class="spacer"></span>' +
      (k !== tk ? '<button class="btn ghost" data-act="day-today">' + icon('sun') + 'برو به امروز</button>' : '') +
      '<button class="btn" data-act="add-task" data-key="' + k + '">' + icon('plus') + 'کار جدید</button>' +
      '</div>' +
      '<div class="grid cols-3">' +
      '<div class="field"><label>ساعت خواب</label><input class="input" type="number" step="0.5" min="0" max="24" value="' + (d.sleep || '') + '" data-act="set-day" data-field="sleep" data-key="' + k + '" placeholder="مثلاً ۷.۵" /></div>' +
      '<div class="field"><label>ارزیابی روز</label><select class="input" data-act="set-day" data-field="rating" data-key="' + k + '">' +
      [0, 1, 2, 3, 4, 5].map(function (i) { return '<option value="' + i + '" ' + ((d.rating || 0) === i ? 'selected' : '') + '>' + (i ? '★'.repeat(i) : '—') + '</option>'; }).join('') +
      '</select></div>' +
      '<div class="field"><label>کار امروز (ساعت:دقیقه)</label><input class="input" value="' + faNum(Math.floor(mins / 60)) + ':' + faNum(pad2(mins % 60)) + '" readonly /></div>' +
      '</div></div>';

    html += '<div class="panel">' + head('حال و هوا (مود ترکر)', 'امروز چه حسی داشتی؟') + moodHTML(k) + '</div>';

    html += '<div class="grid cols-2">';
    html += '<div class="panel">' + head('کارهای این روز', faNum(done) + '/' + faNum(tasks.length)) +
      (tasks.length ? tasks.map(function (x) { return taskHTML(x, k, { movable: true }); }).join('') : '<div class="empty">کاری برای این روز نیست.</div>') +
      '</div>';

    html += '<div class="panel">' + head('یادآورها و کارهای امروز', '',
      '<button class="btn ghost" data-act="add-reminder">' + icon('bell') + 'افزودن</button>') +
      (state.reminders.length ? state.reminders.map(function (r) {
        return '<div class="list-row"><button class="checkbox ' + (r.done ? 'on' : '') + '" data-act="toggle-reminder" data-id="' + r.id + '">' + icon('check') + '</button>' +
          '<div class="grow ' + (r.done ? 'muted' : '') + '">' + esc(r.text) + (r.time ? ' <span class="chip">' + esc(r.time) + '</span>' : '') + '</div>' +
          '<button class="icon-btn" data-act="del-reminder" data-id="' + r.id + '">' + icon('trash') + '</button></div>';
      }).join('') : '<div class="empty">یادآوری ثبت نشده.</div>') +
      '</div>';
    html += '</div>';

    html += '<div class="panel">' + head('یادداشت روزانه و ژورنال', '') +
      '<textarea class="input" style="min-height:120px" data-act="set-day" data-field="journal" data-key="' + k + '" placeholder="امروز چه خبر بود؟">' + esc(d.journal || '') + '</textarea>' +
      '<div class="modal-foot"><button class="btn" data-act="save-day" data-key="' + k + '">' + icon('check') + 'ذخیره</button></div></div>';

    html += '<div class="panel">' + head('کارهای هفتگی این هفته', '',
      '<button class="btn ghost" data-act="nav" data-view="week">' + icon('week') + 'نمای هفته</button>') +
      '<div class="grid cols-2">' + (state.tasks.filter(function (t) { return t.weekKey === weekStart(k) && t.repeat !== 'routine'; }).slice(0, 8).map(function (t) {
        return '<div class="task" style="border-right-color:' + cat(t.categoryId).color + '"><div class="t-body"><div class="t-title">' + esc(t.title) + '</div><div class="t-meta"><span>' + esc(cat(t.categoryId).name) + '</span><span>' + (t.day === -1 ? 'آزاد (هر روز هفته)' : WEEKDAYS[t.day]) + '</span></div></div></div>';
      }).join('') || '<div class="empty">کاری در این هفته نیست.</div>') + '</div></div>';

    return html;
  }

  /* ================= هفته ================= */
  function viewWeek() {
    var ws = weekStart(ui.cursor), tk = todayKey();
    var html = '<div class="panel"><div class="panel-head">' +
      '<button class="icon-btn" data-act="week-prev">' + icon('right') + '</button>' +
      '<h2>هفته ' + fmtKey(ws) + ' تا ' + fmtKey(addDays(ws, 6)) + '</h2>' +
      '<button class="icon-btn" data-act="week-next">' + icon('left') + '</button>' +
      '<span class="spacer"></span>' +
      '<button class="btn ghost" data-act="week-today">امروز</button>' +
      '<button class="btn" data-act="add-task" data-key="' + tk + '">' + icon('plus') + 'کار جدید</button>' +
      '</div>' +
      '<div class="week-grid">' +
      WEEKDAYS.map(function (name, i) {
        var k = addDays(ws, i);
        var list = tasksForDate(k);
        var done = list.filter(function (x) { return isDone(x, k); }).length;
        return '<div class="day-col ' + (k === tk ? 'today-col' : '') + '">' +
          '<div class="dc-head"><div class="dc-name">' + name + '</div><div class="dc-date ' + (k === tk ? 'today' : '') + '">' + fmtKey(k) + '</div>' +
          ((state.days[k] || {}).mood ? '<div class="dc-mood">' + MOODS[state.days[k].mood - 1] + '</div>' : '') +
          '<div class="tiny muted">' + faNum(done) + '/' + faNum(list.length) + '</div></div>' +
          (list.map(function (x) { return weekTaskHTML(x, k); }).join('') || '<div class="tiny muted" style="text-align:center">—</div>') +
          '<button class="btn ghost tiny" style="width:100%;justify-content:center;margin-top:4px;padding:6px" data-act="add-task" data-key="' + k + '">' + icon('plus') + 'افزودن</button>' +
          '</div>';
      }).join('') +
      '</div></div>';

    html += '<div class="grid cols-2">';
    html += '<div class="panel">' + head('خلاصه این هفته بر اساس دسته', '') + weekSummary(ws) + '</div>';
    html += '<div class="panel">' + head('ژورنال پایان هفته', '') +
      '<textarea class="input" style="min-height:140px" data-f="week-journal" placeholder="این هفته چطور بود؟ چه چیزی خوب پیش رفت؟">' + esc((state.weeks[ws] || {}).journal || '') + '</textarea>' +
      '<div class="modal-foot"><button class="btn" data-act="save-week" data-week="' + ws + '">' + icon('check') + 'ذخیره ژورنال</button></div></div>';
    html += '</div>';
    html += '<div class="panel">' + head('کارهای عقب‌مانده هفته‌های قبل', '') + overdueList() + '</div>';
    return html;
  }

  function weekSummary(ws) {
    var totals = {};
    for (var i = 0; i < 7; i++) {
      var k = addDays(ws, i);
      tasksForDate(k).forEach(function (t) {
        if (!isDone(t, k)) { return; }
        totals[t.categoryId] = (totals[t.categoryId] || 0) + (t.duration || 30);
      });
    }
    var arr = Object.keys(totals);
    if (!arr.length) { return '<div class="empty">هنوز کاری تیک نخورده.</div>'; }
    var max = Math.max.apply(null, arr.map(function (x) { return totals[x]; }));
    return arr.map(function (id) {
      var c = cat(id);
      return '<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>' + esc(c.name) + '</span><span class="muted">' + faNum(Math.round(totals[id] / 60 * 10) / 10) + ' ساعت</span></div><div class="progressbar"><span style="width:' + Math.round(totals[id] / max * 100) + '%;background:' + c.color + '"></span></div></div>';
    }).join('');
  }

  function overdueList() {
    var curWeek = weekStart(todayKey());
    var list = state.tasks.filter(function (t) {
      if (t.repeat === 'routine') { return false; }
      return t.weekKey < curWeek;
    });
    if (!list.length) { return '<div class="empty">کار عقب‌مانده‌ای نیست. آفرین!</div>'; }
    return list.map(function (t) {
      return '<div class="list-row"><div class="grow"><div style="font-weight:700">' + esc(t.title) + '</div><div class="tiny muted">هفته ' + fmtKey(t.weekKey) + '</div></div>' +
        '<button class="btn ghost tiny" data-act="move-to-current" data-id="' + t.id + '">انتقال به این هفته</button>' +
        '<button class="icon-btn" data-act="del-task" data-id="' + t.id + '">' + icon('trash') + '</button></div>';
    }).join('');
  }

  /* ================= ماه ================= */
  function viewMonth() {
    if (!ui.month) { var o = parseKey(ui.cursor); ui.month = { jy: o.jy, jm: o.jm }; }
    var m = ui.month, tk = todayKey();
    var len = J.jalaaliMonthLength(m.jy, m.jm);
    var first = jkey(m.jy, m.jm, 1);
    var startWd = weekdayIdx(first);
    var cells = '';
    for (var i = 0; i < startWd; i++) { cells += '<div class="month-cell empty"></div>'; }
    for (var d = 1; d <= len; d++) {
      var k = jkey(m.jy, m.jm, d);
      var events = monthEvents(k);
      cells += '<div class="month-cell ' + (k === tk ? 'today' : '') + '" data-act="open-day" data-key="' + k + '">' +
        '<div class="mc-num ' + (k === tk ? 'today' : '') + '">' + faNum(d) + '</div>' +
        events.slice(0, 3).map(function (e) { return '<span class="mc-ev" style="background:' + e.color + '22;color:' + e.color + '">' + esc(e.label) + '</span>'; }).join('') +
        (events.length > 3 ? '<span class="tiny muted">+' + faNum(events.length - 3) + '</span>' : '') +
        '</div>';
    }
    var summary = state.months[monthKey(first)] || {};

    var html = '<div class="panel"><div class="panel-head">' +
      '<button class="icon-btn" data-act="month-prev">' + icon('right') + '</button>' +
      '<h2>' + MONTHS[m.jm - 1] + ' ' + faNum(m.jy) + '</h2>' +
      '<button class="icon-btn" data-act="month-next">' + icon('left') + '</button>' +
      '<span class="spacer"></span>' +
      '<button class="btn ghost" data-act="month-today">امروز</button>' +
      '</div>' +
      '<div class="month-grid" style="margin-bottom:8px">' + WEEKDAYS.map(function (w) { return '<div class="mc-head">' + w + '</div>'; }).join('') + '</div>' +
      '<div class="month-grid">' + cells + '</div></div>';

    html += '<div class="grid cols-3">';
    html += '<div class="panel">' + head('خلاصه ماه', '') +
      '<div class="field" style="margin-bottom:10px"><label>بهترین اتفاق ماه</label><textarea class="input" data-f="m-best" placeholder="...">' + esc(summary.best || '') + '</textarea></div>' +
      '<div class="field" style="margin-bottom:10px"><label>مهم‌ترین دستاورد</label><textarea class="input" data-f="m-ach" placeholder="...">' + esc(summary.ach || '') + '</textarea></div>' +
      '<div class="field" style="margin-bottom:10px"><label>کارهایی که ماه بعد انجام می‌دهم</label><textarea class="input" data-f="m-next" placeholder="...">' + esc(summary.next || '') + '</textarea></div>' +
      '<button class="btn" data-act="save-month" data-month="' + monthKey(first) + '">' + icon('check') + 'ذخیره خلاصه ماه</button>' +
      '</div>';
    html += '<div class="panel">' + head('توزیع ماهانه کارها', '') + monthSummary(first) + '</div>';
    html += '<div class="panel">' + head('چرخه بانوان', '') +
      '<div class="field" style="margin-bottom:10px"><label>شروع آخرین چرخه</label><input class="input" id="cycleStart" placeholder="۱۴۰۵/۰۶/۰۱" value="' + esc((state.cycle || {}).start || '') + '" /></div>' +
      '<div class="field" style="margin-bottom:10px"><label>طول دوره (روز)</label><input class="input" type="number" id="cycleLen" value="' + esc((state.cycle || {}).len || 28) + '" /></div>' +
      '<div class="field" style="margin-bottom:10px"><label>علائم</label><input class="input" id="cycleSym" value="' + esc((state.cycle || {}).symptoms || '') + '" /></div>' +
      '<button class="btn" data-act="save-cycle">ذخیره</button>' +
      ((state.cycle || {}).start ? '<div class="muted tiny" style="margin-top:10px">چرخه ' + faNum((state.cycle || {}).len || 28) + ' روزه — شروع: ' + fmtKey(state.cycle.start) + '</div>' : '') +
      '</div>';
    html += '</div>';
    return html;
  }

  function monthEvents(k) {
    var out = [];
    state.goals.forEach(function (g) { if (g.deadline === k) { out.push({ label: 'هدف: ' + g.title, color: 'var(--accent)' }); } });
    tasksForDate(k).filter(function (t) { return t.repeat !== 'routine'; }).slice(0, 3).forEach(function (t) { out.push({ label: t.title, color: cat(t.categoryId).color }); });
    state.reminders.filter(function (r) { return r.date === k; }).forEach(function (r) { out.push({ label: r.text, color: 'var(--c-amber)' }); });
    return out;
  }

  function monthSummary(first) {
    var m = parseKey(first), totals = {};
    var len = J.jalaaliMonthLength(m.jy, m.jm);
    for (var d = 1; d <= len; d++) {
      var k = jkey(m.jy, m.jm, d);
      tasksForDate(k).forEach(function (t) { if (isDone(t, k)) { totals[t.categoryId] = (totals[t.categoryId] || 0) + (t.duration || 30); } });
    }
    var arr = Object.keys(totals);
    if (!arr.length) { return '<div class="empty">در این ماه کاری تیک نخورده.</div>'; }
    return '<div class="grid cols-2">' + arr.map(function (id) {
      var c = cat(id);
      return '<div class="stat-card"><div class="v" style="font-size:18px">' + esc(c.name) + '</div><div class="l">' + faNum(Math.round(totals[id] / 60 * 10) / 10) + ' ساعت</div></div>';
    }).join('') + '</div>';
  }

  /* ================= اهداف ================= */
  function viewGoals() {
    var html = '<div class="panel">' + head('اهداف', 'اهداف کوتاه‌مدت، بلندمدت و ماهانه را تعریف کن',
      '<button class="btn" data-act="add-goal">' + icon('plus') + 'هدف جدید</button>') +
      (state.goals.length ? state.goals.map(function (g) {
        var p = goalProgress(g);
        var c = cat(g.categoryId);
        return '<div class="panel" style="margin-bottom:12px;box-shadow:none">' +
          '<div class="panel-head" style="margin-bottom:8px"><span class="swatch" style="background:' + c.color + '"></span><h2 style="font-size:15px">' + esc(g.title) + '</h2>' +
          '<span class="chip">' + (g.term === 'short' ? 'کوتاه‌مدت' : g.term === 'long' ? 'بلندمدت' : 'ماهانه') + '</span>' +
          (g.deadline ? '<span class="chip">' + deadlineText(g.deadline) + '</span>' : '') +
          '<span class="spacer"></span>' +
          '<button class="icon-btn" data-act="edit-goal" data-id="' + g.id + '">' + icon('edit') + '</button>' +
          '<button class="icon-btn" data-act="del-goal" data-id="' + g.id + '">' + icon('trash') + '</button></div>' +
          (g.desc ? '<div class="muted" style="margin-bottom:10px">' + esc(g.desc) + '</div>' : '') +
          '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px"><span>پیشرفت</span><span>' + faNum(p) + '٪</span></div>' +
          '<div class="progressbar"><span style="width:' + p + '%"></span></div>' +
          '<div style="margin-top:12px">' + (g.actions || []).map(function (a) {
            return '<div class="list-row"><button class="checkbox ' + (a.done ? 'on' : '') + '" data-act="toggle-action" data-gid="' + g.id + '" data-aid="' + a.id + '">' + icon('check') + '</button>' +
              '<div class="grow"><input class="input" style="border:none;background:transparent;padding:2px 0" value="' + esc(a.title) + '" data-act="rename-action" data-gid="' + g.id + '" data-aid="' + a.id + '" /></div>' +
              '<button class="icon-btn" data-act="del-action" data-gid="' + g.id + '" data-aid="' + a.id + '">' + icon('trash') + '</button></div>';
          }).join('') +
          '<div style="display:flex;gap:6px;margin-top:8px"><input class="input" placeholder="اقدام / زیراقدام جدید..." id="act-' + g.id + '" /><button class="btn ghost" data-act="add-action" data-gid="' + g.id + '">افزودن</button></div>' +
          '</div></div>';
      }).join('') : '<div class="empty">هنوز هدفی نساخته‌ای.</div>') +
      '</div>';
    return html;
  }

  /* ================= عادت‌ها ================= */
  function viewHabits() {
    var html = '<div class="panel">' + head('عادت‌ها', 'استریک، نرخ موفقیت و زنجیره‌ها',
      '<button class="btn" data-act="add-habit">' + icon('plus') + 'عادت جدید</button>') +
      (state.categories.map(function (c) {
        var list = state.habits.filter(function (h) { return h.categoryId === c.id; });
        if (!list.length) { return ''; }
        return '<div style="margin-bottom:16px"><div class="panel-head" style="margin-bottom:8px"><span class="swatch" style="background:' + c.color + '"></span><h2 style="font-size:14px">' + esc(c.name) + '</h2></div>' +
          list.map(function (h) { return habitHTML(h, c); }).join('') + '</div>';
      }).join('') || '<div class="empty">هنوز عادتی نساخته‌ای.</div>') +
      '<div class="panel" style="box-shadow:none;margin-top:8px"><div class="panel-head"><h2 style="font-size:14px">افزودن عادت</h2></div>' +
      '<div class="form-grid"><div class="field"><label>عنوان عادت</label><input class="input" id="habitTitle" placeholder="مثلاً ویتامین" /></div>' +
      '<div class="field"><label>دسته</label><select class="input" id="habitCat">' + state.categories.map(function (c) { return '<option value="' + c.id + '">' + esc(c.name) + '</option>'; }).join('') + '</select></div></div></div>' +
      '</div>';
    return html;
  }

  function habitHTML(h, c) {
    var tk = todayKey();
    var done = !!h.history[tk];
    var set = h.history;
    var cur = streakOfDateSet(set);
    var total = Object.keys(set).filter(function (k) { return set[k]; }).length;
    var start = earliest(h.history) || tk;
    var daysSince = Math.max(1, daysBetween(start, tk) + 1);
    var rate = Math.round(total / daysSince * 100);
    return '<div class="habit-card">' +
      '<div class="task" style="border-right-color:' + c.color + ';align-items:center">' +
      '<button class="checkbox ' + (done ? 'on' : '') + '" data-act="toggle-habit" data-id="' + h.id + '">' + icon('check') + '</button>' +
      '<div class="t-body"><div class="t-title">' + esc(h.title) + '</div>' +
      '<div class="t-meta"><span>استریک فعلی: ' + faNum(cur) + '</span><span>نرخ موفقیت: ' + faNum(rate) + '٪</span><span>کل روزها: ' + faNum(total) + '</span></div></div>' +
      '<button class="icon-btn" data-act="habit-month" data-id="' + h.id + '" title="نمای ماه">' + icon('cal') + '</button>' +
      '<button class="icon-btn" data-act="del-habit" data-id="' + h.id + '">' + icon('trash') + '</button></div>' +
      '<div class="h30-wrap"><span class="h30-label">۳۰ روز اخیر — برای تیک‌زدن روی روز بزن</span>' + habit30Grid(h) + '</div>' +
      '</div>';
  }

  function earliest(hist) {
    var keys = Object.keys(hist).filter(function (k) { return hist[k]; }).sort();
    return keys[0];
  }

  /* ================= کتابخانه ================= */
  function viewLibrary() {
    var filters = [{ id: 'all', name: 'همه' }, { id: 'book', name: 'کتاب' }, { id: 'podcast', name: 'پادکست' }, { id: 'movie', name: 'فیلم' }];
    var list = state.books.filter(function (b) { return ui.libFilter === 'all' || b.type === ui.libFilter; });
    var html = '<div class="panel">' + head('کتابخانه', 'کتاب، پادکست و فیلم',
      '<button class="btn" data-act="add-book">' + icon('plus') + 'افزودن</button>') +
      '<div class="tabs">' + filters.map(function (f) { return '<button class="tab ' + (ui.libFilter === f.id ? 'active' : '') + '" data-act="lib-filter" data-filter="' + f.id + '">' + f.name + '</button>'; }).join('') + '</div>' +
      (list.length ? '<div class="grid cols-3">' + list.map(function (b) {
        return '<div class="panel" style="box-shadow:none"><div class="panel-head" style="margin-bottom:6px"><span class="avatar">' + esc((b.title || '?').slice(0, 1)) + '</span><h2 style="font-size:14px">' + esc(b.title) + '</h2><span class="spacer"></span>' +
          '<button class="icon-btn" data-act="edit-book" data-id="' + b.id + '">' + icon('edit') + '</button><button class="icon-btn" data-act="del-book" data-id="' + b.id + '">' + icon('trash') + '</button></div>' +
          '<div class="muted tiny">' + esc(b.author || '') + ' • ' + (b.type === 'book' ? 'کتاب' : b.type === 'podcast' ? 'پادکست' : 'فیلم') + '</div>' +
          '<div style="margin:8px 0">' + '<span class="chip">' + (b.status === 'done' ? 'خوانده‌شده' : b.status === 'reading' ? 'در حال خواندن' : 'می‌خواهم') + '</span> ' +
          (b.rating ? '<span class="chip">' + '★'.repeat(b.rating) + '</span>' : '') + '</div>' +
          '<div class="muted tiny">' + esc(b.notes || '') + '</div></div>';
      }).join('') + '</div>' : '<div class="empty">موردی ثبت نشده.</div>') +
      '</div>';
    return html;
  }

  /* ================= تاریخچه ================= */
  function viewHistory() {
    var days = Object.keys(state.days).filter(function (k) { return (state.days[k].journal || '').trim() || state.days[k].mood; }).sort().reverse();
    var weeks = Object.keys(state.weeks).filter(function (k) { return (state.weeks[k].journal || '').trim(); }).sort().reverse();
    var months = Object.keys(state.months).sort().reverse();
    var html = '<div class="panel">' + head('تاریخچه و ژورنال‌ها', 'روزانه، هفتگی و ماهانه') + '</div>';
    html += '<div class="grid cols-2">';
    html += '<div class="panel">' + head('یادداشت‌های روزانه', '') +
      (days.length ? days.map(function (k) {
        return '<div class="list-row" style="align-items:flex-start"><div class="grow"><div style="font-weight:700">' + longDate(k) + (state.days[k].mood ? ' <span class="mood-mini">' + MOODS[state.days[k].mood - 1] + '</span>' : '') + '</div><div class="muted tiny">' + esc(state.days[k].journal || '') + '</div></div>' +
          '<button class="icon-btn" data-act="open-day" data-key="' + k + '">' + icon('edit') + '</button></div>';
      }).join('') : '<div class="empty">یادداشتی ثبت نشده.</div>') + '</div>';
    html += '<div class="panel">' + head('ژورنال‌های هفتگی', '') +
      (weeks.length ? weeks.map(function (k) {
        return '<div class="list-row" style="align-items:flex-start"><div class="grow"><div style="font-weight:700">هفته ' + fmtKey(k) + '</div><div class="muted tiny">' + esc(state.weeks[k].journal) + '</div></div></div>';
      }).join('') : '<div class="empty">ژورنال هفتگی ثبت نشده.</div>') + '</div>';
    html += '</div>';
    html += '<div class="panel">' + head('خلاصه‌های ماهانه', '') +
      (months.length ? months.map(function (mk) {
        var s = state.months[mk];
        return '<div class="list-row" style="align-items:flex-start"><div class="grow"><div style="font-weight:700">' + fmtKey(mk) + '</div>' +
          '<div class="muted tiny">بهترین اتفاق: ' + esc(s.best || '—') + '<br/>دستاورد: ' + esc(s.ach || '—') + '<br/>ماه بعد: ' + esc(s.next || '—') + '</div></div></div>';
      }).join('') : '<div class="empty">خلاصه ماهانه‌ای ثبت نشده.</div>') + '</div>';
    return html;
  }

  /* ================= مسیر ================= */
  function viewPath() {
    var goals = state.goals.slice().sort(function (a, b) { return (a.deadline || '9999') < (b.deadline || '9999') ? -1 : 1; });
    var html = '<div class="panel">' + head('مسیر پیشرفت', 'گاه‌شمار اهداف تا رسیدن به مقصد') +
      (goals.length ? '<div style="position:relative;padding-right:20px">' +
        '<div style="position:absolute;right:7px;top:8px;bottom:8px;width:2px;background:var(--border)"></div>' +
        goals.map(function (g) {
          var p = goalProgress(g);
          var c = cat(g.categoryId);
          return '<div style="position:relative;margin-bottom:18px"><span style="position:absolute;right:-20px;top:5px;width:16px;height:16px;border-radius:50%;background:' + c.color + ';border:3px solid var(--card)"></span>' +
            '<div style="display:flex;justify-content:space-between;gap:8px"><span style="font-weight:700">' + esc(g.title) + '</span><span class="muted tiny">' + (g.deadline ? deadlineText(g.deadline) : 'بدون ددلاین') + '</span></div>' +
            '<div class="progressbar" style="margin-top:6px"><span style="width:' + p + '%;background:' + c.color + '"></span></div>' +
            '<div class="tiny muted" style="margin-top:4px">' + faNum(p) + '٪ — ' + faNum((g.actions || []).filter(function (a) { return a.done; }).length) + ' از ' + faNum((g.actions || []).length) + ' اقدام</div></div>';
        }).join('') + '</div>' : '<div class="empty">هنوز هدفی ثبت نشده.</div>') +
      '</div>';
    html += '<div class="panel">' + head('گیمیفیکیشن XP', 'با انجام کارها امتیاز بگیر و به هدف برس') +
      '<div class="grid cols-3">' + statCard(faNum(totalXP()), 'امتیاز کل') + statCard(faNum(state.tasks.filter(function (t) { return Object.keys(t.done || {}).some(function (k) { return t.done[k]; }); }).length), 'کارهای انجام‌شده') + statCard(faNum(activeDays()), 'روز فعال') + '</div>' +
      xpByCategory() + '</div>';
    return html;
  }

  function xpByCategory() {
    var totals = {};
    state.tasks.forEach(function (t) {
      var c = Object.keys(t.done || {}).filter(function (k) { return t.done[k]; }).length;
      if (c && t.xp) { totals[t.categoryId] = (totals[t.categoryId] || 0) + c * t.xp; }
    });
    var arr = Object.keys(totals);
    if (!arr.length) { return '<div class="empty" style="margin-top:12px">برای کارها امتیاز XP تعیین کن.</div>'; }
    var max = Math.max.apply(null, arr.map(function (x) { return totals[x]; }));
    return '<div style="margin-top:12px">' + arr.map(function (id) {
      var c = cat(id);
      return '<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>' + esc(c.name) + '</span><span class="muted">' + faNum(totals[id]) + ' XP</span></div><div class="progressbar"><span style="width:' + Math.round(totals[id] / max * 100) + '%;background:' + c.color + '"></span></div></div>';
    }).join('') + '</div>';
  }

  /* ================= مالی ================= */
  function viewMoney() {
    var tabs = [{ id: 'summary', name: 'خلاصه' }, { id: 'tx', name: 'درآمد و خرج' }, { id: 'budget', name: 'بودجه‌بندی' }, { id: 'debts', name: 'قرض‌ها' }, { id: 'accounts', name: 'حساب‌ها' }];
    var html = '<div class="panel">' + head('مالی', 'درآمد، هزینه، بودجه و قرض‌ها') +
      '<div class="tabs">' + tabs.map(function (t) { return '<button class="tab ' + (ui.moneyTab === t.id ? 'active' : '') + '" data-act="money-tab" data-tab="' + t.id + '">' + t.name + '</button>'; }).join('') + '</div>';
    if (ui.moneyTab === 'summary') { html += moneySummary(); }
    else if (ui.moneyTab === 'tx') { html += moneyTx(); }
    else if (ui.moneyTab === 'budget') { html += moneyBudget(); }
    else if (ui.moneyTab === 'debts') { html += moneyDebts(); }
    else { html += moneyAccounts(); }
    html += '</div>';
    return html;
  }

  function moneyTotals() {
    var inc = 0, exp = 0, byCat = {};
    state.money.transactions.forEach(function (t) {
      var v = +t.amount || 0;
      if (t.type === 'income') { inc += v; } else { exp += v; byCat[t.category || 'سایر'] = (byCat[t.category || 'سایر'] || 0) + v; }
    });
    return { inc: inc, exp: exp, byCat: byCat };
  }

  function moneySummary() {
    var tot = moneyTotals();
    var rem = tot.inc - tot.exp;
    var debt = state.money.debts.reduce(function (a, d) { return a + ((+d.amount || 0) - (+d.paid || 0)); }, 0);
    var html = '<div class="grid cols-4">' + statCard(faNum(tot.inc), 'درآمد') + statCard(faNum(tot.exp), 'هزینه') + statCard(faNum(rem), 'باقی‌مانده') + statCard(faNum(debt), 'بدهی') + '</div>';
    html += '<div class="grid cols-2" style="margin-top:14px">';
    html += '<div><h3 style="font-size:14px;margin-bottom:8px">سهم دسته‌ها از هزینه</h3>' + donut(tot.byCat) + '</div>';
    html += '<div><h3 style="font-size:14px;margin-bottom:8px">روند ۶ ماه</h3>' + monthBars() + '</div>';
    html += '</div>';
    return html;
  }

  function donut(byCat) {
    var keys = Object.keys(byCat);
    if (!keys.length) { return '<div class="empty">هزینه‌ای ثبت نشده.</div>'; }
    var total = keys.reduce(function (a, k) { return a + byCat[k]; }, 0);
    var palette = ['var(--c-blue)', 'var(--c-teal)', 'var(--c-amber)', 'var(--c-purple)', 'var(--c-green)', 'var(--c-red)'];
    var acc = 0, stops = [], legend = '';
    keys.forEach(function (k, i) {
      var start = acc / total * 360, end = (acc + byCat[k]) / total * 360;
      acc += byCat[k];
      stops.push(palette[i % palette.length] + ' ' + start + 'deg ' + end + 'deg');
      legend += '<div style="display:flex;align-items:center;gap:6px;margin:4px 0;font-size:12px"><span class="dot" style="background:' + palette[i % palette.length] + '"></span>' + esc(k) + ' — ' + faNum(Math.round(byCat[k] / total * 100)) + '٪</div>';
    });
    return '<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><div class="donut" style="background:conic-gradient(' + stops.join(',') + ')"><div class="dl"><div style="font-weight:800">' + faNum(total) + '</div><div class="tiny muted">کل هزینه</div></div></div><div>' + legend + '</div></div>';
  }

  function monthBars() {
    var arr = [];
    for (var i = 5; i >= 0; i--) {
      var d = new Date(); d.setMonth(d.getMonth() - i);
      var j = J.toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
      var mk = j.jy + '/' + pad2(j.jm);
      var exp = 0;
      state.money.transactions.forEach(function (t) {
        if (t.type !== 'expense') { return; }
        if (String(t.date || '').slice(0, 7) === mk) { exp += +t.amount || 0; }
      });
      arr.push({ mk: mk, v: exp, name: MONTHS[j.jm - 1] });
    }
    var max = Math.max.apply(null, arr.map(function (a) { return a.v; })) || 1;
    return '<div class="bars">' + arr.map(function (a) {
      return '<div class="bar-wrap"><div class="tiny muted">' + faNum(Math.round(a.v / 1000)) + 'ه</div><div class="bar" style="height:' + Math.max(3, a.v / max * 100) + '%"></div><div class="tiny">' + a.name + '</div></div>';
    }).join('') + '</div>';
  }

  function moneyTx() {
    var html = '<div class="panel-head"><h2 style="font-size:14px">تراکنش‌ها</h2><span class="spacer"></span><button class="btn" data-act="add-tx">' + icon('plus') + 'تراکنش جدید</button></div>';
    var list = state.money.transactions.slice().sort(function (a, b) { return (b.date || '') < (a.date || '') ? -1 : 1; });
    if (!list.length) { return html + '<div class="empty">تراکنشی ثبت نشده.</div>'; }
    return html + list.map(function (t) {
      return '<div class="list-row"><span class="avatar" style="background:' + (t.type === 'income' ? 'var(--c-green)' : 'var(--c-red)') + '22;color:' + (t.type === 'income' ? 'var(--c-green)' : 'var(--c-red)') + '">' + (t.type === 'income' ? '+' : '−') + '</span>' +
        '<div class="grow"><div style="font-weight:700">' + esc(t.title || t.category || '') + '</div><div class="tiny muted">' + fmtKey(t.date) + ' • ' + esc(t.account || '') + (t.repeat ? ' • هر ماه' : '') + '</div></div>' +
        '<div style="font-weight:800;color:' + (t.type === 'income' ? 'var(--good)' : 'var(--bad)') + '">' + faNum((+t.amount || 0).toLocaleString('fa-IR')) + '</div>' +
        '<button class="icon-btn" data-act="del-tx" data-id="' + t.id + '">' + icon('trash') + '</button></div>';
    }).join('');
  }

  function moneyBudget() {
    var html = '<div class="panel-head"><h2 style="font-size:14px">بودجه‌بندی ماهانه</h2><span class="spacer"></span><button class="btn" data-act="add-budget">' + icon('plus') + 'بودجه جدید</button></div>';
    var list = state.money.budgets;
    if (!list.length) { return html + '<div class="empty">بودجه‌ای تعیین نشده.</div>'; }
    return html + list.map(function (b) {
      var spent = 0;
      state.money.transactions.forEach(function (t) { if (t.type === 'expense' && String(t.date || '').slice(0, 7) === b.month && t.category === b.category) { spent += +t.amount || 0; } });
      var pct = b.amount ? Math.round(spent / b.amount * 100) : 0;
      var over = spent > b.amount;
      return '<div class="list-row" style="flex-wrap:wrap"><div class="grow"><div style="font-weight:700">' + esc(b.category) + ' <span class="chip">' + fmtKey(b.month) + '</span></div>' +
        '<div class="tiny ' + (over ? '' : 'muted') + '" style="' + (over ? 'color:var(--bad)' : '') + '">' + faNum(spent) + ' از ' + faNum(+b.amount) + (over ? ' — بیشتر از بودجه خرج کردی!' : '') + '</div>' +
        '<div class="progressbar" style="margin-top:5px;max-width:260px"><span style="width:' + Math.min(100, pct) + '%;background:' + (over ? 'var(--bad)' : 'var(--accent)') + '"></span></div></div>' +
        '<button class="icon-btn" data-act="del-budget" data-id="' + b.id + '">' + icon('trash') + '</button></div>';
    }).join('');
  }

  function moneyDebts() {
    var html = '<div class="panel-head"><h2 style="font-size:14px">قرض‌ها</h2><span class="spacer"></span><button class="btn" data-act="add-debt">' + icon('plus') + 'قرض جدید</button></div>';
    if (!state.money.debts.length) { return html + '<div class="empty">قرضی ثبت نشده.</div>'; }
    return html + state.money.debts.map(function (d) {
      var left = (+d.amount || 0) - (+d.paid || 0);
      return '<div class="list-row" style="flex-wrap:wrap"><div class="grow"><div style="font-weight:700">' + esc(d.person) + ' <span class="chip">' + (d.kind === 'lent' ? 'قرض دادم' : 'قرض گرفتم') + '</span></div>' +
        '<div class="tiny muted">' + faNum(left) + ' باقی‌مانده از ' + faNum(+d.amount || 0) + (d.due ? ' • تا ' + fmtKey(d.due) : '') + ' • ' + esc(d.account || '') + '</div>' +
        (d.desc ? '<div class="tiny">' + esc(d.desc) + '</div>' : '') + '</div>' +
        '<button class="btn ghost tiny" data-act="pay-debt" data-id="' + d.id + '">پرداخت کامل</button>' +
        '<button class="icon-btn" data-act="del-debt" data-id="' + d.id + '">' + icon('trash') + '</button></div>';
    }).join('');
  }

  function moneyAccounts() {
    var html = '<div class="panel-head"><h2 style="font-size:14px">حساب‌ها</h2><span class="spacer"></span><button class="btn" data-act="add-account">' + icon('plus') + 'حساب جدید</button></div>';
    return html + state.money.accounts.map(function (a) {
      return '<div class="list-row"><span class="avatar">' + esc(a.name.slice(0, 1)) + '</span><div class="grow" style="font-weight:700">' + esc(a.name) + '</div>' +
        '<button class="icon-btn" data-act="del-account" data-id="' + a.id + '">' + icon('trash') + '</button></div>';
    }).join('');
  }

  /* ================= برنامه هفتگی ================= */
  function viewSchedule() {
    return '<div class="panel">' + head('برنامه هفتگی', 'برای برنامه‌های ثابت هفته (مثل کلاس‌ها)',
      '<button class="btn ghost" data-act="add-sched-row">' + icon('plus') + 'ردیف جدید</button>' +
      '<button class="btn" data-act="save-schedule">' + icon('check') + 'ذخیره</button>') +
      '<div style="overflow:auto"><table class="tbl"><thead><tr><th>ساعت</th>' + WEEKDAYS.map(function (w) { return '<th>' + w + '</th>'; }).join('') + '<th></th></tr></thead><tbody>' +
      state.schedule.rows.map(function (r) {
        return '<tr><td><input class="input" style="min-width:80px" value="' + esc(r.time) + '" data-sched="time" data-row="' + r.id + '" /></td>' +
          r.cells.map(function (c, i) { return '<td><input class="input" style="min-width:90px" value="' + esc(c) + '" data-sched="cell" data-row="' + r.id + '" data-day="' + i + '" placeholder="—" /></td>'; }).join('') +
          '<td><button class="icon-btn" data-act="del-sched-row" data-id="' + r.id + '">' + icon('trash') + '</button></td></tr>';
      }).join('') +
      '</tbody></table></div></div>';
  }

  /* ================= یادداشت ================= */
  function viewNotes() {
    var tk = todayKey();
    return '<div class="panel">' + head('مود ترکر امروز', longDate(tk)) + moodHTML(tk) + '</div>' +
      '<div class="panel">' + head('یادداشت‌ها', '',
        '<button class="btn" data-act="add-note">' + icon('plus') + 'یادداشت جدید</button>') +
        (state.notes.length ? '<div class="grid cols-3">' + state.notes.map(function (n) {
          return '<div class="panel" style="box-shadow:none"><div class="panel-head" style="margin-bottom:6px"><h2 style="font-size:14px">' + esc(n.title) + '</h2><span class="spacer"></span>' +
            '<button class="icon-btn" data-act="del-note" data-id="' + n.id + '">' + icon('trash') + '</button></div>' +
            '<div class="muted" style="white-space:pre-wrap">' + esc(n.body) + '</div>' +
            '<div class="tiny muted" style="margin-top:8px">' + (n.date ? fmtKey(n.date) : '') + '</div></div>';
        }).join('') + '</div>' : '<div class="empty">یادداشتی ثبت نشده.</div>') + '</div>';
  }

  /* ================= آمار ================= */
  function viewStats() {
    if (!ui.month) { var o = parseKey(ui.cursor); ui.month = { jy: o.jy, jm: o.jm }; }
    var m = ui.month;
    var html = '<div class="panel">' + head('آمار کلی', '') +
      '<div class="grid cols-4">' + statCard(faNum(activeDays()), 'روزهای فعال') + statCard(faNum(totalHours()) + ':۰۰', 'ساعت کل کار') + statCard(faNum(totalXP()), 'امتیاز XP') + statCard(faNum(avgSleep()) + 'س', 'میانگین خواب') + '</div></div>';

    var sc = cat(state.settings.streakCategory);
    html += '<div class="panel">' + head('ساعت‌های کار و شغل', 'بر اساس مدت‌زمان کارهای تیک‌خورده') +
      '<div class="grid cols-4">' + statCard(faNum(Math.round(totalHours() / Math.max(1, activeDays()))) + ':۰۰', 'میانگین روزانه') + statCard(faNum(streakOfDateSet(doneDates(state.settings.streakCategory))) + ' روز', 'استریک ' + esc(sc.name)) + statCard(faNum(totalHours()) + ':۰۰', 'کل') + statCard(faNum(activeDays()), 'روز کار') + '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;margin:14px 0"><button class="icon-btn" data-act="month-prev">' + icon('right') + '</button><strong>' + MONTHS[m.jm - 1] + ' ' + faNum(m.jy) + '</strong><button class="icon-btn" data-act="month-next">' + icon('left') + '</button></div>' +
      workCalendar() +
      '<h3 style="font-size:14px;margin:14px 0 8px">تفکیک ریزپروژه‌ها</h3>' + xpByCategory() +
      '</div>';

    html += '<div class="panel">' + head('نمودار خواب ۱۴ روز اخیر', '') + sleepBars() + '</div>';
    html += '<div class="panel">' + head('مود ۱۴ روز اخیر', '') + moodBars() + '</div>';
    html += '<div class="panel">' + head('استریک عادت‌ها', '') + habitStreaks() + '</div>';
    return html;
  }

  function workCalendar() {
    var m = ui.month;
    var len = J.jalaaliMonthLength(m.jy, m.jm);
    var first = jkey(m.jy, m.jm, 1), startWd = weekdayIdx(first);
    var max = 1;
    for (var d = 1; d <= len; d++) { var vv = hoursForDate(jkey(m.jy, m.jm, d)); if (vv > max) { max = vv; } }
    var cells = '';
    for (var i = 0; i < startWd; i++) { cells += '<div class="month-cell empty"></div>'; }
    for (var d2 = 1; d2 <= len; d2++) {
      var k = jkey(m.jy, m.jm, d2), v = hoursForDate(k);
      var r = v / max;
      var bg = v === 0 ? 'transparent' : 'rgba(124,75,57,' + (0.15 + 0.85 * r).toFixed(2) + ')';
      var color = r > 0.5 ? '#fff' : 'var(--text)';
      cells += '<div class="month-cell" style="background:' + bg + ';color:' + color + '" data-act="open-day" data-key="' + k + '"><div class="mc-num">' + faNum(d2) + '</div>' +
        (v ? '<div class="tiny">' + faNum(Math.floor(v / 60)) + ':' + faNum(pad2(v % 60)) + '</div>' : '') + '</div>';
    }
    return '<div class="month-grid" style="margin-bottom:6px">' + WEEKDAYS.map(function (w) { return '<div class="mc-head">' + w + '</div>'; }).join('') + '</div><div class="month-grid">' + cells + '</div>';
  }

  function sleepBars() {
    var arr = [];
    for (var i = 13; i >= 0; i--) {
      var k = addDays(todayKey(), -i);
      arr.push({ k: k, v: (state.days[k] || {}).sleep || 0 });
    }
    var max = Math.max(8, Math.max.apply(null, arr.map(function (a) { return a.v; })));
    return '<div class="bars">' + arr.map(function (a) {
      return '<div class="bar-wrap" title="' + fmtKey(a.k) + '"><div class="tiny muted">' + (a.v ? faNum(a.v) : '') + '</div><div class="bar" style="height:' + Math.max(3, a.v / max * 100) + '%"></div><div class="tiny">' + faNum(parseKey(a.k).jd) + '</div></div>';
    }).join('') + '</div>';
  }

  function moodBars() {
    var arr = [];
    for (var i = 13; i >= 0; i--) { var k = addDays(todayKey(), -i); arr.push({ k: k, m: (state.days[k] || {}).mood || 0 }); }
    return '<div class="mood-strip">' + arr.map(function (a) {
      return '<div class="mood-strip-item" title="' + longDate(a.k) + '"><div class="tiny muted">' + faNum(parseKey(a.k).jd) + '</div><div class="mood-strip-emoji">' + (a.m ? MOODS[a.m - 1] : '·') + '</div></div>';
    }).join('') + '</div>';
  }

  function habitStreaks() {
    if (!state.habits.length) { return '<div class="empty">عادتی ثبت نشده.</div>'; }
    return state.habits.map(function (h) {
      var total = Object.keys(h.history).filter(function (k) { return h.history[k]; }).length;
      return '<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>' + esc(h.title) + '</span><span class="muted">استریک ' + faNum(streakOfDateSet(h.history)) + ' • کل ' + faNum(total) + '</span></div>' +
        '<div class="progressbar"><span style="width:' + Math.min(100, total * 4) + '%"></span></div></div>';
    }).join('');
  }

  /* ================= تنظیمات ================= */
  function viewSettings() {
    var html = '<div class="panel">' + head('تنظیمات', 'شخصی‌سازی پلنر') +
      '<div class="form-grid"><div class="field"><label>نام شما</label><input class="input" id="profileName" value="' + esc(state.name) + '" placeholder="مثلاً یاسمن" /></div>' +
      '<div class="field"><label>استریک نمایش‌داده‌شده در داشبورد</label><select class="input" data-act="set-streak">' +
      state.categories.map(function (c) { return '<option value="' + c.id + '" ' + (state.settings.streakCategory === c.id ? 'selected' : '') + '>' + esc(c.name) + '</option>'; }).join('') +
      '</select></div></div>' +
      '<div class="modal-foot"><button class="btn" data-act="save-profile">' + icon('check') + 'ذخیره</button></div></div>';

    html += '<div class="panel">' + head('تم پلنر', 'رنگ و حال‌وهوای پلنر را انتخاب کن') +
      '<div class="theme-grid">' + THEMES.map(function (t) {
        return '<div class="theme-card ' + (state.theme === t.id ? 'active' : '') + '" data-act="set-theme" data-theme="' + t.id + '">' +
          '<div class="sw">' + t.colors.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</div>' +
          '<div class="nm"><span>' + t.name + '</span>' + (state.theme === t.id ? icon('check') : '') + '</div></div>';
      }).join('') + '</div></div>';

    html += '<div class="panel">' + head('استایل پلنر', 'حالت نمایش کارت‌ها و فشردگی') +
      '<div class="style-grid">' + STYLES.map(function (st) {
        return '<div class="style-card ' + (state.style === st.id ? 'active' : '') + '" data-act="set-style" data-style="' + st.id + '">' +
          '<span>' + st.name + '</span>' + (state.style === st.id ? icon('check') : '') + '</div>';
      }).join('') + '</div></div>';

    html += '<div class="panel">' + head('حالت نمایش', 'روشن یا تاریک') +
      '<div class="style-grid">' +
      [['light', 'روشن', 'sun'], ['dark', 'تاریک', 'moon']].map(function (mo) {
        return '<div class="style-card ' + ((state.mode || 'light') === mo[0] ? 'active' : '') + '" data-act="set-mode" data-mode="' + mo[0] + '">' + icon(mo[2]) + '<span>' + mo[1] + '</span>' + ((state.mode || 'light') === mo[0] ? icon('check') : '') + '</div>';
      }).join('') + '</div></div>';

    html += '<div class="panel">' + head('فهرست پلنر', 'ترتیب بخش‌ها را جابه‌جا کن یا هرکدام را مخفی کن') + navOrderUI() + '</div>';

    html += '<div class="panel">' + head('دسته‌بندی‌ها و زیردسته‌ها', 'پایه ساختار پلنر') +
      state.categories.map(function (c) {
        return '<div style="border:1px solid var(--border);border-radius:12px;padding:10px;margin-bottom:10px">' +
          '<div style="display:flex;align-items:center;gap:8px"><span class="swatch" style="background:' + c.color + '"></span>' +
          '<input class="input" style="max-width:220px" value="' + esc(c.name) + '" data-act="rename-cat" data-id="' + c.id + '" />' +
          '<span class="spacer"></span><button class="icon-btn" data-act="del-cat" data-id="' + c.id + '">' + icon('trash') + '</button></div>' +
          '<div class="field" style="margin-top:8px"><label>هدف / یادداشت این دسته (دلخواه)</label><textarea class="input" style="min-height:52px" data-act="cat-goal" data-id="' + c.id + '" placeholder="هر موردی که مدنظرت هست اینجا بنویس...">' + esc(c.goal || '') + '</textarea></div>' +
          '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">' +
          (c.subs || []).map(function (s) { return '<span class="chip">' + esc(s.name) + ' <button data-act="del-sub" data-cid="' + c.id + '" data-sid="' + s.id + '" style="color:inherit">×</button></span>'; }).join('') +
          '</div>' +
          '<div style="display:flex;gap:6px;margin-top:8px"><input class="input" style="max-width:220px" placeholder="زیردسته جدید..." id="sub-' + c.id + '" /><button class="btn ghost" data-act="add-sub" data-cid="' + c.id + '">افزودن زیردسته</button></div>' +
          '</div>';
      }).join('') +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-top:10px"><div class="field"><label>دسته جدید</label><input class="input" id="newCatName" placeholder="مثلاً کنکور" /></div>' +
      '<div class="field"><label>رنگ</label><select class="input" id="newCatColor">' + COLORS.map(function (c) { return '<option value="' + c.v + '">' + c.id + '</option>'; }).join('') + '</select></div>' +
      '<button class="btn" data-act="add-cat">' + icon('plus') + 'افزودن دسته</button></div></div>';

    html += '<div class="panel">' + head('داده‌ها', 'خروجی، ورودی و بازنشانی') +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
      '<button class="btn ghost" data-act="export-data">' + icon('download') + 'خروجی JSON</button>' +
      '<button class="btn ghost" data-act="import-data">' + icon('upload') + 'ورود از فایل</button>' +
      '<button class="btn ghost" data-act="load-demo">' + icon('play') + 'بارگذاری داده نمونه</button>' +
      '<button class="btn danger" data-act="reset-data">' + icon('reset') + 'بازنشانی کامل</button>' +
      '</div><input type="file" id="importFile" accept="application/json" style="display:none" /></div>';

    return html;
  }

  /* ================= مودال‌ها ================= */
  function openModal(title, body) {
    document.getElementById('modal').innerHTML =
      '<div class="modal-head"><h3>' + title + '</h3><span class="spacer"></span><button class="icon-btn" data-act="close-modal">' + icon('x') + '</button></div>' + body;
    document.getElementById('overlay').classList.add('open');
  }
  function closeModal() { document.getElementById('overlay').classList.remove('open'); }

  function catOptions(sel) {
    return state.categories.map(function (c) { return '<option value="' + c.id + '" ' + (sel === c.id ? 'selected' : '') + '>' + esc(c.name) + '</option>'; }).join('');
  }
  function subOptions(cid, sel) {
    var c = cat(cid);
    return (c.subs || []).map(function (s) { return '<option value="' + s.id + '" ' + (sel === s.id ? 'selected' : '') + '>' + esc(s.name) + '</option>'; }).join('');
  }
  function dateFields(prefix, value) {
    var v = value ? parseKey(value) : parseKey(todayKey());
    var dOpts = '', mOpts = '', yOpts = '';
    for (var d = 1; d <= 31; d++) { dOpts += '<option ' + (d === v.jd ? 'selected' : '') + '>' + d + '</option>'; }
    for (var m = 1; m <= 12; m++) { mOpts += '<option value="' + m + '" ' + (m === v.jm ? 'selected' : '') + '>' + MONTHS[m - 1] + '</option>'; }
    var curYear = parseKey(todayKey()).jy;
    for (var y = curYear - 1; y <= curYear + 6; y++) { yOpts += '<option ' + (y === v.jy ? 'selected' : '') + '>' + y + '</option>'; }
    return '<div class="form-grid" style="grid-template-columns:1fr 1.4fr 1fr">' +
      '<div class="field"><label>روز</label><select class="input" data-f="' + prefix + '-d">' + dOpts + '</select></div>' +
      '<div class="field"><label>ماه</label><select class="input" data-f="' + prefix + '-m">' + mOpts + '</select></div>' +
      '<div class="field"><label>سال</label><select class="input" data-f="' + prefix + '-y">' + yOpts + '</select></div></div>';
  }
  function readDate(scope, prefix) {
    return jkey(+scope.querySelector('[data-f="' + prefix + '-y"]').value, +scope.querySelector('[data-f="' + prefix + '-m"]').value, +scope.querySelector('[data-f="' + prefix + '-d"]').value);
  }
  function val(scope, name, def) { var el = scope.querySelector('[data-f="' + name + '"]'); return el ? el.value : (def || ''); }

  function taskModal(task, opts) {
    opts = opts || {};
    var t = task || { repeat: 'once', priority: 'medium', duration: 30, xp: 0, days: [] };
    var key = opts.key || ui.cursor;
    var ws = weekStart(key), wd = weekdayIdx(key);
    var dayVal = (t.day === undefined || t.day === null) ? wd : t.day;
    var isRoutine = t.repeat === 'routine';
    var body = '<div class="form-grid">' +
      '<div class="field full"><label>عنوان کار</label><input class="input" data-f="title" value="' + esc(t.title || '') + '" placeholder="مثلاً کلاس زبان" /></div>' +
      '<div class="field full"><label>توضیحات</label><textarea class="input" data-f="desc" placeholder="...">' + esc(t.desc || '') + '</textarea></div>' +
      '<div class="field"><label>دسته‌بندی</label><select class="input" data-f="cat" data-act="task-cat">' + catOptions(t.categoryId) + '</select></div>' +
      '<div class="field"><label>زیردسته</label><select class="input" data-f="sub">' + subOptions(t.categoryId, t.subId) + '</select></div>' +
      '<div class="field"><label>اولویت</label><select class="input" data-f="priority">' +
      ['low', 'medium', 'high'].map(function (p) { return '<option value="' + p + '" ' + (t.priority === p ? 'selected' : '') + '>' + prioLabel(p) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>مدت (دقیقه)</label><input class="input" type="number" min="0" data-f="duration" value="' + (t.duration || 0) + '" /></div>' +
      '<div class="field"><label>امتیاز XP</label><input class="input" type="number" min="0" data-f="xp" value="' + (t.xp || 0) + '" /></div>' +
      '<div class="field"><label>تکرار</label><select class="input" data-f="repeat" data-act="task-repeat">' +
      '<option value="once" ' + (!isRoutine ? 'selected' : '') + '>فقط این هفته</option>' +
      '<option value="routine" ' + (isRoutine ? 'selected' : '') + '>روتین دائمی</option>' +
      '</select></div>' +
      '<div class="field full" id="onceBox" style="' + (isRoutine ? 'display:none' : '') + '"><label>روز انجام</label><select class="input" data-f="day">' +
      '<option value="-1" ' + (dayVal === -1 ? 'selected' : '') + '>آزاد (هر روز این هفته)</option>' +
      WEEKDAYS.map(function (w, i) { return '<option value="' + i + '" ' + (dayVal === i ? 'selected' : '') + '>' + w + '</option>'; }).join('') + '</select></div>' +
      '<div class="field full" id="routineBox" style="' + (!isRoutine ? 'display:none' : '') + '"><label>روزهای هفته</label><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">' +
      WEEKDAYS.map(function (w, i) { var on = (t.days || []).indexOf(i) >= 0; return '<label style="display:flex;align-items:center;gap:5px;font-size:12px"><input type="checkbox" data-f="day-' + i + '" ' + (on ? 'checked' : '') + '/>' + w + '</label>'; }).join('') + '</div></div>' +
      '</div>' +
      '<div class="modal-foot"><button class="btn" data-act="save-task" data-id="' + (task ? task.id : '') + '" data-week="' + ws + '">' + icon('check') + 'ذخیره</button>' +
      '<button class="btn ghost" data-act="close-modal">انصراف</button></div>';
    openModal(task ? 'ویرایش کار' : 'کار جدید', body);
  }

  function goalModal(goal) {
    var g = goal || { term: 'short' };
    var body = '<div class="form-grid">' +
      '<div class="field full"><label>عنوان هدف</label><input class="input" data-f="g-title" value="' + esc(g.title || '') + '" placeholder="مثلاً قبولی در آزمون زبان" /></div>' +
      '<div class="field full"><label>توضیحات</label><textarea class="input" data-f="g-desc">' + esc(g.desc || '') + '</textarea></div>' +
      '<div class="field"><label>مدت</label><select class="input" data-f="g-term">' +
      [['short', 'کوتاه‌مدت'], ['long', 'بلندمدت'], ['month', 'ماهانه']].map(function (x) { return '<option value="' + x[0] + '" ' + (g.term === x[0] ? 'selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>دسته‌بندی</label><select class="input" data-f="g-cat">' + catOptions(g.categoryId) + '</select></div>' +
      '</div><label style="font-size:12px;color:var(--muted);font-weight:700">ددلاین</label>' + dateFields('g-dl', g.deadline) +
      '<div class="modal-foot"><button class="btn" data-act="save-goal" data-id="' + (goal ? goal.id : '') + '">' + icon('check') + 'ذخیره</button></div>';
    openModal(goal ? 'ویرایش هدف' : 'هدف جدید', body);
  }

  function bookModal(book) {
    var b = book || { type: 'book', status: 'want', rating: 0 };
    var body = '<div class="form-grid">' +
      '<div class="field full"><label>عنوان</label><input class="input" data-f="b-title" value="' + esc(b.title || '') + '" /></div>' +
      '<div class="field"><label>نویسنده / سازنده</label><input class="input" data-f="b-author" value="' + esc(b.author || '') + '" /></div>' +
      '<div class="field"><label>نوع</label><select class="input" data-f="b-type">' +
      [['book', 'کتاب'], ['podcast', 'پادکست'], ['movie', 'فیلم']].map(function (x) { return '<option value="' + x[0] + '" ' + (b.type === x[0] ? 'selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>وضعیت</label><select class="input" data-f="b-status">' +
      [['want', 'می‌خواهم'], ['reading', 'در حال خواندن'], ['done', 'تمام‌شده']].map(function (x) { return '<option value="' + x[0] + '" ' + (b.status === x[0] ? 'selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>امتیاز (۰ تا ۵)</label><input class="input" type="number" min="0" max="5" data-f="b-rating" value="' + (b.rating || 0) + '" /></div>' +
      '<div class="field full"><label>یادداشت</label><textarea class="input" data-f="b-notes">' + esc(b.notes || '') + '</textarea></div>' +
      '</div><div class="modal-foot"><button class="btn" data-act="save-book" data-id="' + (book ? book.id : '') + '">' + icon('check') + 'ذخیره</button></div>';
    openModal(book ? 'ویرایش' : 'افزودن به کتابخانه', body);
  }

  function reminderModal() {
    var body = '<div class="form-grid">' +
      '<div class="field full"><label>متن یادآور</label><input class="input" data-f="r-text" placeholder="مثلاً گرفتن لباس از خشکشویی" /></div>' +
      '<div class="field"><label>ساعت</label><input class="input" data-f="r-time" placeholder="مثلاً ۱۸:۰۰" /></div>' +
      '<div class="field"><label>تاریخ</label><input class="input" value="' + fmtKey(todayKey()) + '" readonly /></div>' +
      '</div><div class="modal-foot"><button class="btn" data-act="save-reminder">' + icon('check') + 'ذخیره</button></div>';
    openModal('یادآور جدید', body);
  }

  function noteModal() {
    var body = '<div class="form-grid"><div class="field full"><label>عنوان</label><input class="input" data-f="n-title" /></div>' +
      '<div class="field full"><label>متن</label><textarea class="input" data-f="n-body" style="min-height:140px"></textarea></div></div>' +
      '<div class="modal-foot"><button class="btn" data-act="save-note">' + icon('check') + 'ذخیره</button></div>';
    openModal('یادداشت جدید', body);
  }

  function txModal() {
    var body = '<div class="form-grid">' +
      '<div class="field"><label>نوع</label><select class="input" data-f="t-type"><option value="expense">هزینه</option><option value="income">درآمد</option></select></div>' +
      '<div class="field"><label>عنوان</label><input class="input" data-f="t-title" placeholder="مثلاً حقوق" /></div>' +
      '<div class="field"><label>مبلغ</label><input class="input" type="number" data-f="t-amount" /></div>' +
      '<div class="field"><label>دسته</label><input class="input" data-f="t-cat" placeholder="مثلاً خوراکی" /></div>' +
      '<div class="field"><label>حساب</label><select class="input" data-f="t-account">' + state.money.accounts.map(function (a) { return '<option value="' + esc(a.name) + '">' + esc(a.name) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>تکرار ماهانه</label><select class="input" data-f="t-repeat"><option value="">خیر</option><option value="1">بله</option></select></div>' +
      '<div class="field full"><label>توضیحات</label><input class="input" data-f="t-desc" /></div>' +
      '</div><label style="font-size:12px;color:var(--muted);font-weight:700">تاریخ</label>' + dateFields('t-date', todayKey()) +
      '<div class="modal-foot"><button class="btn" data-act="save-tx">' + icon('check') + 'ذخیره</button></div>';
    openModal('تراکنش جدید', body);
  }

  function budgetModal() {
    var body = '<div class="form-grid"><div class="field"><label>دسته</label><input class="input" data-f="bg-cat" placeholder="مثلاً خوراکی" /></div>' +
      '<div class="field"><label>مبلغ بودجه</label><input class="input" type="number" data-f="bg-amount" /></div></div>' +
      '<label style="font-size:12px;color:var(--muted);font-weight:700">ماه</label>' +
      '<div class="form-grid" style="grid-template-columns:1.4fr 1fr"><div class="field"><label>ماه</label><select class="input" data-f="bg-m">' + MONTHS.map(function (mm, i) { return '<option value="' + pad2(i + 1) + '" ' + (i + 1 === parseKey(todayKey()).jm ? 'selected' : '') + '>' + mm + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>سال</label><input class="input" type="number" data-f="bg-y" value="' + parseKey(todayKey()).jy + '" /></div></div>' +
      '<div class="modal-foot"><button class="btn" data-act="save-budget">' + icon('check') + 'ذخیره</button></div>';
    openModal('بودجه جدید', body);
  }

  function debtModal() {
    var body = '<div class="form-grid"><div class="field"><label>طرف حساب</label><input class="input" data-f="d-person" placeholder="مثلاً رضا" /></div>' +
      '<div class="field"><label>نوع</label><select class="input" data-f="d-kind"><option value="borrowed">قرض گرفتم</option><option value="lent">قرض دادم</option></select></div>' +
      '<div class="field"><label>مبلغ</label><input class="input" type="number" data-f="d-amount" /></div>' +
      '<div class="field"><label>پرداخت‌شده</label><input class="input" type="number" data-f="d-paid" value="0" /></div>' +
      '<div class="field"><label>حساب</label><select class="input" data-f="d-account">' + state.money.accounts.map(function (a) { return '<option value="' + esc(a.name) + '">' + esc(a.name) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field full"><label>توضیحات</label><input class="input" data-f="d-desc" /></div></div>' +
      '<label style="font-size:12px;color:var(--muted);font-weight:700">سررسید</label>' + dateFields('d-due', todayKey()) +
      '<div class="modal-foot"><button class="btn" data-act="save-debt">' + icon('check') + 'ذخیره</button></div>';
    openModal('قرض جدید', body);
  }

  function accountModal() {
    var body = '<div class="form-grid"><div class="field full"><label>نام حساب</label><input class="input" data-f="a-name" /></div></div>' +
      '<div class="modal-foot"><button class="btn" data-act="save-account">' + icon('check') + 'ذخیره</button></div>';
    openModal('حساب جدید', body);
  }

  function habitMonthModal(id) {
    var h = state.habits.find(function (x) { return x.id === id; });
    if (!h) { return; }
    var t = parseKey(todayKey());
    var len = J.jalaaliMonthLength(t.jy, t.jm);
    var startWd = weekdayIdx(jkey(t.jy, t.jm, 1));
    var cells = '';
    for (var i = 0; i < startWd; i++) { cells += '<div class="wk-cell" style="visibility:hidden"></div>'; }
    for (var d = 1; d <= len; d++) {
      var k = jkey(t.jy, t.jm, d), on = !!h.history[k];
      cells += '<button class="wk-cell" data-act="toggle-habit-day" data-id="' + id + '" data-key="' + k + '" style="' + (on ? 'background:var(--accent);color:var(--on-accent);border-color:transparent' : '') + '">' + faNum(d) + '</button>';
    }
    var total = Object.keys(h.history).filter(function (k) { return h.history[k]; }).length;
    var body = '<div class="grid cols-3" style="margin-bottom:12px">' + statCard(faNum(streakOfDateSet(h.history)), 'استریک فعلی') + statCard(faNum(total), 'کل روزها') + statCard(faNum(Math.min(100, total * 3)) + '٪', 'نرخ موفقیت') + '</div>' +
      '<div style="text-align:center;font-weight:700;margin-bottom:8px">' + MONTHS[t.jm - 1] + ' ' + faNum(t.jy) + '</div>' +
      '<div class="month-grid" style="margin-bottom:6px;grid-template-columns:repeat(7,1fr)">' + WEEKDAYS.map(function (w) { return '<div class="mc-head">' + w + '</div>'; }).join('') + '</div>' +
      '<div class="wk-grid">' + cells + '</div>' +
      '<div class="modal-foot"><button class="btn ghost" data-act="close-modal">بستن</button></div>';
    openModal('نمای ماه — ' + esc(h.title), body);
  }

  function dayModal(k) {
    var d = state.days[k] || {};
    var body = '<div class="muted tiny" style="margin-bottom:10px">' + longDate(k) + '</div>' +
      '<div class="form-grid"><div class="field"><label>ساعت خواب</label><input class="input" type="number" step="0.5" data-f="dm-sleep" value="' + (d.sleep || '') + '" /></div>' +
      '<div class="field"><label>ارزیابی</label><select class="input" data-f="dm-rating">' + [0, 1, 2, 3, 4, 5].map(function (i) { return '<option value="' + i + '" ' + ((d.rating || 0) === i ? 'selected' : '') + '>' + (i ? '★'.repeat(i) : '—') + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>حال و هوا (مود)</label><select class="input" data-f="dm-mood">' + moodOptions(d.mood) + '</select></div></div>' +
      '<div class="field" style="margin-top:10px"><label>یادداشت / رویداد این روز</label><textarea class="input" data-f="dm-journal">' + esc(d.journal || '') + '</textarea></div>' +
      '<div class="field" style="margin-top:10px"><label>رویداد سریع</label><div style="display:flex;gap:6px"><input class="input" data-f="dm-event" placeholder="مثلاً تولد دوستم" /><button class="btn ghost" data-act="add-day-event" data-key="' + k + '">افزودن کار</button></div></div>' +
      '<div class="modal-foot"><button class="btn" data-act="save-day" data-key="' + k + '">' + icon('check') + 'ذخیره</button>' +
      '<button class="btn ghost" data-act="add-task" data-key="' + k + '">' + icon('plus') + 'کار جدید</button></div>';
    openModal('روز ' + fmtKey(k), body);
  }

  /* ================= رویدادها ================= */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) { return; }
    var act = el.getAttribute('data-act');
    var id = el.getAttribute('data-id');
    var key = el.getAttribute('data-key');
    var scope = document.getElementById('modal');

    switch (act) {
      case 'nav': setView(el.getAttribute('data-view')); break;
      case 'close-modal': closeModal(); break;

      case 'day-prev': ui.cursor = addDays(ui.cursor, -1); render(); break;
      case 'day-next': ui.cursor = addDays(ui.cursor, 1); render(); break;
      case 'day-today': ui.cursor = todayKey(); render(); break;
      case 'week-prev': ui.cursor = addDays(ui.cursor, -7); render(); break;
      case 'week-next': ui.cursor = addDays(ui.cursor, 7); render(); break;
      case 'week-today': ui.cursor = todayKey(); render(); break;
      case 'month-prev': shiftMonth(-1); break;
      case 'month-next': shiftMonth(1); break;
      case 'month-today': ui.cursor = todayKey(); ui.month = null; setView('month'); break;
      case 'open-day': dayModal(key); break;

      case 'add-task': taskModal(null, { key: key }); break;
      case 'edit-task': taskModal(state.tasks.find(function (x) { return x.id === id; }), {}); break;
      case 'toggle-task': toggleTask(id, key); break;
      case 'del-task': if (confirm('این کار حذف شود؟')) { state.tasks = state.tasks.filter(function (x) { return x.id !== id; }); save(); render(); } break;
      case 'move-task':
        var tt = state.tasks.find(function (x) { return x.id === id; });
        if (tt) { tt.weekKey = addDays(tt.weekKey, 7); save(); render(); }
        break;
      case 'move-to-current':
        var t2 = state.tasks.find(function (x) { return x.id === id; });
        if (t2) { t2.weekKey = weekStart(todayKey()); save(); render(); }
        break;
      case 'save-task': saveTask(scope, id, el.getAttribute('data-week')); break;

      case 'add-goal': goalModal(null); break;
      case 'edit-goal': goalModal(state.goals.find(function (x) { return x.id === id; })); break;
      case 'save-goal': saveGoal(scope, id); break;
      case 'del-goal': if (confirm('این هدف حذف شود؟')) { state.goals = state.goals.filter(function (x) { return x.id !== id; }); save(); render(); } break;
      case 'toggle-action': toggleAction(el.getAttribute('data-gid'), el.getAttribute('data-aid')); break;
      case 'del-action':
        var g = state.goals.find(function (x) { return x.id === el.getAttribute('data-gid'); });
        if (g) { g.actions = (g.actions || []).filter(function (a) { return a.id !== el.getAttribute('data-aid'); }); save(); render(); }
        break;
      case 'add-action': addAction(el.getAttribute('data-gid')); break;

      case 'add-habit': addHabit(); break;
      case 'toggle-habit': toggleHabit(id); break;
      case 'del-habit': state.habits = state.habits.filter(function (x) { return x.id !== id; }); save(); render(); break;
      case 'habit-month': habitMonthModal(id); break;
      case 'toggle-habit-day': toggleHabit(id, key, true); break;
      case 'toggle-habit-inline': toggleHabit(id, key, false); break;
      case 'set-mood': {
        var mk = el.getAttribute('data-key');
        var mv = +el.getAttribute('data-mood');
        var md = state.days[mk] || {};
        md.mood = (md.mood === mv) ? 0 : mv;
        state.days[mk] = md; save(); render();
        break;
      }

      case 'lib-filter': ui.libFilter = el.getAttribute('data-filter'); render(); break;
      case 'add-book': bookModal(null); break;
      case 'edit-book': bookModal(state.books.find(function (x) { return x.id === id; })); break;
      case 'save-book': saveBook(scope, id); break;
      case 'del-book': state.books = state.books.filter(function (x) { return x.id !== id; }); save(); render(); break;

      case 'add-reminder': reminderModal(); break;
      case 'save-reminder': saveReminder(scope); break;
      case 'toggle-reminder':
        var r = state.reminders.find(function (x) { return x.id === id; });
        if (r) { r.done = !r.done; save(); render(); }
        break;
      case 'del-reminder': state.reminders = state.reminders.filter(function (x) { return x.id !== id; }); save(); render(); break;

      case 'add-note': noteModal(); break;
      case 'save-note': saveNote(scope); break;
      case 'del-note': state.notes = state.notes.filter(function (x) { return x.id !== id; }); save(); render(); break;

      case 'money-tab': ui.moneyTab = el.getAttribute('data-tab'); render(); break;
      case 'add-tx': txModal(); break;
      case 'save-tx': saveTx(scope); break;
      case 'del-tx': state.money.transactions = state.money.transactions.filter(function (x) { return x.id !== id; }); save(); render(); break;
      case 'add-budget': budgetModal(); break;
      case 'save-budget': saveBudget(scope); break;
      case 'del-budget': state.money.budgets = state.money.budgets.filter(function (x) { return x.id !== id; }); save(); render(); break;
      case 'add-debt': debtModal(); break;
      case 'save-debt': saveDebt(scope); break;
      case 'pay-debt':
        var deb = state.money.debts.find(function (x) { return x.id === id; });
        if (deb) { deb.paid = +deb.amount || 0; save(); render(); }
        break;
      case 'del-debt': state.money.debts = state.money.debts.filter(function (x) { return x.id !== id; }); save(); render(); break;
      case 'add-account': accountModal(); break;
      case 'save-account': saveAccount(scope); break;
      case 'del-account': state.money.accounts = state.money.accounts.filter(function (x) { return x.id !== id; }); save(); render(); break;

      case 'save-schedule': saveSchedule(); break;
      case 'add-sched-row': state.schedule.rows.push({ id: uid(), time: '12:00', cells: ['', '', '', '', '', '', ''] }); save(); render(); break;
      case 'del-sched-row': state.schedule.rows = state.schedule.rows.filter(function (x) { return x.id !== id; }); save(); render(); break;

      case 'save-week':
        var w = state.weeks[el.getAttribute('data-week')] || {};
        w.journal = document.querySelector('[data-f="week-journal"]').value;
        state.weeks[el.getAttribute('data-week')] = w; save(); render();
        break;
      case 'save-month':
        var mk = el.getAttribute('data-month');
        var ms = state.months[mk] || {};
        ms.best = document.querySelector('[data-f="m-best"]').value;
        ms.ach = document.querySelector('[data-f="m-ach"]').value;
        ms.next = document.querySelector('[data-f="m-next"]').value;
        state.months[mk] = ms; save(); render();
        break;
      case 'save-cycle':
        state.cycle = { start: document.getElementById('cycleStart').value.trim(), len: +document.getElementById('cycleLen').value || 28, symptoms: document.getElementById('cycleSym').value };
        save(); render();
        break;
      case 'save-day':
        var dk = el.getAttribute('data-key');
        var dd = state.days[dk] || {};
        if (scope && scope.querySelector('[data-f="dm-sleep"]')) {
          dd.sleep = parseFloat(scope.querySelector('[data-f="dm-sleep"]').value) || 0;
          dd.rating = +scope.querySelector('[data-f="dm-rating"]').value || 0;
          dd.journal = scope.querySelector('[data-f="dm-journal"]').value;
          var mmEl = scope.querySelector('[data-f="dm-mood"]');
          if (mmEl) { dd.mood = +mmEl.value || 0; }
        } else {
          var st = document.querySelector('[data-act="set-day"][data-field="sleep"]');
          if (st) { dd.sleep = parseFloat(st.value) || 0; }
          var rt = document.querySelector('[data-act="set-day"][data-field="rating"]');
          if (rt) { dd.rating = +rt.value || 0; }
          var jr = document.querySelector('[data-act="set-day"][data-field="journal"]');
          if (jr) { dd.journal = jr.value; }
        }
        state.days[dk] = dd; save(); closeModal(); render();
        break;
      case 'add-day-event':
        var evk = el.getAttribute('data-key');
        var evt = scope.querySelector('[data-f="dm-event"]').value.trim();
        if (evt) {
          state.tasks.push({ id: uid(), title: evt, desc: '', categoryId: state.categories[0].id, subId: '', priority: 'medium', repeat: 'once', days: [], weekKey: weekStart(evk), day: weekdayIdx(evk), duration: 0, xp: 0, done: {} });
          save(); closeModal(); render();
        }
        break;

      case 'set-theme': state.theme = el.getAttribute('data-theme'); save(); applyTheme(); render(); break;
      case 'set-style': state.style = el.getAttribute('data-style'); save(); applyTheme(); render(); break;
      case 'set-mode': state.mode = el.getAttribute('data-mode'); save(); applyTheme(); render(); break;
      case 'nav-up': {
        var nidUp = el.getAttribute('data-id');
        var ordUp = (state.navOrder && state.navOrder.length) ? state.navOrder.slice() : NAV.map(function (n) { return n.id; });
        NAV.forEach(function (n) { if (ordUp.indexOf(n.id) < 0) { ordUp.push(n.id); } });
        var iUp = ordUp.indexOf(nidUp);
        if (iUp > 0) { var tmp = ordUp[iUp - 1]; ordUp[iUp - 1] = ordUp[iUp]; ordUp[iUp] = tmp; state.navOrder = ordUp; save(); renderNav(); render(); }
        break;
      }
      case 'nav-down': {
        var nidDn = el.getAttribute('data-id');
        var ordDn = (state.navOrder && state.navOrder.length) ? state.navOrder.slice() : NAV.map(function (n) { return n.id; });
        NAV.forEach(function (n) { if (ordDn.indexOf(n.id) < 0) { ordDn.push(n.id); } });
        var iDn = ordDn.indexOf(nidDn);
        if (iDn >= 0 && iDn < ordDn.length - 1) { var tmpD = ordDn[iDn + 1]; ordDn[iDn + 1] = ordDn[iDn]; ordDn[iDn] = tmpD; state.navOrder = ordDn; save(); renderNav(); render(); }
        break;
      }
      case 'nav-toggle': {
        var nidT = el.getAttribute('data-id');
        state.navHidden = state.navHidden || [];
        var hi = state.navHidden.indexOf(nidT);
        if (hi >= 0) { state.navHidden.splice(hi, 1); } else { state.navHidden.push(nidT); }
        save(); renderNav(); render();
        break;
      }
      case 'save-profile': state.name = document.getElementById('profileName').value.trim(); save(); render(); break;
      case 'add-cat':
        var cname = document.getElementById('newCatName').value.trim();
        if (cname) {
          state.categories.push({ id: uid(), name: cname, color: document.getElementById('newCatColor').value, subs: [] });
          save(); render();
        }
        break;
      case 'del-cat': if (confirm('این دسته حذف شود؟')) { state.categories = state.categories.filter(function (x) { return x.id !== id; }); save(); render(); } break;
      case 'del-sub':
        var pc = state.categories.find(function (x) { return x.id === el.getAttribute('data-cid'); });
        if (pc) { pc.subs = (pc.subs || []).filter(function (s) { return s.id !== el.getAttribute('data-sid'); }); save(); render(); }
        break;
      case 'add-sub':
        var cid = el.getAttribute('data-cid');
        var pcc = state.categories.find(function (x) { return x.id === cid; });
        var inp = document.getElementById('sub-' + cid);
        if (pcc && inp.value.trim()) { pcc.subs = pcc.subs || []; pcc.subs.push({ id: uid(), name: inp.value.trim() }); save(); render(); }
        break;
      case 'export-data': exportData(); break;
      case 'import-data': document.getElementById('importFile').click(); break;
      case 'load-demo': if (confirm('داده نمونه جایگزین شود؟')) { state = demoState(); save(); render(); } break;
      case 'reset-data': if (confirm('همه داده‌ها پاک شود؟')) { localStorage.removeItem(STORE_KEY); state = defaultState(); save(); render(); } break;

      default: break;
    }
  });

  document.addEventListener('change', function (e) {
    if (e.target && e.target.id === 'importFile') {
      var f = e.target.files[0];
      if (!f) { return; }
      var reader = new FileReader();
      reader.onload = function () {
        try {
          state = Object.assign(defaultState(), JSON.parse(reader.result));
          save(); render();
        } catch (err) { alert('فایل نامعتبر است.'); }
      };
      reader.readAsText(f);
      return;
    }
    var el = e.target.closest('[data-act]');
    if (el) {
      var act = el.getAttribute('data-act');
      if (act === 'set-day') {
        var k = el.getAttribute('data-key');
        var dd = state.days[k] || {};
        if (el.getAttribute('data-field') === 'sleep') { dd.sleep = parseFloat(el.value) || 0; }
        if (el.getAttribute('data-field') === 'rating') { dd.rating = +el.value || 0; }
        if (el.getAttribute('data-field') === 'journal') { dd.journal = el.value; }
        state.days[k] = dd; save();
        return;
      }
      if (act === 'set-streak') { state.settings.streakCategory = el.value; save(); render(); return; }
      if (act === 'rename-cat') { var c = state.categories.find(function (x) { return x.id === el.getAttribute('data-id'); }); if (c) { c.name = el.value; save(); } return; }
      if (act === 'cat-goal') { var cg = state.categories.find(function (x) { return x.id === el.getAttribute('data-id'); }); if (cg) { cg.goal = el.value; save(); } return; }
      if (act === 'task-cat') {
        var sub = el.closest('.modal').querySelector('[data-f="sub"]');
        sub.innerHTML = subOptions(el.value, '');
        return;
      }
      if (act === 'task-repeat') {
        var modal = el.closest('.modal');
        modal.querySelector('#onceBox').style.display = el.value === 'routine' ? 'none' : '';
        modal.querySelector('#routineBox').style.display = el.value === 'routine' ? '' : 'none';
        return;
      }
      if (act === 'rename-action') {
        var g = state.goals.find(function (x) { return x.id === el.getAttribute('data-gid'); });
        var a = g && (g.actions || []).find(function (x) { return x.id === el.getAttribute('data-aid'); });
        if (a) { a.title = el.value; save(); }
        return;
      }
    }
    if (e.target.closest('[data-sched]')) { saveSchedule(); }
  });

  /* ================= ذخیره‌کننده‌ها ================= */
  function saveTask(scope, id, ws) {
    var title = val(scope, 'title').trim();
    if (!title) { alert('عنوان کار را وارد کن.'); return; }
    var repeat = val(scope, 'repeat');
    var days = [];
    if (repeat === 'routine') {
      for (var i = 0; i < 7; i++) { if (scope.querySelector('[data-f="day-' + i + '"]').checked) { days.push(i); } }
      if (!days.length) { alert('حداقل یک روز هفته را انتخاب کن.'); return; }
    }
    var data = {
      title: title, desc: val(scope, 'desc'), categoryId: val(scope, 'cat'), subId: val(scope, 'sub'),
      priority: val(scope, 'priority'), duration: +val(scope, 'duration') || 0, xp: +val(scope, 'xp') || 0, repeat: repeat, days: days
    };
    if (repeat === 'once') { data.weekKey = ws || weekStart(todayKey()); data.day = +val(scope, 'day'); }
    if (id) { Object.assign(state.tasks.find(function (x) { return x.id === id; }), data); }
    else { state.tasks.push(Object.assign({ id: uid(), done: {}, createdAt: todayKey() }, data)); }
    save(); closeModal(); render();
  }

  function saveGoal(scope, id) {
    var title = val(scope, 'g-title').trim();
    if (!title) { alert('عنوان هدف را وارد کن.'); return; }
    var data = { title: title, desc: val(scope, 'g-desc'), term: val(scope, 'g-term'), categoryId: val(scope, 'g-cat'), deadline: readDate(scope, 'g-dl') };
    if (id) { Object.assign(state.goals.find(function (x) { return x.id === id; }), data); }
    else { state.goals.push(Object.assign({ id: uid(), actions: [] }, data)); }
    save(); closeModal(); render();
  }

  function toggleAction(gid, aid) {
    var g = state.goals.find(function (x) { return x.id === gid; });
    var a = g && (g.actions || []).find(function (x) { return x.id === aid; });
    if (a) { a.done = !a.done; save(); render(); }
  }

  function addAction(gid) {
    var inp = document.getElementById('act-' + gid);
    if (!inp || !inp.value.trim()) { return; }
    var g = state.goals.find(function (x) { return x.id === gid; });
    if (g) { g.actions = g.actions || []; g.actions.push({ id: uid(), title: inp.value.trim(), done: false }); save(); render(); }
  }

  function addHabit() {
    var input = document.getElementById('habitTitle');
    if (!input || !input.value.trim()) { return; }
    state.habits.push({ id: uid(), title: input.value.trim(), categoryId: document.getElementById('habitCat').value, history: {} });
    save(); render();
  }

  function toggleHabit(id, k, keepModal) {
    var h = state.habits.find(function (x) { return x.id === id; });
    if (!h) { return; }
    var day = k || todayKey();
    if (h.history[day]) { delete h.history[day]; } else { h.history[day] = true; }
    save();
    if (keepModal) { habitMonthModal(id); } else { render(); }
  }

  function saveBook(scope, id) {
    var data = { title: val(scope, 'b-title'), author: val(scope, 'b-author'), type: val(scope, 'b-type'), status: val(scope, 'b-status'), rating: +val(scope, 'b-rating') || 0, notes: val(scope, 'b-notes') };
    if (id) { Object.assign(state.books.find(function (x) { return x.id === id; }), data); }
    else { state.books.push(Object.assign({ id: uid() }, data)); }
    save(); closeModal(); render();
  }

  function saveReminder(scope) {
    var text = val(scope, 'r-text').trim();
    if (!text) { return; }
    state.reminders.push({ id: uid(), text: text, time: val(scope, 'r-time'), date: todayKey(), done: false });
    save(); closeModal(); render();
  }

  function saveNote(scope) {
    var title = val(scope, 'n-title').trim() || 'بدون عنوان';
    state.notes.push({ id: uid(), title: title, body: val(scope, 'n-body'), date: todayKey() });
    save(); closeModal(); render();
  }

  function saveTx(scope) {
    state.money.transactions.push({
      id: uid(), type: val(scope, 't-type'), title: val(scope, 't-title'), amount: +val(scope, 't-amount') || 0,
      category: val(scope, 't-cat'), account: val(scope, 't-account'), repeat: !!val(scope, 't-repeat'), desc: val(scope, 't-desc'), date: readDate(scope, 't-date')
    });
    save(); closeModal(); render();
  }

  function saveBudget(scope) {
    state.money.budgets.push({ id: uid(), category: val(scope, 'bg-cat'), amount: +val(scope, 'bg-amount') || 0, month: val(scope, 'bg-y') + '/' + val(scope, 'bg-m') });
    save(); closeModal(); render();
  }

  function saveDebt(scope) {
    state.money.debts.push({ id: uid(), person: val(scope, 'd-person'), kind: val(scope, 'd-kind'), amount: +val(scope, 'd-amount') || 0, paid: +val(scope, 'd-paid') || 0, account: val(scope, 'd-account'), desc: val(scope, 'd-desc'), due: readDate(scope, 'd-due') });
    save(); closeModal(); render();
  }

  function saveAccount(scope) {
    var name = val(scope, 'a-name').trim();
    if (!name) { return; }
    state.money.accounts.push({ id: uid(), name: name, balance: 0 });
    save(); closeModal(); render();
  }

  function saveSchedule() {
    var inputs = document.querySelectorAll('[data-sched]');
    Array.prototype.forEach.call(inputs, function (inp) {
      var row = state.schedule.rows.find(function (r) { return r.id === inp.getAttribute('data-row'); });
      if (!row) { return; }
      if (inp.getAttribute('data-sched') === 'time') { row.time = inp.value; }
      else { row.cells[+inp.getAttribute('data-day')] = inp.value; }
    });
    save();
  }

  function shiftMonth(n) {
    var mm = ui.month.jm + n, yy = ui.month.jy;
    if (mm > 12) { mm = 1; yy++; }
    if (mm < 1) { mm = 12; yy--; }
    ui.month = { jy: yy, jm: mm };
    render();
  }

  function exportData() {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'planner-backup.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /* ================= جستجو ================= */
  var searchInput = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');
  document.getElementById('searchIco').innerHTML = icon('search');
  searchInput.addEventListener('input', function () {
    var q = searchInput.value.trim();
    if (!q) { searchResults.innerHTML = ''; return; }
    var res = [];
    state.tasks.forEach(function (t) { if ((t.title || '').indexOf(q) >= 0) { res.push({ label: t.title, t: 'کار', view: 'week' }); } });
    state.goals.forEach(function (g) { if ((g.title || '').indexOf(q) >= 0) { res.push({ label: g.title, t: 'هدف', view: 'goals' }); } });
    state.notes.forEach(function (n) { if ((n.title + ' ' + n.body).indexOf(q) >= 0) { res.push({ label: n.title, t: 'یادداشت', view: 'notes' }); } });
    state.books.forEach(function (b) { if ((b.title || '').indexOf(q) >= 0) { res.push({ label: b.title, t: 'کتابخانه', view: 'library' }); } });
    state.habits.forEach(function (h) { if ((h.title || '').indexOf(q) >= 0) { res.push({ label: h.title, t: 'عادت', view: 'habits' }); } });
    if (!res.length) { searchResults.innerHTML = '<div class="search-results"><div class="empty">نتیجه‌ای پیدا نشد.</div></div>'; return; }
    searchResults.innerHTML = '<div class="search-results">' + res.slice(0, 12).map(function (r) {
      return '<div class="sr-item" data-act="nav" data-view="' + r.view + '">' + icon('search') + '<span>' + esc(r.label) + '</span><small>' + r.t + '</small></div>';
    }).join('') + '</div>';
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.search-wrap')) { searchResults.innerHTML = ''; }
  });

  /* ================= داده نمونه ================= */
  function demoState() {
    var s = defaultState();
    var ws = weekStart(todayKey());
    var tk = todayKey();
    s.goals = [
      { id: uid(), title: 'قبولی در آزمون آیلتس', desc: 'رسیدن به نمره ۷ در آزمون آیلتس', term: 'long', categoryId: 'study', deadline: addDays(tk, 25), actions: [{ id: uid(), title: 'تمرین روزانه ریدینگ', done: true }, { id: uid(), title: 'مکالمه ۳۰ دقیقه‌ای', done: false }, { id: uid(), title: 'پادکست روزانه', done: false }] },
      { id: uid(), title: 'راه‌اندازی پروژه شخصی', desc: '', term: 'short', categoryId: 'work', deadline: addDays(tk, 12), actions: [{ id: uid(), title: 'طراحی صفحه اصلی', done: false }, { id: uid(), title: 'نوشتن مستندات', done: false }] }
    ];
    var mk = { work: ['جلسه تیم', 'بررسی ایمیل‌ها', 'پروژه طراحی'], study: ['کلاس زبان', 'تمرین ریدینگ'], daily: ['مطالعه شبانه', 'ورزش'], personal: ['تماس با خانواده'], health: ['نوشیدن آب'] };
    var cats = Object.keys(mk);
    for (var w = 0; w < 4; w++) {
      var base = addDays(ws, -w * 7);
      cats.forEach(function (cid, ci) {
        mk[cid].forEach(function (title, ti) {
          var day = (ci + ti + w) % 7;
          var doneObj = {};
          if ((ci + ti + w) % 3 !== 0) { doneObj[addDays(base, day)] = true; }
          s.tasks.push({ id: uid(), title: title, desc: '', categoryId: cid, subId: '', priority: ['low', 'medium', 'high'][(ci + ti) % 3], repeat: 'once', days: [], weekKey: base, day: day, duration: [30, 45, 60, 20][(ci + ti) % 4], xp: [5, 10, 15][(ci + ti) % 3], done: doneObj });
        });
      });
    }
    s.tasks.push({ id: uid(), title: 'کلاس زبان', desc: '', categoryId: 'study', subId: 's-lang', priority: 'high', repeat: 'routine', days: [0, 1, 2, 4], weekKey: ws, day: null, duration: 20, xp: 15, done: {} });
    s.tasks.push({ id: uid(), title: 'مطالعه شبانه', desc: '', categoryId: 'daily', subId: 'd-read', priority: 'medium', repeat: 'routine', days: [0, 1, 2, 3, 4, 5, 6], weekKey: ws, day: null, duration: 30, xp: 10, done: {} });
    s.habits[0].history[addDays(tk, -1)] = true;
    s.habits[0].history[tk] = true;
    s.habits[1].history[tk] = true;
    s.reminders = [{ id: uid(), text: 'گرفتن لباس از خشکشویی', time: '۱۸:۰۰', date: tk, done: false }];
    s.notes = [{ id: uid(), title: 'ایده‌ها', body: 'ایده‌های پروژه پلنر', date: tk }];
    s.books = [{ id: uid(), title: 'عادت‌های اتمی', author: 'جیمز کلیر', type: 'book', status: 'reading', rating: 5, notes: 'کتاب فوق‌العاده برای ساختن عادت' }];
    var j = parseKey(tk);
    s.money.transactions = [
      { id: uid(), type: 'income', title: 'حقوق', amount: 70000000, category: 'حقوق', account: 'حساب اصلی', repeat: true, date: jkey(j.jy, j.jm, 5) },
      { id: uid(), type: 'expense', title: 'خرید خوراکی', amount: 7000000, category: 'خوراکی', account: 'حساب اصلی', date: addDays(tk, -3) },
      { id: uid(), type: 'expense', title: 'حمل و نقل', amount: 2500000, category: 'حمل و نقل', account: 'حساب اصلی', date: addDays(tk, -8) }
    ];
    s.money.budgets = [{ id: uid(), category: 'خوراکی', amount: 5000000, month: monthKey(tk) }];
    s.money.debts = [{ id: uid(), person: 'رضا', kind: 'borrowed', amount: 5000000, paid: 2000000, account: 'حساب اصلی', desc: 'قرض ماشین', due: addDays(tk, 5) }];
    s.days[tk] = { sleep: 8, rating: 4, journal: 'امروز پرانرژی بودم.', mood: 5 };
    s.days[addDays(tk, -1)] = { sleep: 7, rating: 3, mood: 4 };
    s.days[addDays(tk, -2)] = { mood: 3 };
    s.days[addDays(tk, -3)] = { mood: 2 };
    s.days[addDays(tk, -4)] = { mood: 4 };
    s.days[addDays(tk, -5)] = { mood: 5 };
    s.weeks[ws] = { journal: '' };
    s.settings.streakCategory = 'study';
    return s;
  }

  function boot() {
    load();
    ui.cursor = todayKey();
    var o = parseKey(ui.cursor);
    ui.month = { jy: o.jy, jm: o.jm };
    var mb = document.getElementById('modeToggle');
    if (mb) {
      mb.addEventListener('click', function () {
        state.mode = (state.mode === 'dark') ? 'light' : 'dark';
        save(); render();
      });
    }
    render();
  }

  window.PlannerUI = { demo: function () { state = demoState(); save(); render(); }, state: function () { return state; } };
  boot();
})();
