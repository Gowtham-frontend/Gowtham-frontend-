(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* Skills data */
  var skills = {
    'CI/CD': ['Jenkins', 'GitHub Actions'],
    'Containers': ['Docker', 'Kubernetes (Basics)'],
    'Cloud': ['AWS: EC2, S3, IAM', 'Azure (Basics)'],
    'Infrastructure as Code': ['Terraform'],
    'Version Control': ['Git', 'GitHub'],
    'Scripting': ['Bash', 'Python'],
    'Monitoring': ['Prometheus', 'Grafana'],
    'Operating Systems': ['Linux', 'Ubuntu', 'CentOS'],
    'Web & Digital Solutions': ['Website Design & Development', 'Landing Pages', 'Responsive Design', 'E-commerce Website Concepts', 'WhatsApp Chatbot & Automation', 'Basic SEO', 'Website Deployment', 'Website Testing & Maintenance']
  };
  var grid = $('#skillGrid'), filters = $('#filters');
  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  Object.keys(skills).forEach(function (k) {
    var c = document.createElement('div');
    c.className = 'card rv'; c.dataset.cat = k;
    c.innerHTML = '<h3>' + esc(k) + '</h3><ul>' + skills[k].map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>';
    grid.appendChild(c);
  });
  ['All'].concat(Object.keys(skills)).forEach(function (k, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = k; b.setAttribute('aria-pressed', i === 0);
    b.onclick = function () {
      filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      grid.querySelectorAll('.card').forEach(function (c) { c.hidden = k !== 'All' && c.dataset.cat !== k; });
    };
    filters.appendChild(b);
  });

  /* Scroll reveal */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 }) : null;
  document.querySelectorAll('.rv').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  /* Nav: sticky style, mobile menu, active link, back-to-top */
  var nav = $('#nav'), menu = $('#menu'), burger = $('#burger'), top = $('#top');
  function setMenu(o) { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); }
  burger.onclick = function () { setMenu(!menu.classList.contains('open')); };
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  var links = [].slice.call(menu.querySelectorAll('a'));
  window.addEventListener('scroll', function () {
    nav.classList.toggle('solid', scrollY > 30);
    top.classList.toggle('show', scrollY > 600);
    var cur = '';
    links.forEach(function (a) { var s = $(a.getAttribute('href')); if (s && s.getBoundingClientRect().top < 140) cur = a.getAttribute('href'); });
    links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === cur); });
  }, { passive: true });
  top.onclick = function () { scrollTo({ top: 0, behavior: 'smooth' }); };
  $('#yr').textContent = new Date().getFullYear();

  /* Contact form: opens the visitor's email app (no backend needed) */
  $('#form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, m = $('#msg');
    if (!f.checkValidity()) { m.textContent = 'Please fill in every field with a valid email.'; f.reportValidity(); return; }
    var body = f.message.value + '\n\nFrom: ' + f.name.value + ' (' + f.email.value + ')';
    location.href = 'mailto:dgowtham429@gmail.com?subject=' + encodeURIComponent(f.subject.value) + '&body=' + encodeURIComponent(body);
    m.textContent = 'Opening your email app to send the message.';
  });
  $('#wa').addEventListener('click', function () {
    var f = $('#form'), t = 'Hi Gowtham, ' + (f.message.value || 'I found your portfolio and would like to connect.');
    this.href = 'https://wa.me/918668070454?text=' + encodeURIComponent(t);
  });

  /* Hero background: drifting network of nodes (cloud / digital network) */
  var cv = $('#bg'), ctx = cv.getContext('2d'), pts = [], W, H;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function size() {
    W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight;
    pts = []; for (var i = 0; i < Math.min(60, W / 22); i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(function (p, i) {
      p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
      ctx.fillStyle = 'rgba(56,212,245,.7)'; ctx.fillRect(p.x, p.y, 2, 2);
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 130) { ctx.strokeStyle = 'rgba(56,212,245,' + (.18 * (1 - d / 130)) + ')'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
    });
    requestAnimationFrame(draw);
  }
  size(); draw(); addEventListener('resize', size);
})();
