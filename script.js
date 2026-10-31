(function () {
  var btn = document.getElementById('kudos');
  var count = document.getElementById('kudos-count');
  var note = document.getElementById('kudos-note');
  var KEY = 'ao3-letter-kudos';

  function read() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function write(v) { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) {} }

  function render(on, announce) {
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    count.textContent = on ? '1' : '0';
    note.textContent = announce ? (on ? 'Thank you for leaving kudos!' : '') : '';
  }

  render(read(), false);
  btn.addEventListener('click', function () {
    var on = btn.getAttribute('aria-pressed') !== 'true';
    write(on);
    render(on, true);
  });

  document.getElementById('bookmark').addEventListener('click', function () {
    note.textContent = 'Bookmarking needs an account.';
    document.getElementById('feedback').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('share').addEventListener('click', function () {
    var url = location.href;
    if (navigator.share) { navigator.share({ title: document.title, url: url }).catch(function () {}); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(url).then(function () { note.textContent = 'Link copied.'; }); }
  });
})();