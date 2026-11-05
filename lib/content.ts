// All exhibit copy lives here so the theme can rotate without touching the pages.
// ⚠️ Fact-check every historical claim against news sources before presenting.

export const featuredMayor = {
  name: "Francisco \"Isko Moreno\" Domagoso",
  term: "Mayor of Manila, 2019–2022 (re-elected 2025)",
};

// Station 1 — Citizen's Voice: you speak as a constituent about Manila today.
export const promptOfTheDay = {
  label: "Prompt of the Day",
  question: "Who should Manila's sidewalks belong to — pedestrians, vendors, or both?",
  helper:
    "Think about a street you actually walk on. What would make it work for everyone? Be specific.",
};

// Station 2 — Mayor's Dilemma: you decide as the mayor, then see what really happened.
export const dilemma = {
  title: "The Divisoria Dilemma",
  year: "July 2019",
  situation: [
    "You have just taken office as Mayor of Manila.",
    "Divisoria's streets and sidewalks are packed with vendor stalls. Pedestrians are forced onto the road, traffic barely moves, and garbage piles up at night.",
    "But thousands of families earn their daily income from these stalls. Many have sold there for decades.",
  ],
  constraints: [
    "Public pressure for visible change is high in your first weeks.",
    "There is no ready relocation site big enough for every vendor.",
    "Whatever you do will be watched — and copied — by other cities.",
  ],
  choices: [
    { id: "clear", label: "Clear the streets immediately and enforce strictly" },
    { id: "relocate", label: "Relocate vendors to designated areas before clearing" },
    { id: "schedule", label: "Allow vending only at set hours, with lanes kept clear" },
    { id: "other", label: "Something else (explain below)" },
  ],
  // TODO: verify against news reports from July–August 2019 before the demo.
  reveal: {
    heading: "What Mayor Isko Moreno actually did",
    body: [
      "Within his first days in office, the city launched clearing operations in Divisoria, removing stalls and obstructions from streets and sidewalks.",
      "Vendors were later allowed back under stricter rules — staying within marked areas, keeping roads passable, and cleaning up after themselves.",
      "Supporters praised the visible results; critics asked whether the poorest vendors carried the cost of order.",
    ],
  },
};


export const ballotRotationDays = 3;

// Portraits for the gallery wall, rails and ballot. Drop real portraits in
// public/mayors/<id>.jpg and set `photo` to use them instead of the painted placeholder.
export type Look = {
  skin: string;
  hair: "short" | "slick" | "bald" | "bob" | "wave";
  hairColor: string;
  attire: "suit" | "barong" | "blouse";
  glasses?: boolean;
};

export type WallMayor = { id: string; name: string; short: string; term: string; look?: Look; photo?: string };

export const wallOfMayors: WallMayor[] = [
  { id: "lacson", photo: "/mayors/lacson.png", name: "Arsenio Lacson", short: "Lacson", term: "1952–1962", look: { skin: "#d9a77c", hair: "slick", hairColor: "#1f1712", attire: "suit" } },
  { id: "villegas", photo: "/mayors/villegas.png", name: "Antonio Villegas", short: "Villegas", term: "1962–1971", look: { skin: "#cf9a70", hair: "short", hairColor: "#231a14", attire: "suit", glasses: true } },
  { id: "bagatsing", photo: "/mayors/bagatsing.png", name: "Ramon Bagatsing", short: "Bagatsing", term: "1972–1986", look: { skin: "#c48d63", hair: "wave", hairColor: "#3b3b3b", attire: "barong" } },
  { id: "ejercito", photo: "/mayors/ejercito.png", name: "Gregorio Ejercito", short: "Ejercito", term: "1987-1988", look: { skin: "#e0b48e", hair: "bob", hairColor: "#c9a46a", attire: "barong" } },
  { id: "lopez", photo: "/mayors/lopez.png", name: "Mel Lopez", short: "Lopez", term: "1986–1992", look: { skin: "#d6a57d", hair: "short", hairColor: "#2a201a", attire: "barong", glasses: true } },
  { id: "lim", photo: "/mayors/lim.png", name: "Alfredo Lim", short: "Lim", term: "1992–1998, 2007–2013", look: { skin: "#dcae86", hair: "short", hairColor: "#8d8a86", attire: "suit" } },
  { id: "atienza", photo: "/mayors/atienza.png", name: "Lito Atienza", short: "Atienza", term: "1998–2007", look: { skin: "#c99467", hair: "bald", hairColor: "#4a4a4a", attire: "barong" } },
  { id: "estrada", photo: "/mayors/estrada.png", name: "Joseph Estrada", short: "Estrada", term: "2013–2019", look: { skin: "#c08a5f", hair: "slick", hairColor: "#191210", attire: "barong" } },
  { id: "moreno", photo: "/mayors/moreno.png", name: "Isko Moreno", short: "Moreno", term: "2019–2022, 2025–", look: { skin: "#d1a07a", hair: "short", hairColor: "#16110d", attire: "barong" } },
  { id: "lacuna", photo: "/mayors/lacuna.png", name: "Honey Lacuna", short: "Lacuna", term: "2022–2025", look: { skin: "#e0b48e", hair: "bob", hairColor: "#c9a46a", attire: "blouse" } },

];

// Side-rail decoration only: every mayor in order, 12 per side like the real wall.
// Terms from Wikipedia's "Mayor of Manila" list. No photos yet, so these show a
// plain frame with initials; add `photo` to any of them the same way as above.
const earlyMayors: WallMayor[] = [
  { id: "herrera",  photo: "/mayors/herrera.png", name: "Arsenio Cruz Herrera", short: "Herrera", term: "1901–1905" },
  { id: "roxas",  photo: "/mayors/roxas.png", name: "Félix M. Roxas", short: "Roxas", term: "1905–1917" },
  { id: "lukban",  photo: "/mayors/lukban.png", name: "Justo Lukbán", short: "Lukbán", term: "1917–1920" },
  { id: "fernandez",  photo: "/mayors/fernandez.png", name: "Ramón J. Fernández", short: "Fernández", term: "1920–1923" },
  { id: "rodriguez",  photo: "/mayors/rodriguez.png", name: "Eulogio Rodriguez Sr.", short: "Rodriguez", term: "1923–1924, 1940–1941" },
  { id: "romualdez",  photo: "/mayors/romualdez.png", name: "Miguel Romuáldez", short: "Romuáldez", term: "1924–1927" },
  { id: "earnshaw",  photo: "/mayors/earnshaw.png", name: "Tomás Earnshaw", short: "Earnshaw", term: "1927–1933" },
  { id: "posadas",  photo: "/mayors/posadas.png", name: "Juan Posadas Jr.", short: "Posadas", term: "1934–1940" },
  { id: "nolasco",  photo: "/mayors/nolasco.png", name: "Juan G. Nolasco", short: "Nolasco", term: "1941, 1945–1946" },
  { id: "vargas",  photo: "/mayors/vargas.png", name: "Jorge B. Vargas", short: "Vargas", term: "1941–1942" },
  { id: "guinto",  photo: "/mayors/guinto.png", name: "León Guinto Sr.", short: "Guinto", term: "1942–1944" },
  { id: "h-atienza",  photo: "/mayors/h-atienza.png", name: "Hermenegildo Atienza", short: "H. Atienza", term: "1944–1945" },
  { id: "fugoso",  photo: "/mayors/fugoso.png", name: "Valeriano Fugoso Sr.", short: "Fugoso", term: "1946–1947" },
  { id: "delafuente",  photo: "/mayors/delafuente.png", name: "Manuel de la Fuente", short: "de la Fuente", term: "1948–1951" },
];
const ejercito: WallMayor = { id: "ejercito", name: "Gregorio Ejercito", short: "Ejercito", term: "1987–1988" };

const byId = (id: string) => wallOfMayors.find((m) => m.id === id)!;
export const railMayors: WallMayor[] = [
  ...earlyMayors,
  byId("lacson"), byId("villegas"), byId("bagatsing"), byId("lopez"), ejercito,
  byId("lim"), byId("atienza"), byId("estrada"), byId("moreno"), byId("lacuna"),
];

export const mayorById = Object.fromEntries(wallOfMayors.map((m) => [m.id, m]));

// Proclamation wording for the Mayor's Dilemma. Mirrors `dilemma.situation`.
export const proclamation = {
  number: "Proclamation No. 07, Series of 2019",
  whereas: [
    "the streets and sidewalks of Divisoria are obstructed by stalls, forcing pedestrians onto the road and bringing traffic to a standstill;",
    "thousands of Manileño families earn their daily living from these same stalls, many for decades;",
    "there is no relocation site large enough to receive every vendor;",
  ],
  dateline: "DONE in the City of Manila, this ___ day of July, in the year of our Lord, two thousand and nineteen.",
};


// Digital ballot: visitors pick which mayor the exhibit features next.
export const ballotCandidates = wallOfMayors.filter((m) => m.id !== "moreno");
