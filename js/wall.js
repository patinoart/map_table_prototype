/* ============================================================
   WALL SCREEN — Display Logic
   Listens for localStorage events broadcast by the table screen
   ============================================================ */

const CAT_DESCRIPTIONS = {
  traders: 'Wall Street in Shockoe Bottom was home to dozens of slave trading firms. These businesses bought, sold, and transported enslaved people across the South, generating enormous wealth for traders and the broader Richmond economy.',
  women:   'Enslaved women passed through Shockoe Bottom in the tens of thousands. Their stories—of family separation, resistance, survival, and resilience—are central to understanding the human cost of the domestic slave trade.',
  locations: 'The slave trade did not exist in isolation. It was embedded in the physical landscape of Richmond—beside churches, homes, schools, and Free Black neighborhoods. These locations reveal the proximity of commerce and brutality.',
};

// ---- State management ----
function showState(state) {
  document.getElementById('idle-state').classList.toggle('hidden', state !== 'idle');
  document.getElementById('cat-state').classList.toggle('visible', state === 'cat');
  document.getElementById('story-state').classList.toggle('visible', state === 'story');
}

// ---- Category activated ----
function onCategory(catId) {
  const cat = CATEGORIES[catId];
  if (!cat) return;

  // Color bar
  document.getElementById('cat-context').style.background = cat.color;

  // Fill category state
  document.getElementById('cat-state-label').textContent = cat.label;
  document.getElementById('cat-state-label').style.color = cat.color;
  document.getElementById('cat-state-title').textContent = cat.label;
  document.getElementById('cat-state-desc').textContent  = CAT_DESCRIPTIONS[catId] || '';

  // Show all pins for this category on wall map
  renderWallPins(catId, null);

  showState('cat');

  // Re-trigger fade
  const el = document.getElementById('cat-state');
  el.classList.remove('fade-in');
  void el.offsetWidth;
  el.classList.add('fade-in');
}

// ---- Story activated ----
function onStory(storyId) {
  const story = STORIES.find(s => s.id === storyId);
  if (!story) return;

  const cat = CATEGORIES[story.category];

  // Color bar
  document.getElementById('cat-context').style.background = cat.color;

  // Fill story panel
  const catLabel = document.getElementById('story-cat-label');
  catLabel.textContent = cat.label;
  catLabel.style.color = cat.color;

  document.getElementById('story-title').textContent    = story.title;
  document.getElementById('story-subtitle').textContent = story.subtitle;
  document.getElementById('story-body').textContent     = story.body;
  document.getElementById('story-location').textContent = story.location;
  document.getElementById('story-years').textContent    = story.years;

  const rule = document.getElementById('story-rule');
  rule.style.background = cat.color;

  // Wall map: show pin
  renderWallPins(story.category, story.id);
  positionSpotlight(story.pin.x, story.pin.y);

  showState('story');

  // Retrigger fade on text panel
  const panel = document.getElementById('story-text-panel');
  panel.classList.remove('fade-in');
  void panel.offsetWidth;
  panel.classList.add('fade-in');
}

// ---- Clear story (back to category) ----
function onClearStory() {
  showState('idle');
  document.getElementById('cat-context').style.background = 'var(--border)';
  document.getElementById('wall-pin-layer').innerHTML = '';
}

// ---- Render wall map pins ----
function renderWallPins(catId, activeId) {
  const layer = document.getElementById('wall-pin-layer');
  layer.innerHTML = '';
  const cat = CATEGORIES[catId];

  STORIES.filter(s => s.category === catId).forEach(story => {
    const isActive = story.id === activeId;
    const { x, y }  = story.pin;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.style.setProperty('--cat-color', cat.color);

    // Outer glow ring for active
    if (isActive) {
      const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      glow.setAttribute('cx', x);
      glow.setAttribute('cy', y);
      glow.setAttribute('r', 22);
      glow.setAttribute('fill', 'none');
      glow.setAttribute('stroke', cat.color);
      glow.setAttribute('stroke-width', 1);
      glow.setAttribute('opacity', 0.2);
      g.appendChild(glow);

      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('cx', x);
      ring.setAttribute('cy', y);
      ring.setAttribute('r', 14);
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', cat.color);
      ring.setAttribute('stroke-width', 1.5);
      ring.setAttribute('opacity', 0.5);
      g.appendChild(ring);
    }

    // Pin shape
    const size = isActive ? 10 : 6;
    const opacity = isActive ? 1 : 0.35;

    if (cat.pinShape === 'square') {
      const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('x', x - size);
      r.setAttribute('y', y - size);
      r.setAttribute('width', size * 2);
      r.setAttribute('height', size * 2);
      r.setAttribute('rx', 2);
      r.setAttribute('fill', cat.color);
      r.setAttribute('opacity', opacity);
      g.appendChild(r);
    } else if (cat.pinShape === 'circle') {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', x);
      c.setAttribute('cy', y);
      c.setAttribute('r', size);
      c.setAttribute('fill', cat.color);
      c.setAttribute('opacity', opacity);
      g.appendChild(c);
    } else if (cat.pinShape === 'diamond') {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      p.setAttribute('points', `${x},${y - size * 1.3} ${x + size},${y} ${x},${y + size * 1.3} ${x - size},${y}`);
      p.setAttribute('fill', cat.color);
      p.setAttribute('opacity', opacity);
      g.appendChild(p);
    }

    layer.appendChild(g);
  });
}

// ---- Position spotlight on wall map ----
function positionSpotlight(pinX, pinY) {
  const svg    = document.getElementById('wall-map-svg');
  const panel  = document.getElementById('story-map-panel');
  const vb     = svg.viewBox.baseVal; // 800 x 520
  const rect   = panel.getBoundingClientRect();

  const scaleX = rect.width  / vb.width;
  const scaleY = rect.height / vb.height;

  // xMidYMid slice: use the larger scale
  const scale  = Math.max(scaleX, scaleY);
  const offsetX = (rect.width  - vb.width  * scale) / 2;
  const offsetY = (rect.height - vb.height * scale) / 2;

  const sx = pinX * scale + offsetX;
  const sy = pinY * scale + offsetY;

  const spot = document.getElementById('wall-spotlight');
  spot.style.left = sx + 'px';
  spot.style.top  = sy + 'px';
}

// ---- Listen for table broadcasts ----
window.addEventListener('storage', (e) => {
  if (e.key !== 'shockoe_event') return;
  try {
    const { event, payload } = JSON.parse(e.newValue);
    if (event === 'category')  onCategory(payload.catId);
    if (event === 'story')     onStory(payload.storyId);
    if (event === 'clearStory') onClearStory();
  } catch (_) {}
});

// ---- Init ----
showState('idle');
