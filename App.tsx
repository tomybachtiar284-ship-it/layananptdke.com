import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Hammer,
  Zap,
  Truck,
  Droplets,
  Briefcase,
  Building2,
  HardHat,
  Monitor
} from 'lucide-react';
import { Logo } from './components/Logo';
import { ServiceCard } from './components/ServiceCard';
import { Stats } from './components/Stats';
import { ServiceItem, TeamMember } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Data derived from the PDF (Pasal 3 - Maksud dan Tujuan)
  const services: ServiceItem[] = [
    {
      title: "Konstruksi Sipil & Infrastruktur",
      description: "Tenaga Pendukung Pekerjaan Pembangunan jalan raya, jembatan, bendungan, irigasi, dan infrastruktur sumber daya air lainnya. Termasuk pemeliharaan dan peningkatan fasilitas umum.",
      icon: HardHat,
      kbliCodes: ["4210", "4291", "4220"]
    },
    {
      title: "Energi & Kelistrikan",
      description: "Pendukung Tenaga Kerja Pekerjaan transmisi, dan distribusi tenaga listrik. Pembangkitan listrik (fosil & terbarukan), pemasangan instalasi listrik, dan penunjang kelistrikan.",
      icon: Zap,
      kbliCodes: ["3511", "3512", "3513"]
    },
    {
      title: "Perdagangan Besar",
      description: "Pendukung Distribusi material konstruksi (semen, pasir, batu), mesin, peralatan kantor, suku cadang elektronik, dan peralatan telekomunikasi.",
      icon: Briefcase,
      kbliCodes: ["4663", "4659", "4652"]
    },
    {
      title: "Logistik & Transportasi",
      description: "Pendukung Pekerjaan Layanan angkutan multimoda, aktivitas kurir, penanganan kargo (bongkar muat), dan penunjang angkutan lainnya.",
      icon: Truck,
      kbliCodes: ["5224", "5229", "5320"]
    },
    {
      title: "Konstruksi Khusus & Interior",
      description: "Tenaga Pendukung Penyiapan lahan (land clearing), penyelesaian konstruksi bangunan, dekorasi interior, pemasangan instalasi gedung, dan pengerjaan lantai/dinding.",
      icon: Hammer,
      kbliCodes: ["4312", "4330"]
    },
    {
      title: "Tenaga Pendukung Pekerjaan Pengolahan Air (Water Treatment)",
      description: "Penampungan, penjernihan, dan penyaluran air minum. Instalasi perpipaan dan pengelolaan sumber daya air bersih.",
      icon: Droplets,
      kbliCodes: ["3600", "42201"]
    },
    {
      title: "Industri Manufaktur Ringan",
      description: "Tenaga pendukung Pekerjaan Industri barang dari semen, kapur, gips, keramik, serta barang bangunan dari kayu dan tekstil untuk keperluan rumah tangga.",
      icon: Building2,
      kbliCodes: ["2395", "1622", "1392"]
    },
    {
      title: "Teknologi & Komputer",
      description: "Tenaga pendukung Pekerjaan Perdagangan besar komputer, perlengkapan komputer, dan piranti lunak (software) untuk kebutuhan bisnis dan industri.",
      icon: Monitor,
      kbliCodes: ["4651"]
    }
  ];

  const leadership: TeamMember[] = [
    { name: "Tn ABDUL RAHMAN", role: "Direktur Utama" },
    { name: "Tn ABD. RAHMAN MALOTOLO", role: "Komisaris" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2 border-b border-white/20' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {['Beranda', 'Tentang Kami', 'Layanan', 'Kontak'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`font-medium hover:text-red-600 transition-colors ${scrolled ? 'text-gray-800' : 'text-gray-900 md:text-white md:mix-blend-difference'}`}
              >
                {item}
              </a>
            ))}
            <a href="#kontak" className="bg-red-600 text-white px-5 py-2 rounded-full font-medium hover:bg-red-700 transition-colors">
              Hubungi Kami
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-800 p-2 z-50">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-gray-800" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-8 md:hidden shadow-xl animate-fade-in">
            {['Beranda', 'Tentang Kami', 'Layanan', 'Kontak'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={toggleMenu}
                className="text-2xl font-bold text-gray-900 hover:text-blue-900"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative min-h-[90vh] flex items-center overflow-hidden py-20 md:py-0">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1474674556023-efef886fa147?q=80&w=2070&auto=format&fit=crop"
            alt="Construction Site"
            className="w-full h-full object-cover animate-scale-in"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/40"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-white">
          <div className="max-w-3xl">
            <div className="inline-block bg-red-600 px-3 py-1 text-sm font-bold uppercase tracking-wider mb-4 rounded-sm animate-fade-in delay-100">
              Inovasi Infrastruktur & Energi
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-slide-up delay-200">
              Membangun Masa Depan <br />
              <span className="text-red-500">Sulawesi Tengah</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl animate-slide-up delay-300">
              PT. Daya Karya Energi adalah mitra terpercaya dalam pekerjaan konstruksi sipil, penyediaan jasa tenaga pendukung pembangkit listrik, dan perdagangan besar yang berkomitmen pada kualitas dan integritas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-500">
              <a href="#layanan" className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-transform transform hover:scale-105 flex items-center justify-center gap-2">
                Layanan Kami <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#kontak" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center">
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* About Section */}
      <section id="tentang-kami" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                  alt="Engineering Plans"
                  className="rounded-lg shadow-2xl z-10 relative"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-600 rounded-lg -z-0 hidden md:block"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 rounded-full -z-0 hidden md:block"></div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-blue-900 text-sm font-bold uppercase tracking-widest mb-2">Tentang Perusahaan</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Dedikasi Profesionalisme dalam Setiap Proyek</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Didirikan berdasarkan Akta Notaris No. 31 Tahun 2025, PT. DAYA KARYA ENERGI hadir untuk menjawab tantangan pembangunan infrastruktur dan kebutuhan energi di Indonesia, khususnya di wilayah Sulawesi Tengah.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Kami bergerak dengan landasan hukum yang kuat dan manajemen profesional untuk memberikan solusi terbaik di bidang konstruksi bangunan sipil, kelistrikan, dan perdagangan umum.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {leadership.map((person, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-900">
                    <p className="text-sm text-gray-500 uppercase">{person.role}</p>
                    <p className="font-bold text-lg text-gray-900">{person.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-blue-900 text-sm font-bold uppercase tracking-widest mb-2">Ruang Lingkup Kegiatan</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Solusi Bisnis Terintegrasi</h3>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Zap className="w-96 h-96 text-white" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Siap Bekerja Sama Dalam Proyek Anda?</h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk konsultasi mengenai kebutuhan konstruksi, pengadaan barang, atau solusi energi perusahaan Anda.
          </p>
          <a href="#kontak" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
            Hubungi Kami Sekarang
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-blue-900 text-sm font-bold uppercase tracking-widest mb-2">Informasi Kontak</h2>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Kantor Pusat</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-blue-900 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Alamat</h4>
                    <p className="text-gray-600">
                      Jalan Trans Sulawesi, Desa Sabo, <br />
                      Kecamatan Ampana Tete, Kabupaten Tojo Una-Una,<br />
                      Provinsi Sulawesi Tengah.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-blue-900 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Telepon</h4>
                    <p className="text-gray-600">0822-9348-3048</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-blue-900 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">ptdayakaryaenergy@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white">
        {/* Accent Bar */}
        <div className="w-full">
          <img
            src="/footer-accent.png"
            alt="Footer Accent"
            className="w-full h-auto object-cover max-h-12 md:max-h-16 lg:max-h-20"
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 py-12">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">

            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <img
                src="/brand-logo.png"
                alt="PT. Daya Karya Energi"
                className="h-12 md:h-16 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8 text-sm text-gray-400 font-medium">
              <a href="#" className="hover:text-white transition-colors">Beranda</a>
              <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
              <a href="#" className="hover:text-white transition-colors">Proyek</a>
              <a href="#kontak" className="hover:text-white transition-colors">Kontak</a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-blue-800 pt-8 text-sm text-blue-200 font-light">
            <p>&copy; {new Date().getFullYear()} PT. Daya Karya Energi. All rights reserved.</p>
            <p className="mt-2 text-xs opacity-70">Based on Akta Pendirian No. 31 Tanggal 29 Juli 2025.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "6282293483048";
    const text = `Halo Admin PT. Daya Karya Energi,%0A%0ASaya ingin bertanya.%0A%0ANama: ${formData.name}%0AEmail: ${formData.email}%0APesan: ${formData.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all"
          placeholder="Nama Anda"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all"
          placeholder="email@contoh.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
        <textarea
          rows={4}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all"
          placeholder="Bagaimana kami bisa membantu Anda?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        ></textarea>
      </div>

      <div className="flex flex-col gap-3">
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
          Kirim via WhatsApp
        </button>

        <a href="mailto:ptdayakaryaenergy@gmail.com" className="w-full bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 border border-blue-200">
          <Mail className="w-5 h-5" />
          Kirim via Email
        </a>
      </div>
    </form>
  );
};

export default App;