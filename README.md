<div align="center">

<!-- ═══════════════ HEADER ═══════════════ -->

# 📔 پلنر تخصصی · Professional Planner

**یک پلنر شخصی، کاملاً آفلاین و دوزبانه — با تقویم شمسی و میلادی**
*A fully offline, bilingual personal planner with Jalali & Gregorian calendars.*

[![MIT License](https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge)](LICENSE)
[![Offline First](https://img.shields.io/badge/Offline-100%25-1f6feb?style=for-the-badge)](#-پرسشهای-پرتکرار--faq)
[![Zero Deps](https://img.shields.io/badge/Dependencies-0-brightgreen?style=for-the-badge)](package.json)
[![Made with](https://img.shields.io/badge/Made%20with-Vanilla%20JS-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](#-فناوریها--tech-stack)

![Persian](https://img.shields.io/badge/🇮🇷_فارسی-RTL-D97706?style=flat-square)
![English](https://img.shields.io/badge/🇬🇧_English-LTR-2563eb?style=flat-square)

<br/>

<img src="docs/preview.png" alt="پلنر تخصصی — نمای داشبورد" width="100%" />

<sub>👆 نمای فارسی با دادههای نمونه &nbsp;•&nbsp; <a href="docs/preview-en.png">نمای انگلیسی</a></sub>

<br/><br/>

[**🚀 شروع سریع**](#-شروع-سریع--quick-start) &nbsp;·&nbsp;
[**✨ ویژگیها**](#-ویژگیها--features) &nbsp;·&nbsp;
[**🌐 دوزبانه**](#-دوزبانه--bilingual) &nbsp;·&nbsp;
[**🖼 گالری**](#-گالری--gallery) &nbsp;·&nbsp;
[**🛠 ساخت**](#-ساخت-مجدد--build)

</div>

---

> [!NOTE]
> این پروژه **هیچ سرور، اینترنت، حساب کاربری یا وابستگیای** نیاز ندارد. یک فایل HTML را باز کن و استفاده کن؛ همهچیز در همان دستگاه و بهصورت آفلاین ذخیره میشود.
>
> *No server, no internet, no account, no dependencies. Open one HTML file and go — everything is stored offline on your own device.*

---

## ✨ ویژگیها | Features

<table>
<tr>
<td width="50%" valign="top">

**🗓 تقویم و زبان**
- تقویم کامل **شمسی (جلالی)** برای فارسی
- تقویم **میلادی** برای انگلیسی
- **تغییر زبان در یک فایل** (RTL/LTR) با دادههای مشترک

**📋 برنامهریزی**
- دستهبندی سلسلهمراتبی (دسته + زیردسته)
- اهداف با اقدامات، ددلاین و درصد پیشرفت
- کارهای روزانه/هفتگی/ماهانه + اولویت + مدت + XP
- برنامه هفتگی ثابت (کلاسها و…)

</td>
<td width="50%" valign="top">

**🔁 سلامتی و ذهن**
- عادتها با استریک + **گرید ۳۰ روزه با تاریخ**
- **مود ترکر** در ژورنال، یادداشت و آمار
- نمودار خواب و هیتماپ فعالیت

**💰 و بیشتر**
- مالی: درآمد، خرج، بودجه، قرض، نمودار ۶ ماهه
- کتابخانه (کتاب/پادکست/فیلم)
- **۱۴ تم** + **۵ استایل** + **حالت روشن/تاریک**
- فهرست شخصیسازیشده (جابهجایی و مخفیکردن)
- پشتیبانگیری JSON

</td>
</tr>
</table>

---

## 🖼 گالری | Gallery

<div align="center">

| فارسی · Persian | English |
|:---:|:---:|
| <img src="docs/preview.png" width="420" alt="Persian dashboard" /> | <img src="docs/preview-en.png" width="420" alt="English dashboard" /> |

</div>

---

## 🚀 شروع سریع | Quick Start

### ① بدون سرور (تکفایلی)
فایل **`planner-bilingual.html`** را دانلود کن و دوبار کلیک کن. تمام. ✨

### ② لوکالهاست
```bash
git clone https://github.com/panteamkhh/planner-pro.git
cd planner-pro
npm start          # → http://localhost:5173
```
> روی ویندوز کافیست `run.bat` را اجرا کنی.

<div align="center">

**دموی آنلاین:** `https://panteamkhh.github.io/planner-pro/`
*(پس از فعالکردن GitHub Pages)*

</div>

---

## 🌐 دوزبانه | Bilingual

با دکمهٔ **`EN / FA`** در گوشهٔ هدر، زبان را عوض کن:

| | 🇮🇷 فارسی | 🇬🇧 English |
|---|:---:|:---:|
| **جهت** | RTL | LTR |
| **تقویم** | شمسی (جلالی) | Gregorian |
| **شروع هفته** | شنبه | Sunday |

> هنگام تعویض زبان، **همهٔ تاریخها بهصورت خودکار بین دو تقویم تبدیل میشوند** و دادهها بین دو زبان یکسان میمانند.

---

## 🧱 ساختار پروژه | Project Structure

```text
planner-pro/
├─ index.html                 ← نسخهٔ لوکالهاستِ دوزبانه
├─ planner-bilingual.html     ← خروجی تکفایلی (آفلاین، بدون سرور)
├─ css/styles.css             ← ۱۴ تم · ۵ استایل · دارکمود · RTL/LTR
├─ js/
│  ├─ jalali.js               ← تبدیل شمسی ↔ میلادی
│  ├─ gregorian.js            ← آداپتور میلادی
│  ├─ app.js                  ← منطق فارسی (منبع اصلی)
│  └─ app.en.js               ← منطق انگلیسی (تولیدشده)
├─ scripts/
│  ├─ translate.js            ← تولید app.en.js از app.js
│  └─ build.js                ← تولید planner-bilingual.html
├─ docs/                      ← تصاویر README
└─ server.js · run.bat        ← سرور استاتیک محلی
```

---

## 🛠 ساخت مجدد | Build

```bash
npm run build      # translate.js + build.js
```

- `scripts/translate.js` نسخهٔ انگلیسی را میسازد و اگر متنی ترجمه نشده باشد **با خطا خارج میشود**.
- `scripts/build.js` فایل تکفایلی را (CSS/JS داخل فایل) تولید میکند.

> برای تغییر متنها، `js/app.js` را ویرایش کن و `npm run build` بزن.

---

## 💻 فناوریها | Tech Stack

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![localStorage](https://img.shields.io/badge/localStorage-offline-8b5cf6?style=flat-square)

</div>

بدون فریمورک، بدون بیلد برای خود اپ، بدون وابستگی. فقط HTML/CSS/JS خالص.

---

## ❓ پرسشهای پرتکرار | FAQ

<details>
<summary><b>اطلاعات کجا ذخیره میشود؟</b></summary>
<br/>
در <code>localStorage</code> مرورگرِ همان دستگاه. هیچچیز جایی ارسال نمیشود. فقط با پاککردن دادههای مرورگر یا بازنشانی پلنر حذف میشود.
</details>

<details>
<summary><b>چطور به یک نفر دیگر بدهم؟</b></summary>
<br/>
فقط فایل <code>planner-bilingual.html</code> را بفرست. هر کس دادهٔ خودش را دارد. برای انتقال داده، از <b>تنظیمات ← خروجی JSON</b> استفاده کن.
</details>

<details>
<summary><b>آیا داده بین فارسی و انگلیسی مشترک است؟</b></summary>
<br/>
بله. با یک دکمه زبان را عوض میکنی و همان دادهها با تقویم مربوطه نمایش داده میشوند.
</details>

<details>
<summary><b>روی موبایل کار میکند؟</b></summary>
<br/>
بله، چیدمان واکنشگرا (responsive) است و فایل تکفایلی روی مرورگر موبایل هم باز میشود.
</details>

---

## 🤝 مشارکت | Contributing

از ایده و PR استقبال میشود. لطفاً [CONTRIBUTING.md](CONTRIBUTING.md) را ببین.
*Contributions are welcome — please read [CONTRIBUTING.md](CONTRIBUTING.md).*

## 📄 مجوز | License

[MIT](LICENSE) © 2026 Yasiplann — استفادهٔ آزاد، حتی تجاری.

---

<div align="center">

### ⭐ اگر این پلنر به کارت آمد، یک ستاره بده!

**ساختهشده با ❤️ برای برنامهریزی بهتر**
*Made with ❤️ — By **Yasiplann***

</div>
