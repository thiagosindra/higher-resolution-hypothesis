(function () {
  // Determine desired level from query (?level=tech|std|gen), default to 'std'
  const params = new URLSearchParams(window.location.search);
  const level = (params.get('level') || 'std').toLowerCase(); // 'tech' | 'std' | 'gen'

  // Map level -> tab id
  const map = { tech: 'tab-tech', std: 'tab-std', gen: 'tab-gen' };
  const desired = map[level] || 'tab-std';

  // Activate tab links and panels
  function activate(id) {
    document.querySelectorAll('.tab-choices a').forEach(a => {
      a.classList.toggle('active', a.dataset.tab === id);
    });
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.toggle('active', p.id === id);
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    // Wire tab buttons
    document.querySelectorAll('.tab-choices a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = a.dataset.tab;
        activate(id);

        // Update next/prev links to preserve level
        document.querySelectorAll('a[data-nav]').forEach(link => {
          const url = new URL(link.href);
          url.searchParams.set('level', Object.keys(map).find(k => map[k] === id) || 'std');
          link.href = url.toString();
        });
      });
    });

    // Activate desired level
    activate(desired);

    // Ensure nav links preserve level on load
    document.querySelectorAll('a[data-nav]').forEach(link => {
      const url = new URL(link.href);
      url.searchParams.set('level', level);
      link.href = url.toString();
    });
  });
})();
