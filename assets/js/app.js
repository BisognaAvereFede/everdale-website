/* ========= LOADER (min 2.5s) ========= */
(function(){
  const el = document.getElementById('loader');
  const start = Date.now();

  function hide() {
    const elapsed = Date.now() - start;
    const remaining = 2500 - elapsed; // 2.5s garantiti
    setTimeout(() => {
      el.classList.add('hide');
      setTimeout(() => el.remove(), 350);
    }, remaining > 0 ? remaining : 0);
  }

  window.addEventListener('load', hide);
  setTimeout(hide, 5000); // safety net
})();

/* ========= MODAL: Coming soon ========= */
(function() {
  const openBtn = document.getElementById('open-coming-soon');
  const modal   = document.getElementById('coming-soon-modal');
  const close1  = document.getElementById('modal-close');
  const backdrop= document.getElementById('modal-backdrop');

  function openModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openModal);
  close1?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();

/* ========= Carosello NEWS ========= */
(() => {
  const slides = [
    {
      title: "Hello 👋",
      tag: "NEWS",
      date: "02 Luglio 2025",
      desc: "Piccolo aggiornamento dall’isola: eventi del weekend, qualità della vita e anteprima delle prossime attività!",
      image: "images/news/hello.jpg",
      link: "pages/news/test"
    },
    {
      title: "Nuovo Evento 🎉",
      tag: "EVENTO",
      date: "15 Luglio 2025",
      desc: "Unisciti a noi per un evento speciale con ricompense uniche e tanto divertimento.",
      image: "images/news/evento.jpg",
      link: "pages/news/test"
    },
    {
      title: "Aggiornamento 🌴",
      tag: "UPDATE",
      date: "25 Luglio 2025",
      desc: "Nuove feature, bugfix e miglioramenti alla stabilità del server.",
      image: "images/news/update.jpg",
      link: "pages/news/test"
    }
  ];

  let idx = 0;
  const $img  = document.getElementById("news-image");
  const $title= document.getElementById("news-title");
  const $tag  = document.getElementById("news-tag");
  const $date = document.getElementById("news-date");
  const $desc = document.getElementById("news-desc");
  const $link = document.getElementById("news-link");
  const $btn  = document.getElementById("news-btn");

  function paint() {
    const s = slides[idx];
    $img.src = s.image;
    $title.textContent = s.title;
    $tag.textContent   = s.tag;
    $date.textContent  = s.date;
    $desc.textContent  = s.desc;
    $link.href = s.link;
    $btn.href  = s.link;
  }
  function go(i) { idx = (i + slides.length) % slides.length; paint(); }

  document.getElementById("news-prev").addEventListener("click", () => go(idx - 1));
  document.getElementById("news-next").addEventListener("click", () => go(idx + 1));
  setInterval(() => go(idx + 1), 10000);

  paint();
})();

/* ========= Carosello TEAM ========= */
(() => {
  const FT_SLIDES = [
    {
      name: "immenso",
      role: "Admin",
      bio: "Femboy",
      image: "assets/images/team/immenso.png",
      avatar: "images/avatars/immenso.png"
    },
    {
      name: "Mira",
      role: "DESIGNER",
      bio: "UI/UX, brand e motion. Do forma all’identità di Everdale e rendo chiara ogni interazione per i giocatori.",
      image: "assets/images/team/mira.png",
      avatar: "assets/images/avatars/mira.png"
    },
    {
      name: "Rex",
      role: "GAME DEV",
      bio: "Gameplay systems, minigames e bilanciamento. Trasformo le idee in modalità divertenti e rigiocabili.",
      image: "assets/images/team/rex.png",
      avatar: "assets/images/avatars/rex.png"
    }
  ];

  const $name = document.getElementById("ft-name");
  const $role = document.getElementById("ft-role");
  const $bio  = document.getElementById("ft-bio");
  const $img  = document.getElementById("ft-img");
  const $prev = document.getElementById("ft-prev");
  const $next = document.getElementById("ft-next");
  const $strip= document.getElementById("ft-strip");
  const $bar  = document.getElementById("ft-progress");

  if (!($name && $role && $bio && $img && $prev && $next && $strip && $bar)) return;

  let idx = 0;
  let raf = null;
  const DURATION = 10000; // 10s
  let startTime = null;

  function setSlide(i) {
    idx = (i + FT_SLIDES.length) % FT_SLIDES.length;
    const s = FT_SLIDES[idx];
    $name.textContent = s.name;
    $role.textContent = s.role;
    $bio.textContent  = s.bio;
    $img.src = s.image;
    paintAvatars();
    restartTimer();
  }

  function paintAvatars() {
    $strip.innerHTML = "";
    FT_SLIDES.forEach((s, i) => {
      const b = document.createElement("button");
      b.className = "avatar-btn" + (i===idx ? " active" : "");
      b.innerHTML = `<img src="assets/${s.avatar}" alt="${s.name}" class="w-8 h-8 rounded-lg">`;
      b.addEventListener("click", () => setSlide(i));
      $strip.appendChild(b);
    });
  }

  function restartTimer() {
    if (raf) cancelAnimationFrame(raf);
    startTime = performance.now();
    $bar.style.width = "0%";

    const tick = (t) => {
      const elapsed = t - startTime;
      const p = Math.max(0, Math.min(1, elapsed / DURATION));
      $bar.style.width = (p * 100).toFixed(3) + "%";
      if (p >= 1) setSlide(idx + 1);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  $prev.addEventListener("click", () => setSlide(idx - 1));
  $next.addEventListener("click", () => setSlide(idx + 1));

  setSlide(0);
})();

/* ========= Footer year ========= */
document.getElementById('year').textContent = new Date().getFullYear();

/* ========= Copy IP (se presenti i bottoni) ========= */
(function(){
  function bindCopy(btn) {
    btn.addEventListener('click', async () => {
      const ip = btn.dataset.ip || 'play.tuoserver.it';
      try {
        await navigator.clipboard.writeText(ip);
        const label = document.getElementById('copy-label');
        const icon  = document.getElementById('copy-icon');
        if (label) label.textContent = 'Copiato!';
        if (icon)  icon.textContent  = '✔️';
        setTimeout(() => {
          if (label) label.textContent = ip;
          if (icon)  icon.textContent  = '📋';
        }, 1500);
      } catch (e) { console.error(e); }
    });
  }
  document.querySelectorAll('#copy-ip, #copy-ip-footer').forEach(bindCopy);
})();

/* ========= Header scroll effect ========= */
(() => {
  const header = document.getElementById("site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("bg-white","text-slate-900","shadow","border-b");
      header.classList.remove("bg-transparent","text-white");
    } else {
      header.classList.add("bg-transparent","text-white");
      header.classList.remove("bg-white","text-slate-900","shadow","border-b");
    }
  });
})();

