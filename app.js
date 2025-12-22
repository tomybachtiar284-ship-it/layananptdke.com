document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    function toggleMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Navbar Scroll Logic
    const navbar = document.getElementById('navbar');
    const navLinks = navbar.querySelectorAll('.nav-link');

    function updateNavbar() {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-2', 'border-b', 'border-white/20');
            navbar.classList.remove('bg-transparent', 'py-4');

            navLinks.forEach(link => {
                link.classList.add('text-gray-800');
                link.classList.remove('text-gray-900', 'md:text-white', 'md:mix-blend-difference');
            });
        } else {
            navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-2', 'border-b', 'border-white/20');
            navbar.classList.add('bg-transparent', 'py-4');

            navLinks.forEach(link => {
                link.classList.remove('text-gray-800');
                link.classList.add('text-gray-900', 'md:text-white', 'md:mix-blend-difference');
            });
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial check

    // Stats Animation Logic
    const statsSection = document.getElementById('stats-section');
    const counters = document.querySelectorAll('.stat-value');
    let animated = false;

    const animateStats = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-value'));
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepTime = duration / steps;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current);
                }
            }, stepTime);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                // Small delay to match original feel
                setTimeout(animateStats, 100);
            }
        });
    }, { threshold: 0.1 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const phoneNumber = "6282293483048";
            const text = `Halo Admin PT. Daya Karya Energi,%0A%0ASaya ingin bertanya.%0A%0ANama: ${name}%0AEmail: ${email}%0APesan: ${message}`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // --- LANGUAGE SWITCHER LOGIC ---
    const translations = {
        id: {
            "nav.home": "BERANDA",
            "nav.about": "TENTANG KAMI",
            "nav.services": "LAYANAN",
            "nav.projects": "PROYEK",
            "nav.contact": "KONTAK",
            "hero.title": "Reliable Energy & <br/> <span class='text-red-500'>Infrastructure Partner</span>",
            "hero.subtitle": "Membangun masa depan Sulawesi Tengah dengan integritas, kualitas, dan profesionalisme berkelanjutan.",
            "hero.cta": "PELAJARI LEBIH LANJUT",
            "stat.exp": "TAHUN PENGALAMAN",
            "stat.proj": "PROYEK SELESAI",
            "stat.client": "KLIEN PUAS",
            "stat.growth": "PERTUMBUHAN BERKELANJUTAN",
            "about.title": "Tentang Perusahaan",
            "about.desc1": "<span class='font-bold'>PT. DAYA KARYA ENERGI</span> hadir untuk menjawab tantangan pembangunan infrastruktur dan kebutuhan energi di Indonesia, khususnya di wilayah Sulawesi Tengah.",
            "about.desc2": "Didirikan berdasarkan Akta Notaris No. 31 Tahun 2025, kami bergerak dengan landasan hukum yang kuat dan manajemen profesional. Kami berdedikasi untuk memberikan solusi terbaik di bidang konstruksi bangunan sipil, kelistrikan, dan perdagangan umum.",
            "about.desc3": "Integritas, Kualitas, dan Profesionalisme adalah nilai inti yang kami pegang teguh dalam setiap proyek yang kami kerjakan.",
            "about.director": "DIREKTUR UTAMA",
            "about.commish": "KOMISARIS",
            "about.activity_caption": "Kegiatan kordinasi dengan dinas dan pengesahan notaris",
            "structure.title": "Struktur Organisasi",
            "services.title": "Bidang Usaha Kami",
            "services.subtitle": "Solusi terintegrasi untuk kebutuhan infrastruktur, energi, dan logistik.",
            "services.cta": "Lihat Katalog Lengkap &rarr;",
            "services.c1.title": "Tenaga Pendukung Operasioanal Kegiatan Konstruksi Sipil",
            "services.c1.desc": "Tenaga Pendukung Operasional kegiatanJalan, Jembatan & Air",
            "services.c2.title": "Tenaga Pendukung operasional kegiatan Energi & Listrik",
            "services.c2.desc": "Tenaga Pendukung Operasional kegiatan Pembangkit & Transmisi",
            "services.c3.title": "Tenaga Pendukung Operasional Perdagangan Besar",
            "services.c3.desc": "Tenaga Pendukung Material & Peralatan",
            "services.c4.title": "Tenaga pendukung operasional kegiatan Logistik",
            "services.c4.desc": "Transportasi & Kargo",
            "projects.title": "Proyek Unggulan",
            "projects.subtitle": "Portofolio rekam jejak keberhasilan kami di lapangan.",
            "projects.p1.title": "Tenaga Pendukung Peningkatan Jalan Raya Trans Sulawesi",
            "projects.p1.desc": "Pengaspalan dan pelebaran jalan utama untuk akses logistik yang lebih baik.",
            "projects.p2.title": "Tenaga Pendukung Instalasi Gardu Induk & Transmisi",
            "projects.p2.desc": "Tenaga Pendukung Pembangunan infrastruktur kelistrikan untuk mendukung pasokan energi daerah.",
            "projects.p3.title": "Tenaga Pendukung Pembangunan Gedung Perkantoran",
            "projects.p3.desc": "Tenaga Pendukung Konstruksi gedung bertingkat dengan standar keselamatan modern.",
            "projects.view": "LIHAT DETAIL",
            "reviews.title": "Ulasan Pekerjaan",
            "reviews.subtitle": "Bukti nyata kepuasan pelanggan atas layanan profesional kami.",
            "reviews.r1.title": "Pekerjaan Perbaikan & Cleaning AC di PLTU",
            "reviews.r1.desc": "\"Pekerjaan sangat memuaskan, tim bekerja profesional dan rapi.\"",
            "reviews.r2.title": "Rewinding & Pengiriman Motor",
            "reviews.r2.desc": "\"Paket pekerjaan rewending dan pengiriman motor sangat memuaskan, pelayanan PT DKE.\"",
            "reviews.r3.title": "Jasa Pembersihan Septic Tank",
            "reviews.r3.desc": "\"Jasa pembersihan Septic tank sangat memuaskan.\"",
            "reviews.r4.title": "Jasa Pemasangan Backdrop",
            "reviews.r4.desc": "\"Jasa Pemasangan Backdrop sangat memuaskan.\"",
            "reviews.r5.title": "Pengadaan Perangkat PC",
            "reviews.r5.desc": "\"Pembelian 2 unit PC sampai dengan selamat, sangat memuaskan.\"",
            "reviews.r6.title": "Perbaikan Motor Triseda",
            "reviews.r6.desc": "\"Perbaikan unit sepeda motor (Triseda) sangat memuaskan pelayanan.\"",
            "cta.title": "Siap Bekerja Sama Dalam Proyek Anda?",
            "cta.desc": "Hubungi kami untuk konsultasi mengenai kebutuhan konstruksi, pengadaan barang, atau solusi energi perusahaan Anda.",
            "cta.btn": "Hubungi Kami Sekarang",
            "contact.title": "Informasi Kontak",
            "contact.office": "Kantor Pusat",
            "contact.addr.Label": "Alamat",
            "contact.phone.Label": "Telepon",
            "contact.email.Label": "Email",
            "contact.loc.title": "Lokasi Kami",
            "contact.form.title": "Kirim Pesan",
            "contact.form.name": "Nama Lengkap",
            "contact.form.email": "Email Address",
            "contact.form.msg": "Message",
            "contact.form.btn": "Kirim via WhatsApp",
            "contact.form.emailBtn": "Send via Email",
        },
        en: {
            "nav.home": "HOME",
            "nav.about": "ABOUT US",
            "nav.services": "SERVICES",
            "nav.projects": "PROJECTS",
            "nav.contact": "CONTACT",
            "hero.title": "Reliable Energy & <br/> <span class='text-red-500'>Infrastructure Partner</span>",
            "hero.subtitle": "Building the future of Central Sulawesi with integrity, quality, and sustainable professionalism.",
            "hero.cta": "LEARN MORE",
            "stat.exp": "YEARS EXPERIENCE",
            "stat.proj": "COMPLETED PROJECTS",
            "stat.client": "SATISFIED CLIENTS",
            "stat.growth": "SUSTAINABLE GROWTH",
            "about.title": "About Company",
            "about.desc1": "<span class='font-bold'>PT. DAYA KARYA ENERGI</span> is here to answer infrastructure development challenges and energy needs in Indonesia, especially in Central Sulawesi.",
            "about.desc2": "Established under Notary Deed No. 31 of 2025, we operate with a strong legal foundation and professional management. We dedicated to providing best solutions in civil construction, electrical, and general trading.",
            "about.desc3": "Integrity, Quality, and Professionalism are core values we hold firmly in every project we execute.",
            "about.director": "PRESIDENT DIRECTOR",
            "about.commish": "COMMISSIONER",
            "about.activity_caption": "Coordination activities with agencies and notary legalization",
            "structure.title": "Organizational Structure",
            "about.desc1": "<span class='font-bold'>PT. DAYA KARYA ENERGI</span> is here to answer infrastructure development challenges and energy needs in Indonesia, especially in Central Sulawesi.",
            "about.desc2": "Established under Notary Deed No. 31 of 2025, we operate with a strong legal foundation and professional management. We are dedicated to providing the best solutions in civil construction, electricity, and general trading.",
            "about.desc3": "Integrity, Quality, and Professionalism are the core values we hold firmly in every project we undertake.",
            "about.director": "PRESIDENT DIRECTOR",
            "about.commish": "COMMISSIONER",
            "structure.title": "Organizational Structure",
            "services.title": "Our Business Areas",
            "services.subtitle": "Integrated solutions for infrastructure, energy, and logistics needs.",
            "services.cta": "View Full Catalog &rarr;",
            "services.c1.title": "Civil Construction",
            "services.c1.desc": "Roads, Bridges & Water",
            "services.c2.title": "Energy & Electricity",
            "services.c2.desc": "Generation & Transmission",
            "services.c3.title": "General Trading",
            "services.c3.desc": "Materials & Equipment",
            "services.c4.title": "Logistics",
            "services.c4.desc": "Transportation & Cargo",
            "projects.title": "Featured Projects",
            "projects.subtitle": "Our portfolio of successful track records in the field.",
            "projects.p1.title": "Trans Sulawesi Highway Improvement",
            "projects.p1.desc": "Asphalting and widening main roads for better logistics access.",
            "projects.p2.title": "Substation & Transmission Installation",
            "projects.p2.desc": "Construction of electrical infrastructure to support regional energy supply.",
            "projects.p3.title": "Supervision for Office Building Construction",
            "projects.p3.desc": "Construction of high-rise buildings with modern safety standards.",
            "projects.view": "VIEW DETAILS",
            "reviews.title": "Job Reviews",
            "reviews.subtitle": "Real proof of customer satisfaction with our professional services.",
            "reviews.r1.title": "AC Cleaning at PLTU",
            "reviews.r1.desc": "\"Very satisfying work, the team worked professionally and neatly.\"",
            "reviews.r2.title": "Rewinding & Motor Delivery",
            "reviews.r2.desc": "\"Rewinding and motor delivery package was very satisfactory, excellent service from PT DKE.\"",
            "reviews.r3.title": "Septic Tank Cleaning Service",
            "reviews.r3.desc": "\"Septic tank cleaning service was very satisfactory.\"",
            "reviews.r4.title": "Backdrop Installation Service",
            "reviews.r4.desc": "\"Backdrop Installation Service was very satisfactory.\"",
            "reviews.r5.title": "PC Equipment Procurement",
            "reviews.r5.desc": "\"Purchase of 2 PC units arrived safely, very satisfying.\"",
            "reviews.r6.title": "Triseda Motorcycle Repair",
            "reviews.r6.desc": "\"Repair of motorcycle unit (Triseda) was very satisfactory service.\"",
            "cta.title": "Ready to Collaborate on Your Project?",
            "cta.desc": "Contact us for consultation regarding your construction, procurement, or corporate energy solution needs.",
            "cta.btn": "Contact Us Now",
            "contact.title": "Contact Information",
            "contact.office": "Head Office",
            "contact.addr.Label": "Address",
            "contact.phone.Label": "Phone",
            "contact.email.Label": "Email",
            "contact.loc.title": "Our Location",
            "contact.form.title": "Send Message",
            "contact.form.name": "Full Name",
            "contact.form.email": "Email Address",
            "contact.form.msg": "Message",
            "contact.form.btn": "Send via WhatsApp",
            "contact.form.emailBtn": "Send via Email",
        }
    };

    const langButtons = document.querySelectorAll('[data-lang]');

    function setLanguage(lang) {
        // Update Buttons UI
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('bg-red-600', 'text-white');
                btn.classList.remove('bg-gray-100', 'text-gray-600');
            } else {
                btn.classList.remove('bg-red-600', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-600');
            }
        });

        // Update Text Content
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    // Add Click Listeners
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = btn.dataset.lang;
            setLanguage(selectedLang);
        });
    });

    // Default to ID
    setLanguage('id');

    // Review Stars Interaction
    const reviewsSection = document.getElementById('ulasan');
    if (reviewsSection) {
        reviewsSection.addEventListener('click', function (e) {
            // Check if clicked element is a star icon or path inside it
            const star = e.target.closest('[data-lucide="star"]') || e.target.closest('.lucide-star');

            if (star) {
                // Remove existing animation class if any to reset
                star.classList.remove('star-pop');

                // Force reflow
                void star.offsetWidth;

                // Add animation class
                star.classList.add('star-pop');

                // Optional: Change fill color temporarily
                const originalFill = star.classList.contains('fill-current') ? 'currentColor' : 'none';
                star.style.fill = '#fbbf24'; // Amber-400

                setTimeout(() => {
                    star.classList.remove('star-pop');
                    if (originalFill === 'none') star.style.fill = 'none';
                }, 300);
            }
        });
    }

    // --- ACTIVITY CAROUSEL ---
    const carouselTrack = document.getElementById('activityCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carouselTrack && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalSlides = carouselTrack.children.length;
        let autoSlideInterval;

        const updateCarousel = () => {
            // Slide width is 100% of parent container
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        };

        // Event Listeners
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            resetTimer();
        });

        // Auto Slide Logic
        const startTimer = () => {
            autoSlideInterval = setInterval(nextSlide, 3500);
        };

        const stopTimer = () => {
            clearInterval(autoSlideInterval);
        };

        const resetTimer = () => {
            stopTimer();
            startTimer();
        };

        // Start Auto Slide
        startTimer();

        // Pause on Hover
        const carouselContainer = carouselTrack.parentElement;
        carouselContainer.addEventListener('mouseenter', stopTimer);
        carouselContainer.addEventListener('mouseleave', startTimer);

        // Handle Resize
        window.addEventListener('resize', updateCarousel);
    }

    // --- PARTICLE NETWORK ANIMATION ---
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Configuration
        const particleCount = window.innerWidth < 768 ? 35 : 80;
        const connectionDistance = 150;
        const particleSpeed = 0.3; // Slow elegant speed

        // Resize
        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            canvas.style.opacity = '0.5'; // Subtle visibility
        };

        window.addEventListener('resize', resize);
        resize(); // Init size

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * particleSpeed;
                this.vy = (Math.random() - 0.5) * particleSpeed;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = '#94a3b8'; // Slate-400 (Elegant Gray-Blue)
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize Particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Draw Connections
                for (let j = index; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(148, 163, 184, ${1 - distance / connectionDistance})`; // Fade line
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

});
