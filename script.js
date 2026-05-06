// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

if (window.innerWidth > 576) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    const hoverElements = document.querySelectorAll('a, button, .project-card, .social-link, .btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'var(--primary)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== MOBILE MENU ==========
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== TYPING ANIMATION ==========
const roles = ['Web Developer', 'Fullstack Learner', 'Creative Coder', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();

// ========== SKILLS ANIMATION ON SCROLL ==========
const skillItems = document.querySelectorAll('.skill-item');
const observerOptions = { threshold: 0.5 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const width = progressBar.style.width;
            progressBar.style.width = width;
        }
    });
}, observerOptions);

skillItems.forEach(item => observer.observe(item));

// ========== STATS COUNTER ==========
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    if (animated) return;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        updateNumber();
    });
    animated = true;
}

const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// ========== PROJECTS DATA (2 PROYEK) ==========
const projectsData = [
    {
        title: 'Website Portofolio Pribadi',
        description: 'Website portofolio pribadi yang responsif, modern, dan interaktif. Dibuat menggunakan HTML, CSS, dan JavaScript murni.',
        image: 'https://placehold.co/600x400/1e293b/10b981?text=Portofolio',
        category: 'web',
        tech: ['HTML', 'CSS', 'JavaScript'],
        liveUrl: '#',
        githubUrl: '#'
    },
    {
        title: 'Aplikasi Setoran Santri',
        description: 'Aplikasi manajemen setoran hafalan santri berbasis web. Fitur: CRUD setoran, dashboard, filter, dan laporan PDF.',
        image: 'https://placehold.co/600x400/1e293b/10b981?text=Setoran+Santri',
        category: 'web',
        tech: ['Node.js', 'Express', 'MySQL', 'PDFKit'],
        liveUrl: 'https://aplikasi-setoran-santri-github.onrender.com/',
        githubUrl: 'https://github.com/muhammadikhwan309-ship-it/aplikasi-setoran-santri-github'
    }
];

function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projectsGrid.innerHTML = projectsData.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <a href="${project.liveUrl}" target="_blank" class="project-link"><i class="fas fa-link"></i></a>
                    <a href="${project.githubUrl}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

renderProjects();

// ========== BACK TO TOP ==========
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim. Saya akan segera merespon.');
        contactForm.reset();
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========== REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.skill-item, .project-card, .testimonial-card, .about-card, .contact-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ========== FITUR TESTIMONI KLIEN (LIVE) ==========

let testimonials = [];

function loadTestimonials() {
    const saved = localStorage.getItem('clientTestimonials');
    if (saved) {
        testimonials = JSON.parse(saved);
    } else {
        testimonials = [];
        saveTestimonials();
    }
    renderTestimonials();
}

function saveTestimonials() {
    localStorage.setItem('clientTestimonials', JSON.stringify(testimonials));
}

function renderTestimonials() {
    const container = document.getElementById('testimonialsList');
    if (!container) return;
    
    if (testimonials.length === 0) {
        container.innerHTML = `
            <div class="empty-testimonials">
                <i class="fas fa-comment-dots"></i>
                <p>Belum ada testimoni. Jadilah yang pertama!</p>
            </div>
        `;
        return;
    }
    
    const sorted = [...testimonials].reverse();
    
    container.innerHTML = sorted.map(testi => `
        <div class="testimonial-card" data-id="${testi.id}">
            <button class="testimonial-delete" onclick="deleteTestimonial(${testi.id})">
                <i class="fas fa-trash"></i>
            </button>
            <i class="fas fa-quote-left"></i>
            <p>"${escapeHtml(testi.message)}"</p>
            <div class="rating-stars">
                ${generateStars(testi.rating)}
            </div>
            <div class="testimonial-author">
                <img src="https://ui-avatars.com/api/?background=10b981&color=fff&name=${encodeURIComponent(testi.name)}" alt="${testi.name}">
                <div>
                    <h4>${escapeHtml(testi.name)}</h4>
                    <span>${escapeHtml(testi.position || 'Klien')} • ${testi.date}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star" style="color: #fbbf24;"></i>';
        } else {
            stars += '<i class="far fa-star" style="color: #fbbf24;"></i>';
        }
    }
    return stars;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addTestimonial(name, position, message, rating) {
    const newTestimonial = {
        id: Date.now(),
        name: name.trim(),
        position: position.trim() || 'Klien',
        message: message.trim(),
        rating: rating || 5,
        date: new Date().toLocaleDateString('id-ID')
    };
    
    testimonials.push(newTestimonial);
    saveTestimonials();
    renderTestimonials();
    alert(`Terima kasih ${name}! Testimoni Anda sudah tersimpan.`);
}

function deleteTestimonial(id) {
    const password = prompt('Masukkan password admin untuk menghapus:');
    if (password === 'ikhwan123') {
        testimonials = testimonials.filter(t => t.id !== id);
        saveTestimonials();
        renderTestimonials();
        alert('Testimoni berhasil dihapus');
    } else if (password !== null) {
        alert('Password salah!');
    }
}

const testimonialForm = document.getElementById('testimonialForm');
if (testimonialForm) {
    testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('clientName').value;
        const position = document.getElementById('clientPosition').value;
        const message = document.getElementById('clientMessage').value;
        const rating = parseInt(document.getElementById('clientRating').value) || 5;
        
        if (!name || !message) {
            alert('Mohon isi nama dan pesan testimoni!');
            return;
        }
        
        if (rating < 1 || rating > 5) {
            alert('Rating harus antara 1-5');
            return;
        }
        
        addTestimonial(name, position, message, rating);
        testimonialForm.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTestimonials();
});

console.log('Website portofolio Muhammad Ikhwan Almubarok siap! 🚀');