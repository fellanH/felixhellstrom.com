;(function () {
  var BATCH = 9;
  var grid = document.querySelector('.bento-grid');
  if (!grid) return;

  var items = Array.from(grid.querySelectorAll('.bento-item'));
  var filterBtns = document.querySelectorAll('.filter-btn');
  var loadMoreBtn = document.getElementById('load-more');
  if (!loadMoreBtn) return;

  var activeFilter = 'all';

  function updateVisibility() {
    var matching = items.filter(function (el) {
      return activeFilter === 'all' || el.getAttribute('data-type') === activeFilter;
    });
    var nonMatching = items.filter(function (el) {
      return activeFilter !== 'all' && el.getAttribute('data-type') !== activeFilter;
    });

    // Hide non-matching
    nonMatching.forEach(function (el) {
      el.classList.add('hidden');
    });

    if (activeFilter === 'all') {
      // Show first BATCH visible, hide rest
      var visibleCount = 0;
      items.forEach(function (el) {
        if (visibleCount < BATCH) {
          el.classList.remove('hidden');
          visibleCount++;
        } else {
          el.classList.add('hidden');
        }
      });
      loadMoreBtn.textContent = 'Show more';
      loadMoreBtn.parentElement.style.display = visibleCount < items.length ? '' : 'none';
    } else {
      // Show ALL matching when a filter is active
      matching.forEach(function (el) {
        el.classList.remove('hidden');
      });
      loadMoreBtn.parentElement.style.display = 'none';
    }
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      updateVisibility();
    });
  });

  loadMoreBtn.addEventListener('click', function () {
    var hidden = items.filter(function (el) {
      return el.classList.contains('hidden');
    });
    var toShow = hidden.slice(0, BATCH);
    toShow.forEach(function (el) {
      el.classList.remove('hidden');
    });
    var remaining = items.filter(function (el) {
      return el.classList.contains('hidden');
    });
    if (remaining.length === 0) {
      loadMoreBtn.parentElement.style.display = 'none';
    }
  });
})();

