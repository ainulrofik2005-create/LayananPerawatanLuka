// Fungsi untuk toggle hamburger menu
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
}

// Fungsi untuk menghubungi WhatsApp dengan nomor spesifik
function contactWAWithNumber(phoneNumber, service) {
    const message = `Halo, saya tertarik dengan ${service}. Bisa info lebih lanjut?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Fungsi untuk menghubungi WhatsApp menggunakan nomor default (untuk tombol "Beli via WA")
function contactWA(service) {
    const phoneNumber = '6281234567890'; // ganti dengan nomor WA default Anda
    const message = `Halo, saya tertarik dengan ${service}. Bisa info lebih lanjut?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Fungsi untuk menampilkan section tertentu
function showSection(sectionId) {
    // Sembunyikan semua section dengan animasi
    document.querySelectorAll('.dashboard').forEach(section => {
        if (section.classList.contains('active')) {
            section.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                section.classList.remove('active');
                section.style.animation = '';
            }, 300);
        }
    });

    // Tampilkan section yang dipilih dengan delay
    setTimeout(() => {
        const targetSection = document.getElementById(sectionId);
        targetSection.classList.add('active');
        targetSection.style.animation = 'fadeInUp 0.5s ease-out forwards';

        // Animasi staggered untuk items
        const items = targetSection.querySelectorAll('.service-item, .product-item, .tutorial-item, .consultation-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }, 300);

    // Update nav active
    document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active');
    });
    const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Event listener untuk navigasi
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Ambil id tanpa #
        showSection(targetId);
        // Close menu on mobile
        const menu = document.getElementById('nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
        }
        if (hamburger && hamburger.classList.contains('open')) {
            hamburger.classList.remove('open');
        }
    });
});

// Tampilkan section pertama secara default
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
        showSection('services');
    }, 100);
});

// Fungsi untuk menampilkan modal pemilihan perawat
function showNurseSelection(service) {
    const modal = document.getElementById('nurseModal');
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = `Pilih Perawat untuk ${service}`;
    modal.classList.add('show');

    // Update onclick buttons with service
    const buttons = modal.querySelectorAll('.nurse-option button');
    buttons.forEach(button => {
        const phone = button.getAttribute('onclick').match(/'(\d+)'/)[1];
        button.setAttribute('onclick', `contactWAWithNumber('${phone}', '${service}')`);
    });
}

// Fungsi untuk menutup modal
function closeModal() {
    const modal = document.getElementById('nurseModal');
    modal.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => {
        modal.classList.remove('show');
        modal.style.animation = '';
    }, 300);
}

// Tutup modal saat klik di luar
window.onclick = function(event) {
    const modal = document.getElementById('nurseModal');
    if (event.target == modal) {
        modal.classList.remove('show');
    }
}