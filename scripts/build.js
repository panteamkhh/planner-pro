// Builds the single-file bilingual planner (Persian + English, shared data, switchable).
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const css = fs.readFileSync(path.join(ROOT, 'css/styles.css'), 'utf8');
const jalali = fs.readFileSync(path.join(ROOT, 'js/jalali.js'), 'utf8');
const gregorian = fs.readFileSync(path.join(ROOT, 'js/gregorian.js'), 'utf8');
const appFa = fs.readFileSync(path.join(ROOT, 'js/app.js'), 'utf8');
const appEn = fs.readFileSync(path.join(ROOT, 'js/app.en.js'), 'utf8');

const safeStorage = 'var __safeStorage=(function(){try{var k="__pp_t";window.localStorage.setItem(k,"1");window.localStorage.removeItem(k);return window.localStorage;}catch(e){var m={};return{getItem:function(k){return Object.prototype.hasOwnProperty.call(m,k)?m[k]:null;},setItem:function(k,v){m[k]=String(v);},removeItem:function(k){delete m[k];}};}})();';

// Converts every date key in the stored state between Jalali and Gregorian calendars.
const converter = `
function __pad(n){return n<10?'0'+n:''+n;}
function __convKey(k,toG){if(!k||typeof k!=='string'){return k;}var p=k.split('/');if(p.length<3){return k;}var y=+p[0],m=+p[1],d=+p[2];if(!y||!m||!d){return k;}try{if(toG){var g=__Jalali.toGregorian(y,m,d);return g.gy+'/'+__pad(g.gm)+'/'+__pad(g.gd);}var j=__Jalali.toJalaali(y,m,d);return j.jy+'/'+__pad(j.jm)+'/'+__pad(j.jd);}catch(e){return k;}}
function __convMonth(k,toG){if(!k||typeof k!=='string'){return k;}var p=k.split('/');if(p.length<2){return k;}return __convKey(p[0]+'/'+p[1]+'/15',toG).split('/').slice(0,2).join('/');}
function __convertState(s,toG){if(!s){return s;}(s.tasks||[]).forEach(function(t){t.weekKey=__convKey(t.weekKey,toG);t.createdAt=__convKey(t.createdAt,toG);var dd={};Object.keys(t.done||{}).forEach(function(k){dd[__convKey(k,toG)]=true;});t.done=dd;});var nd={};Object.keys(s.days||{}).forEach(function(k){nd[__convKey(k,toG)]=s.days[k];});s.days=nd;var nw={};Object.keys(s.weeks||{}).forEach(function(k){nw[__convKey(k,toG)]=s.weeks[k];});s.weeks=nw;var nm={};Object.keys(s.months||{}).forEach(function(k){nm[__convMonth(k,toG)]=s.months[k];});s.months=nm;var nx={};Object.keys(s.xpLog||{}).forEach(function(k){nx[__convKey(k,toG)]=s.xpLog[k];});s.xpLog=nx;(s.habits||[]).forEach(function(h){var nh={};Object.keys(h.history||{}).forEach(function(k){nh[__convKey(k,toG)]=true;});h.history=nh;});(s.goals||[]).forEach(function(g){g.deadline=__convKey(g.deadline,toG);});(s.reminders||[]).forEach(function(r){r.date=__convKey(r.date,toG);});(s.notes||[]).forEach(function(n){n.date=__convKey(n.date,toG);});var mo=s.money||{};(mo.transactions||[]).forEach(function(t){t.date=__convKey(t.date,toG);});(mo.budgets||[]).forEach(function(b){b.month=__convMonth(b.month,toG);});(mo.debts||[]).forEach(function(d){d.due=__convKey(d.due,toG);});return s;}
function __migrate(toG){try{var raw=__safeStorage.getItem('yasiplann.planner.v1');if(raw){var st=JSON.parse(raw);__convertState(st,toG);__safeStorage.setItem('yasiplann.planner.v1',JSON.stringify(st));}}catch(e){}}
`;

const setup = [
  safeStorage,
  'var __lang=(function(){try{return (__safeStorage.getItem("planner.lang")||"fa");}catch(e){return "fa";}})();',
  'var __en=(__lang==="en");',
  'document.documentElement.lang=__lang;document.documentElement.dir=__en?"ltr":"rtl";document.body.className=__en?"lang-en":"lang-fa";',
  '(function(){if(!__en){return;}var h1=document.querySelector(".hero h1");if(h1){h1.textContent="Professional Planner";}var tg=document.querySelector(".hero .tag");if(tg){tg.textContent="Offline version — try everything";}var s=document.getElementById("searchInput");if(s){s.placeholder="Search...";}})();',
  converter,
  '(function(){var lt=document.getElementById("langToggle");if(lt){lt.textContent=__en?"FA":"EN";lt.addEventListener("click",function(){__migrate(!__en);try{__safeStorage.setItem("planner.lang",__en?"fa":"en");}catch(e){}location.reload();});}})();'
].join('\n');

const libs = jalali + '\nwindow.__Jalali=window.Jalali;\nif(__en){' + gregorian + '}';
const apps = '(function(localStorage){\nif(!__en){' + appFa + '}\nif(__en){' + appEn + '}\n})(__safeStorage);';

const out = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>پلنر تخصصی | Professional Planner — By Yasiplann</title>
<style>
${css}
</style>
</head>
<body data-theme="coffee" class="lang-fa">
<div class="app">
<header class="hero">
<div class="hero-actions">
<button class="hero-btn" id="modeToggle" title="Mode"></button>
<button class="hero-btn" id="langToggle" title="Change language">EN</button>
</div>
<div class="brand">BY YASIPLANN</div>
<h1>پلنر تخصصی</h1>
<div class="tag">نسخه آفلاین — همه‌چیز را امتحان کن</div>
<div class="search-wrap">
<input class="search" id="searchInput" placeholder="جستجو..." autocomplete="off" />
<span class="search-ico" id="searchIco"></span>
<div id="searchResults"></div>
</div>
</header>
<nav class="nav" id="nav"></nav>
<main id="view"></main>
<footer class="empty" id="footerNote"></footer>
</div>
<div class="overlay" id="overlay"><div class="modal" id="modal"></div></div>
<script>
${setup}
</script>
<script>
${libs}
</script>
<script>
${apps}
</script>
</body>
</html>`;

const target = path.join(ROOT, 'planner-bilingual.html');
fs.writeFileSync(target, out, 'utf8');
console.log('planner-bilingual.html: ' + (fs.statSync(target).size / 1024).toFixed(1) + ' KB');
