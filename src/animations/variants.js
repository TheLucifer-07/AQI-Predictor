// ── Premium animation variants — Apple / Stripe / Linear level ───────────────
// Timing system: hover 150ms · interaction 200ms · entry 250ms
// Easing: ease-out for entry · ease-in-out for hover

const EASE_OUT   = [0.0, 0.0, 0.2, 1.0];   // cubic-bezier ease-out
const EASE_INOUT = [0.4, 0.0, 0.2, 1.0];   // cubic-bezier ease-in-out
const EASE_SPRING = [0.22, 1, 0.36, 1];    // spring-like overshoot-free

// ── Entry animations ──────────────────────────────────────────────────────────

export const fadeUp = {
  hidden:  { opacity: 0, y: 14, scale: 0.99 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.25, ease: EASE_OUT } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.2, ease: EASE_OUT } },
};

export const fadeSlide = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.25, ease: EASE_OUT } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.25, ease: EASE_SPRING } },
};

export const slideInLeft = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.25, ease: EASE_OUT } },
};

export const slideInRight = {
  hidden:  { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.25, ease: EASE_OUT } },
};

// ── Subtle flip — max 8deg, feels like a card turning slightly toward you ─────
export const flipIn = {
  hidden:  { opacity: 0, rotateY: 8, scale: 0.98 },
  visible: { opacity: 1, rotateY: 0, scale: 1,
    transition: { duration: 0.3, ease: EASE_SPRING } },
};

// ── Stagger containers ────────────────────────────────────────────────────────

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.22, ease: EASE_OUT } },
};

export const staggerFlip = {
  hidden:  { opacity: 0, y: 10, rotateY: 6 },
  visible: { opacity: 1, y: 0,  rotateY: 0,
    transition: { duration: 0.28, ease: EASE_SPRING } },
};

// ── Hover / interaction presets (used in whileHover / whileTap) ───────────────

export const hoverLift = {
  y: -2,
  boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
  transition: { duration: 0.15, ease: EASE_INOUT },
};

export const hoverLiftStrong = {
  y: -4,
  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
  transition: { duration: 0.15, ease: EASE_INOUT },
};

export const tapPress = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

// ── Viewport config ───────────────────────────────────────────────────────────
export const viewport     = { once: true, amount: 0.08 };
export const viewportLazy = { once: true, amount: 0.04 };
