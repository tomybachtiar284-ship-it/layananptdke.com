document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Dev Pending Alert
    document.querySelectorAll('.dev-pending').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Masih dalam pengembangan');
        });
    });

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

    // --- SPA VIEW SWITCHER (Single Page Behavior) ---
    const pages = {
        'beranda': ['beranda', 'stat-ticker', 'cta'],            // Home: Hero, Ticker, CTA
        'tentang-kami': ['tentang-kami', 'struktur', 'sertifikat'], // About: About, Structure, Cert
        'layanan': ['layanan'],
        'proyek': ['proyek', 'ulasan'],                         // Projects: Projects, Reviews
        'kontak': ['kontak']
    };

    const allSectionIds = ['beranda', 'stat-ticker', 'tentang-kami', 'struktur', 'sertifikat', 'layanan', 'proyek', 'ulasan', 'cta', 'kontak'];

    function showPage(pageId) {
        // 1. Hide ALL sections first
        allSectionIds.forEach(id => {
            const el = document.getElementById(id) || document.querySelector('.' + id);
            if (el) el.classList.add('hidden');
        });

        // 2. Show TARGET sections
        const targets = pages[pageId] || pages['beranda'];
        targets.forEach(id => {
            const el = document.getElementById(id) || document.querySelector('.' + id);
            if (el) {
                el.classList.remove('hidden');
                // Trigger animations if present
                const animatedChildren = el.querySelectorAll('.animate-slide-up, .animate-fade-in');
                animatedChildren.forEach(child => {
                    child.style.animation = 'none';
                    child.offsetHeight; /* trigger reflow */
                    child.style.animation = null;
                });
            }
        });

        // 3. Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // 4. Init Navbar State
        initNavbar(pageId);

        // 4. Update Active Nav State
        updateActiveNav(pageId);
    }

    function updateActiveNav(activeId) {
        // Desktop & Mobile Links
        const allLinks = document.querySelectorAll('a[href^="#"]');
        allLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1); // remove #
            if (href === activeId) {
                link.classList.add('text-red-600');
                link.classList.remove('text-gray-800', 'text-gray-900', 'md:text-white', 'md:mix-blend-difference');
            } else {
                link.classList.remove('text-red-600');
                // Reset to default colors (logic simplified for SPA mode)
                link.classList.add('text-gray-800');
            }
        });
    }

    // Attach Click Listeners
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            if (pages[targetId]) {
                showPage(targetId);
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }
            }
        });
    });

    // Initial Load


    // --- NAVBAR SCROLL & TRANSPARENCY LOGIC ---
    const navbar = document.getElementById('navbar');
    let scrollHandler = null;

    function handleScroll() {
        if (window.scrollY > 50) {
            // Scrolled: Solid White
            navbar.classList.add('bg-white', 'shadow-md', 'py-2');
            navbar.classList.remove('bg-transparent', 'py-4');
            updateNavColors('dark');
        } else {
            // Top: Transparent
            navbar.classList.add('bg-transparent', 'py-4');
            navbar.classList.remove('bg-white', 'shadow-md', 'py-2');
            updateNavColors('white');
        }
    }

    function updateNavColors(theme) {
        const navLinks = document.querySelectorAll('#navbar a.text-sm'); // Desktop links
        const logo = document.querySelector('#navbar img');

        if (theme === 'white') {
            // Transparent Bg -> White Text
            navLinks.forEach(link => {
                link.classList.add('text-white');
                link.classList.remove('text-gray-800');
            });
            // Optional: Invert logo/brightness if needed for dark backgrounds
            // logo.classList.add('brightness-0', 'invert'); 
        } else {
            // White Bg -> Dark Text
            navLinks.forEach(link => {
                link.classList.add('text-gray-800');
                link.classList.remove('text-white');
            });
            // logo.classList.remove('brightness-0', 'invert');
        }
    }

    // Initialize Navbar for Page
    function initNavbar(pageId) {
        const isDesktop = window.innerWidth >= 768;

        // Cleanup old listener
        if (scrollHandler) {
            window.removeEventListener('scroll', scrollHandler);
            scrollHandler = null;
        }

        if (pageId === 'beranda' && isDesktop) {
            // Home & Desktop: Start Transparent, then Scroll
            scrollHandler = handleScroll;
            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Trigger once to set initial state
        } else {
            // Other Pages or Mobile: Always Solid White
            navbar.classList.add('bg-white', 'shadow-md', 'py-2');
            navbar.classList.remove('bg-transparent', 'py-4');
            updateNavColors('dark');
        }
    }

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
            "hero.title": "Mitra Energi & <br/> <span class='text-red-500'>Infrastruktur Terpercaya</span>",
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
            "about.vision.title": "Visi dan Peran Perusahaan",
            "about.vision.desc": "Kami memposisikan diri sebagai perusahaan yang tidak hanya berfokus pada penyediaan layanan, tetapi juga berperan aktif dalam mendukung pembangunan berkelanjutan, peningkatan konektivitas infrastruktur, serta ketersediaan energi yang andal dan efisien. Dengan memadukan sumber daya manusia yang kompeten, sistem kerja yang terstruktur, serta pemahaman yang baik terhadap kebutuhan lapangan, PT. Daya Karya Energi berupaya memberikan solusi yang tepat guna, bernilai tambah, dan berorientasi jangka panjang.",
            "about.scope.title": "Lingkup Usaha dan Kompetensi",
            "about.scope.l1": "Konstruksi bangunan sipil, termasuk pekerjaan jalan, jembatan, dan infrastruktur pendukung lainnya",
            "about.scope.l2": "Energi dan kelistrikan, khususnya penyediaan tenaga pendukung operasional serta kegiatan penunjang sistem tenaga listrik",
            "about.scope.l3": "Perdagangan besar, mencakup material, peralatan, mesin, dan perlengkapan yang mendukung kegiatan industri dan proyek",
            "about.scope.l4": "Logistik dan jasa pendukung transportasi, termasuk penanganan barang, distribusi, dan aktivitas bongkar muat",
            "about.values.title": "Nilai-Nilai Perusahaan",
            "about.val1.title": "Integritas",
            "about.val1.desc": "Menjalankan usaha dengan kejujuran, etika, dan tanggung jawab penuh.",
            "about.val2.title": "Kualitas",
            "about.val2.desc": "Mengutamakan mutu layanan dan hasil kerja yang memenuhi standar dan harapan mitra.",
            "about.val3.title": "Profesionalisme",
            "about.val3.desc": "Bekerja secara disiplin, kompeten, dan berorientasi pada solusi.",
            "about.gov.title": "Manajemen dan Tata Kelola",
            "about.gov.p1": "Perseroan dikelola oleh jajaran manajemen yang memiliki komitmen kuat terhadap tata kelola perusahaan yang baik (Good Corporate Governance). Dengan struktur organisasi yang jelas dan sistem pengambilan keputusan yang terukur, kami memastikan setiap kegiatan usaha berjalan secara efektif dan akuntabel.",
            "about.gov.p2": "Manajemen PT. Daya Karya Energi berkomitmen untuk terus meningkatkan kapasitas perusahaan, baik dari sisi sumber daya manusia, sistem operasional, maupun pengembangan usaha, guna menjawab tantangan industri yang terus berkembang.",
            "about.closing": "\"Kami percaya bahwa kerja sama yang baik, komunikasi yang terbuka, dan kepercayaan yang terbangun akan menjadi kunci keberhasilan bersama.\"",
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
            "services.detail.intro1": "Sebagai perusahaan yang didirikan untuk mendukung pembangunan nasional dan pertumbuhan sektor industri, PT Daya Karya Energi menjalankan kegiatan usaha yang terintegrasi di bidang konstruksi, energi dan kelistrikan, perdagangan besar, serta logistik dan transportasi. Seluruh kegiatan usaha kami dijalankan berdasarkan Anggaran Dasar Perseroan dan mengacu pada peraturan perundang-undangan yang berlaku.",
            "services.detail.intro2": "Dengan mengedepankan prinsip profesionalisme, kepatuhan hukum, keselamatan kerja, serta efisiensi operasional, kami berkomitmen untuk menjadi mitra kerja yang andal dan berkelanjutan bagi pemerintah, BUMN, swasta nasional, maupun mitra usaha lainnya.",
            "services.detail.p1.title": "Konstruksi Sipil",
            "services.detail.p1.desc": "Perseroan menjalankan kegiatan di bidang konstruksi bangunan sipil, yang meliputi pekerjaan konstruksi jalan dan jembatan, bangunan sumber daya air, jaringan irigasi dan drainase, serta pekerjaan konstruksi sipil lainnya. Kegiatan ini mencakup pembangunan baru, pemeliharaan, maupun rehabilitasi infrastruktur.",
            "services.detail.p1.list1": "Penyediaan tenaga pendukung operasional proyek",
            "services.detail.p1.list2": "Pengelolaan dan penyediaan material konstruksi",
            "services.detail.p1.list3": "Pekerjaan persiapan dan penyelesaian lahan",
            "services.detail.p2.title": "Energi & Kelistrikan",
            "services.detail.p2.desc": "Dalam mendukung kebutuhan energi nasional, Perseroan bergerak di bidang penyediaan dan penunjang tenaga listrik, yang mencakup kegiatan pendukung pembangkitan, transmisi, dan distribusi tenaga listrik.",
            "services.detail.p2.list1": "Penyediaan tenaga pendukung operasional kelistrikan",
            "services.detail.p2.list2": "Kegiatan penunjang teknis dan non-teknis sistem tenaga listrik",
            "services.detail.p2.list3": "Dukungan operasional jaringan dan fasilitas kelistrikan",
            "services.detail.p3.title": "Perdagangan Besar",
            "services.detail.p3.desc": "Perseroan menjalankan kegiatan perdagangan besar untuk berbagai jenis barang dan perlengkapan yang mendukung kegiatan industri, konstruksi, energi, dan kebutuhan operasional lainnya.",
            "services.detail.p3.list1": "Perdagangan besar bahan dan perlengkapan bangunan",
            "services.detail.p3.list2": "Perdagangan besar mesin, peralatan, dan perlengkapan",
            "services.detail.p3.list3": "Perdagangan besar barang keperluan industri",
            "services.detail.p4.title": "Logistik & Transportasi",
            "services.detail.p4.desc": "Untuk mendukung rantai pasok dan kelancaran distribusi, Perseroan menjalankan kegiatan di bidang logistik dan transportasi, termasuk aktivitas penunjang angkutan darat, bongkar muat barang, serta jasa pengelolaan kargo.",
            "services.detail.p4.list1": "Penanganan dan pengelolaan barang dan kargo",
            "services.detail.p4.list2": "Aktivitas bongkar muat dan pergudangan",
            "services.detail.p4.list3": "Jasa penunjang distribusi dan transportasi",
            "services.detail.outro.title": "Pendekatan Terintegrasi",
            "services.detail.outro.desc": "Keunggulan Perseroan terletak pada pendekatan usaha yang terintegrasi, di mana setiap bidang usaha saling mendukung dan memberikan nilai tambah bagi klien.",
            "services.detail.val1": "Kepatuhan Regulasi",
            "services.detail.val2": "Transparansi",
            "services.detail.val3": "Keselamatan Kerja (K3)",
            "services.detail.val4": "Keberlanjutan",
            "projects.title": "Proyek Unggulan",
            "projects.subtitle": "Portofolio rekam jejak keberhasilan kami di lapangan.",
            "projects.p1.title": "Tenaga Pendukung Peningkatan Jalan Raya Trans Sulawesi",
            "projects.p1.desc": "Pengaspalan dan pelebaran jalan utama untuk akses logistik yang lebih baik.",
            "projects.p2.title": "Tenaga Pendukung Instalasi Gardu Induk & Transmisi",
            "projects.p2.desc": "Tenaga Pendukung Pembangunan infrastruktur kelistrikan untuk mendukung pasokan energi daerah.",
            "projects.p3.title": "Tenaga Pendukung Pembangunan Gedung Perkantoran",
            "projects.p3.desc": "Tenaga Pendukung Konstruksi gedung bertingkat dengan standar keselamatan modern.",
            "projects.view": "LIHAT DETAIL",
            "projects.detail.intro1": "Sebagai perusahaan yang bergerak di berbagai sektor strategis, PT. Daya Karya Energi telah dan terus menjalankan beragam kegiatan dan proyek yang mendukung pembangunan infrastruktur, penyediaan energi, serta kelancaran rantai pasok dan distribusi. Setiap proyek yang kami kerjakan merupakan cerminan dari komitmen Perseroan terhadap kualitas, keselamatan kerja, ketepatan waktu, dan kepatuhan terhadap regulasi.",
            "projects.detail.intro2": "Portofolio proyek kami mencakup pekerjaan di bidang konstruksi sipil, energi dan kelistrikan, perdagangan besar material dan peralatan, serta jasa pendukung logistik dan transportasi.",
            "projects.cat1.title": "Proyek Konstruksi Sipil",
            "projects.cat1.l1": "Konstruksi dan peningkatan jalan serta jembatan",
            "projects.cat1.l2": "Pekerjaan bangunan sipil penunjang",
            "projects.cat1.l3": "Penyediaan tenaga pendukung operasional proyek",
            "projects.cat2.title": "Proyek Energi & Kelistrikan",
            "projects.cat2.l1": "Operasional pembangkitan tenaga listrik",
            "projects.cat2.l2": "Sistem transmisi dan distribusi tenaga listrik",
            "projects.cat2.l3": "Kegiatan penunjang teknis kelistrikan",
            "projects.cat3.title": "Perdagangan Besar & Pengadaan",
            "projects.cat3.l1": "Pengadaan bahan dan perlengkapan bangunan",
            "projects.cat3.l2": "Pengadaan mesin dan suku cadang",
            "projects.cat3.l3": "Perdagangan atas dasar kontrak atau fee",
            "projects.cat4.title": "Logistik & Transportasi",
            "projects.cat4.l1": "Penanganan dan pengelolaan kargo",
            "projects.cat4.l2": "Aktivitas bongkar muat dan distribusi",
            "projects.cat4.l3": "Jasa penunjang angkutan proyek",
            "projects.approach.title": "Pendekatan Pelaksanaan",
            "projects.approach.l1": "Perencanaan dan koordinasi yang matang",
            "projects.approach.l2": "Pengelolaan sumber daya secara efektif",
            "projects.approach.l3": "Pengawasan mutu dan keselamatan kerja",
            "projects.sust.title": "Komitmen Keberlanjutan",
            "projects.sust.desc": "Kami menyadari bahwa setiap proyek memiliki dampak. Oleh karena itu, PT. Daya Karya Energi berkomitmen untuk menjalankan proyek secara bertanggung jawab, memperhatikan aspek keselamatan, lingkungan, serta keberlanjutan usaha jangka panjang.",
            "projects.closing": "\"PT. Daya Karya Energi terus membuka peluang kerja sama dan siap menjadi mitra terpercaya dalam pelaksanaan proyek-proyek strategis Anda.\"",
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
            "about.vision.title": "Company Vision and Role",
            "about.vision.desc": "We position ourselves as a company that not only focuses on providing services but also actively supports sustainable development, infrastructure connectivity improvement, and reliable and efficient energy availability. By combining competent human resources, structured work systems, and a good understanding of field needs, PT. Daya Karya Energi strives to provide appropriate, value-added, and long-term oriented solutions.",
            "about.scope.title": "Scope of Business and Competency",
            "about.scope.l1": "Civil building construction, including road, bridge, and other supporting infrastructure works",
            "about.scope.l2": "Energy and electricity, specifically providing operational support personnel and power system support activities",
            "about.scope.l3": "Wholesale trading, covering materials, equipment, machinery, and supplies supporting industrial activities and projects",
            "about.scope.l4": "Logistics and transportation support services, including goods handling, distribution, and loading/unloading activities",
            "about.values.title": "Company Values",
            "about.val1.title": "Integrity",
            "about.val1.desc": "Conducting business with honesty, ethics, and full responsibility.",
            "about.val2.title": "Quality",
            "about.val2.desc": "Prioritizing service quality and work results that meet standards and partner expectations.",
            "about.val3.title": "Professionalism",
            "about.val3.desc": "Working with discipline, competence, and solution-orientation.",
            "about.gov.title": "Management and Governance",
            "about.gov.p1": "The Company is managed by a management team with a strong commitment to Good Corporate Governance. With a clear organizational structure and measurable decision-making systems, we ensure every business activity runs effectively and accountably.",
            "about.gov.p2": "The Management of PT. Daya Karya Energi is committed to continuously improving the company's capacity, both in terms of human resources, operational systems, and business development, to answer the evolving industrial challenges.",
            "about.closing": "\"We believe that good cooperation, open communication, and built trust will be the key to mutual success.\"",
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
            "services.c4.title": "Logistics Support Services",
            "services.c4.desc": "Transportation & Cargo",
            "services.detail.intro1": "As a company established to support national development and industrial sector growth, PT Daya Karya Energi carries out integrated business activities in construction, energy and electricity, wholesale trading, as well as logistics and transportation. All our business activities are conducted based on the Company's Articles of Association and in accordance with applicable laws and regulations.",
            "services.detail.intro2": "By prioritizing professionalism, legal compliance, occupational safety, and operational efficiency, we are committed to being a reliable and sustainable partner for the government, state-owned enterprises, private sectors, and other business partners.",
            "services.detail.p1.title": "Civil Construction",
            "services.detail.p1.desc": "The Company carries out activities in civil building construction, including road and bridge construction, water resources buildings, irrigation and drainage networks, and other civil construction works. These activities cover new construction, maintenance, and infrastructure rehabilitation.",
            "services.detail.p1.list1": "Provision of project operational support personnel",
            "services.detail.p1.list2": "Management and supply of construction materials",
            "services.detail.p1.list3": "Land preparation and finishing works",
            "services.detail.p2.title": "Energy & Electricity",
            "services.detail.p2.desc": "Supporting national energy needs, the Company operates in the provision and support of electric power, covering support activities for power generation, transmission, and electricity distribution.",
            "services.detail.p2.list1": "Provision of electrical operational support personnel",
            "services.detail.p2.list2": "Technical and non-technical power system support activities",
            "services.detail.p2.list3": "Operational support for networks and electrical facilities",
            "services.detail.p3.title": "Wholesale Trading",
            "services.detail.p3.desc": "The Company conducts wholesale trading activities for various types of goods and equipment supporting industrial, construction, energy, and other operational needs.",
            "services.detail.p3.list1": "Wholesale of construction materials and equipment",
            "services.detail.p3.list2": "Wholesale of machinery, equipment, and supplies",
            "services.detail.p3.list3": "Wholesale of industrial goods",
            "services.detail.p4.title": "Logistics & Transport",
            "services.detail.p4.desc": "To support supply chains and smooth distribution, the Company operates in logistics and transportation, including land transport support activities, cargo handling, and cargo management services.",
            "services.detail.p4.list1": "Handling and management of goods and cargo",
            "services.detail.p4.list2": "Loading, unloading, and warehousing activities",
            "services.detail.p4.list3": "Distribution and transportation support services",
            "services.detail.outro.title": "Integrated Approach",
            "services.detail.outro.desc": "The Company's strength lies in an integrated business approach, where each business area supports one another and provides added value to clients.",
            "services.detail.val1": "Regulatory Compliance",
            "services.detail.val2": "Transparency",
            "services.detail.val3": "Occupational Safety (HSE)",
            "services.detail.val4": "Sustainability",
            "projects.title": "Featured Projects",
            "projects.subtitle": "Our portfolio of successful track records in the field.",
            "projects.p1.title": "Trans Sulawesi Highway Improvement",
            "projects.p1.desc": "Asphalting and widening main roads for better logistics access.",
            "projects.p2.title": "Substation & Transmission Installation",
            "projects.p2.desc": "Construction of electrical infrastructure to support regional energy supply.",
            "projects.p3.title": "Supervision for Office Building Construction",
            "projects.p3.desc": "Construction of high-rise buildings with modern safety standards.",
            "projects.view": "VIEW DETAILS",
            "projects.detail.intro1": "As a company operating in various strategic sectors, PT. Daya Karya Energi has and continues to carry out various activities and projects supporting infrastructure development, energy provision, as well as supply chain and distribution smoothness. Every project we execute is a reflection of the Company's commitment to quality, safety, punctuality, and regulatory compliance.",
            "projects.detail.intro2": "Our project portfolio covers civil construction, energy and electricity, wholesale trading of materials and equipment, as well as logistics and transportation support services.",
            "projects.cat1.title": "Civil Construction Projects",
            "projects.cat1.l1": "Road and bridge construction and improvement",
            "projects.cat1.l2": "Supporting civil building works",
            "projects.cat1.l3": "Provision of project operational support personnel",
            "projects.cat2.title": "Energy & Electricity Projects",
            "projects.cat2.l1": "Power generation operations",
            "projects.cat2.l2": "Power transmission and distribution systems",
            "projects.cat2.l3": "Electrical technical support activities",
            "projects.cat3.title": "Wholesale Trading & Procurement",
            "projects.cat3.l1": "Procurement of building materials and supplies",
            "projects.cat3.l2": "Procurement of machinery and spare parts",
            "projects.cat3.l3": "Trading on a contract or fee basis",
            "projects.cat4.title": "Logistics & Distribution",
            "projects.cat4.l1": "Cargo handling and management",
            "projects.cat4.l2": "Loading, unloading, and distribution activities",
            "projects.cat4.l3": "Project transport support services",
            "projects.approach.title": "Execution Approach",
            "projects.approach.l1": "Meticulous planning and coordination",
            "projects.approach.l2": "Effective resource management",
            "projects.approach.l3": "Strict quality control and HSE",
            "projects.sust.title": "Sustainability Commitment",
            "projects.sust.desc": "We realize that every project has an impact. Therefore, PT. Daya Karya Energi is committed to running projects responsibly, paying attention to safety, environmental aspects, and long-term business sustainability.",
            "projects.closing": "\"PT. Daya Karya Energi continues to open cooperation opportunities and is ready to become a trusted partner in the execution of your strategic projects.\"",
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

    // Initial Load
    setLanguage('id');
    showPage('beranda');

});
