/**
 * Motion system (GSAP + ScrollTrigger). Every effect has a job:
 *  - hero intro: the headline assembles itself, a "new version" being built (storytelling)
 *  - panel rise: the hero recedes as the content sheet takes over (state transition)
 *  - heading/line reveals: pace reading order (hierarchy)
 *  - ticket move + arrow draw: shows manual work becoming automated (storytelling)
 *  - magnetic CTA: acknowledges intent on the primary action (feedback)
 * Under prefers-reduced-motion none of this runs and all content is shown in its final state.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;

/* ---------- helpers ---------- */

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: string, b: string, t: number) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const m = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${m(r1, r2)} ${m(g1, g2)} ${m(b1, b2)})`;
}

const token = (name: string) => getComputedStyle(root).getPropertyValue(name).trim();

/** Split the hero words into characters and colour each one along its line's gradient. */
function splitHeroChars(): HTMLElement[] {
  const stops: [string, string][] = [
    [token('--c-fg-dim'), token('--c-fg-muted')],
    [token('--c-fg-muted'), token('--c-fg-soft')],
    [token('--c-fg-soft'), token('--c-fg')],
  ];
  const chars: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>('[data-hero-line]').forEach((line, li) => {
    const words = [...line.querySelectorAll<HTMLElement>('[data-hero-word]')];
    const total = words.reduce((n, w) => n + [...(w.textContent ?? '')].length, 0);
    let idx = 0;
    const [from, to] = stops[Math.min(li, stops.length - 1)];
    words.forEach((word) => {
      const letters = [...(word.textContent ?? '')];
      word.textContent = '';
      letters.forEach((ch) => {
        const span = document.createElement('span');
        span.className = 'hero__char';
        span.textContent = ch;
        span.style.color = mix(from, to, total > 1 ? idx / (total - 1) : 0);
        word.append(span);
        chars.push(span);
        idx++;
      });
    });
  });
  root.classList.add('chars-split');
  return chars;
}

/** Wrap every word of a heading (keeping nested spans like .accent) in a clipping mask. */
function splitWords(el: HTMLElement): HTMLElement[] {
  const inner: HTMLElement[] = [];
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(' '));
            return;
          }
          const mask = document.createElement('span');
          mask.className = 'split-mask';
          const word = document.createElement('span');
          word.className = 'split-word';
          word.textContent = part;
          mask.append(word);
          frag.append(mask);
          inner.push(word);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
  return inner;
}

/* ---------- effects ---------- */

function heroIntro() {
  const chars = splitHeroChars();
  const icons = gsap.utils.toArray<HTMLElement>('[data-hero-icon]');
  const sub = document.querySelector('[data-hero-sub]');
  const cta = document.querySelector('[data-hero-cta]');

  gsap.set(chars, { opacity: 0, filter: 'blur(10px)' });
  gsap.set(icons, { opacity: 0, scale: 0.3, rotate: -40 });
  gsap.set([sub, cta], { opacity: 0, y: 16 });
  root.classList.add('motion-ready');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });
  tl.to(chars, {
    opacity: 1,
    filter: 'blur(0px)',
    duration: 0.9,
    stagger: { each: 0.022, from: 'random' },
    clearProps: 'filter,willChange',
  })
    .to(icons, { opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: 'back.out(2.2)', stagger: 0.15 }, 0.55)
    .to(sub, { opacity: 1, y: 0, duration: 0.9 }, 0.9)
    .to(cta, { opacity: 1, y: 0, duration: 0.9 }, 1.05);
}

function panelRise() {
  const panel = document.querySelector('[data-panel]');
  const inner = document.querySelector('[data-hero-inner]');
  if (!panel || !inner) return;
  gsap.to(inner, {
    scale: 0.9,
    yPercent: -6,
    opacity: 0.1,
    ease: 'none',
    scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 15%', scrub: true },
  });
}

function headingReveals() {
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const words = splitWords(el);
    gsap.set(words, { yPercent: 110 });
    gsap.to(words, {
      yPercent: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

function blockReveals() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });
}

function parallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax ?? -5);
    gsap.fromTo(
      el,
      { yPercent: -amount / 2 },
      {
        yPercent: amount / 2,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

function workStory() {
  const section = document.querySelector<HTMLElement>('[data-work]');
  if (!section) return;
  const ticket = section.querySelector('[data-ticket-move]');
  const before = section.querySelector('[data-board-before]');
  const after = section.querySelector('[data-board-after]');
  const note = section.querySelector('[data-note]');
  const paths = gsap.utils.toArray<SVGPathElement>('[data-draw]', section);

  paths.forEach((p) => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section.querySelector('.feature__visual'), start: 'top 75%', end: 'center 45%', scrub: 0.8 },
  });
  tl.from(before, { x: -40, opacity: 0, duration: 0.4 })
    .from(after, { y: 60, opacity: 0, duration: 0.5 }, 0.15)
    .from(ticket, { x: '-55%', y: '-140%', rotate: -6, duration: 0.8, ease: 'power2.inOut' }, 0.45)
    .to(before?.querySelector('.ticket') ?? [], { opacity: 0.25, duration: 0.4 }, 0.6)
    .from(note, { opacity: 0, rotate: -14, scale: 0.9, duration: 0.3 }, 0.95)
    .to(paths, { strokeDashoffset: 0, duration: 0.45, stagger: 0.2, ease: 'none' }, 1.05);
}

function magnetic() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ---------- boot ---------- */

const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  if (!root.classList.contains('motion-ok')) return;
  // If the bundle arrived after the safety timeout, the hero is already visible: don't re-hide it.
  if (root.classList.contains('motion-failed')) root.classList.add('motion-ready');
  else heroIntro();
  panelRise();
  headingReveals();
  blockReveals();
  parallax();
  workStory();
  magnetic();
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
});
