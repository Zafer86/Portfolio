// Hamburger menu
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Theme switching - محسن
let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

// Theme functions
const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    // إصلاح: استخدام removeItem بدل setItem(null)
    localStorage.removeItem('darkmode');
}

// تحقق من الـ theme المحفوظ عند تحميل الصفحة
if (darkmode === "active") {
    enableDarkmode();
}

// Event listener للـ theme switch
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    if (darkmode !== "active") {
        enableDarkmode();
    } else {
        disableDarkmode();
    }
});

// Scroll to Top button - محسن مع debouncing
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
let scrollTimeout;

// Function محسنة للـ scroll handling
function handleScroll() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }, 10);
}

// استخدام addEventListener بدل window.onscroll
window.addEventListener('scroll', handleScroll);

// Function للـ smooth scroll to top
scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// إضافة loading states للصور
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // إذا الصورة محملة فعلاً
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// إضافة smooth scrolling للـ navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// إضافة keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC لإغلاق الـ hamburger menu
    if (e.key === 'Escape') {
        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        
        if (menu.classList.contains('open')) {
            menu.classList.remove("open");
            icon.classList.remove("open");
        }
    }
    
    // Space أو Enter للـ theme switch عند التركيز عليه
    if ((e.key === ' ' || e.key === 'Enter') && document.activeElement === themeSwitch) {
        e.preventDefault();
        themeSwitch.click();
    }
});

// Performance optimization - lazy loading للصور
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}