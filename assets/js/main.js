/* =============================================================
   1) Chuyển đổi ngôn ngữ Việt / Anh
   2) Hiệu ứng xuất hiện khi cuộn
   3) Thư viện ảnh phóng to (lightbox)
   Trang vẫn đọc được bình thường nếu tắt JavaScript (mặc định tiếng Việt).
   ============================================================= */

/* ---------- 1. Ngôn ngữ ---------- */
(function () {
  var KEY = 'han-portfolio-lang';
  var btns = document.querySelectorAll('.lang button');

  function apply(lang) {
    // Mọi phần tử có data-vi / data-en đều được đổi nội dung
    document.querySelectorAll('[data-vi]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val !== null) el.innerHTML = val;
    });
    // Thuộc tính alt của ảnh
    document.querySelectorAll('[data-alt-vi]').forEach(function (el) {
      var val = el.getAttribute('data-alt-' + lang);
      if (val !== null) el.setAttribute('alt', val);
    });
    // Liên kết đổi theo ngôn ngữ (ví dụ: CV tiếng Việt / tiếng Anh)
    document.querySelectorAll('[data-href-vi]').forEach(function (el) {
      var val = el.getAttribute('data-href-' + lang);
      if (val !== null) el.setAttribute('href', val);
    });
    // Tiêu đề trang + thẻ mô tả
    var t = document.body.getAttribute('data-title-' + lang);
    if (t) document.title = t;
    var d = document.body.getAttribute('data-desc-' + lang);
    var meta = document.querySelector('meta[name="description"]');
    if (d && meta) meta.setAttribute('content', d);

    document.documentElement.setAttribute('lang', lang === 'vi' ? 'vi' : 'en');
    btns.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'en') apply('en');          // mặc định là tiếng Việt

  btns.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.dataset.lang); });
  });
})();

/* ---------- 2. Hiệu ứng xuất hiện ---------- */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
})();

/* ---------- 3. Lightbox ---------- */
(function () {
  var gal = document.querySelector('.gallery');
  var lb = document.getElementById('lightbox');
  if (!gal || !lb) return;

  var srcs = [].slice.call(gal.querySelectorAll('img')).map(function (im) {
    return im.getAttribute('data-full') || im.src;
  });
  var img = lb.querySelector('img');
  var count = lb.querySelector('.lb-count');
  var i = 0;

  function show(n) {
    i = (n + srcs.length) % srcs.length;
    img.src = srcs[i];
    count.textContent = (i + 1) + ' / ' + srcs.length;
  }
  function open(n) { show(n); lb.setAttribute('open-state', '1'); document.body.style.overflow = 'hidden'; }
  function close() { lb.removeAttribute('open-state'); document.body.style.overflow = ''; }

  gal.querySelectorAll('button').forEach(function (b, n) {
    b.addEventListener('click', function () { open(n); });
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(i - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(i + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.hasAttribute('open-state')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
})();

/* năm ở chân trang */
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
