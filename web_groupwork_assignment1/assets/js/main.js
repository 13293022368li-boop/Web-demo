// 移动端菜单切换
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        const expanded = !mobileMenu.classList.contains('hidden');
        this.setAttribute('aria-expanded', expanded ? 'true' : 'false');

        // 切换图标
        const icon = this.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // 关闭移动端菜单（如果打开）
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (menuBtn) {
                menuBtn.setAttribute('aria-expanded', 'false');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }

        const targetSelector = this.getAttribute('href');
        const target = document.querySelector(targetSelector);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 滚动时导航栏样式变化
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (!header) {
        return;
    }

    if (window.scrollY > 100) {
        header.classList.add('py-2');
        header.classList.remove('py-3');
        header.classList.add('shadow-lg');
    } else {
        header.classList.add('py-3');
        header.classList.remove('py-2');
        header.classList.remove('shadow-lg');
    }
});

// Additional JS: Fade-in animations on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// Additional JS: Newsletter form validation and submission (simulated)
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value : '';
        if (email) {
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}
