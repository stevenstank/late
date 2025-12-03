const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

const ICONS = {
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`
};

function applyTheme(theme) {
    if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        themeIcon.innerHTML = ICONS.moon;
        themeLabel.textContent = 'Dark';
    } else {
        root.setAttribute('data-theme', 'light');
        themeIcon.innerHTML = ICONS.sun;
        themeLabel.textContent = 'Light';
    }
}

const saved = localStorage.getItem('site-theme');
if (saved) {
    applyTheme(saved);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
} else {
    applyTheme('light');
}

toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('site-theme', next);
});


function getNextBirthday(m, d, h, min) {
    const now = new Date();
    let y = now.getFullYear();
    let targetDate = new Date(y, m - 1, d, h, min, 0); 

    if (targetDate.getTime() < now.getTime()) {
        targetDate = new Date(y + 1, m - 1, d, h, min, 0);
    }
    return targetDate.getTime();
}

const countdownDate = getNextBirthday(8, 20, 16, 18); 
const countdownSection = document.getElementById("s-4");

const countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (num) => Math.abs(num).toString().padStart(2, '0');

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        daysEl.innerHTML = pad(d);
        hoursEl.innerHTML = pad(h);
        minutesEl.innerHTML = pad(m);
        secondsEl.innerHTML = pad(s);
    }

    if (distance < 0) {
        clearInterval(countdownInterval);
        if (countdownSection) {
            countdownSection.innerHTML = `
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-4xl font-extrabold" style="color: var(--accent);">🎉 Happy Birthday, Riddhi! 🎉</h2>
                    <p class="text-xl mt-4">The next celebration is officially here!</p>
                </div>
            `;
        }
    }
}, 1000);

const timelineItems = document.querySelectorAll('.l');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = Array.from(timelineItems).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
} else {
    timelineItems.forEach(item => {
        item.classList.add('visible');
    });
}