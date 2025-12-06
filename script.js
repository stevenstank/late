const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');
const ICONS = { sun: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>', moon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>' };
function applyTheme(theme) { if (theme === 'dark') { root.setAttribute('data-theme', 'dark'); themeIcon.innerHTML = ICONS.moon; themeLabel.textContent = 'Dark' } else { root.setAttribute('data-theme', 'light'); themeIcon.innerHTML = ICONS.sun; themeLabel.textContent = 'Light' } }
const saved = localStorage.getItem('site-theme');
if (saved) { applyTheme(saved) } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { applyTheme('dark') } else { applyTheme('light') }
if (toggle) toggle.addEventListener('click', () => { const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; const next = current === 'dark' ? 'light' : 'dark'; applyTheme(next); localStorage.setItem('site-theme', next) });
function getNextBirthday(m, d, h, min) {
    const now = new Date();
    let y = now.getFullYear();
    let t = new Date(y, m - 1, d, h, min, 0);
    if (t.getTime() < now.getTime()) t = new Date(y + 1, m - 1, d, h, min, 0);
    return t.getTime();
}
const countdownDate = getNextBirthday(8, 20, 16, 18);
const countdownSection = document.getElementById("s-5");
setInterval(() => {
    const now = new Date().getTime();
    const dist = countdownDate - now;
    const d = Math.floor(dist / (1000 * 60 * 60 * 24));
    const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((dist % (1000 * 60)) / 1000);
    const pad = n => Math.abs(n).toString().padStart(2, '0');
    const dy = document.getElementById("days");
    const hr = document.getElementById("hours");
    const mn = document.getElementById("minutes");
    const sc = document.getElementById("seconds");
    if (dy) { dy.innerHTML = pad(d); hr.innerHTML = pad(h); mn.innerHTML = pad(m); sc.innerHTML = pad(s); }
    if (dist < 0 && countdownSection) {
        countdownSection.innerHTML = '<div class="max-w-4xl mx-auto text-center"><h2 class="text-4xl font-extrabold" style="color: var(--accent);">🎉 Happy Birthday, Riddhi! 🎉</h2><p class="text-xl mt-4">The next celebration is officially here!</p></div>';
    }
}, 1000);
const items = document.querySelectorAll('.l');
if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(e => {
        e.forEach(x => {
            if (x.isIntersecting) {
                const delay = Array.from(items).indexOf(x.target) * 100;
                setTimeout(() => { x.target.classList.add('visible'); obs.unobserve(x.target) }, delay);
            }
        });
    }, { threshold: 0.1 });
    items.forEach(i => obs.observe(i));
} else items.forEach(i => i.classList.add('visible'));
function showMilestoneMessage(msg) {
    const notificationId = 'leaf-milestone-notification';
    let notification = document.getElementById(notificationId);
    if (!notification) {
        notification = document.createElement('div');
        notification.id = notificationId;
        notification.className = 'milestone-notification';
        document.body.appendChild(notification);
    }
    notification.textContent = msg;
    setTimeout(() => {
        notification.classList.add('is-visible');
    }, 10);
    setTimeout(() => {
        notification.classList.remove('is-visible');
    }, 4000);
}
(function () {
    const KEY = 'leaf-count';
    const inc = document.getElementById('leafInc');
    const dec = document.getElementById('leafDec');
    const el = document.getElementById('leafCount');
    const wrap = document.getElementById('leafCounter');
    const logo = document.getElementById('leafLogo');
    if (!inc || !dec || !el) return;
    const getVal = () => { const v = parseInt(localStorage.getItem(KEY), 10); return Number.isFinite(v) ? v : 0 };
    let count = getVal();
    let hold = null;
    function render() {
        el.textContent = String(count);
        el.parentElement.setAttribute('title', count + ' leaves');
        if (logo) logo.style.opacity = count > 0 ? '1' : '0.6';
    }
    function save() { localStorage.setItem(KEY, String(count)) }
    function incFn() {
        count++;
        save();
        flash();
        render();
        if (count > 0 && count % 25 === 0) {
            const milestone = count;
            const message = `🎉 Milestone ${milestone}! Here is a flower for you 🌸. Remember, you're my home, always. I won't let anything happen to you. 💚`;
            showMilestoneMessage(message);
        }
    }
    function decFn() {
        count = Math.max(0, count - 1);
        save();
        flash();
        render()
    }
    function flash() {
        if (!logo) return;
        logo.style.transform = 'scale(1.12) rotate(-6deg)';
        setTimeout(() => logo.style.transform = '', 180)
    }
    function startHold(fn) {
        fn();
        hold = setTimeout(() => { hold = setInterval(fn, 120) }, 360)
    }
    function stopHold() {
        clearTimeout(hold);
        clearInterval(hold);
        hold = null;
    }
    render();
    inc.addEventListener('pointerdown', e => { e.preventDefault(); startHold(incFn) });
    inc.addEventListener('pointerup', stopHold);
    inc.addEventListener('pointercancel', stopHold);
    inc.addEventListener('pointerleave', stopHold);
    dec.addEventListener('pointerdown', e => { e.preventDefault(); startHold(decFn) });
    dec.addEventListener('pointerup', stopHold);
    dec.addEventListener('pointercancel', stopHold);
    dec.addEventListener('pointerleave', stopHold);
    wrap.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' || e.key === '+' || e.key === '=') { e.preventDefault(); incFn() }
        if (e.key === 'ArrowDown' || e.key === '-') { e.preventDefault(); decFn() }
    });
    window.addEventListener('storage', e => {
        if (e.key === KEY) {
            const v = getVal();
            if (v !== count) { count = v; render() }
        }
    });
})();
function getFriendsStartDate() {
    const wrapper = document.getElementById('friendsSince');
    const now = new Date();
    const friendMonth = 7;
    const friendDay = 9;
    const attr = wrapper && wrapper.dataset && wrapper.dataset.startYear ? parseInt(wrapper.dataset.startYear, 10) : null;
    if (attr && Number.isFinite(attr)) {
        return new Date(attr, friendMonth, friendDay, 0, 0, 0);
    }
    let y = now.getFullYear();
    const candidate = new Date(y, friendMonth, friendDay, 0, 0, 0);
    if (candidate > now) {
        y = y - 1;
    }
    return new Date(y, friendMonth, friendDay, 0, 0, 0);
}
function pad2(n) { return Math.abs(n).toString().padStart(2, '0') }
const fsYearsEl = document.getElementById('fs-years');
const fsDaysEl = document.getElementById('fs-days');
const fsHoursEl = document.getElementById('fs-hours');
const fsMinutesEl = document.getElementById('fs-minutes');
const fsSecondsEl = document.getElementById('fs-seconds');
function updateFriendsSince() {
    const start = getFriendsStartDate();
    const now = new Date();
    let diff = now.getTime() - start.getTime();
    if (diff < 0) diff = 0;
    const msInYear = 365.2425 * 24 * 60 * 60 * 1000;
    const years = Math.floor(diff / msInYear);
    diff -= years * msInYear;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    diff -= days * 24 * 60 * 60 * 1000;
    const hours = Math.floor(diff / (60 * 60 * 1000));
    diff -= hours * 60 * 60 * 1000;
    const minutes = Math.floor(diff / (60 * 1000));
    diff -= minutes * 60 * 1000;
    const seconds = Math.floor(diff / 1000);
    if (fsYearsEl) fsYearsEl.textContent = String(years);
    if (fsDaysEl) fsDaysEl.textContent = pad2(days);
    if (fsHoursEl) fsHoursEl.textContent = pad2(hours);
    if (fsMinutesEl) fsMinutesEl.textContent = pad2(minutes);
    if (fsSecondsEl) fsSecondsEl.textContent = pad2(seconds);
}
updateFriendsSince();
setInterval(updateFriendsSince, 1000);