/* ============================================
   RG Portfolio - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============ MOBILE MENU ============
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  let menuOpen = false;

  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('mobile-menu-enter');
      menuIcon.setAttribute('data-icon', 'lucide:x');
    } else {
      closeMobileMenu();
    }
  });

  function closeMobileMenu() {
    menuOpen = false;
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('mobile-menu-enter');
    menuIcon.setAttribute('data-icon', 'lucide:menu');
  }

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (menuOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // ============ NAVBAR SCROLL EFFECT ============
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    // Back to top button
    if (scrollY > 500) {
      backToTop.classList.add('back-to-top-visible');
    } else {
      backToTop.classList.remove('back-to-top-visible');
    }

    // Active nav link based on scroll position
    updateActiveNavLink();
  });

  // Back to top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============ ACTIVE NAV LINK ON SCROLL ============
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function updateActiveNavLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        // Desktop links
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
        // Mobile links
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ============ SCROLL ANIMATIONS (Fade Up) ============
  const fadeElements = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ============ PROGRESS BAR ANIMATION ============
  const progressBars = document.querySelectorAll('.progress-bar');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        progressObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  progressBars.forEach(bar => progressObserver.observe(bar));

  // ============ PORTFOLIO FILTER ============
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden-item');
          item.classList.add('visible-item');
          item.style.display = '';
        } else {
          item.classList.remove('visible-item');
          item.classList.add('hidden-item');
          // Use timeout to allow CSS animation to complete
          setTimeout(() => {
            if (item.classList.contains('hidden-item')) {
              item.style.display = 'none';
            }
          }, 400);
        }
      });
    });
  });

  // ============ CONTACT FORM ============
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      return;
    }

    // Simulate sending (loading state)
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="iconify btn-loading" data-icon="lucide:loader-2" data-width="18"></span>
      Sending...
    `;
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-70', 'cursor-not-allowed');

    // Simulate API call delay
    setTimeout(() => {
      // Show success message
      formSuccess.classList.remove('hidden');
      formSuccess.style.animation = 'slideDown 0.3s ease-out';

      // Reset form
      contactForm.reset();

      // Restore button
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');

      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.classList.add('hidden');
      }, 5000);
    }, 1500);
  });

  // ============ SMOOTH SCROLL FOR ALL ANCHOR LINKS ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============ TYPING EFFECT FOR HERO (Subtle) ============
  // Optional: Add a subtle cursor blink to the hero subtitle
  const heroSubtitle = document.querySelector('#home p.text-primary-400');
  if (heroSubtitle) {
    heroSubtitle.style.borderRight = '2px solid rgba(96, 165, 250, 0.6)';
    heroSubtitle.style.paddingRight = '4px';
    heroSubtitle.style.display = 'inline-block';

    setInterval(() => {
      heroSubtitle.style.borderRightColor =
        heroSubtitle.style.borderRightColor === 'transparent'
          ? 'rgba(96, 165, 250, 0.6)'
          : 'transparent';
    }, 800);

    // Stop cursor after 4 seconds
    setTimeout(() => {
      heroSubtitle.style.borderRight = 'none';
      heroSubtitle.style.paddingRight = '0';
      heroSubtitle.style.display = '';
    }, 4000);
  }

  // ============ INITIAL CALLS ============
  updateActiveNavLink();

  console.log('%c🖥️ RG Portfolio', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
  console.log('%cBuilt by Poornima', 'font-size: 14px; color: #94a3b8;');
});