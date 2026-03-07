const BACKEND = "http://localhost:8000";
const SECTIONS    = ['sec1','sec2','sec3','sec4'];
let   currentIdx  = 0;
let   isScrolling = false;

function goTo(index) {
  if (index === currentIdx || isScrolling) return;
  if (index < 0 || index >= SECTIONS.length) return;

  isScrolling = true;

  for (let i = 1; i < SECTIONS.length; i++) {
    const el = document.getElementById(SECTIONS[i]);
    if (i <= index) el.classList.add('active');
    else            el.classList.remove('active');
  }

  currentIdx = index;
  updateDots();

 
  const feed = document.getElementById('globalFeed');
  if (index === 0) feed.classList.add('feed-hidden');
  else             feed.classList.remove('feed-hidden');

  
  if (index === 1) setTimeout(animateCounters, 400);

  setTimeout(() => { isScrolling = false; }, 950);
}


window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  if (e.deltaY > 30)  goTo(currentIdx + 1);
  if (e.deltaY < -30) goTo(currentIdx - 1);
}, { passive: true });


let touchY = 0;
window.addEventListener('touchstart', (e) => { touchY = e.touches[0].clientY; }, { passive: true });
window.addEventListener('touchend', (e) => {
  const diff = touchY - e.changedTouches[0].clientY;
  if (Math.abs(diff) < 50) return;
  if (diff > 0) goTo(currentIdx + 1);
  else          goTo(currentIdx - 1);
}, { passive: true });

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(currentIdx + 1);
  if (e.key === 'ArrowUp'   || e.key === 'PageUp')   goTo(currentIdx - 1);
});


function updateDots() {
  SECTIONS.forEach((_, i) => {
    const d = document.getElementById(`dot${i}`);
    if (d) d.classList.toggle('active', i === currentIdx);
  });
}
updateDots();

document.getElementById('globalFeed').classList.add('feed-hidden');


const stars     = document.querySelectorAll(".star");
const starsWrap = document.getElementById("stars");
const titleEl   = document.getElementById("title");
let   si        = 0;

function fillStars() {
  if (si < stars.length) {
    stars[si].classList.add("active");
    si++;
    setTimeout(fillStars, 400);
  } else {
    setTimeout(dissolveStars, 800);
  }
}

function dissolveStars() {
  starsWrap.style.opacity   = "0";
  starsWrap.style.transform = "scale(0.4)";
  setTimeout(() => { titleEl.classList.add("show"); }, 700);
}

fillStars();

const FAKE_REVIEWS = [
  { stars:"★★★★★", text:"BEST PRODUCT EVER!! Changed my life completely!! BUY NOW!!" },
  { stars:"★★★★★", text:"WOW!! Amazing quality!! 10/10 MUST BUY!! So incredible!!" },
  { stars:"★★★★★", text:"HIGHLY RECOMMEND!! Best purchase of my entire life!!" },
  { stars:"★★★★★", text:"Incredible!! Everyone should buy this RIGHT NOW!!" },
  { stars:"★★★★★", text:"SUPERB!! Great product!! Fast delivery!! LOVE IT SO MUCH!!" },
  { stars:"★★★★★", text:"OMGGGG!! This is amazing!! Cannot believe!! BUY BUY BUY!!" },
];

const REAL_REVIEWS = [
  { stars:"★★★★☆", text:"Good battery ~6hrs. Keyboard comfortable, fan loud under load." },
  { stars:"★★★☆☆", text:"Decent quality overall. Build okay, not great. Fair value." },
  { stars:"★★★★☆", text:"Works as described. 3 day delivery. Packaging was secure." },
  { stars:"★★★★★", text:"2 months in. Performance consistent. Very happy with purchase." },
  { stars:"★★★☆☆", text:"Average product. Does the job. Some minor issues with grip." },
];

function spawnBubble() {
  const feed = document.getElementById('globalFeed');
  const pool  = [...FAKE_REVIEWS, ...FAKE_REVIEWS, ...REAL_REVIEWS]; // more fakes for drama
  const item  = pool[Math.floor(Math.random() * pool.length)];
  const isFake = FAKE_REVIEWS.includes(item);

  const bubble = document.createElement('div');
  bubble.className = `review-bubble ${isFake ? 'fake' : 'real'}`;
  bubble.innerHTML = `
    <div class="r-stars">${item.stars}</div>
    <div class="r-text">${item.text}</div>
    <span class="r-badge">${isFake ? '🚩 FAKE DETECTED' : '✅ GENUINE'}</span>
  `;

  bubble.style.left             = `${1 + Math.random() * 90}%`;
  const dur                     = 10 + Math.random() * 9;
  bubble.style.animationDuration= `${dur}s`;
  bubble.style.animationDelay   = `${Math.random() * 2}s`;

  feed.appendChild(bubble);
  setTimeout(() => bubble.remove(), (dur + 3) * 1000);
}

// Start spawning immediately, every 1.6s
spawnBubble();
setInterval(spawnBubble, 1600);


let countersRan = false;

function animateCounters() {
  if (countersRan) return;
  countersRan = true;

  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let   current = 0;
    const step    = Math.ceil(target / 40);
    const timer   = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 35);
  });
}

// ══════════════════════════════════════════════════
// LIVE ANALYZER (Section 4)
// ══════════════════════════════════════════════════
const EXAMPLES = {
  fake1: "BEST PRODUCT EVER!!! Changed my life completely!! BUY NOW before stock runs out!! 5 STARS NO DOUBT!!! Amazing amazing amazing!!! MUST BUY IMMEDIATELY!! You won't regret it I PROMISE!!!",
  fake2: "WOW WOW WOW!!! TOP QUALITY PRODUCT!! I bought 10 of these as gifts for literally everyone!! Everyone absolutely loves it!! Best purchase of 2024 hands down!! HIGHLY RECOMMEND!! Don't miss this!!",
  real1: "I've been using this laptop for about 3 months now. Battery lasts around 6 hours under normal use which is decent. Build quality feels solid, keyboard is comfortable for long typing. One downside is the fan gets quite loud under heavy load. Overall good value for the price."
};

function loadExample(key) {
  const ta = document.getElementById('reviewInput');
  ta.value  = EXAMPLES[key];
  updateCharCount();
  resetBoxState();
  ta.focus();
}

// Auto-resize textarea
const ta = document.getElementById('reviewInput');
ta.addEventListener('input', () => {
  updateCharCount();
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
});

function updateCharCount() {
  // no visible counter in this version — kept for internal use
}

async function analyzeReview() {
  const review = document.getElementById('reviewInput').value.trim();
  if (!review || review.length < 10) {
    showError('Please enter a review with at least 10 characters.');
    return;
  }

  setLoading(true);
  hideError();
  hideResult();
  resetBoxState();

  try {
    const res  = await fetch(`${BACKEND}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review })
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();

    if (data.verdict === 'ERROR' || data.error) {
      showError(data.summary || data.error || 'Analysis failed. Please try again.');
      return;
    }

    renderResult(data);

  } catch (err) {
    showError('⚠️ Cannot connect to backend.\n\nMake sure FastAPI is running:\ncd backend → python -m uvicorn main:app --reload');
  } finally {
    setLoading(false);
  }
}

function renderResult(data) {
  const isFake = data.verdict === 'FAKE';
  const box    = document.getElementById('searchBox');
  const label  = document.getElementById('statusLabel');

  // Color the search box
  box.classList.remove('state-fake', 'state-real');
  box.classList.add(isFake ? 'state-fake' : 'state-real');

  // Status label
  label.className   = `status-label ${isFake ? 'show-fake' : 'show-real'}`;
  label.textContent = isFake ? '🚩 FAKE REVIEW DETECTED' : '✅ GENUINE REVIEW';

  // Result card
  const card = document.getElementById('resultCard');
  card.className = `result-card ${isFake ? 'is-fake' : 'is-real'}`;

  // Badge
  const badge = document.getElementById('verdictBadge');
  badge.className = `verdict-badge ${isFake ? 'badge-fake' : 'badge-real'}`;
  document.getElementById('verdictIcon').textContent = isFake ? '🚩' : '✅';
  document.getElementById('verdictText').textContent = data.verdict;

  // Confidence bar
  const fill = document.getElementById('confFill');
  fill.className = `conf-fill ${isFake ? 'fill-fake' : 'fill-real'}`;
  document.getElementById('confPct').textContent = `${data.confidence}%`;
  setTimeout(() => { fill.style.width = `${data.confidence}%`; }, 100);

  // Summary
  document.getElementById('resultSummary').textContent = `"${data.summary}"`;

  // Signals
  const list = document.getElementById('signalsList');
  list.innerHTML = '';
  (data.reasons || []).forEach((reason, i) => {
    const item = document.createElement('div');
    item.className = 'signal-item';
    item.style.animationDelay = `${0.08 + i * 0.1}s`;
    item.innerHTML = `<div class="signal-dot"></div><span>${reason}</span>`;
    list.appendChild(item);
  });

  card.style.display = 'block';
}

function resetForm() {
  document.getElementById('reviewInput').value = '';
  hideResult();
  hideError();
  resetBoxState();
}

function resetBoxState() {
  const box   = document.getElementById('searchBox');
  const label = document.getElementById('statusLabel');
  box.classList.remove('state-fake','state-real');
  label.className   = 'status-label';
  label.textContent = '';
}

function setLoading(on) {
  document.getElementById('analyzeBtn').disabled = on;
  document.getElementById('loadingWrap').style.display = on ? 'flex' : 'none';
}

function showError(msg) {
  const b = document.getElementById('errorBox');
  b.textContent = msg; b.style.display = 'block';
}

function hideError()  { document.getElementById('errorBox').style.display  = 'none'; }
function hideResult() { document.getElementById('resultCard').style.display = 'none'; }

// ── Image placeholder logic ──
window.addEventListener('load', () => {
  const img = document.querySelector('.workflow-img');
  const placeholder = document.querySelector('.img-placeholder');
  if (img && placeholder) {
    if (img.src && img.src !== window.location.href && img.getAttribute('src') !== '') {
      img.style.display = 'block';
      placeholder.style.display = 'none';
    } else {
      img.style.display = 'none';
      placeholder.style.display = 'block';
    }
    img.addEventListener('load', () => {
      img.style.display = 'block';
      placeholder.style.display = 'none';
    });
    img.addEventListener('error', () => {
      img.style.display = 'none';
      placeholder.style.display = 'block';
    });
  }
});

// Ctrl+Enter shortcut
document.getElementById('reviewInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.ctrlKey) analyzeReview();
});