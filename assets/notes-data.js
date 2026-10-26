/*
  CRAFT NOTES: the single source for every note list on the site.
  Rendered into: the home hero card (newest), the home Craft Notes section (3 newest)
  and notes.html (all, newest first).

  To publish a new note:
    1. Add the page at notes/craft-note-NN.html (copy craft-note-01.html as the template)
    2. Add its share image at images/share/cnNN-share.png
    3. Add one entry below
    4. Deploy

  topic must be one of: Evaluation, Governance, Cost, Agents, Compliance
  date is YYYY-MM-DD; newest date is shown first.
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
  }
];

/*
  UPCOMING: the "Coming next" teaser under the Latest card in the home hero.
  Never shown in the home list or on notes.html.
  Set to null to hide the teaser. date is null or "YYYY-MM" (shown as "November 2026").
  When this note publishes: move it into CRAFT_NOTES above and point this at the next one (or null).
*/
window.CRAFT_NOTES_UPCOMING = {
  number: "02",
  topic: "Evaluation",
  title: "Your Prompt Didn't Change. Your Output Did.",
  dek: "How to evaluate LLM output, and what breaks when the model underneath changes.",
  date: null,
  cta: { label: "Get it first", url: "/notes/coming-soon.html" }
};
