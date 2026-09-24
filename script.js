// Mock data source (replace with real API calls as needed)
const mockData = {
  hero: {
    title: "Global markets rally as trade optimism grows",
    excerpt: "Stocks rose worldwide after a surge in investor confidence following new trade talks.",
    image: "https://images.unsplash.com/photo-1499951360447-b19061dffc0b?q=80&w=1200&auto=format&fit=crop",
  },
  breaking: [
    { id: 1, time: "2m", text: "Massive cyberattack disrupts services across multiple sectors" },
    { id: 2, time: "5m", text: "Emergency talks underway after sudden diplomatic breakthrough" },
    { id: 3, time: "12m", text: "Key inflation data beats expectations in most regions" }
  ],
  categories: [
    { id: "world", title: "World", color: "#4cc9f0" },
    { id: "business", title: "Business", color: "#ffd166" },
    { id: "tech", title: "Tech", color: "#a29bfe" },
    { id: "sports", title: "Sports", color: "#66e0a1" },
    { id: "science", title: "Science", color: "#f472b6" }
  ],
  articles: [
    { id: 101, title: "New climate pact aims to cut emissions by 40%", image: "https://images.unsplash.com/photo-1529336953121-302f9a4a79f0?q=80&w=1200&auto=format&fit=crop", category: "world" },
    { id: 102, title: "Tech giants unveil open AI safety standards", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop", category: "tech" },
    { id: 103, title: "Markets close higher amid easing fears", image: "https://images.unsplash.com/photo-1522098543979-ffc7f42c4a7d?q=80&w=1200&auto=format&fit=crop", category: "business" },
    { id: 104, title: "Underdog team clinches dramatic win in final seconds", image: "https://images.unsplash.com/photo-1521417531039-7a10f0b6d4b0?q=80&w=1200&auto=format&fit=crop", category: "sports" },
    { id: 105, title: "Researchers announce breakthrough in battery tech", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop", category: "science" }
  ]
};

// Elements
const tickerInner = document.getElementById('tickerInner');
const heroTitle = document.getElementById('heroTitle');
const heroExcerpt = document.getElementById('heroExcerpt');
const heroMedia = document.getElementById('heroMedia');
const breakingList = document.getElementById('breakingList');
const categoryCards = document.getElementById('categoryCards');
const newsFeed = document.getElementById('newsFeed');
const readMoreBtn = document.getElementById('readMore');
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('search');

// Initialize
function init() {
  // Hero
  heroTitle.textContent = mockData.hero.title;
  heroExcerpt.textContent = mockData.hero.excerpt;
  heroMedia.innerHTML = `<img src="${mockData.hero.image}" alt="Top story image" />`;

  // Ticker
  const tickers = mockData.breaking.map(b => `${b.time} ago: ${b.text}`).join(" • ");
  tickerInner.textContent = tickers;

  // Breaking
  renderBreaking(mockData.breaking);

  // Categories
  renderCategories(mockData.categories);

  // News feed
  renderNewsFeed(mockData.articles);
  // Theme
  applySavedTheme();
}

// Renderers
function renderBreaking(items) {
  breakingList.innerHTML = '';
  items.forEach(it => {
    const el = document.createElement('div');
    el.className = 'breaking-item';
    el.innerHTML = `<span class="t">${it.time} min</span>${it.text}`;
    breakingList.appendChild(el);
  });
}

function renderCategories(list) {
  categoryCards.innerHTML = '';
  list.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.border = `1px solid var(--border)`;
    card.innerHTML = `
      <div style="height:60px; background:${cat.color}; display:flex; align-items:center; justify-content:center; color:white; font-weight:700;">
        ${cat.title}
      </div>
      <div class="card-content">
        <span class="card-title">${cat.title}</span>
        <button class="btn" style="align-self:flex-start";>Explore</button>
      </div>
    `;
    categoryCards.appendChild(card);
  });
}

function renderNewsFeed(items) {
  newsFeed.innerHTML = '';
  items.forEach(it => {
    const el = document.createElement('div');
    el.className = 'feed-item';
    el.innerHTML = `
      <img src="${it.image}" alt="${it.title}">
      <div class="ft">
        <strong>${it.title}</strong>
        <span class="muted" style="font-size:12px; color:var(--muted);">Category: ${it.category}</span>
      </div>
    `;
    newsFeed.appendChild(el);
  });
}

// Interactions
readMoreBtn.addEventListener('click', () => {
  alert("This is a placeholder for the full article view.\nReplace with your route/navigation in production.");
});

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Theme restore
function applySavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// Simple search filter for articles
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  const results = mockData.articles.filter(a => a.title.toLowerCase().includes(q));
  renderNewsFeed(results.length ? results : mockData.articles);
});

// Start
init();
