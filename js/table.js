/* ============================================================
   TABLE SCREEN — Control Logic
   ============================================================ */

let activeCategory = null;
let activeStory    = null;

// ---- Broadcast to wall screen via localStorage ----
function broadcast(event, payload) {
  localStorage.setItem('shockoe_event', JSON.stringify({ event, payload, ts: Date.now() }));
}

// ---- Build pins ----
function buildPins() {
  const layer = document.getElementById('pin-layer');
  layer.innerHTML = '';

  STORIES.forEach(story => {
    const cat = CATEGORIES[story.category];
    const g   = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `pin pin-${story.category}`);
    g.setAttribute('id', `pin-${story.id}`);
    g.setAttribute('data-id', story.id);
    g.style.setProperty('--cat-color', cat.color);

    const { x, y } = story.pin;

    if (cat.pinShape === 'square') {
      const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('x', x - 7);
      r.setAttribute('y', y - 7);
      r.setAttribute('width', 14);
      r.setAttribute('height', 14);
      r.setAttribute('rx', 2);
      g.appendChild(r);
    } else if (cat.pinShape === 'circle') {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', x);
      c.setAttribute('cy', y);
      c.setAttribute('r', 7);
      g.appendChild(c);
    } else if (cat.pinShape === 'diamond') {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      p.setAttribute('points', `${x},${y-9} ${x+7},${y} ${x},${y+9} ${x-7},${y}`);
      g.appendChild(p);
    }

    // Pulse ring
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ring.setAttribute('cx', x);
    ring.setAttribute('cy', y);
    ring.setAttribute('r', 14);
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', cat.color);
    ring.setAttribute('stroke-width', 1);
    ring.setAttribute('opacity', 0.3);
    ring.setAttribute('class', 'pin-pulse');
    g.insertBefore(ring, g.firstChild);

    g.addEventListener('click', () => selectStory(story.id));
    layer.appendChild(g);
  });
}

// ---- Category selection ----
function selectCategory(catId) {
  activeCategory = catId;
  activeStory    = null;

  // Update tabs
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.cat === catId);
  });

  // Show/hide pins
  STORIES.forEach(story => {
    const pin = document.getElementById(`pin-${story.id}`);
    if (!pin) return;
    const visible = story.category === catId;
    pin.classList.toggle('hidden', !visible);
    pin.classList.remove('active');
  });

  // Close drawer
  document.getElementById('story-drawer').classList.remove('open');

  // Broadcast to wall
  broadcast('category', { catId });
}

// ---- Story selection ----
function selectStory(storyId) {
  const story = STORIES.find(s => s.id === storyId);
  if (!story) return;

  activeStory = storyId;
  const cat   = CATEGORIES[story.category];

  // Highlight active pin
  document.querySelectorAll('.pin').forEach(p => p.classList.remove('active'));
  const pin = document.getElementById(`pin-${storyId}`);
  if (pin) pin.classList.add('active');

  // Open drawer
  const drawer = document.getElementById('story-drawer');
  const catEl  = document.getElementById('drawer-cat');
  catEl.textContent  = cat.label;
  catEl.style.color  = cat.color;
  document.getElementById('drawer-title').textContent    = story.title;
  document.getElementById('drawer-subtitle').textContent = story.subtitle;
  document.getElementById('drawer-body').textContent     = story.body;
  drawer.classList.add('open');

  // Broadcast to wall
  broadcast('story', { storyId });
}

// ---- Close drawer ----
document.getElementById('drawer-close').addEventListener('click', () => {
  document.getElementById('story-drawer').classList.remove('open');
  document.querySelectorAll('.pin').forEach(p => p.classList.remove('active'));
  activeStory = null;
  broadcast('clearStory', {});
});

// ---- Init ----
buildPins();

// Start with all pins hidden; activate first category
selectCategory('traders');
