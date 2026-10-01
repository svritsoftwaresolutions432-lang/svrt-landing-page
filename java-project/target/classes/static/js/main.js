// SVR IT Software Solutions - Frontend interactions
(function () {
  'use strict';

  // Sticky header shadow on scroll
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  }

  // Mobile menu toggle
  const toggleBtn = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  // Circular progress animation
  const circles = document.querySelectorAll('.progress-circle');
  const circumference = 2 * Math.PI * 79;

  const animateCircle = (el) => {
    const value = parseInt(el.getAttribute('data-value'), 10);
    const ring = el.querySelector('.progress-ring');
    const label = el.querySelector('.progress-value');
    const offset = circumference - (value / 100) * circumference;
    ring.style.strokeDashoffset = offset;

    let current = 0;
    const duration = 1200;
    const steps = 60;
    const step = Math.max(1, value / steps);
    const timer = setInterval(() => {
      current += step;
      if (current >= value) { current = value; clearInterval(timer); }
      label.textContent = Math.round(current) + '%';
    }, duration / steps);
  };

  const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCircle(e.target);
        circleObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  circles.forEach(c => circleObserver.observe(c));

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (el) => {
    const target = el.getAttribute('data-target');
    const num = parseInt(target, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(num / 30));
    el.textContent = '0+';
    const timer = setInterval(() => {
      current += step;
      if (current >= num) { current = num; clearInterval(timer); }
      el.textContent = current + '+';
    }, 40);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // File upload display
  const cvFile = document.getElementById('cvFile');
  const fileName = document.getElementById('fileName');
  if (cvFile && fileName) {
    cvFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) { fileName.textContent = 'No file chosen.'; return; }
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file only.');
        cvFile.value = '';
        fileName.textContent = 'No file chosen.';
        return;
      }
      fileName.textContent = file.name;
    });
  }
})();
