window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

const particlesContainer = document.getElementById('particles');
const particleEmojis = ['🍃', '✨', '💚', '🌿', '⭐'];

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.fontSize = (Math.random() * 10 + 16) + 'px';
    particlesContainer.appendChild(particle);

    setTimeout(() => particle.remove(), parseFloat(particle.style.animationDuration) * 1000);
}

setInterval(createParticle, 800);
for (let i = 0; i < 10; i++) {
    setTimeout(createParticle, i * 300);
}

function createConfetti() {
    const colors = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear`;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

const badgeContainer = document.getElementById('badgeContainer');
const badges = {
    25: {
        emoji: '🌿',
        title: 'Growing Strong',
        message: 'Hey Riddhi, I know you\'ve been through a lot alone. But not anymore. I\'m here now, and I\'m not going anywhere. We\'re in this together. 💚'
    },
    50: {
        emoji: '🌳',
        title: 'Mighty Oak',
        message: 'You don\'t have to be strong all the time. It\'s okay to lean on me. I won\'t let anything happen to you. That\'s a promise.'
    },
    75: {
        emoji: '🎋',
        title: 'Bamboo Forest',
        message: 'Your past doesn\'t define you, Riddhi. What you went through made you who you are, but it doesn\'t get to decide your future. You do.'
    },
    100: {
        emoji: '🌲',
        title: 'Century Tree',
        message: 'I know you\'re used to handling everything by yourself. But you don\'t have to anymore. From now on, we handle things together. Always.'
    },
    125: {
        emoji: '🌺',
        title: 'Blooming Flower',
        message: 'You deserve to be happy, Riddhi. Not someday, not when things are perfect. Right now. Exactly as you are. Don\'t let anyone tell you otherwise.'
    },
    150: {
        emoji: '🏆',
        title: 'Leaf Legend',
        message: 'I see how hard you try, even when no one else notices. I see you, Riddhi. And I\'m so proud of you for everything you do.'
    },
    175: {
        emoji: '🌟',
        title: 'Shining Star',
        message: 'Stop being so hard on yourself. You\'re doing better than you think. I believe in you even when you don\'t believe in yourself.'
    },
    200: {
        emoji: '👑',
        title: 'Leaf Royalty',
        message: 'You\'re my home, Riddhi. The one place I feel safe. And I want to be that for you too. I won\'t let anything hurt you. Ever.'
    },
    225: {
        emoji: '🦋',
        title: 'Beautiful Butterfly',
        message: 'Whatever you\'re worried about right now, we\'ll figure it out. Together. You don\'t have to carry everything alone anymore. I\'m here.'
    },
    250: {
        emoji: '🎪',
        title: 'Life of the Party',
        message: 'Your smile makes everything better. Even on your worst days, you manage to make me laugh. Thank you for being you, bhondu.'
    },
    275: {
        emoji: '🌈',
        title: 'Rainbow Spirit',
        message: 'It\'s okay to not be okay sometimes. You don\'t have to pretend with me. I\'m here for the messy parts too, not just the good ones.'
    },
    300: {
        emoji: '🎨',
        title: 'Masterpiece',
        message: 'Three hundred leaves. I told you I\'m not leaving. Through everything - the good, the bad, the autistic moments - I\'m staying. Forever. 💚'
    }
};

function showBadge(count) {
    if (badges[count]) {
        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.innerHTML = `<span>${badges[count].emoji}</span><span>${badges[count].title}</span>`;
        badgeContainer.appendChild(badge);

        createConfetti();
        updateBadgesDisplay();

        setTimeout(() => {
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0)';
            setTimeout(() => badge.remove(), 500);
        }, 5000);
    }
}

const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');
const ICONS = {
    sun: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'
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

if (toggle) toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('site-theme', next);
});

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

    if (dy) {
        dy.innerHTML = pad(d);
        hr.innerHTML = pad(h);
        mn.innerHTML = pad(m);
        sc.innerHTML = pad(s);
    }

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
                setTimeout(() => {
                    x.target.classList.add('visible');
                    obs.unobserve(x.target);
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    items.forEach(i => obs.observe(i));
} else {
    items.forEach(i => i.classList.add('visible'));
}

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

    const getVal = () => {
        const v = parseInt(localStorage.getItem(KEY), 10);
        return Number.isFinite(v) ? v : 0;
    };

    let count = getVal();
    let hold = null;
    let shownBadges = JSON.parse(localStorage.getItem('shown-badges') || '[]');

    function render() {
        el.textContent = String(count);
        el.parentElement.setAttribute('title', count + ' leaves');
        if (logo) logo.style.opacity = count > 0 ? '1' : '0.6';
    }

    function save() {
        localStorage.setItem(KEY, String(count));
    }

    function incFn() {
        count++;
        save();
        flash();
        render();

        if (badges[count] && !shownBadges.includes(count)) {
            showBadge(count);
            shownBadges.push(count);
            localStorage.setItem('shown-badges', JSON.stringify(shownBadges));
        }

        if (count > 0 && count % 25 === 0 && badges[count]) {
            const milestone = count;
            const message = `🎉 Milestone ${milestone}! ${badges[count].message}`;
            showMilestoneMessage(message);
        }
    }

    function decFn() {
        count = Math.max(0, count - 1);
        save();
        flash();
        render();
    }

    function flash() {
        if (!logo) return;
        logo.style.transform = 'scale(1.12) rotate(-6deg)';
        setTimeout(() => logo.style.transform = '', 180);
    }

    function startHold(fn) {
        fn();
        hold = setTimeout(() => {
            hold = setInterval(fn, 120);
        }, 360);
    }

    function stopHold() {
        clearTimeout(hold);
        clearInterval(hold);
        hold = null;
    }

    render();

    inc.addEventListener('pointerdown', e => { e.preventDefault(); startHold(incFn); });
    inc.addEventListener('pointerup', stopHold);
    inc.addEventListener('pointercancel', stopHold);
    inc.addEventListener('pointerleave', stopHold);

    dec.addEventListener('pointerdown', e => { e.preventDefault(); startHold(decFn); });
    dec.addEventListener('pointerup', stopHold);
    dec.addEventListener('pointercancel', stopHold);
    dec.addEventListener('pointerleave', stopHold);

    wrap.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' || e.key === '+' || e.key === '=') {
            e.preventDefault();
            incFn();
        }
        if (e.key === 'ArrowDown' || e.key === '-') {
            e.preventDefault();
            decFn();
        }
    });

    window.addEventListener('storage', e => {
        if (e.key === KEY) {
            const v = getVal();
            if (v !== count) {
                count = v;
                render();
            }
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

function pad2(n) {
    return Math.abs(n).toString().padStart(2, '0');
}

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

function updateBadgesDisplay() {
    const badgesDisplay = document.getElementById('badgesDisplay');
    const currentCount = parseInt(localStorage.getItem('leaf-count') || '0', 10);

    if (!badgesDisplay) return;

    badgesDisplay.innerHTML = '';

    const allMilestones = Object.keys(badges).map(k => parseInt(k, 10)).sort((a, b) => a - b);

    allMilestones.forEach(milestone => {
        const badge = badges[milestone];
        const isUnlocked = currentCount >= milestone;

        const card = document.createElement('div');
        card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;

        if (isUnlocked) {
            card.innerHTML = `
                <div class="badge-icon">${badge.emoji}</div>
                <div class="badge-title">${badge.title}</div>
                <div class="badge-milestone">Unlocked at ${milestone} Leaves</div>
                <div class="badge-message">${badge.message}</div>
            `;
        } else {
            card.innerHTML = `
                <div class="badge-icon">🔒</div>
                <div class="badge-title">???</div>
                <div class="badge-milestone">${milestone} Leaves Required</div>
                <div class="badge-message">Keep collecting leaves to unlock this badge!</div>
            `;
        }

        badgesDisplay.appendChild(card);
    });
}

updateBadgesDisplay();

window.addEventListener('storage', e => {
    if (e.key === 'leaf-count') {
        updateBadgesDisplay();
    }
});