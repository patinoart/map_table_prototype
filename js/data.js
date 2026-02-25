const CATEGORIES = {
  traders: {
    id: 'traders',
    label: 'Traders & Businesses',
    color: '#C8923A',
    pinShape: 'square',
  },
  women: {
    id: 'women',
    label: 'Enslaved Women',
    color: '#C47A6B',
    pinShape: 'circle',
  },
  locations: {
    id: 'locations',
    label: 'Locations',
    color: '#5B8FA8',
    pinShape: 'diamond',
  },
};

// Map pin coordinates are relative to the SVG viewBox (800 x 520)
const STORIES = [
  // --- TRADERS & BUSINESSES ---
  {
    id: 't1',
    category: 'traders',
    pin: { x: 382, y: 318 },
    title: 'Lumpkin\'s Slave Jail',
    subtitle: 'Robert Lumpkin, c. 1844–1865',
    body: 'Robert Lumpkin operated one of the largest slave trading complexes in Richmond at the corner of 15th and Wall Streets. Known as "Devil\'s Half Acre," the compound included holding pens, auction rooms, and a jail. Thousands of enslaved people passed through Lumpkin\'s facility before being sold and transported to the Deep South.',
    location: '15th & Wall Street',
    years: '1844–1865',
  },
  {
    id: 't2',
    category: 'traders',
    pin: { x: 290, y: 295 },
    title: 'Silas Omohundro & Co.',
    subtitle: 'Slave trader, Wall Street',
    body: 'Silas Omohundro ran a prominent slave trading business on Wall Street, dealing in the purchase and resale of enslaved people throughout the antebellum period. His ledgers document hundreds of transactions, recording the names, ages, and prices paid for men, women, and children.',
    location: 'Wall Street',
    years: 'c. 1840s–1860s',
  },
  {
    id: 't3',
    category: 'traders',
    pin: { x: 470, y: 305 },
    title: 'Hector Davis & Co.',
    subtitle: 'Auction house, 14th Street',
    body: 'Hector Davis operated one of Richmond\'s most active slave auction houses. Public sales were held regularly, drawing buyers from across the South. The auction block was a site of family separation—husbands, wives, and children were frequently sold apart from one another.',
    location: '14th Street near Wall',
    years: 'c. 1850s–1865',
  },

  // --- ENSLAVED WOMEN ---
  {
    id: 'w1',
    category: 'women',
    pin: { x: 382, y: 318 },
    title: 'Mary Lumpkin',
    subtitle: 'Enslaved at Lumpkin\'s Jail',
    body: 'Mary was enslaved by Robert Lumpkin and bore him several children. After emancipation, she returned to the site of Devil\'s Half Acre and, with the backing of Nathaniel Colver, established Colver Institute—a school for freedpeople. The site of bondage became a site of education and liberation.',
    location: 'Lumpkin\'s Jail, 15th & Wall St',
    years: 'c. 1850s–1867',
  },
  {
    id: 'w2',
    category: 'women',
    pin: { x: 330, y: 340 },
    title: 'Louisa',
    subtitle: 'Documented in trader\'s records',
    body: 'Louisa appears in the account books of a Wall Street trader, listed by first name, age, and price. Like thousands of women sold through Shockoe Bottom, she was separated from her family and community. Her full name, her story before and after the sale—these were not recorded.',
    location: 'Wall Street',
    years: 'c. 1855',
  },
  {
    id: 'w3',
    category: 'women',
    pin: { x: 440, y: 350 },
    title: 'Ann',
    subtitle: 'Held at a Wall Street jail',
    body: 'Ann was among the women held in the network of slave jails along Wall Street while awaiting sale. Conditions in these facilities were deliberately dehumanizing. Women in these pens were subject to physical abuse, coercion, and the constant threat of sale—and separation from their children.',
    location: 'Wall Street jail complex',
    years: 'c. 1858',
  },

  // --- LOCATIONS ---
  {
    id: 'l1',
    category: 'locations',
    pin: { x: 382, y: 318 },
    title: 'Devil\'s Half Acre',
    subtitle: 'Lumpkin\'s Jail complex',
    body: 'Spanning nearly a full city block, the complex known as Devil\'s Half Acre was anchored by Robert Lumpkin\'s slave jail at 15th and Wall Streets. The compound included auction rooms, holding pens, and living quarters for traders. It was one of the most feared destinations for enslaved people across the Upper South.',
    location: '15th & Wall Street',
    years: 'c. 1844–1865',
  },
  {
    id: 'l2',
    category: 'locations',
    pin: { x: 250, y: 200 },
    title: 'Beth Shalome Synagogue',
    subtitle: 'Jewish congregation, 19th St',
    body: 'Richmond\'s Jewish community lived and worshipped within close proximity to the slave trading district of Shockoe Bottom. Beth Shalome, one of the oldest Jewish congregations in America, stood nearby. Some congregants were themselves slave traders or owners—a testament to how thoroughly the domestic slave trade was woven into the fabric of the city.',
    location: '19th Street',
    years: 'Active antebellum period',
  },
  {
    id: 'l3',
    category: 'locations',
    pin: { x: 190, y: 260 },
    title: 'Free Black Neighborhood',
    subtitle: 'Navy Hill & surrounding streets',
    body: 'A substantial Free Black community lived in Richmond\'s Navy Hill neighborhood and surrounding streets. Free Black Richmonders navigated daily life in direct proximity to the slave trade—sometimes able to purchase the freedom of family members, always living under the threat of kidnapping and re-enslavement.',
    location: 'Navy Hill / northern Shockoe',
    years: 'Antebellum period',
  },
];
