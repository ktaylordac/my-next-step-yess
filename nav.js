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

function setupSiteSearch() {
  var form = document.querySelector('.search-form');
  var input = document.querySelector('#site-search-input');
  var status = document.querySelector('#search-status');
  var results = document.querySelector('#search-results');
  if (!form || !input || !status || !results) return;

  var pages = [
    { title: 'Take My Next Step', url: 'transition.html', description: 'Enrollment, school placement, boundaries, and choosing your next step.', keywords: 'enroll enrollment placement school boundary transfer next step' },
    { title: "While You're Waiting", url: 'waiting.html', description: 'Ways to keep learning and prepare while you wait for placement.', keywords: 'waiting placement routine learning prepare school' },
    { title: 'Credits and Graduation', url: 'credits.html', description: 'Understand your credits, graduation requirements, and credit recovery.', keywords: 'credit credits graduation diploma tracker recovery transcript requirements' },
    { title: 'Records and Transcripts', url: 'records.html', description: 'Request or send your transcript and other school records.', keywords: 'record records transcript registrar request send school' },
    { title: 'YouScience', url: 'youscience.html', description: 'Explore your strengths, interests, aptitudes, and career matches.', keywords: 'youscience strength strengths interest interests aptitude career quiz' },
    { title: 'My Future', url: 'future.html', description: 'Compare work, military, technical school, and college pathways.', keywords: 'future career careers job jobs work college university technical trade military branches' },
    { title: 'Pay for My Future', url: 'pay-for-future.html', description: 'Find financial aid, scholarships, apprenticeships, and help paying for school.', keywords: 'money pay financial aid fafsa scholarship scholarships grant grants apprenticeship tuition' },
    { title: 'Adult Education', url: 'adult-education.html', description: 'Learn about adult high school, GED, and other graduation options.', keywords: 'adult education ged diploma graduate graduation high school' },
    { title: 'Special Education', url: 'special-education.html', description: 'Explore transition services and options for students with an IEP.', keywords: 'special education iep disability disabilities transition services accommodations' },
    { title: 'Community Resources', url: 'resources.html', description: 'Find help with food, housing, health, transportation, legal needs, and more.', keywords: 'resource resources food housing homeless health mental health transportation legal crisis safety childcare clothes clothing' },
    { title: 'Get Help', url: 'help.html', description: 'Contact a YESS counselor when you have questions or need support.', keywords: 'help question questions counselor contact email phone support crisis' }
  ];

  function searchPages() {
    var query = input.value.trim().toLowerCase();
    results.replaceChildren();

    if (query.length < 2) {
      status.textContent = query ? 'Type at least two letters to search.' : '';
      return [];
    }

    var words = query.split(/\s+/);
    var matches = pages.filter(function (page) {
      var searchable = (page.title + ' ' + page.description + ' ' + page.keywords).toLowerCase();
      return words.every(function (word) { return searchable.indexOf(word) !== -1; });
    });

    status.textContent = matches.length
      ? matches.length + (matches.length === 1 ? ' result' : ' results') + ' for “' + input.value.trim() + '”'
      : 'No results for “' + input.value.trim() + '”. Try a different word or ask a counselor for help.';

    matches.forEach(function (page) {
      var link = document.createElement('a');
      var title = document.createElement('b');
      var description = document.createElement('span');
      link.className = 'search-result';
      link.href = page.url;
      title.textContent = page.title;
      description.textContent = page.description;
      link.append(title, description);
      results.appendChild(link);
    });

    return matches;
  }

  input.addEventListener('input', searchPages);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var matches = searchPages();
    if (matches.length) window.location.href = matches[0].url;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  setupToggle('.nav-toggle', '#primary-nav');
  setupToggle('.toc-toggle', '#toc-list');
  setupSiteSearch();
});
