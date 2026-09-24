/* =====================================================
   MASJID AL-SALAM - SIEGEN
   JavaScript
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

menuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");

    if (mainNav.classList.contains("open")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        menuBtn.textContent = "☰";

    });

});


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   CURRENT YEAR
===================================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =====================================================
   CURRENT DATE
===================================================== */

function updateDate() {

    const dateElement = document.getElementById("currentDate");

    const language =
        document.documentElement.lang === "de"
            ? "de-DE"
            : "ar-SA";

    const date = new Date();

    dateElement.textContent =
        date.toLocaleDateString(language, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

}

updateDate();


/* =====================================================
   LANGUAGE SWITCHER
===================================================== */

const languageBtn = document.getElementById("languageBtn");

let currentLanguage = "ar";


languageBtn.addEventListener("click", () => {

    if (currentLanguage === "ar") {

        currentLanguage = "de";

        document.documentElement.lang = "de";
        document.documentElement.dir = "ltr";

        document.body.classList.add("ltr");

        languageBtn.textContent = "AR";

    } else {

        currentLanguage = "ar";

        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";

        document.body.classList.remove("ltr");

        languageBtn.textContent = "DE";
    }

    updateLanguage();

    updateDate();

});


function updateLanguage() {

    const elements =
        document.querySelectorAll("[data-ar][data-de]");

    elements.forEach(element => {

        if (currentLanguage === "ar") {

            element.textContent =
                element.getAttribute("data-ar");

        } else {

            element.textContent =
                element.getAttribute("data-de");

        }

    });

}


/* =====================================================
   DARK MODE
===================================================== */

const themeBtn = document.getElementById("themeBtn");

let darkMode =
    localStorage.getItem("masjidTheme") === "dark";


function applyTheme() {

    if (darkMode) {

        document.body.classList.add("dark-mode");

        themeBtn.textContent = "☀️";

    } else {

        document.body.classList.remove("dark-mode");

        themeBtn.textContent = "🌙";

    }

}

applyTheme();


themeBtn.addEventListener("click", () => {

    darkMode = !darkMode;

    localStorage.setItem(
        "masjidTheme",
        darkMode ? "dark" : "light"
    );

    applyTheme();

});


/* =====================================================
   PRAYER TIMES
===================================================== */

/*
    قم بتعديل هذه الأوقات حسب مواقيت مسجد السلام.
*/

const prayerTimes = [
    {
        ar: "الفجر",
        de: "Fajr",
        time: "05:30"
    },
    {
        ar: "الظهر",
        de: "Dhuhr",
        time: "13:20"
    },
    {
        ar: "العصر",
        de: "Asr",
        time: "16:45"
    },
    {
        ar: "المغرب",
        de: "Maghrib",
        time: "19:35"
    },
    {
        ar: "العشاء",
        de: "Isha",
        time: "21:10"
    }
];


function getTodayPrayerDate(time) {

    const now = new Date();

    const [hours, minutes] =
        time.split(":").map(Number);

    const prayerDate = new Date(now);

    prayerDate.setHours(hours);
    prayerDate.setMinutes(minutes);
    prayerDate.setSeconds(0);
    prayerDate.setMilliseconds(0);

    return prayerDate;
}


/* =====================================================
   NEXT PRAYER
===================================================== */

function updateNextPrayer() {

    const now = new Date();

    let nextPrayer = null;

    for (const prayer of prayerTimes) {

        const prayerDate =
            getTodayPrayerDate(prayer.time);

        if (prayerDate > now) {

            nextPrayer = {
                ...prayer,
                date: prayerDate
            };

            break;
        }

    }


    /*
       إذا انتهت جميع الصلوات، نجعل الفجر
       هو الصلاة القادمة في اليوم التالي.
    */

    if (!nextPrayer) {

        const tomorrow =
            new Date(now);

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const firstPrayer =
            prayerTimes[0];

        const [hours, minutes] =
            firstPrayer.time
                .split(":")
                .map(Number);

        tomorrow.setHours(hours);
        tomorrow.setMinutes(minutes);
        tomorrow.setSeconds(0);
        tomorrow.setMilliseconds(0);

        nextPrayer = {
            ...firstPrayer,
            date: tomorrow
        };

    }


    const nameElement =
        document.getElementById("nextPrayerName");

    const timeElement =
        document.getElementById("nextPrayerTime");

    const countdownElement =
        document.getElementById("countdown");


    nameElement.textContent =
        currentLanguage === "ar"
            ? nextPrayer.ar
            : nextPrayer.de;

    timeElement.textContent =
        nextPrayer.time;


    const difference =
        nextPrayer.date.getTime() -
        now.getTime();


    const totalSeconds =
        Math.max(
            0,
            Math.floor(difference / 1000)
        );


    const hours =
        Math.floor(totalSeconds / 3600);

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    countdownElement.textContent =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

}


/* Update every second */

updateNextPrayer();

setInterval(updateNextPrayer, 1000);


/* =====================================================
   HIGHLIGHT CURRENT / NEXT PRAYER
===================================================== */

function highlightNextPrayer() {

    const now = new Date();

    const cards =
        document.querySelectorAll(".prayer-card");

    cards.forEach(card => {
        card.classList.remove("active");
    });


    let selectedIndex = 0;

    prayerTimes.forEach((prayer, index) => {

        const prayerDate =
            getTodayPrayerDate(prayer.time);

        if (prayerDate > now) {

            selectedIndex = index;

            return;
        }

    });


    if (
        now >
        getTodayPrayerDate(
            prayerTimes[prayerTimes.length - 1].time
        )
    ) {
        selectedIndex = 0;
    }


    if (cards[selectedIndex]) {
        cards[selectedIndex].classList.add("active");
    }

}

highlightNextPrayer();

setInterval(highlightNextPrayer, 60000);


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;

        event.preventDefault();

        const headerHeight =
            document.querySelector(".header")
                .offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =====================================================
   REVEAL ON SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".prayer-card, .announcement-card, .about-image, .about-text, .contact-info, .map-container"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    revealObserver.observe(element);

});


/* =====================================================
   CONTACT PLACEHOLDER WARNING
===================================================== */

const phoneLink =
    document.querySelector(
        'a[href^="tel:"]'
    );

if (phoneLink) {

    phoneLink.addEventListener("click", event => {

        if (
            phoneLink.getAttribute("href")
                .includes("000000")
        ) {

            event.preventDefault();

            alert(
                currentLanguage === "ar"
                    ? "يرجى وضع رقم هاتف المسجد الحقيقي داخل ملف index.html."
                    : "Bitte tragen Sie die tatsächliche Telefonnummer der Moschee in index.html ein."
            );

        }

    });

}


/* =====================================================
   END
===================================================== */
