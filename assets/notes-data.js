/*
  CRAFT NOTES: the single source for every note list on the site.
  Rendered into: the home hero card (newest), the home Craft Notes section (3 newest),
  notes.html (all, newest first), and the part-to-part links on arc note pages.

  To publish a new note:
    1. Add the page at notes/craft-note-NN.html (copy craft-note-01.html as the template)
    2. Add the share image its og:image tag points to, under images/share/
    3. Add one entry below
    4. Deploy

  topic must be one of: Evaluation, Governance, Cost, Agents, Compliance
  date is YYYY-MM-DD. Lists show notes in number order (01 first).
  isNew: true shows a "New" label next to the note in every list.
  arc + part are optional: set them for notes that belong to a numbered arc (see CRAFT_NOTES_ARCS).
*/
window.CRAFT_NOTES = [
  {
    number: "01",
    slug: "craft-note-01",
    title: "The Model Is Not the Product",
    dek: "Benefits, risks and what not to do when you put an LLM inside something a regulated buyer will pay for.",
    topic: "Governance",
    date: "2026-10-26",
    url: "/notes/craft-note-01.html",
    shareImage: "/images/share/cn01-share.png"
  },
  {
    number: "02",
    slug: "craft-note-02",
    title: "It Looked Right Is Not an Evaluation",
    dek: "Why reading the output is not testing it, what to measure instead, and the four levels where evaluation has to happen.",
    topic: "Evaluation",
    date: "2026-11-18",
    url: "/notes/craft-note-02.html",
    shareImage: "/images/share/cn02-linkedin-hero.png",
    arc: "evaluation",
    part: 1,
    isNew: true
  },
  {
    number: "03",
    slug: "craft-note-03",
    title: "It Passed Every Test. Then a Customer Asked.",
    dek: "Your first golden set, before you have data: where the cases come from, who decides what correct means, and why a small approved set beats a large invented one.",
    topic: "Evaluation",
    date: "2026-11-18",
    url: "/notes/craft-note-03.html",
    shareImage: "/images/share/cn03-linkedin-hero.png",
    arc: "evaluation",
    part: 2,
    isNew: true
  },
  {
    number: "04",
    slug: "craft-note-04",
    title: "Fix Ten, Lose One",
    dek: "Growing a golden set without fooling yourself: acceptable instead of exact, the business holding the bar, and re-running everything on every change.",
    topic: "Evaluation",
    date: "2026-11-18",
    url: "/notes/craft-note-04.html",
    shareImage: "/images/share/cn04-linkedin-hero.png",
    arc: "evaluation",
    part: 3,
    isNew: true
  },
  {
    number: "05",
    slug: "craft-note-05",
    title: "Check With Code Before You Ask a Model",
    dek: "Confident, well-formed output can still be invented. Make every claim show its evidence, check that evidence against the source with plain code, and label every output with what produced it.",
    topic: "Evaluation",
    date: "2026-11-18",
    url: "/notes/craft-note-05.html",
    shareImage: "/images/share/cn05-linkedin-hero.png",
    arc: "evaluation",
    part: 4,
    isNew: true
  },
  {
    number: "06",
    slug: "craft-note-06",
    title: "LLM as a Judge, and Who Judges the Judge",
    dek: "A model judge is fast, cheap and often useful. It is also a model, with known habits. Treat it as an instrument: strengthen the contract it judges against, guard it, and calibrate it against the people who know the business.",
    topic: "Evaluation",
    date: "2026-11-18",
    url: "/notes/craft-note-06.html",
    shareImage: "/images/share/cn06-linkedin-hero.png",
    arc: "evaluation",
    part: 5,
    isNew: true
  },
  {
    number: "07",
    slug: "craft-note-07",
    title: "Evaluating Agents and Retrieval",
    dek: "Agents fail in the middle, not at the end. A run can look busy at every step and still not be getting the job done. Evaluate the path, not just the result.",
    topic: "Evaluation",
    date: "2026-11-18",
    url: "/notes/craft-note-07.html",
    shareImage: "/images/share/cn07-linkedin-hero.png",
    arc: "evaluation",
    part: 6,
    isNew: true
  },
  {
    number: "08",
    slug: "craft-note-08",
    title: "Correct Is Not the Same as Useful",
    dek: "An output can pass every check and still leave the work undone. Value is in what the output carries for the next step. Evaluate that, and measure whether it helped.",
    topic: "Evaluation",
    date: "2026-11-18",
    url: "/notes/craft-note-08.html",
    shareImage: "/images/share/cn08-linkedin-hero.png",
    arc: "evaluation",
    part: 7,
    isNew: true
  },
  {
    number: "09",
    slug: "craft-note-09",
    title: "Wiring Evaluation Into How You Ship",
    dek: "A check you have to remember to run is a check that eventually does not run. Layer the checks by cost and timing, let agents review and people decide, and keep a record of every release.",
    topic: "Evaluation",
    date: "2026-11-18",
    url: "/notes/craft-note-09.html",
    shareImage: "/images/share/cn09-linkedin-hero.png",
    arc: "evaluation",
    part: 8,
    isNew: true
  },
  {
    number: "10",
    slug: "craft-note-10",
    title: "Your Prompt Didn’t Change. Your Output Did.",
    dek: "Prompts do not travel between models, and models change whether or not you choose to change them. Keep the intent as the constant, translate it into a prompt for each model, and let the golden set decide.",
    topic: "Evaluation",
    date: "2026-11-18",
    url: "/notes/craft-note-10.html",
    shareImage: "/images/share/cn10-linkedin-hero.png",
    arc: "evaluation",
    part: 9,
    isNew: true
  }
];

/*
  ARCS: numbered multi-part runs of Craft Notes. Note pages in an arc carry
  <nav class="arc-nav" data-arc="KEY" data-part="N"> and get Previous / Next links
  to the published parts on either side (or to the coming-soon page for the next part).
*/
window.CRAFT_NOTES_ARCS = {
  evaluation: {
    name: "Evaluation",
    parts: 9,
    title: "Evaluation: From Looks Right to Proven Right",
    dek: "Nine Craft Notes on how to prove LLM output is right: golden sets, evidence checks, model judges, agents, shipping, and model change.",
    url: "/notes.html",
    isNew: true
  }
};

/*
  HERO: what the two home-hero cards show.
    featureTopic: the main card shows the most recent note on this topic ("Latest on <topic>").
    series: key in CRAFT_NOTES_ARCS whose description card sits under it (null to hide).
*/
window.CRAFT_NOTES_HERO = { featureTopic: "Governance", series: "evaluation" };

/*
  UPCOMING: the "Coming next" teaser under the Latest card in the home hero.
  Never shown in the home list or on notes.html.
  Set to null to hide the teaser. date is null or "YYYY-MM" (shown as "November 2026").
  When this note publishes: move it into CRAFT_NOTES above and point this at the next one (or null).
  Staged drafts of the remaining evaluation parts: Artifacts/evaluation-series/articles/
*/
window.CRAFT_NOTES_UPCOMING = null;
