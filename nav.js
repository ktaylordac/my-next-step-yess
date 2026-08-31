function setupToggle(toggleSelector, targetSelector) {
  var toggle = document.querySelector(toggleSelector);
  var target = document.querySelector(targetSelector);
  if (!toggle || !target) return;

  toggle.addEventListener('click', function () {
    var isOpen = target.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  target.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      target.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  setupToggle('.nav-toggle', '#primary-nav');
  setupToggle('.toc-toggle', '#toc-list');
});
