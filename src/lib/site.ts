/**
 * Jurassic Seafarms, version two: the luxury house.
 *
 * Every fact and every line of copy lives here.
 *
 * Sources:
 *   jurassicseafarms.co.uk, read 7 November 2026: Portland Harbour,
 *     Integrated Multi Trophic Aquaculture, Pacific Oysters and Sugar Kelp
 *     side by side, no chemicals, fertilisers or fresh water, Lydia and
 *     Andy taking over in 2022, the kelp's uses, hello@ email, registered
 *     address.
 *   The farm, 8 November 2026: the oysters are premium, high yield and
 *     larger than usual.
 *   The brief ("oyster farms.pptx", 10 November 2026): mussels as a third
 *     line, the page list, ambassadors, events with film, farm tours, a
 *     cruise, recipes and how to shuck, values, shop for consumers and
 *     wholesale.
 *
 * DRAFT, for the farm to approve: the process steps for mussels, the
 * tasting notes, pack sizes and the event formats are written for this
 * mock-up from the brief, not published by the farm. No prices, names,
 * dates or ambassadors are invented; where those belong the page keeps a
 * silent frame.
 */

export const site = {
  name: "Jurassic Seafarms",
  tagline: "Finest quality oysters, Jurassic Coast, Dorset",
  farm: "Portland Harbour, Dorset",
  email: "hello@jurassicseafarms.co.uk",
  registered: ["Lyndum House", "12 High Street", "Petersfield", "GU32 3JG"],
  since: 2022,
};

export function mailto(subject?: string) {
  return `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

export const nav = [
  { label: "Oysters", href: "/oysters/" },
  { label: "Mussels", href: "/mussels/" },
  { label: "Kelp", href: "/kelp/" },
  { label: "Recipes", href: "/recipes/" },
  { label: "Events", href: "/events/" },
  { label: "The house", href: "/about/" },
  { label: "Work with us", href: "/work-with-us/" },
];

/* ------------------------------------------------------------ products */

export type Step = { n: string; title: string; body: string; image?: string };

export type Line = {
  slug: "oysters" | "mussels" | "kelp";
  name: string;
  latin: string;
  kicker: string;
  /** One line, set large on the home page. */
  line: string;
  intro: string;
  image: string | null;
  alt: string;
  notes?: { label: string; value: string }[];
  steps: Step[];
  /** Extra blocks, used by the kelp page for benefits and uses. */
  uses?: { title: string; body: string }[];
};

export const lines: Line[] = [
  {
    slug: "oysters",
    name: "Pacific Oysters",
    latin: "Crassostrea gigas",
    kicker: "The signature",
    line: "Grown large, in gin-clear water, beneath the cliffs of Portland.",
    intro:
      "Premium, high-yield oysters, grown larger than usual in the sheltered water of Portland Harbour, using a system the farm developed for this one stretch of sea. No feed, no chemicals, no fresh water: they take everything they need from the tide, and leave the harbour cleaner for it.",
    image: "/img/oysters-pile.jpg",
    alt: "A heap of freshly lifted Pacific Oysters",
    notes: [
      { label: "Grown", value: "Portland Harbour, Dorset" },
      { label: "Character", value: "Large, full, high yield" },
      { label: "Season", value: "Ask the farm" },
    ],
    steps: [
      {
        n: "I",
        title: "Seed",
        body: "Young oysters arrive at the farm and go into mesh bags at the surface of the harbour.",
        image: "/img/oyster-bags.jpg",
      },
      {
        n: "II",
        title: "Grow",
        body: "The bags float in long lines, turned by the tide. Each oyster filters its food from the water, clearing it as it goes.",
      },
      {
        n: "III",
        title: "Sort",
        body: "Lifted and sorted by hand, so only the fullest, best-shaped oysters leave the farm under the name.",
        image: "/img/oysters-crate.jpg",
      },
      {
        n: "IV",
        title: "Harvest",
        body: "Brought ashore at Portland and made ready for the table.",
      },
    ],
  },
  {
    slug: "mussels",
    name: "Mussels",
    latin: "Mytilus edulis",
    kicker: "The harbour's own",
    line: "Rope-grown in the same clean water as the oysters.",
    intro:
      "The farm's third line. Mussels, like oysters, feed only on what the tide brings them, and give the harbour back clearer water in return.",
    image: null,
    alt: "",
    steps: [
      { n: "I", title: "Settle", body: "Young mussels settle on ropes hung in the harbour." },
      { n: "II", title: "Grow", body: "They grow on the ropes, feeding on the plankton the tide carries past." },
      { n: "III", title: "Lift", body: "The ropes are lifted, and the mussels cleaned and graded." },
      { n: "IV", title: "Harvest", body: "Brought ashore at Portland, ready for the pot." },
    ],
  },
  {
    slug: "kelp",
    name: "Sugar Kelp",
    latin: "Saccharina latissima",
    kicker: "Grown alongside",
    line: "Grown on ropes beneath the oysters, feeding on what they let fall.",
    intro:
      "Grown on ropes beneath the oyster bags, the Sugar Kelp benefits from the nutrients dropped by the shellfish, and gives small marine and juvenile species a place to live. A yellowish-brown blade, dimpled at the centre, wavy at the edge, with a subtly salty umami flavour.",
    image: "/img/kelp-close.jpg",
    alt: "Sugar Kelp on its growing rope, close up",
    notes: [
      { label: "Grown", value: "Beneath the oyster lines" },
      { label: "Flavour", value: "Subtly salty, umami" },
      { label: "Rich in", value: "Iodine, trace minerals" },
    ],
    steps: [
      { n: "I", title: "Seed", body: "Kelp is seeded onto ropes and set beneath the oyster bags.", image: "/img/kelp-rope.jpg" },
      { n: "II", title: "Grow", body: "It feeds on the nutrients the oysters let fall, sequestering carbon as it grows." },
      { n: "III", title: "Harvest", body: "Lifted from the water by hand, rope by rope.", image: "/img/kelp-harvest.jpg" },
      { n: "IV", title: "Land", body: "Brought ashore at Portland for the kitchen, the field and the lab." },
    ],
    uses: [
      {
        title: "The kitchen",
        body: "Popular in Eastern cuisine and ideal for soups and salads. A little goes a long way. Long used as a gelling agent in food and cosmetics, and even found in ice cream.",
      },
      {
        title: "Agriculture",
        body: "Seaweed enhances plant growth, boosts crop yields and improves stress tolerance, helping plants defend against frost, pest and disease.",
      },
      {
        title: "Industry and medicine",
        body: "Bioplastics, wound dressings, drug delivery and tissue engineering, through seaweed's natural biocompatibility and antimicrobial properties.",
      },
    ],
  },
];

export const lineBySlug = (s: string) => lines.find((l) => l.slug === s);

/* ---------------------------------------------------------------- shop */

export type Pack = { label: string; price: number | null };
export type ShopItem = {
  key: string;
  kicker: string;
  name: string;
  line: string;
  image: string | null;
  alt: string;
  grades?: string[];
  packs: Pack[];
};

/** Pack sizes and grades are examples to agree with the farm. */
export const shop: { consumer: ShopItem[]; note: string } = {
  note: "Collection from Portland Harbour. Prices and collection times confirmed with the farm.",
  consumer: [
    {
      key: "oysters",
      kicker: "The signature",
      name: "Pacific Oysters",
      line: "Large, full and high yield, sorted by hand.",
      image: "/img/oysters-pile.jpg",
      alt: "Pacific Oysters, freshly lifted",
      grades: ["n°2", "n°3", "n°4"],
      packs: [
        { label: "12 oysters", price: null },
        { label: "24 oysters", price: null },
        { label: "48 oysters", price: null },
      ],
    },
    {
      key: "mussels",
      kicker: "The harbour's own",
      name: "Mussels",
      line: "Rope-grown in the same clean water.",
      image: null,
      alt: "",
      packs: [
        { label: "1 kg", price: null },
        { label: "2 kg", price: null },
      ],
    },
    {
      key: "kelp",
      kicker: "Grown alongside",
      name: "Sugar Kelp",
      line: "Subtly salty, rich in iodine.",
      image: "/img/kelp-rope.jpg",
      alt: "Sugar Kelp on its rope",
      packs: [
        { label: "250 g", price: null },
        { label: "500 g", price: null },
      ],
    },
  ],
};

export const wholesale = {
  title: "For restaurants, fishmongers and shops",
  body: "Regular supply of oysters, mussels and kelp from Portland Harbour, by arrangement with the farm.",
  points: [
    { title: "Standing orders", body: "Weekly or seasonal supply, agreed directly." },
    { title: "Grades to suit", body: "Sorted to the size the kitchen needs." },
    { title: "Kelp in volume", body: "For food, agriculture and industry." },
  ],
};

/* -------------------------------------------------------------- serving */

export const serving = [
  { title: "Natural", body: "Nothing but the oyster. Perhaps a drop of lemon." },
  { title: "Mignonette", body: "Shallot, red wine vinegar, cracked pepper." },
  { title: "Gathered", body: "A platter on ice, and the table becomes an occasion." },
];

/* -------------------------------------------------------------- recipes */

export type Recipe = { slug: string; title: string; line: string; time: string; serves: string; ingredients: string[]; method: string[] };

export const recipes: Recipe[] = [
  {
    slug: "mignonette",
    title: "Oysters, shallot mignonette",
    line: "The classic, and still the best.",
    time: "10 minutes",
    serves: "12 oysters",
    ingredients: ["12 Pacific Oysters", "1 banana shallot, very finely diced", "4 tbsp red wine vinegar", "Cracked black pepper", "Crushed ice, to serve"],
    method: ["Stir the shallot into the vinegar with a good grind of pepper. Leave for ten minutes.", "Shuck the oysters, keeping the liquor in the shell.", "Set them on crushed ice and spoon a little mignonette over each."],
  },
  {
    slug: "grilled",
    title: "Grilled oysters, kelp butter",
    line: "Hot from the grill, the sea on top.",
    time: "20 minutes",
    serves: "12 oysters",
    ingredients: ["12 Pacific Oysters", "100 g soft butter", "1 tbsp dried Sugar Kelp, finely crumbled", "1 lemon, zested", "1 garlic clove, grated"],
    method: ["Beat the butter with the kelp, lemon zest and garlic.", "Shuck the oysters and leave them in the deep shell.", "Top each with butter and grill hard for 3 to 4 minutes, until bubbling."],
  },
  {
    slug: "moules",
    title: "Mussels, cider and cream",
    line: "A West Country pot.",
    time: "25 minutes",
    serves: "2",
    ingredients: ["1 kg mussels, cleaned", "1 shallot, sliced", "1 garlic clove, sliced", "200 ml dry cider", "100 ml double cream", "Parsley, chopped"],
    method: ["Soften the shallot and garlic in butter in a wide pan.", "Add the mussels and cider, cover and cook hard for 4 minutes, until they open.", "Stir in the cream and parsley. Discard any that stay closed."],
  },
  {
    slug: "kelp-salad",
    title: "Sugar Kelp and cucumber salad",
    line: "Bright, cold and a little salty.",
    time: "15 minutes",
    serves: "4",
    ingredients: ["20 g dried Sugar Kelp", "1 cucumber", "2 tbsp rice vinegar", "1 tsp sesame oil", "1 tsp toasted sesame seeds"],
    method: ["Soak the kelp in cold water for 10 minutes, drain and slice thinly.", "Slice the cucumber into ribbons.", "Dress both with the vinegar and oil, and finish with sesame."],
  },
];

export const shuck = [
  { title: "Hold", body: "Fold a cloth over the oyster, flat side up, hinge towards you. Hold it firm on the board." },
  { title: "Find the hinge", body: "Work the tip of the knife into the hinge at a shallow angle. Don't force it." },
  { title: "Twist", body: "Turn the knife like a key. The shell will give with a small pop." },
  { title: "Cut free", body: "Slide the blade along the top shell to cut the muscle, then under the oyster to free it. Keep the liquor." },
];

/* --------------------------------------------------------------- events */

export const events = [
  {
    key: "tours",
    kicker: "On the water",
    title: "Farm tours",
    body: "Out across Portland Harbour to the lines themselves: see the oysters lifted, the kelp on its ropes, and taste them where they grow.",
  },
  {
    key: "cruise",
    kicker: "The harbour",
    title: "The oyster cruise",
    body: "An evening on the water beneath the cliffs of Portland, with oysters shucked on board.",
  },
  {
    key: "bar",
    kicker: "Your event",
    title: "The oyster bar",
    body: "A shucker and a raw bar for weddings, parties and private events: iced counter, oysters opened to order.",
  },
];

/* --------------------------------------------------------------- values */

export const values = [
  { title: "Regeneration", body: "Oysters filter the water. Kelp captures carbon. The farm leaves the harbour cleaner than it found it.", image: "/img/oyster-bags.jpg" },
  { title: "Nothing added", body: "No feed, no chemicals, no fertiliser, no fresh water. Only the tide.", image: "/img/kelp-underwater.jpg" },
  { title: "By hand", body: "Lifted, sorted and graded by hand, so only the best leaves the farm.", image: "/img/oysters-crate.jpg" },
  { title: "One place", body: "Everything grown in one sheltered harbour on the Jurassic Coast.", image: "/img/kelp-pontoon.jpg" },
  { title: "A drop in the ocean", body: "A small farm, working with the UN Sustainable Development Goals in mind. Many drops make an ocean.", image: "/img/kelp-close.jpg" },
];

/* ---------------------------------------------------------------- house */

export const house = {
  title: "Lydia and Andy",
  lede: "Two people committed to finding another way to produce food, whilst helping to mitigate climate change.",
  turn: "Their backgrounds are not in aquaculture, but they took the brave step of taking over Jurassic Seafarms in 2022, because they wanted to be part of the change, not the problem.",
  imta: "The farm is an Integrated Multi Trophic Aqua Farm: species from different levels of the food chain grown side by side, so the by-products of one become food for another. Think of it as a natural recycling system.",
};

export const work = [
  { title: "Restaurants and chefs", body: "Supply for the menu, and a say in what the farm grows next.", subject: "Restaurants" },
  { title: "Fishmongers and shops", body: "Regular supply of oysters, mussels and kelp.", subject: "Retail" },
  { title: "Ambassadors", body: "Chefs and makers who share the farm's way of doing things.", subject: "Ambassadors" },
  { title: "Kelp partners", body: "Food, agriculture, cosmetics and biomaterials.", subject: "Kelp" },
  { title: "Events", body: "Tours, the oyster cruise and the oyster bar.", subject: "Events" },
];
