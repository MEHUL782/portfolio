// script.js — safe and debug-friendly
document.addEventListener('DOMContentLoaded', () => {
  try {
    // tiny helpers
    const qs  = sel => document.querySelector(sel);
    const qsa = sel => Array.from(document.querySelectorAll(sel));

    console.log('script.js loaded — DOM ready');

    // 1) Smooth scroll for hash anchors (only if they exist)
    qsa('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (!target) return; // nothing to scroll to
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // 2) Mark current nav link as active (safe check)
    const navLinks = qsa('.navbar a');
    if (navLinks.length) {
      // get current filename (works for file:// and http(s) from same folder)
      const current = (location.pathname || '').split('/').pop() || 'index.html';
      navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        // use endsWith so "index.html" matches /index.html and ""
        if (href === current || href.endsWith(current) || (href === '' && current === 'index.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    // 3) Contact form handler — only attach if form exists
    const form = qs('.contact-form');
    if (form) {
      console.log('contact form found — attaching submit handler');
      form.addEventListener('submit', e => {
        e.preventDefault();

        const name  = form.querySelector('input[type="text"]')?.value?.trim() || '';
        const email = form.querySelector('input[type="email"]')?.value?.trim() || '';
        const msg   = form.querySelector('textarea')?.value?.trim() || '';

        if (!name || !email || !msg) {
          alert('Please fill in all fields before submitting.');
          return;
        }

        // For now we simply simulate send — you can integrate emailJS / backend later.
        console.log('Contact form submitted:', { name, email, msg });
        alert('Thanks! Your message has been received.');
        form.reset();
      });
    } else {
      console.log('no contact form on this page — skipping form setup');
    }

  } catch (err) {
    // If anything unexpected happens, log it but don't throw
    console.error('Unexpected error in script.js:', err);
  }
});
