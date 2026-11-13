/* Wissensfunke: tägliche Allgemeinwissen-Lektionen mit Quiz und Wiederholung. */
(() => {
'use strict';

/* ---------- Kategorien & Icons ---------- */
const CATS = [
  { id: 'geschichte', name: 'Geschichte', h: 30, d: 'Wie wir wurden, wer wir sind' },
  { id: 'weltraum', name: 'Weltraum', h: 245, d: 'Sterne, Planeten und die großen Fragen' },
  { id: 'natur', name: 'Natur & Biologie', h: 125, d: 'Leben in all seinen Formen' },
  { id: 'physik', name: 'Physik & Chemie', h: 190, d: 'Die Regeln, nach denen alles läuft' },
  { id: 'literatur', name: 'Literatur', h: 330, d: 'Bücher, die die Welt geprägt haben' },
  { id: 'kunst', name: 'Kunst & Musik', h: 275, d: 'Epochen, Meister, Meisterwerke' },
  { id: 'philosophie', name: 'Philosophie', h: 55, d: 'Gut denken, gut leben' },
  { id: 'psychologie', name: 'Psychologie', h: 305, d: 'Warum wir tun, was wir tun' },
  { id: 'wirtschaft', name: 'Wirtschaft & Geld', h: 92, d: 'Wie Geld und Märkte funktionieren' },
  { id: 'welt', name: 'Länder & Kulturen', h: 160, d: 'Die Welt da draußen verstehen' },
  { id: 'technik', name: 'Technik & Erfindungen', h: 215, d: 'Ideen, die alles verändert haben' },
  { id: 'koerper', name: 'Mensch & Körper', h: 0, d: 'Die Maschine, in der du wohnst' },
  { id: 'erde', name: 'Erde & Klima', h: 150, d: 'Der Planet unter deinen Füßen' },
  { id: 'politik', name: 'Politik & Recht', h: 230, d: 'Wer entscheidet und nach welchen Regeln' },
  { id: 'mathe', name: 'Mathe & Logik', h: 260, d: 'Zahlen, Zufall und klares Denken' },
  { id: 'sprache', name: 'Sprache & Rhetorik', h: 345, d: 'Wie Worte wirken und woher sie kommen' },
  { id: 'mythen', name: 'Mythen & alte Welten', h: 40, d: 'Götter, Helden und Pharaonen' },
  { id: 'sport', name: 'Sport & Spiele', h: 115, d: 'Vom Olympia der Antike bis zum Schachbrett' },
  { id: 'essen', name: 'Essen & Genuss', h: 15, d: 'Was auf deinem Teller wirklich passiert' },
  { id: 'film', name: 'Film & Medien', h: 290, d: 'Geschichten, Bilder und wem du glauben kannst' },
];
const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));

const IC = {
  geschichte: '<path d="M4 20h16M5 9h14M6.5 9v11M10 9v11M14 9v11M17.5 9v11M3 9l9-5 9 5"/>',
  weltraum: '<circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10.5" ry="3.4" transform="rotate(-22 12 12)"/>',
  natur: '<path d="M5 19C5 11 11 5 20 5c0 9-6 15-14 15"/><path d="M5 19l8-8"/>',
  physik: '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  literatur: '<path d="M12 6.5C10 5 7 4.5 4 5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5Z"/><path d="M12 6.5V20"/>',
  kunst: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.5-4-8-9-8Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
  philosophie: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
  psychologie: '<path d="M12 12a1.5 1.5 0 0 1 3 0a3 3 0 0 1-6 0a4.5 4.5 0 0 1 9 0a6 6 0 0 1-12 0a7.5 7.5 0 0 1 15 0"/>',
  wirtschaft: '<path d="M4 20V4M4 20h16M7 15l4-4 3 3 5-6M15 8h4v4"/>',
  welt: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z"/>',
  technik: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
  koerper: '<path d="M12 20.5s-7.5-4.6-9.4-9.3C1.3 7.9 3.4 4.8 6.8 4.8c2.1 0 3.6 1.2 5.2 3 1.6-1.8 3.1-3 5.2-3 3.4 0 5.5 3.1 4.2 6.4-1.9 4.7-9.4 9.3-9.4 9.3Z"/>',
  erde: '<path d="M2.5 20 9 9l3.5 5.5L15 11l6.5 9Z"/><path d="M7.4 11.7 9 13l1.6-1.3"/><circle cx="18" cy="5" r="2"/>',
  politik: '<path d="M3 21h18M4 18h16M6 18v-7M10 18v-7M14 18v-7M18 18v-7M3.5 11h17L12 4.5 3.5 11Z"/>',
  mathe: '<path d="M18 5H7l6 7-6 7h11"/>',
  sprache: '<path d="M4 5h16v10H9l-5 4V5Z"/><path d="M8 9h8M8 12h5"/>',
  mythen: '<path d="M12 21V8M7 4v4a5 5 0 0 0 10 0V4M12 3v5"/>',
  sport: '<circle cx="12" cy="12" r="9"/><path d="m12 7.5 4 2.9-1.5 4.7h-5L8 10.4Z"/><path d="M12 3v4.5M20.6 9.5 16 10.4M17.3 19.5l-2.8-4.4M6.7 19.5l2.8-4.4M3.4 9.5 8 10.4"/>',
  essen: '<path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M16 21V3c-2 1.5-3 4-3 7s1 4 3 4"/>',
  film: '<rect x="3" y="8" width="18" height="13" rx="1.5"/><path d="m3 8 2.5-5 15 2.5L19.5 8M8 3.5 9.6 8M13 4.3l1.6 3.7"/>',
  home: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4v-9Z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  repeat: '<path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 12V10a4 4 0 0 1 4-4h13M7 21.5 3.5 18 7 14.5"/><path d="M20.5 12v2a4 4 0 0 1-4 4h-13"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
  flame: '<path d="M12 21c4 0 7-2.8 7-6.8 0-3.6-2.6-6.2-4.2-8.7-.3 2-1.3 3.5-2.8 4.2C12.3 6.8 10.6 4.3 8.5 3c.2 3-1.8 5-3 7.2A7.4 7.4 0 0 0 5 14.2C5 18.2 8 21 12 21Z"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
  check: '<path d="M5 12.5 10 17.5 19 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  left: '<path d="M15 5l-7 7 7 7"/>',
  right: '<path d="M9 5l7 7-7 7"/>',
  sparkle: '<path d="M12 3c.5 4.5 2.5 6.5 7 7-4.5.5-6.5 2.5-7 7-.5-4.5-2.5-6.5-7-7 4.5-.5 6.5-2.5 7-7Z"/><path d="M19 15c.2 1.8 1 2.6 2.5 2.8-1.6.2-2.3 1-2.5 2.7-.2-1.7-1-2.5-2.5-2.7 1.6-.2 2.3-1 2.5-2.8Z"/>',
  shuffle: '<path d="M3 7h3.5c5 0 6 10 11 10H21M18 14l3 3-3 3M3 17h3.5c1.6 0 2.7-1 3.6-2.4M13.9 9.4C14.8 8 15.9 7 17.5 7H21M18 4l3 3-3 3"/>',
  link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  chat: '<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4A8 8 0 1 1 20 12Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>',
};
const svg = (k, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${IC[k] || ''}</svg>`;

/* ---------- Lerntipps ---------- */
const TIPS = [
  { t: 'Erst abrufen, dann nachlesen', d: 'Wissen bleibt hängen, wenn du es aktiv aus dem Kopf holst. Das nennt man Active Recall. Bloßes Wiederlesen fühlt sich gut an, bringt aber deutlich weniger.', how: 'Versuch nach jeder Lektion, die drei wichtigsten Punkte aus dem Kopf aufzusagen, bevor du auf die Zusammenfassung schaust.' },
  { t: 'Verteilt wiederholen statt pauken', d: 'Spaced Repetition nutzt die Vergessenskurve von Hermann Ebbinghaus: Wiederholst du kurz bevor du etwas vergisst, wird die Erinnerung jedes Mal stabiler. Genau so arbeitet der Wiederholen-Tab.', how: 'Mach täglich deine fälligen Wiederholungen. 5 Minuten am Tag schlagen eine Stunde am Sonntag.' },
  { t: 'Die Feynman-Technik', d: 'Der Physiker Richard Feynman prüfte sein Verständnis, indem er Dinge so erklärte, dass ein Kind sie versteht. Wo du ins Stocken kommst, liegt deine Lücke.', how: 'Erklär das Thema der heutigen Lektion in einfachen Worten einem Freund, deiner Familie oder als Sprachnotiz an dich selbst.' },
  { t: 'Frag dich immer: Warum?', d: 'Elaboration heißt, neue Fakten mit Gründen und Zusammenhängen zu verknüpfen. Ein Fakt mit Begründung ist viel leichter zu merken als ein loser Fakt.', how: 'Stell dir zu jedem Merksatz eine Warum-Frage und beantworte sie. Wenn du nicht weiterkommst, nutze „Frag nach“ in der Lektion.' },
  { t: 'Themen mischen', d: 'Interleaving bedeutet, verschiedene Themen abwechselnd zu lernen. Das Gehirn muss jedes Mal neu umschalten und lernt dadurch, Dinge besser zu unterscheiden.', how: 'Nutze die zufällige Lektion und das Blitzquiz. Die Mischung ist Absicht.' },
  { t: 'An Bekanntes anknüpfen', d: 'Neues Wissen braucht Haken, an denen es hängen kann. Je mehr du schon weißt, desto leichter lernst du dazu. Allgemeinwissen wächst deshalb wie ein Zinseszins.', how: 'Überleg bei jeder Lektion: Wo habe ich davon schon mal gehört? In der Schule, in einem Film, auf Reisen?' },
  { t: 'Schlaf ist Teil des Lernens', d: 'Im Tiefschlaf spielt das Gehirn den Tag nach und verschiebt Erinnerungen vom Hippocampus in den Langzeitspeicher. Wer wenig schläft, lernt schlechter.', how: 'Eine kurze Lektion am Abend und eine Wiederholung am nächsten Morgen ist eine starke Kombination.' },
  { t: 'Ersetze das Scrollen', d: 'Gewohnheiten folgen dem Muster Auslöser, Handlung, Belohnung. Der Griff zum Handy ist der Auslöser. Tausch die Handlung aus und behalte den Auslöser.', how: 'Leg Wissensfunke dorthin, wo bisher TikTok auf deinem Startbildschirm lag. Erst eine Lektion, dann darfst du scrollen.' },
  { t: 'Gewohnheiten stapeln', d: 'Habit Stacking aus „Atomic Habits“ von James Clear: Hänge eine neue Gewohnheit an eine bestehende. Das bestehende Verhalten wird zum Auslöser.', how: 'Formuliere es konkret: „Nach dem Frühstück mache ich meine Tageslektion.“' },
  { t: 'Bilder im Kopf bauen', d: 'Das Gehirn merkt sich Bilder und Orte viel besser als abstrakte Wörter. Gedächtnissportler nutzen die Loci-Methode und legen Fakten gedanklich in Räumen ab.', how: 'Stell dir zu jedem schwierigen Begriff ein übertriebenes, witziges Bild vor. Je absurder, desto besser.' },
  { t: 'Schreib es in dein Second Brain', d: 'Was du in eigenen Worten aufschreibst, verarbeitest du tiefer. Und es bleibt auffindbar, wenn du es später brauchst.', how: 'Notiere die eine Erkenntnis des Tages in Obsidian. Eine Zeile reicht.' },
  { t: 'Fehler sind Lernsignale', d: 'Falsche Antworten im Quiz sind kein Versagen. Studien zeigen: Wer sich irrt und dann die richtige Antwort sieht, merkt sie sich oft besser als jemand, der gleich richtig lag.', how: 'Lies bei falschen Antworten die Erklärung bewusst und sag sie dir einmal laut vor.' },
  { t: 'Neugier aufschreiben', d: 'Neugier ist ein Lernverstärker. Ist das Gehirn neugierig, merkt es sich sogar nebensächliche Dinge besser, das zeigen Experimente der Uni Kalifornien.', how: 'Wenn dir im Alltag eine Frage einfällt, gib sie im Entdecken-Tab bei „Neue Lektion mit Claude“ ein.' },
  { t: 'Klein anfangen, nie zweimal aussetzen', d: 'Die Streak hilft, aber ein verpasster Tag ist kein Drama. Gefährlich wird erst der zweite verpasste Tag in Folge, weil dann die alte Gewohnheit zurückkommt.', how: 'An schlechten Tagen reicht eine einzige Wiederholungsrunde. Hauptsache, die Kette reißt nicht doppelt.' },
];

/* ---------- Helfer ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[\s(„])\*(?!\s)([^*]+?)\*(?=[\s.,;:!?)“]|$)/g, '$1<em>$2</em>');
const paras = s => String(s || '').split(/\n\s*\n/).map(p => `<p>${inline(p.trim()).replace(/\n/g, '<br>')}</p>`).join('');
const pad = n => String(n).padStart(2, '0');
const dstr = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => dstr(new Date());
const addDays = (s, n) => { const [y, m, d] = s.split('-').map(Number); return dstr(new Date(y, m - 1, d + n)); };
const dayNum = s => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 864e5); };
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const hashStr = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const plural = (n, a, b) => `${n} ${n === 1 ? a : b}`;
let toastT;
function toast(msg) {
  let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2600);
}

/* ---------- Speicher (Cloud über db, sonst lokal) ---------- */
const LS_KEY = 'wissensfunke-v1', LS_GEN = 'wissensfunke-gen-v1';
const fresh = () => ({ v: 1, t: 0, xp: 0, done: {}, rev: {}, days: {}, goal: { l: 1, r: 10 } });
function lsGet(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } }

const Store = {
  s: Object.assign(fresh(), lsGet(LS_KEY) || {}),
  gen: lsGet(LS_GEN) || [],
  mode: 'local', ref: null, genCol: null, writing: null, dirty: false, timer: null,
  async init() {
    const c = window.claude;
    if (!c || typeof c.use !== 'function') return;
    try {
      const [db, user] = await Promise.all([c.use('db'), c.use('user')]);
      if (!db || !user) return;
      const uid = await user.id();
      if (!uid) return;
      const ref = db.doc(`data/users/${uid}/progress`);
      const snap = await Promise.race([ref.get(), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))]);
      this.ref = ref; this.genCol = ref.collection('gen'); this.mode = 'cloud';
      if (snap.exists) {
        const remote = snap.data();
        if ((remote.t || 0) >= (this.s.t || 0)) { this.s = Object.assign(fresh(), JSON.parse(JSON.stringify(remote))); lsSet(LS_KEY, this.s); }
        else this.queue();
      } else {
        await ref.set(JSON.parse(JSON.stringify(this.s)));
      }
      try {
        const gs = await this.genCol.get();
        const remoteGen = gs.docs.filter(d => d.exists).map(d => JSON.parse(JSON.stringify(d.data())));
        const ids = new Set(remoteGen.map(g => g.id));
        const localOnly = this.gen.filter(g => !ids.has(g.id));
        this.gen = remoteGen.concat(localOnly);
        for (const g of localOnly) this.genCol.doc(g.id).set(g).catch(() => { });
        lsSet(LS_GEN, this.gen);
      } catch { }
    } catch (e) { this.mode = 'local'; }
  },
  save() {
    this.s.t = Date.now();
    lsSet(LS_KEY, this.s);
    this.queue();
  },
  queue() {
    if (this.mode !== 'cloud') return;
    this.dirty = true; clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), 1200);
  },
  async flush() {
    if (this.writing || !this.dirty) return;
    this.dirty = false;
    this.writing = this.ref.set(JSON.parse(JSON.stringify(this.s))).catch(e => { if (e && e.code === 'unavailable') this.dirty = true; });
    await this.writing; this.writing = null;
    if (this.dirty) this.queue();
  },
  async addGen(lesson) {
    this.gen.push(lesson); lsSet(LS_GEN, this.gen);
    if (this.mode === 'cloud') { try { await this.genCol.doc(lesson.id).set(lesson); } catch (e) { if (e && e.code === 'quota_exceeded') toast('Speicher voll: Lektion nur auf diesem Gerät gespeichert.'); } }
  },
  async removeGen(id) {
    this.gen = this.gen.filter(g => g.id !== id); lsSet(LS_GEN, this.gen);
    if (this.mode === 'cloud') { try { await this.genCol.doc(id).delete(); } catch { } }
  },
};
const S = () => Store.s;

/* ---------- Claude (sample) ---------- */
let samplePromise = null;
function getSample() {
  if (!samplePromise) {
    const c = window.claude;
    samplePromise = (c && typeof c.use === 'function') ? c.use('sample').catch(() => null) : Promise.resolve(null);
  }
  return samplePromise;
}
// null = unbekannt, false = nicht verfügbar (z. B. auf der eigenen Webseite), true = verfügbar
let sampleReady = (window.claude && typeof window.claude.use === 'function') ? null : false;

/* ---------- Lektionen ---------- */
function allLessons() { return WF.lessons.concat(Store.gen); }
function lessonById(id) { return allLessons().find(l => l.id === id); }
function lessonsIn(cat) { return allLessons().filter(l => l.cat === cat); }
function isDone(id) { return !!S().done[id]; }
function qid(l, i) { return `${l.id}~${i}`; }
function catProgress(cat) { const ls = lessonsIn(cat); return { done: ls.filter(l => isDone(l.id)).length, total: ls.length }; }

function dailyLesson() {
  const d = today(), n = dayNum(d), s = S();
  if (s.daily && s.daily.d === d && lessonById(s.daily.id)) return lessonById(s.daily.id);
  const l = pickDaily(d, n);
  s.daily = { d, id: l.id }; Store.save();
  return l;
}
function pickDaily(d, n) {
  const order = CATS.map((c, i) => CATS[(i + n) % CATS.length]);
  for (const c of order) {
    const next = WF.lessons.find(l => l.cat === c.id && !isDone(l.id));
    if (next) return next;
  }
  const pool = allLessons();
  return pool[hashStr(d) % pool.length];
}
function nextInCat(cat, afterId) {
  const ls = lessonsIn(cat);
  const i = ls.findIndex(l => l.id === afterId);
  return ls.slice(i + 1).find(l => !isDone(l.id)) || ls.find(l => !isDone(l.id) && l.id !== afterId) || null;
}
function randomLesson() {
  const open = allLessons().filter(l => !isDone(l.id));
  const pool = open.length ? open : allLessons();
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ---------- Fortschritt ---------- */
function dayRec(d = today()) { const s = S(); return s.days[d] || (s.days[d] = { l: 0, r: 0, xp: 0 }); }
function addXP(n) { S().xp += n; dayRec().xp += n; }
function streak() {
  const s = S(); let d = today(), n = 0;
  const active = x => s.days[x] && (s.days[x].l > 0 || s.days[x].r > 0);
  if (!active(d)) d = addDays(d, -1);
  while (active(d)) { n++; d = addDays(d, -1); }
  return n;
}
function level(xp) { let lv = 1, need = 100, rest = xp; while (rest >= need) { rest -= need; lv++; need = Math.round(need * 1.2); } return { lv, rest, need }; }
const INTERVALS = [1, 2, 4, 8, 16, 32, 64];
function dueReviews() {
  const s = S(), d = today();
  return Object.entries(s.rev).filter(([id, r]) => r.due <= d && questionById(id)).map(([id]) => id);
}
function questionById(id) {
  const k = id.lastIndexOf('~'); const l = lessonById(id.slice(0, k)); if (!l) return null;
  const q = (l.quiz || [])[Number(id.slice(k + 1))]; return q ? { l, q } : null;
}
function schedule(id, correct) {
  const s = S(); const r = s.rev[id] || { b: 0, ok: 0, bad: 0 };
  if (correct) { r.b = Math.min((r.b || 0) + 1, INTERVALS.length - 1); r.ok = (r.ok || 0) + 1; }
  else { r.b = 0; r.bad = (r.bad || 0) + 1; }
  r.due = addDays(today(), INTERVALS[r.b]);
  s.rev[id] = r;
}

/* ---------- Kopfzeile & Navigation ---------- */
const TABS = [
  { h: 'heute', n: 'Heute', i: 'home' },
  { h: 'entdecken', n: 'Entdecken', i: 'compass' },
  { h: 'wiederholen', n: 'Wiederholen', i: 'repeat' },
  { h: 'tipps', n: 'Tipps', i: 'bulb' },
  { h: 'profil', n: 'Profil', i: 'user' },
];
function renderChrome(view) {
  const due = dueReviews().length;
  const active = view.startsWith('kat-') ? 'entdecken' : view;
  $('#tabbar').innerHTML = TABS.map(t => `<a href="#${t.h}" class="${active === t.h ? 'on' : ''}">${svg(t.i)}${t.n}${t.h === 'wiederholen' && due ? `<span class="badge">${due > 99 ? '99+' : due}</span>` : ''}</a>`).join('');
  $('#deskNav').innerHTML = TABS.map(t => `<a href="#${t.h}" class="${active === t.h ? 'on' : ''}">${t.n}${t.h === 'wiederholen' && due ? ` (${due})` : ''}</a>`).join('');
  const st = streak();
  $('#topStats').innerHTML = `<span class="pill fire" title="Tage in Folge">${svg('flame')}${st}</span><span class="pill" title="Erfahrungspunkte">${svg('bolt')}${S().xp}</span>`;
  const inPlayer = view.startsWith('lektion-') || view === 'session';
  $('#tabbar').hidden = inPlayer;
}

/* ---------- Router ---------- */
let player = null;
function route() {
  const h = (location.hash || '#heute').slice(1) || 'heute';
  const app = $('#app');
  if (h.startsWith('lektion-')) {
    const l = lessonById(h.slice(8));
    if (!l) { location.hash = '#entdecken'; return; }
    if (!player || player.id !== l.id || player.kind !== 'lesson') startLesson(l);
    renderChrome(h); return;
  }
  if (h === 'session') { if (!player || player.kind === 'lesson') { location.hash = '#wiederholen'; return; } renderChrome(h); return; }
  player = null;
  renderChrome(h);
  if (h === 'entdecken') viewExplore(app);
  else if (h.startsWith('kat-') && CAT[h.slice(4)]) viewCat(app, CAT[h.slice(4)]);
  else if (h === 'wiederholen') viewReview(app);
  else if (h === 'tipps') viewTips(app);
  else if (h === 'profil') viewProfile(app);
  else viewHome(app);
  window.scrollTo(0, 0);
}
function go(h) { if (location.hash === '#' + h) route(); else location.hash = '#' + h; }

/* ---------- Ansicht: Heute ---------- */
function greet() { const h = new Date().getHours(); return h < 5 ? 'Gute Nacht' : h < 11 ? 'Guten Morgen' : h < 18 ? 'Hallo' : 'Guten Abend'; }
function viewHome(app) {
  const l = dailyLesson(), c = CAT[l.cat], dr = dayRec(), g = S().goal, due = dueReviews().length;
  const dateTxt = new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
  const facts = allLessons().filter(x => x.fact);
  const fl = facts[hashStr(today() + 'f') % facts.length];
  const tip = TIPS[dayNum(today()) % TIPS.length];
  const started = CATS.map(cc => ({ cc, p: catProgress(cc.id) })).filter(x => x.p.done > 0 && x.p.done < x.p.total);
  const doneToday = S().done[l.id] && S().done[l.id].d === today();
  app.innerHTML = `<div class="stack">
    <div class="hello"><p class="eyebrow">${esc(dateTxt)}</p><h1>${greet()}! Was lernst du heute?</h1></div>
    <article class="hero-lesson cat" style="--h:${c.h}">
      ${svg(l.cat, 'class="glyph"')}
      <span class="tag">${svg(l.cat)}Lektion des Tages · ${esc(c.name)}</span>
      <h2>${esc(l.title)}</h2>
      <p class="hook">${esc(l.hook)}</p>
      <div class="intro-meta"><span>${svg('clock', 'width="14" height="14"')} ca. ${l.min || 6} Min.</span><span>${plural((l.cards || []).length, 'Karte', 'Karten')}</span><span>${plural((l.quiz || []).length, 'Quizfrage', 'Quizfragen')}</span></div>
      ${doneToday ? (() => { const nx = nextInCat(l.cat, l.id) || randomLesson(); return `<div class="row"><span class="pill" style="color:var(--good)">${svg('check')}Heute geschafft</span></div><div class="row"><a class="btn primary" href="#lektion-${nx.id}">Bonus: ${esc(nx.title)} ${svg('right')}</a><a class="btn" href="#lektion-${l.id}">Nochmal ansehen</a></div>`; })()
        : `<div class="row"><a class="btn primary" href="#lektion-${l.id}">${isDone(l.id) ? 'Auffrischen' : 'Lektion starten'} ${svg('right')}</a></div>`}
    </article>
    <div class="goal">
      <div class="card"><span class="eyebrow">Lektionen heute</span><span class="big-num">${dr.l} / ${g.l}</span><div class="meter"><i style="width:${Math.min(100, dr.l / g.l * 100)}%"></i></div></div>
      <div class="card"><span class="eyebrow">Wiederholungen</span><span class="big-num">${dr.r} / ${g.r}</span><div class="meter"><i style="width:${Math.min(100, dr.r / g.r * 100)}%"></i></div></div>
    </div>
    <div class="quick">
      <button type="button" id="qRandom">${svg('shuffle')}Zufallslektion<span>Lass dich überraschen</span></button>
      <button type="button" id="qReview">${svg('repeat')}Wiederholen<span>${due ? plural(due, 'Frage fällig', 'Fragen fällig') : 'Gerade nichts fällig'}</span></button>
      <button type="button" id="qBlitz">${svg('quiz')}Blitzquiz<span>5 gemischte Fragen</span></button>
      ${sampleReady === false ? `<button type="button" id="qAll">${svg('compass')}Alle Themen<span>${CATS.length} Themenwelten entdecken</span></button>` : `<button type="button" id="qGen">${svg('sparkle')}Eigenes Thema<span>Claude schreibt dir eine Lektion</span></button>`}
    </div>
    ${fl ? `<section class="card stack"><span class="eyebrow">Wusstest du?</span><p class="fact">${inline(fl.fact)}</p><a class="small muted" href="#lektion-${fl.id}">Aus: ${esc(fl.title)}</a></section>` : ''}
    <section class="card tip"><span class="eyebrow">Lerntipp des Tages</span><h3>${esc(tip.t)}</h3><p>${esc(tip.d)}</p><p class="how"><b>So geht's:</b> ${esc(tip.how)}</p></section>
    ${started.length ? `<div class="section-h"><h2>Weiter in deinen Themen</h2></div><div class="lesson-list">${started.slice(0, 4).map(({ cc, p }) => { const nx = lessonsIn(cc.id).find(x => !isDone(x.id)); return nx ? lessonRow(nx, `${cc.name} · ${p.done}/${p.total} erledigt`) : ''; }).join('')}</div>` : ''}
  </div>`;
  $('#qRandom').onclick = () => go('lektion-' + randomLesson().id);
  $('#qReview').onclick = () => due ? startReview() : go('wiederholen');
  $('#qBlitz').onclick = startBlitz;
  if ($('#qAll')) $('#qAll').onclick = () => go('entdecken');
  if ($('#qGen')) $('#qGen').onclick = () => { go('entdecken'); setTimeout(() => { const i = $('#genTopic'); if (i) { i.focus(); i.scrollIntoView({ block: 'center' }); } }, 50); };
}
function lessonRow(l, sub) {
  const c = CAT[l.cat], d = isDone(l.id);
  return `<a class="lesson-row cat ${d ? 'done' : ''}" style="--h:${c.h}" href="#lektion-${l.id}"><span class="num">${d ? svg('check') : svg(l.cat)}</span><span class="tx"><b>${esc(l.title)}${l.ai ? '<span class="ai-mark">KI</span>' : ''}</b><span>${esc(sub || l.hook)}</span></span>${svg('right', 'width="18" height="18" style="color:var(--muted);flex:none"')}</a>`;
}

/* ---------- Ansicht: Entdecken ---------- */
function viewExplore(app) {
  app.innerHTML = `<div class="stack">
    <div class="hello"><h1>Entdecken</h1><p>${allLessons().length} Lektionen in ${CATS.length} Themenwelten.${sampleReady === false ? '' : ' Und mit Claude beliebig viele mehr.'}</p></div>
    <input class="input" id="search" type="search" placeholder="Suche nach Thema, z. B. Rom, Sterne, Inflation" autocomplete="off">
    <div id="results" class="lesson-list" hidden></div>
    <div class="cat-grid" id="catGrid">${CATS.map(c => { const p = catProgress(c.id); return `<a class="cat-tile cat" style="--h:${c.h}" href="#kat-${c.id}"><span class="ic">${svg(c.id)}</span><b>${esc(c.name)}</b><span class="small muted">${esc(c.d)}</span><div class="meter cat"><i style="width:${p.total ? p.done / p.total * 100 : 0}%"></i></div><span class="small muted">${p.done} von ${p.total} gelernt</span></a>`; }).join('')}</div>
    ${genBox()}
  </div>`;
  const s = $('#search');
  s.oninput = () => {
    const q = s.value.trim().toLowerCase(), r = $('#results'), g = $('#catGrid');
    if (!q) { r.hidden = true; g.hidden = false; return; }
    const hits = allLessons().filter(l => (l.title + ' ' + l.hook + ' ' + (l.tags || []).join(' ') + ' ' + CAT[l.cat].name + ' ' + (l.cards || []).map(c => c.h).join(' ')).toLowerCase().includes(q));
    r.innerHTML = hits.length ? hits.map(l => lessonRow(l, CAT[l.cat].name + ' · ' + l.hook)).join('') : `<div class="card small muted">Nichts gefunden. Lass dir unten von Claude eine Lektion zu „${esc(s.value.trim())}“ schreiben.</div>`;
    r.hidden = false; g.hidden = true;
    const gt = $('#genTopic'); if (gt && !hits.length) gt.value = s.value.trim();
  };
  wireGen(app);
}
function genBox(cat) {
  if (sampleReady === false) return '';
  return `<section class="card stack" id="genBox">
    <div class="row" style="gap:8px">${svg('sparkle', 'width="20" height="20" style="color:var(--accent)"')}<h2 style="font-size:19px">Neue Lektion mit Claude</h2></div>
    <p class="muted small">Gib ein Thema ein, über das du mehr wissen willst. Claude schreibt dir daraus eine komplette Lektion mit Quiz. Sie wird gespeichert und landet auch in deinen Wiederholungen.</p>
    <input class="input" id="genTopic" placeholder="z. B. Die Pest im Mittelalter, Wie funktioniert GPS?" autocomplete="off">
    <div class="row">
      <select class="input" id="genCat" style="width:auto;flex:1;min-width:160px">${CATS.map(c => `<option value="${c.id}" ${cat === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>
      <button class="btn primary" type="button" id="genGo">${svg('sparkle')}Lektion erstellen</button>
      <button class="btn" type="button" id="genRand">${svg('shuffle')}Überrasch mich</button>
    </div>
    <p class="small" id="genMsg" role="status"></p>
  </section>`;
}
function wireGen(root) {
  const btn = $('#genGo', root), rnd = $('#genRand', root), msg = $('#genMsg', root);
  if (!btn) return;
  getSample().then(s => { sampleReady = !!s; if (!s) { btn.disabled = rnd.disabled = true; msg.textContent = 'Diese Funktion braucht Claude und läuft nur in der veröffentlichten Version auf claude.ai.'; msg.className = 'small muted'; } });
  const run = async (topic) => {
    const cat = $('#genCat', root).value;
    btn.disabled = rnd.disabled = true;
    msg.innerHTML = `<span class="spin"></span> Claude schreibt deine Lektion. Das dauert meist 20 bis 60 Sekunden …`;
    try {
      const l = await generateLesson(cat, topic);
      await Store.addGen(l);
      msg.textContent = 'Fertig!';
      go('lektion-' + l.id);
    } catch (e) {
      msg.textContent = e && e.code === 'rate_limited' ? 'Gerade zu viele Anfragen. Versuch es in einer Minute nochmal.' : e && e.code === 'not_granted' ? 'Claude ist für diese Seite nicht freigegeben.' : 'Das hat nicht geklappt: ' + (e && e.message ? e.message : 'unbekannter Fehler') + '. Versuch es nochmal.';
      btn.disabled = rnd.disabled = false;
    }
  };
  btn.onclick = () => { const t = $('#genTopic', root).value.trim(); if (!t) { msg.textContent = 'Gib zuerst ein Thema ein oder drück „Überrasch mich“.'; $('#genTopic', root).focus(); return; } run(t); };
  rnd.onclick = () => run('');
}

const LESSON_SCHEMA = `{
  "title": "kurzer, neugierig machender Titel (max. 6 Wörter)",
  "hook": "ein Satz, der Lust aufs Thema macht",
  "min": 6,
  "cards": [
    { "h": "Überschrift der Karte", "t": "Text mit 70 bis 120 Wörtern. Wichtige Begriffe mit **fett** markieren. Absätze mit \\n\\n trennen.", "merke": "ein kurzer Merksatz" }
  ],
  "quiz": [
    { "t": "mc", "q": "Frage", "o": ["richtige oder falsche Option", "…", "…", "…"], "a": 0, "e": "kurze Erklärung" },
    { "t": "tf", "q": "Aussage, die wahr oder falsch ist", "a": true, "e": "Erklärung" },
    { "t": "gap", "q": "Satz mit ___ als Lücke", "a": ["Lösungswort", "erlaubte Schreibvariante"], "e": "Erklärung" },
    { "t": "order", "q": "Bringe in die richtige Reihenfolge (z. B. zeitlich)", "o": ["zuerst", "dann", "danach", "zuletzt"], "e": "Erklärung" },
    { "t": "match", "q": "Ordne richtig zu", "pairs": [["Begriff", "passendes Gegenstück"], ["…", "…"], ["…", "…"]], "e": "Erklärung" }
  ],
  "tips": ["konkrete Idee zum Weiterlernen: Buch, Film, Doku, Ort, Experiment"],
  "fact": "ein überraschender, korrekter Wusstest-du-Fakt in einem Satz"
}`;

async function generateLesson(cat, topic) {
  const sample = await getSample();
  if (!sample) throw new Error('Claude ist hier nicht verfügbar');
  const c = CAT[cat];
  const existing = lessonsIn(cat).map(l => l.title).join('; ');
  const prompt = `Du schreibst Lektionen für „Wissensfunke“, eine Lern-App für Allgemeinwissen (ähnlich wie Kinnu oder Sophia). Zielgruppe: neugierige junge Erwachsene, die statt TikTok jeden Tag etwas Neues lernen wollen.

Erstelle genau EINE Lektion auf Deutsch im Themenbereich „${c.name}“ ${topic ? `zum Thema: „${topic}“` : 'zu einem spannenden, grundlegenden Thema, das man als gebildeter Mensch kennen sollte'}.
Bereits vorhandene Lektionen in diesem Bereich (nicht wiederholen): ${existing || 'keine'}.

Regeln:
- Nur gesicherte Fakten. Keine erfundenen Zahlen, Zitate oder Quellen. Lieber weglassen als raten.
- Anschaulich und konkret: Namen, Jahreszahlen, Beispiele, Vergleiche aus dem Alltag.
- Aufbau: 5 Karten, die aufeinander aufbauen (Einstieg, Kern, Zusammenhänge, Überraschendes, Bedeutung heute).
- Die dritte Karte bekommt zusätzlich ein Feld "check" mit einer Verständnisfrage: { "q": "…", "o": ["…","…","…"], "a": Index der richtigen Option, "e": "Erklärung" }.
- Quiz: genau 6 Fragen mit mindestens 4 verschiedenen Typen (mc, tf, gap, order, match). Bei mc steht "a" für den Index der richtigen Option, Optionen plausibel. Bei order steht "o" bereits in der RICHTIGEN Reihenfolge. Bei gap ist die Lücke genau ein Wort oder eine Zahl.
- Die Fragen prüfen nur Inhalte, die in den Karten vorkommen.
- Gute, klare Sprache. Verwende keine Gedankenstriche als Stilmittel.

Antworte ausschließlich mit JSON in diesem Format:
${LESSON_SCHEMA}`;
  const v = await sample.json(prompt, { modelTier: 'default', cache: false });
  return validateLesson(v, cat, topic);
}
function validateLesson(v, cat, topic) {
  if (!v || typeof v !== 'object') throw new Error('Antwort war leer');
  const str = x => typeof x === 'string' && x.trim().length > 0;
  const cards = (Array.isArray(v.cards) ? v.cards : []).filter(c => c && str(c.h) && str(c.t)).map(c => {
    const o = { h: c.h, t: c.t }; if (str(c.merke)) o.merke = c.merke;
    const k = c.check; if (k && str(k.q) && Array.isArray(k.o) && k.o.length >= 2 && Number.isInteger(k.a) && k.a >= 0 && k.a < k.o.length) o.check = { q: k.q, o: k.o.map(String), a: k.a, e: str(k.e) ? k.e : '' };
    return o;
  });
  const quiz = (Array.isArray(v.quiz) ? v.quiz : []).filter(q => {
    if (!q || !str(q.q)) return false;
    if (q.t === 'mc') return Array.isArray(q.o) && q.o.length >= 2 && Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length;
    if (q.t === 'tf') return typeof q.a === 'boolean';
    if (q.t === 'gap') { if (typeof q.a === 'string') q.a = [q.a]; return Array.isArray(q.a) && q.a.length > 0 && q.q.includes('___'); }
    if (q.t === 'order') return Array.isArray(q.o) && q.o.length >= 3;
    if (q.t === 'match') return Array.isArray(q.pairs) && q.pairs.length >= 2 && q.pairs.every(p => Array.isArray(p) && p.length === 2 && str(p[0]) && str(p[1]));
    return false;
  });
  if (cards.length < 3 || quiz.length < 3) throw new Error('Die Lektion war unvollständig');
  return {
    id: 'ki-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    cat, ai: true, created: today(), topic: topic || '',
    title: str(v.title) ? v.title : (topic || 'Neue Lektion'), hook: str(v.hook) ? v.hook : '',
    min: Number(v.min) > 0 && Number(v.min) < 30 ? Number(v.min) : 6,
    cards, quiz, tips: (Array.isArray(v.tips) ? v.tips : []).filter(str).slice(0, 4), fact: str(v.fact) ? v.fact : '',
  };
}

/* ---------- Ansicht: Kategorie ---------- */
function viewCat(app, c) {
  const ls = lessonsIn(c.id), p = catProgress(c.id);
  app.innerHTML = `<div class="stack cat" style="--h:${c.h}">
    <a href="#entdecken" class="small muted" style="text-decoration:none">${svg('left', 'width="14" height="14"')} Alle Themen</a>
    <div class="cat-head"><span class="ic">${svg(c.id)}</span><div><h1 style="font-size:28px">${esc(c.name)}</h1><p class="muted">${esc(c.d)}</p></div></div>
    <div class="meter cat"><i style="width:${p.total ? p.done / p.total * 100 : 0}%"></i></div>
    <p class="small muted">${p.done} von ${p.total} Lektionen gelernt. Die Lektionen bauen grob aufeinander auf, du kannst aber frei wählen.</p>
    <div class="lesson-list">${ls.map((l, i) => lessonRow(l, `${l.ai ? 'Von Claude erstellt' : 'Lektion ' + (i + 1)} · ${l.min || 6} Min. · ${l.hook}`)).join('')}</div>
    ${genBox(c.id)}
  </div>`;
  wireGen(app);
}

/* ---------- Ansicht: Wiederholen ---------- */
function viewReview(app) {
  const due = dueReviews(), s = S(), total = Object.keys(s.rev).filter(questionById).length;
  const boxes = [0, 0, 0, 0, 0, 0, 0]; Object.entries(s.rev).forEach(([id, r]) => { if (questionById(id)) boxes[r.b || 0]++; });
  const next = Object.values(s.rev).map(r => r.due).filter(d => d > today()).sort()[0];
  app.innerHTML = `<div class="stack">
    <div class="hello"><h1>Wiederholen</h1><p>Hier kommen die Quizfragen deiner Lektionen zurück, genau dann, wenn du sie fast vergessen hättest. Richtig beantwortete Fragen wandern ein Fach weiter und kommen seltener.</p></div>
    ${due.length ? `<div class="card stack"><span class="eyebrow">Jetzt fällig</span><span class="big-num">${plural(due.length, 'Frage', 'Fragen')}</span><button class="btn primary block" type="button" id="goRev">${svg('repeat')}Wiederholung starten${due.length > 12 ? ' (12 Fragen)' : ''}</button></div>`
      : `<div class="card empty">${svg('check')}<b>${total ? 'Alles erledigt für heute.' : 'Noch nichts zu wiederholen.'}</b><p class="muted small">${total ? (next ? `Die nächsten Fragen sind am ${new Date(next + 'T12:00').toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })} fällig.` : '') : 'Schließ deine erste Lektion ab, dann landen ihre Quizfragen automatisch hier.'}</p><a class="btn" href="#heute">Zur Lektion des Tages</a></div>`}
    <div class="card stack"><span class="eyebrow">Deine Wissensfächer</span>
      <p class="small muted">${plural(total, 'Frage', 'Fragen')} im System. Fach 1 kommt morgen wieder, Fach 7 erst nach rund zwei Monaten.</p>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;align-items:end;height:110px">${boxes.map((n, i) => { const m = Math.max(1, ...boxes); return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end"><span class="small" style="font-variant-numeric:tabular-nums">${n}</span><i style="display:block;width:100%;max-width:38px;border-radius:6px 6px 2px 2px;height:${Math.max(4, n / m * 70)}px;background:color-mix(in srgb,var(--accent) ${30 + i * 10}%,var(--surface-2))"></i><span class="small muted">${i + 1}</span></div>`; }).join('')}</div>
    </div>
    <button class="btn" type="button" id="goBlitz">${svg('quiz')}Blitzquiz: 5 zufällige Fragen zum Üben</button>
  </div>`;
  const b = $('#goRev'); if (b) b.onclick = startReview;
  $('#goBlitz').onclick = startBlitz;
}

/* ---------- Ansicht: Tipps ---------- */
function viewTips(app) {
  app.innerHTML = `<div class="stack">
    <div class="hello"><h1>Besser lernen</h1><p>Wie du aus 10 Minuten am Tag das Meiste rausholst. Alles hier basiert auf gut erforschten Lernprinzipien.</p></div>
    ${TIPS.map((t, i) => `<section class="card tip"><span class="eyebrow">Tipp ${i + 1}</span><h3>${esc(t.t)}</h3><p>${esc(t.d)}</p><p class="how"><b>So geht's:</b> ${esc(t.how)}</p></section>`).join('')}
    <section class="card tip"><span class="eyebrow">Dein Ablauf</span><h3>Die 10-Minuten-Routine</h3>
      <ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px"><li>Fällige Wiederholungen machen (2 bis 3 Minuten)</li><li>Lektion des Tages lesen und Quiz machen (5 bis 7 Minuten)</li><li>Eine Erkenntnis in eigenen Worten aufschreiben oder jemandem erzählen (1 Minute)</li></ol>
    </section>
  </div>`;
}

/* ---------- Ansicht: Profil ---------- */
function viewProfile(app) {
  const s = S(), lv = level(s.xp), st = streak();
  const doneN = Object.keys(s.done).length;
  let ok = 0, bad = 0; Object.values(s.rev).forEach(r => { ok += r.ok || 0; bad += r.bad || 0; });
  let best = 0, cur = 0; Object.keys(s.days).sort().forEach((d, i, arr) => { const a = s.days[d].l > 0 || s.days[d].r > 0; if (!a) { cur = 0; return; } cur = (i > 0 && arr[i - 1] === addDays(d, -1) && (s.days[arr[i - 1]].l > 0 || s.days[arr[i - 1]].r > 0)) ? cur + 1 : 1; best = Math.max(best, cur); });
  const heat = []; for (let i = 27; i >= 0; i--) { const d = addDays(today(), -i), r = s.days[d]; const v = r ? r.l * 2 + r.r / 5 : 0; heat.push(`<i class="${v >= 3 ? 'l3' : v >= 1.5 ? 'l2' : v > 0 ? 'l1' : ''} ${i === 0 ? 'today' : ''}" title="${d}: ${r ? `${r.l} Lektionen, ${r.r} Wiederholungen` : 'nichts'}"></i>`); }
  app.innerHTML = `<div class="stack">
    <div class="hello"><h1>Dein Fortschritt</h1><p>Level ${lv.lv} · noch ${lv.need - lv.rest} XP bis Level ${lv.lv + 1}</p></div>
    <div class="meter"><i style="width:${lv.rest / lv.need * 100}%"></i></div>
    <div class="stats">
      <div class="card"><span class="eyebrow">Serie</span><div class="big-num">${plural(st, 'Tag', 'Tage')}</div><span class="small muted">Rekord: ${best}</span></div>
      <div class="card"><span class="eyebrow">Lektionen</span><div class="big-num">${doneN}</div><span class="small muted">von ${allLessons().length}</span></div>
      <div class="card"><span class="eyebrow">Erfahrung</span><div class="big-num">${s.xp} XP</div><span class="small muted">heute ${dayRec().xp}</span></div>
      <div class="card"><span class="eyebrow">Trefferquote</span><div class="big-num">${ok + bad ? Math.round(ok / (ok + bad) * 100) + ' %' : '–'}</div><span class="small muted">in Wiederholungen</span></div>
    </div>
    <section class="card stack"><span class="eyebrow">Letzte 4 Wochen</span><div class="heat">${heat.join('')}</div></section>
    <section class="card stack"><span class="eyebrow">Themenwelten</span><div class="cat-prog">${CATS.map(c => { const p = catProgress(c.id); return `<div class="r cat" style="--h:${c.h}"><span>${esc(c.name)}</span><div class="meter cat"><i style="width:${p.total ? p.done / p.total * 100 : 0}%"></i></div><span>${p.done}/${p.total}</span></div>`; }).join('')}</div></section>
    <section class="card stack"><span class="eyebrow">Tagesziel</span>
      <div class="row"><span style="min-width:120px">Lektionen</span><div class="seg" id="gL">${[1, 2, 3].map(n => `<button type="button" data-v="${n}" class="${s.goal.l === n ? 'on' : ''}">${n}</button>`).join('')}</div></div>
      <div class="row"><span style="min-width:120px">Wiederholungen</span><div class="seg" id="gR">${[5, 10, 20].map(n => `<button type="button" data-v="${n}" class="${s.goal.r === n ? 'on' : ''}">${n}</button>`).join('')}</div></div>
    </section>
    <section class="card stack"><span class="eyebrow">Speicherung</span>
      <span class="sync ${Store.mode}"><i></i>${Store.mode === 'cloud' ? 'Fortschritt wird in deinem Claude-Konto gespeichert und ist auf jedem Gerät gleich.' : 'Fortschritt wird in diesem Browser gespeichert. Mit „Sicherung kopieren“ und „Sicherung einfügen“ nimmst du ihn auf ein anderes Gerät mit.'}</span>
      <div class="row"><button class="btn" type="button" id="exp">Sicherung kopieren</button><button class="btn" type="button" id="impT">Sicherung einfügen</button><button class="btn ghost" type="button" id="reset">Alles zurücksetzen</button></div>
      <div id="impBox" hidden class="stack"><textarea class="input" id="impTxt" placeholder="Hier den kopierten Sicherungstext einfügen"></textarea><button class="btn primary" type="button" id="impGo">Fortschritt übernehmen</button></div>
      <p class="small" id="dataMsg" role="status"></p>
    </section>
  </div>`;
  const seg = (id, key) => $$(`#${id} button`).forEach(b => b.onclick = () => { s.goal[key] = Number(b.dataset.v); Store.save(); viewProfile(app); });
  seg('gL', 'l'); seg('gR', 'r');
  $('#exp').onclick = async () => {
    const txt = JSON.stringify({ s: Store.s, gen: Store.gen });
    try { await navigator.clipboard.writeText(txt); $('#dataMsg').textContent = 'Sicherung in die Zwischenablage kopiert.'; }
    catch { $('#impBox').hidden = false; $('#impTxt').value = txt; $('#impTxt').select(); $('#dataMsg').textContent = 'Kopieren ging nicht automatisch. Der Text ist markiert, kopiere ihn mit Strg+C.'; }
  };
  $('#impT').onclick = () => { $('#impBox').hidden = false; $('#impTxt').value = ''; $('#impTxt').focus(); };
  $('#impGo').onclick = async () => {
    try {
      const o = JSON.parse($('#impTxt').value);
      if (!o.s || typeof o.s.done !== 'object') throw 0;
      Store.s = Object.assign(fresh(), o.s); Store.save();
      for (const g of (o.gen || [])) if (!Store.gen.some(x => x.id === g.id)) await Store.addGen(g);
      toast('Fortschritt übernommen'); viewProfile(app); renderChrome('profil');
    } catch { $('#dataMsg').textContent = 'Der Text ist keine gültige Sicherung. Kopiere ihn komplett noch einmal.'; }
  };
  let armed = false;
  $('#reset').onclick = () => {
    if (!armed) { armed = true; $('#reset').textContent = 'Wirklich alles löschen? Nochmal tippen'; $('#reset').style.color = 'var(--bad)'; setTimeout(() => { armed = false; const r = $('#reset'); if (r) { r.textContent = 'Alles zurücksetzen'; r.style.color = ''; } }, 4000); return; }
    const goal = s.goal; Store.s = fresh(); Store.s.goal = goal; Store.save(); toast('Fortschritt zurückgesetzt'); viewProfile(app); renderChrome('profil');
  };
}

/* ---------- Fragen-Renderer ---------- */
const norm = s => String(s).toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ae/g, 'a').replace(/oe/g, 'o').replace(/ue/g, 'u').replace(/ß/g, 'ss').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
function lev(a, b) { const m = a.length, n = b.length; const d = Array.from({ length: m + 1 }, (_, i) => [i]); for (let j = 1; j <= n; j++) d[0][j] = j; for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
function gapOk(input, answers) {
  const x = norm(input); if (!x) return false;
  return answers.some(a => { const y = norm(a); if (x === y) return true; const tol = y.length >= 9 ? 2 : y.length >= 5 ? 1 : 0; return tol > 0 && !/^\d+$/.test(y) && lev(x, y) <= tol; });
}
const TYPE_LABEL = { mc: 'Wähle die richtige Antwort', tf: 'Richtig oder falsch?', gap: 'Ergänze die Lücke', order: 'Bring in die richtige Reihenfolge', match: 'Ordne richtig zu', check: 'Kurzer Check' };

function renderQuestion(q, host, onAnswer, label) {
  const type = q.t || 'mc';
  host.innerHTML = `<span class="q-type">${esc(label || TYPE_LABEL[type])}</span><p class="q-text">${type === 'gap' ? inline(q.q).replace(/_{3,}/g, '<span style="border-bottom:2px solid currentColor;padding:0 1.5em">&nbsp;</span>') : inline(q.q)}</p><div class="q-body"></div><div class="q-fb"></div>`;
  const body = $('.q-body', host), fb = $('.q-fb', host);
  let answered = false;
  const finish = (ok, extra = '') => {
    if (answered) return; answered = true;
    fb.innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}" role="status"><b>${ok ? pick(['Richtig!', 'Genau!', 'Stark!', 'Sitzt!']) : 'Nicht ganz.'}</b>${extra}${q.e ? `<span>${inline(q.e)}</span>` : ''}</div>`;
    onAnswer(ok);
  };
  if (type === 'mc' || type === 'check') {
    const idx = shuffle(q.o.map((_, i) => i));
    body.innerHTML = `<div class="opts">${idx.map((oi, k) => `<button type="button" class="opt" data-i="${oi}"><span class="k">${k + 1}</span><span>${inline(q.o[oi])}</span></button>`).join('')}</div>`;
    $$('.opt', body).forEach(b => b.onclick = () => {
      const i = Number(b.dataset.i), ok = i === q.a;
      $$('.opt', body).forEach(x => { x.disabled = true; if (Number(x.dataset.i) === q.a) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      finish(ok);
    });
  } else if (type === 'tf') {
    body.innerHTML = `<div class="tf"><button type="button" class="opt" data-v="1"><span class="k">1</span>Richtig</button><button type="button" class="opt" data-v="0"><span class="k">2</span>Falsch</button></div>`;
    $$('.opt', body).forEach(b => b.onclick = () => {
      const v = b.dataset.v === '1', ok = v === q.a;
      $$('.opt', body).forEach(x => { x.disabled = true; if ((x.dataset.v === '1') === q.a) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      finish(ok, ok ? '' : `<span>Die Aussage ist <strong>${q.a ? 'richtig' : 'falsch'}</strong>.</span>`);
    });
  } else if (type === 'gap') {
    body.innerHTML = `<form class="gap-row"><input class="input" id="gapIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Deine Antwort"><button class="btn primary" type="submit">Prüfen</button></form>${q.hint ? `<button type="button" class="btn ghost small" id="gapHint" style="align-self:flex-start;padding-left:0">Tipp anzeigen</button>` : ''}`;
    const f = $('form', body), inp = $('#gapIn', body);
    setTimeout(() => inp.focus({ preventScroll: true }), 30);
    const h = $('#gapHint', body); if (h) h.onclick = () => { h.outerHTML = `<p class="small muted">Tipp: ${esc(q.hint)}</p>`; };
    f.onsubmit = e => {
      e.preventDefault(); if (answered || !inp.value.trim()) return;
      const ok = gapOk(inp.value, q.a);
      inp.disabled = true; $('button', f).disabled = true;
      inp.style.borderColor = ok ? 'var(--good)' : 'var(--bad)';
      finish(ok, `<span>Lösung: <strong>${esc(q.a[0])}</strong></span>`);
    };
  } else if (type === 'order') {
    let items = shuffle(q.o.map((_, i) => i)); let guard = 0;
    while (items.every((v, i) => v === i) && guard++ < 10) items = shuffle(items);
    const chosen = [];
    const draw = () => {
      body.innerHTML = `<div class="order-ans">${chosen.map((i, k) => `<button type="button" class="chip" data-i="${i}"><span class="n">${k + 1}</span>${inline(q.o[i])}</button>`).join('')}</div>
      <div class="order-pool">${items.filter(i => !chosen.includes(i)).map(i => `<button type="button" class="chip" data-i="${i}"><span class="n" style="background:var(--surface-2);color:var(--muted)">·</span>${inline(q.o[i])}</button>`).join('')}</div>
      <div class="row"><button class="btn primary" type="button" id="ordGo" ${chosen.length === q.o.length ? '' : 'disabled'}>Prüfen</button><button class="btn ghost" type="button" id="ordReset">Zurücksetzen</button></div>`;
      $$('.order-pool .chip', body).forEach(b => b.onclick = () => { chosen.push(Number(b.dataset.i)); draw(); });
      $$('.order-ans .chip', body).forEach(b => b.onclick = () => { chosen.splice(chosen.indexOf(Number(b.dataset.i)), 1); draw(); });
      $('#ordReset', body).onclick = () => { chosen.length = 0; draw(); };
      $('#ordGo', body).onclick = () => {
        const ok = chosen.every((v, i) => v === i);
        $$('.order-ans .chip', body).forEach((b, k) => { b.disabled = true; b.classList.add(Number(b.dataset.i) === k ? 'right' : 'wrong'); });
        $('#ordGo', body).parentElement.remove();
        finish(ok, ok ? '' : `<span>Richtige Reihenfolge: ${q.o.map((x, i) => `${i + 1}. ${inline(x)}`).join(' · ')}</span>`);
      };
    };
    draw();
  } else if (type === 'match') {
    const L = q.pairs.map((p, i) => i), R = shuffle(q.pairs.map((p, i) => i));
    const pairOf = {}; // left -> right
    let selL = null, selR = null;
    const colors = [10, 200, 130, 280, 45, 330];
    const draw = () => {
      const rightTaken = Object.fromEntries(Object.entries(pairOf).map(([l, r]) => [r, Number(l)]));
      body.innerHTML = `<div class="match"><div class="col">${L.map(i => `<button type="button" class="chip ${selL === i ? 'sel' : ''}" data-l="${i}" ${pairOf[i] !== undefined ? `data-pair style="border-color:hsl(${colors[i % 6]} 60% 50%)"` : ''}>${pairOf[i] !== undefined ? `<span class="n" style="background:hsl(${colors[i % 6]} 60% 50%)">${i + 1}</span>` : ''}${inline(q.pairs[i][0])}</button>`).join('')}</div>
      <div class="col">${R.map(j => { const l = rightTaken[j]; return `<button type="button" class="chip ${selR === j ? 'sel' : ''}" data-r="${j}" ${l !== undefined ? `data-pair style="border-color:hsl(${colors[l % 6]} 60% 50%)"` : ''}>${l !== undefined ? `<span class="n" style="background:hsl(${colors[l % 6]} 60% 50%)">${l + 1}</span>` : ''}${inline(q.pairs[j][1])}</button>`; }).join('')}</div></div>
      <div class="row"><button class="btn primary" type="button" id="mGo" ${Object.keys(pairOf).length === L.length ? '' : 'disabled'}>Prüfen</button><span class="small muted">Tippe links und dann rechts, um zu verbinden.</span></div>`;
      const tryPair = () => { if (selL !== null && selR !== null) { for (const k in pairOf) if (pairOf[k] === selR) delete pairOf[k]; pairOf[selL] = selR; selL = selR = null; } draw(); };
      $$('[data-l]', body).forEach(b => b.onclick = () => { const i = Number(b.dataset.l); if (pairOf[i] !== undefined && selR === null) { delete pairOf[i]; selL = null; draw(); return; } selL = selL === i ? null : i; tryPair(); });
      $$('[data-r]', body).forEach(b => b.onclick = () => { const j = Number(b.dataset.r); const owner = Object.keys(pairOf).find(k => pairOf[k] === j); if (owner !== undefined && selL === null) { delete pairOf[owner]; selR = null; draw(); return; } selR = selR === j ? null : j; tryPair(); });
      $('#mGo', body).onclick = () => {
        let ok = true;
        $$('[data-l]', body).forEach(b => { const i = Number(b.dataset.l); const good = pairOf[i] === i; if (!good) ok = false; b.classList.add(good ? 'right' : 'wrong'); b.disabled = true; });
        $$('[data-r]', body).forEach(b => b.disabled = true);
        $('#mGo', body).parentElement.remove();
        finish(ok, ok ? '' : `<span>${q.pairs.map(p => `${inline(p[0])} → ${inline(p[1])}`).join(' · ')}</span>`);
      };
    };
    draw();
  }
}
const pick = a => a[Math.floor(Math.random() * a.length)];

/* ---------- Lektions-Player ---------- */
function startLesson(l) {
  const c = CAT[l.cat];
  const steps = [{ k: 'intro' }, ...(l.cards || []).map(card => ({ k: 'card', card })), ...(l.quiz || []).map((q, i) => ({ k: 'q', q, i })), { k: 'end' }];
  player = { kind: 'lesson', id: l.id, l, c, steps, i: 0, answers: {}, checks: {}, xp: 0 };
  drawPlayer();
}
function drawPlayer() {
  const p = player, app = $('#app');
  const st = p.steps[p.i];
  const pct = p.i / (p.steps.length - 1) * 100;
  app.innerHTML = `<div class="player cat" style="--h:${p.c.h}">
    <div class="player-top"><button class="icon-btn" type="button" id="pClose" aria-label="Lektion verlassen">${svg('x')}</button><div class="progress"><i style="width:${pct}%"></i></div>${sampleReady !== false ? `<button class="icon-btn" type="button" id="pAsk" aria-label="Frag Claude" title="Frag nach">${svg('chat')}</button>` : ''}</div>
    <div class="slide" id="slide"></div>
    <div class="player-nav">${p.i > 0 && st.k !== 'end' && p.steps[p.i - 1].k !== 'q' && st.k !== 'q' ? `<button class="btn ghost" type="button" id="pBack" aria-label="Zurück">${svg('left')}</button>` : ''}<button class="btn primary" type="button" id="pNext"></button></div>
  </div>`;
  const slide = $('#slide'), next = $('#pNext');
  $('#pClose').onclick = () => go(p.l.ai ? 'kat-' + p.l.cat : 'heute');
  const ask = $('#pAsk'); if (ask) ask.onclick = () => openAsk(p.l, st.k === 'card' ? st.card : null);
  const back = $('#pBack'); if (back) back.onclick = () => { p.i--; drawPlayer(); };
  const setNext = (label, enabled = true) => { next.innerHTML = `${label} ${svg('right')}`; next.disabled = !enabled; };
  next.onclick = () => { if (next.disabled) return; if (p.i < p.steps.length - 1) { p.i++; drawPlayer(); window.scrollTo(0, 0); } };

  if (st.k === 'intro') {
    const l = p.l;
    slide.innerHTML = `<span class="tag">${svg(l.cat)}${esc(p.c.name)}${l.ai ? ' · von Claude erstellt' : ''}</span><h2 style="font-size:clamp(26px,6vw,34px)">${esc(l.title)}</h2><div class="reading"><p>${inline(l.hook)}</p></div>
      <div class="intro-meta"><span>ca. ${l.min || 6} Min.</span><span>${plural(l.cards.length, 'Karte', 'Karten')}</span><span>${plural(l.quiz.length, 'Quizfrage', 'Quizfragen')}</span>${isDone(l.id) ? `<span>Schon gelernt am ${new Date(S().done[l.id].d + 'T12:00').toLocaleDateString('de-DE')}</span>` : ''}</div>
      <div class="merke"><b>Tipp</b><span>Lies jede Karte aufmerksam. Am Ende wartet ein Quiz, und die Fragen kommen später in deinen Wiederholungen zurück.</span></div>`;
    setNext("Los geht's");
  } else if (st.k === 'card') {
    const cd = st.card, n = p.steps.filter(s => s.k === 'card').indexOf(st) + 1, tot = p.l.cards.length;
    slide.innerHTML = `<span class="eyebrow">Karte ${n} von ${tot}</span><h2>${esc(cd.h)}</h2><div class="reading">${paras(cd.t)}</div>${cd.merke ? `<div class="merke"><b>Merke</b><span>${inline(cd.merke)}</span></div>` : ''}${cd.check ? '<div class="stack" id="chk" style="border-top:1px solid var(--line);padding-top:16px"></div>' : ''}`;
    if (cd.check) {
      const done = p.checks[p.i];
      if (done !== undefined) { $('#chk').innerHTML = `<div class="feedback ${done ? 'ok' : 'no'}"><b>${done ? 'Check bestanden' : 'Check: nochmal anschauen'}</b><span>${inline(cd.check.e || '')}</span></div>`; setNext('Weiter'); }
      else { setNext('Erst den Check beantworten', false); renderQuestion(Object.assign({ t: 'check' }, cd.check), $('#chk'), ok => { p.checks[p.i] = ok; setNext('Weiter'); }); }
    } else setNext(n === tot ? 'Zum Quiz' : 'Weiter');
  } else if (st.k === 'q') {
    const qn = st.i + 1, tot = p.l.quiz.length;
    slide.innerHTML = `<span class="eyebrow">Quiz · Frage ${qn} von ${tot}</span><div class="stack" id="qh"></div>`;
    if (p.answers[st.i] !== undefined) { p.i++; drawPlayer(); return; }
    setNext('Antwort wählen', false);
    renderQuestion(st.q, $('#qh'), ok => { p.answers[st.i] = ok; setNext(qn === tot ? 'Ergebnis ansehen' : 'Nächste Frage'); });
  } else if (st.k === 'end') {
    finishLesson(slide, next);
  }
}
function finishLesson(slide, next) {
  const p = player, l = p.l, s = S();
  const total = l.quiz.length, right = Object.values(p.answers).filter(Boolean).length;
  const score = total ? right / total : 1;
  if (!p.recorded) {
    p.recorded = true;
    const first = !s.done[l.id];
    p.xp = first ? 20 + right * 5 : 5 + right * 2;
    const prev = s.done[l.id] || { n: 0, best: 0 };
    s.done[l.id] = { d: today(), s: Math.round(score * 100) / 100, n: (prev.n || 0) + 1, best: Math.max(prev.best || 0, score) };
    l.quiz.forEach((q, i) => {
      const id = qid(l, i);
      if (!s.rev[id]) s.rev[id] = { b: p.answers[i] ? 1 : 0, ok: 0, bad: 0, due: addDays(today(), p.answers[i] ? 2 : 1) };
    });
    dayRec().l += 1; addXP(p.xp); Store.save();
  }
  const nx = nextInCat(l.cat, l.id);
  const C = 2 * Math.PI * 52;
  const msg = score === 1 ? 'Perfekt! Alles richtig.' : score >= .7 ? 'Sehr gut gemacht.' : score >= .4 ? 'Solide. Die Wiederholungen holen den Rest.' : 'Guter Anfang. Die Fragen kommen morgen wieder.';
  const merke = l.cards.filter(c => c.merke).map(c => c.merke);
  slide.innerHTML = `<div class="score-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" stroke="var(--surface-2)" stroke-width="10" fill="none"/><circle cx="60" cy="60" r="52" stroke="var(--c)" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - score)}"/></svg><div>${right}/${total}<small>richtig</small></div></div>
    <div style="text-align:center" class="stack"><h2>${msg}</h2><p class="muted">+${p.xp} XP · ${plural(total, 'Frage', 'Fragen')} in deine Wiederholungen übernommen</p></div>
    ${merke.length ? `<div class="stack"><span class="eyebrow">Das nimmst du mit</span><ul class="recap">${merke.map(m => `<li>${inline(m)}</li>`).join('')}</ul></div>` : ''}
    ${l.fact ? `<div class="stack"><span class="eyebrow">Wusstest du?</span><p class="fact">${inline(l.fact)}</p></div>` : ''}
    ${(l.tips || []).length ? `<div class="stack"><span class="eyebrow">Weiterdenken und vertiefen</span><ul class="recap">${l.tips.map(t => `<li>${inline(t)}</li>`).join('')}</ul></div>` : ''}
    <div class="links">${l.wiki ? `<a href="https://de.wikipedia.org/wiki/${encodeURIComponent(l.wiki)}" target="_blank" rel="noopener">${svg('link')}Mehr dazu auf Wikipedia</a>` : ''}${sampleReady !== false ? `<a href="#" id="endAsk">${svg('chat')}Eine Frage zum Thema an Claude stellen</a>` : ''}</div>
    ${l.ai ? `<button class="btn ghost small" type="button" id="delGen" style="align-self:flex-start;padding-left:0">Diese KI-Lektion löschen</button>` : ''}`;
  const ea = $('#endAsk'); if (ea) ea.onclick = e => { e.preventDefault(); openAsk(l, null); };
  const dg = $('#delGen'); if (dg) { let armed = false; dg.onclick = async () => { if (!armed) { armed = true; dg.textContent = 'Wirklich löschen? Nochmal tippen'; dg.style.color = 'var(--bad)'; return; } await Store.removeGen(l.id); Object.keys(S().rev).forEach(k => { if (k.startsWith(l.id + '~')) delete S().rev[k]; }); delete S().done[l.id]; Store.save(); toast('Lektion gelöscht'); go('kat-' + l.cat); }; }
  next.innerHTML = nx ? `Nächste: ${esc(nx.title)} ${svg('right')}` : `Zurück zur Übersicht ${svg('right')}`;
  next.disabled = false;
  next.onclick = () => go(nx ? 'lektion-' + nx.id : 'heute');
  const nav = next.parentElement;
  if (!nav.querySelector('#pHome')) { const b = document.createElement('button'); b.className = 'btn ghost'; b.type = 'button'; b.id = 'pHome'; b.innerHTML = svg('home'); b.setAttribute('aria-label', 'Startseite'); b.onclick = () => go('heute'); nav.prepend(b); }
  renderChrome('lektion-' + l.id);
  toast(`+${p.xp} XP`);
}

/* ---------- Wiederholung & Blitzquiz ---------- */
function startReview() {
  const due = shuffle(dueReviews()).slice(0, 12);
  if (!due.length) { go('wiederholen'); return; }
  player = { kind: 'review', items: due.map(id => ({ id, ...questionById(id) })), i: 0, right: 0, answered: 0, xp: 0, requeued: new Set() };
  if (location.hash !== '#session') location.hash = '#session'; else route();
  drawSession();
}
function startBlitz() {
  const doneLs = allLessons().filter(l => isDone(l.id));
  const pool = (doneLs.length ? doneLs : allLessons()).flatMap(l => (l.quiz || []).map((q, i) => ({ id: qid(l, i), l, q })));
  player = { kind: 'blitz', items: shuffle(pool).slice(0, 5), i: 0, right: 0, answered: 0, xp: 0, requeued: new Set() };
  if (location.hash !== '#session') location.hash = '#session'; else route();
  drawSession();
}
function drawSession() {
  const p = player, app = $('#app');
  if (!p || p.kind === 'lesson') return;
  const done = p.i >= p.items.length;
  const pct = Math.min(100, p.i / p.items.length * 100);
  const it = p.items[p.i];
  const c = it ? CAT[it.l.cat] : null;
  app.innerHTML = `<div class="player ${c ? 'cat' : ''}" ${c ? `style="--h:${c.h}"` : ''}>
    <div class="player-top"><button class="icon-btn" type="button" id="pClose" aria-label="Beenden">${svg('x')}</button><div class="progress"><i style="width:${pct}%"></i></div><span class="small muted" style="font-variant-numeric:tabular-nums">${Math.min(p.i + 1, p.items.length)}/${p.items.length}</span></div>
    <div class="slide" id="slide"></div>
    <div class="player-nav"><button class="btn primary" type="button" id="pNext"></button></div>
  </div>`;
  $('#pClose').onclick = () => { if (p.answered) Store.save(); go(p.kind === 'review' ? 'wiederholen' : 'heute'); };
  const slide = $('#slide'), next = $('#pNext');
  if (done) {
    const pctR = p.answered ? Math.round(p.right / p.answered * 100) : 0;
    slide.innerHTML = `<div class="empty">${svg('check')}<h2>${p.kind === 'review' ? 'Wiederholung geschafft' : 'Blitzquiz fertig'}</h2><p class="muted">${p.right} von ${p.answered} richtig (${pctR} %) · +${p.xp} XP</p>${p.kind === 'review' ? `<p class="small muted">${dueReviews().length ? `Noch ${plural(dueReviews().length, 'Frage', 'Fragen')} fällig.` : 'Für heute ist alles wiederholt.'}</p>` : ''}</div>`;
    next.innerHTML = p.kind === 'review' && dueReviews().length ? `Weitere Runde ${svg('right')}` : `Fertig ${svg('right')}`;
    next.onclick = () => p.kind === 'review' && dueReviews().length ? startReview() : go('heute');
    renderChrome('session');
    return;
  }
  slide.innerHTML = `<a class="tag" href="#lektion-${it.l.id}" style="text-decoration:none">${svg(it.l.cat)}${esc(it.l.title)}</a><div class="stack" id="qh"></div>`;
  next.innerHTML = `Antwort wählen ${svg('right')}`; next.disabled = true;
  renderQuestion(it.q, $('#qh'), ok => {
    p.answered++;
    if (ok) { p.right++; }
    if (p.kind === 'review') {
      if (!p.requeued.has(it.id)) schedule(it.id, ok);
      if (ok) { p.xp += 3; addXP(3); }
      if (!ok && !p.requeued.has(it.id)) { p.requeued.add(it.id); p.items.push(it); }
      dayRec().r += 1;
    } else if (ok) { p.xp += 2; addXP(2); }
    Store.save();
    next.disabled = false; next.innerHTML = `${p.i + 1 >= p.items.length ? 'Ergebnis' : 'Weiter'} ${svg('right')}`;
    if (!ok && p.kind === 'review' && p.items.length > p.i + 1 && p.items[p.items.length - 1] === it) $('.q-fb .feedback', slide)?.insertAdjacentHTML('beforeend', '<span class="small muted">Diese Frage kommt am Ende der Runde noch einmal.</span>');
  });
  next.onclick = () => { if (next.disabled) return; p.i++; drawSession(); window.scrollTo(0, 0); };
}

/* ---------- Frag Claude ---------- */
async function openAsk(l, card) {
  const c = CAT[l.cat];
  const bg = document.createElement('div'); bg.className = 'drawer-bg';
  bg.innerHTML = `<div class="drawer cat" style="--h:${c.h}" role="dialog" aria-modal="true" aria-label="Frag Claude">
    <div class="row" style="justify-content:space-between"><h2 style="font-size:20px">Frag nach</h2><button class="icon-btn" type="button" id="aClose" aria-label="Schließen">${svg('x')}</button></div>
    <p class="small muted">${card ? `Zur Karte „${esc(card.h)}“` : `Zur Lektion „${esc(l.title)}“`}. Claude erklärt dir, was unklar ist.</p>
    <div class="chips">${(card ? ['Erklär das einfacher', 'Gib mir ein Alltagsbeispiel', 'Warum ist das wichtig?', 'Erzähl mir mehr dazu'] : ['Was sollte ich als Nächstes lernen?', 'Gib mir 3 Fragen zum Selbsttest', 'Wie hängt das mit heute zusammen?', 'Erzähl mir eine spannende Anekdote']).map(t => `<button type="button">${t}</button>`).join('')}</div>
    <div id="aLog" class="stack"></div>
    <form class="gap-row" id="aForm"><input class="input" id="aIn" placeholder="Deine Frage" autocomplete="off"><button class="btn primary" type="submit">Fragen</button></form>
    <p class="small" id="aMsg" role="status"></p>
  </div>`;
  document.body.appendChild(bg);
  const close = () => { abort && abort.abort(); bg.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  bg.onclick = e => { if (e.target === bg) close(); };
  $('#aClose', bg).onclick = close;
  const sample = await getSample();
  if (!sample) { $('#aMsg', bg).textContent = 'Claude ist nur in der veröffentlichten Version auf claude.ai verfügbar.'; $('#aForm', bg).hidden = true; $('.chips', bg).hidden = true; return; }
  const ctx = card ? `Aktuelle Karte „${card.h}“:\n${card.t}` : `Inhalt der Lektion:\n${l.cards.map(x => `## ${x.h}\n${x.t}`).join('\n\n')}`;
  const msgs = [];
  let abort = null, busy = false;
  const send = async (question) => {
    if (busy || !question.trim()) return; busy = true;
    const log = $('#aLog', bg);
    log.insertAdjacentHTML('beforeend', `<p class="small" style="font-weight:600">${esc(question)}</p><div class="ask-out">Denkt nach …</div>`);
    const out = log.lastElementChild;
    const content = msgs.length ? question : `Du bist ein geduldiger, begeisternder Tutor in der Lern-App „Wissensfunke“. Der Lernende ist ein neugieriger junger Erwachsener. Er lernt die Lektion „${l.title}“ (Bereich ${c.name}).\n\n${ctx}\n\nBeantworte seine Frage auf Deutsch: klar, anschaulich, mit einem konkreten Beispiel, höchstens 160 Wörter. Nur gesicherte Fakten. Keine Gedankenstriche als Stilmittel, kein Markdown außer **fett**.\n\nFrage: ${question}`;
    msgs.push({ role: 'user', content });
    abort = new AbortController();
    $('#aIn', bg).value = '';
    try {
      const r = await sample(msgs, { signal: abort.signal, cache: false, onText: ({ text }) => { out.innerHTML = inline(text).replace(/\n/g, '<br>'); } });
      out.innerHTML = inline(r.text).replace(/\n/g, '<br>');
      msgs.push({ role: 'assistant', content: r.text });
    } catch (e) {
      msgs.pop();
      if (e && e.name === 'AbortError') return;
      out.textContent = e && e.code === 'rate_limited' ? 'Gerade zu viele Anfragen. Warte kurz.' : e && e.code === 'not_granted' ? 'Claude ist für diese Seite nicht freigegeben.' : 'Das hat nicht geklappt. Versuch es nochmal.';
    } finally { busy = false; }
  };
  $$('.chips button', bg).forEach(b => b.onclick = () => send(b.textContent));
  $('#aForm', bg).onsubmit = e => { e.preventDefault(); send($('#aIn', bg).value); };
  setTimeout(() => $('#aIn', bg).focus({ preventScroll: true }), 50);
}

/* ---------- Tastatur ---------- */
document.addEventListener('keydown', e => {
  if (!player || document.querySelector('.drawer-bg')) return;
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  if (e.key === 'Enter' || e.key === 'ArrowRight') { const n = $('#pNext'); if (n && !n.disabled) { e.preventDefault(); n.click(); } }
  else if (e.key === 'ArrowLeft') { const b = $('#pBack'); if (b) b.click(); }
  else if (/^[1-6]$/.test(e.key)) { const o = $$('.slide .opt:not([disabled])')[Number(e.key) - 1]; if (o) o.click(); }
});

/* ---------- Start ---------- */
window.addEventListener('hashchange', () => { if (location.hash === '#session' && player && player.kind !== 'lesson') { renderChrome('session'); return; } route(); });
route();
Store.init().then(() => { if (!player) route(); else renderChrome(location.hash.slice(1)); });
getSample().then(s => { sampleReady = !!s; });

/* ---------- Als App installierbar (nur auf der eigenen Webseite) ---------- */
if (sampleReady === false && 'serviceWorker' in navigator && location.protocol === 'https:') {
  try { navigator.serviceWorker.register('sw.js').catch(() => { }); } catch { }
}
})();
