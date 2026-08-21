# Primavera3D Visual Design System — “Blueprint Aesthetic” (v0.1)

**Purpose**
Codify a distinctive **2D graph‑paper + 3D CAD** aesthetic for the Primavera3D website and collateral. This guide translates the blueprint motif into scalable design tokens, components, motion, and content rules so engineering and design ship fast and consistently.

**Applies to**: web app (marketing + portfolio + tools), case‑study assets, social visuals, lightweight print collateral.

---

## 1) Design Principles

1. **Function shows** — expose process (grids, axes, measurements) as intentional visual elements.
2. **Precision with warmth** — pair technical cues (rulers, callouts, lineweights) with solarpunk tones and material textures.
3. **Layered depth** — 2D blueprint plane beneath interactive 3D objects; parallax and shadows create hierarchy.
4. **Legible first** — blueprint texture never harms readability or performance; contrast and spacing win.
5. **Sustainable minimalism** — fewer, reusable primitives; SVG/CSS patterns over heavy imagery.

---

## 2) Visual Language

**Motifs:** graph paper grids, isometric guides, CAD axes (X/Y/Z), dimension lines with ticks, technical callouts, stamped labels, perforation/plotter margins.

**Surfaces:**

- Base plane: subtle **graph paper** pattern (CSS/SVG), low‑contrast.
- Elevated cards: “drawing sheets” with micro‑texture and blueprint border.
- 3D stage: CAD floor grid with origin marker and soft HDRI.

**States:**

- Idle → subtle grid + static axes.
- Hover → highlight edge/vertex patterns; faint blueprint glow.
- Active → animated measurement/annotation lines.

---

## 3) Color System (Tokens)

Two coordinated themes: **Blueprint (Dark)** and **Workshop (Light)**. Green family remains brand accent.

```json
{
  "theme": {
    "blueprint": {
      "bg": "#0E1A2B",
      "grid": "#163552",
      "ink": "#CFE8FF",
      "accent": "#34D399",
      "accent-2": "#10B981",
      "warning": "#F59E0B",
      "paper": "#0A1422",
      "line-weak": "#112842",
      "line-strong": "#2C5177"
    },
    "workshop": {
      "bg": "#FAF8F3",
      "grid": "#DFE6EC",
      "ink": "#1F2937",
      "accent": "#065F46",
      "accent-2": "#0EA5E9",
      "warning": "#92400E",
      "paper": "#FFFFFF",
      "line-weak": "#E6EDF3",
      "line-strong": "#CBD5E1"
    }
  }
}
```

**Usage**

- Primary text: `ink` (dark theme) / `ink` (light).
- Interactive accents, focus rings, links: brand greens `accent`, `accent-2`.
- Grids and blueprint lines use `grid`, `line-*` only (never pure white at 100%).

---

## 4) Typography

- **Display:** _Space Grotesk_ (tight tracking for headlines)
- **Body:** _Inter_ (clean UI copy)
- **Technical/Code:** _JetBrains Mono_ (annotations, labels, dimensions)

**Scale & Rhythm**

- Modular scale: 1.250 (Minor Third).
- Baseline grid: 4px (blueprint line weight aligns with 4px multiples).
- Headline letter‑spacing: −0.02em to −0.01em; Monospace labels: +0.02em.

**Blueprint Annotations**
Use monospace for dimension strings, callouts, and part numbers: `Ø 24.0 mm`, `R = 12.5`.

---

## 5) Iconography & Glyphs

- Line icons at **1.5px** (light) and **2px** (emphasis).
- CAD metaphors: axis, origin, section, explode, measure, layer, viewport.
- Avoid filled icons except for state badges (success, warning).

---

## 6) Layout & Grid

- **Page grid:** 12‑col, 72px max gutter desktop; 8‑col tablet; 4‑col mobile.
- **3D stage gutter:** wider on `≥ 1440px` to enable side panel (parameters/annotations).
- **Safe area:** generous padding so blueprint texture never touches body copy directly.

**Alignment cues**: show faint **rulers** on section edges (decorative) on large screens; hidden on mobile.

---

## 7) Lines, Strokes & Measurement Language

- Line weights: 1px (guide), 1.5px (UI), 2px (emphasis), 3px (edge highlight).
- Dashes: `4 2` for measurements; `8 4` for construction lines.
- Arrowheads: 45° triangular, 6px length, 2px stroke.

**Dimension style**

- Text height equals **10px** at 1× scaling; pads by 4px from leader lines.
- Use `JetBrains Mono` for all numeric labels.

---

## 8) Backgrounds & Surfaces (Code Ready)

**A) CSS Utility — Graph Paper (light & dark)**

```css
:root {
  --grid-size: 16px;
  --grid-line: rgba(255, 255, 255, 0.06);
  --grid-subline: rgba(255, 255, 255, 0.02);
}

.theme-blueprint {
  --bg: #0e1a2b;
  --grid: #163552;
  --ink: #cfe8ff;
  background-color: var(--bg);
  background-image:
    linear-gradient(var(--grid-line), var(--grid-line)),
    linear-gradient(90deg, var(--grid-line), var(--grid-line)),
    linear-gradient(var(--grid-subline), var(--grid-subline)),
    linear-gradient(90deg, var(--grid-subline), var(--grid-subline));
  background-size:
    var(--grid-size) var(--grid-size),
    var(--grid-size) var(--grid-size),
    calc(var(--grid-size) * 4) calc(var(--grid-size) * 4),
    calc(var(--grid-size) * 4) calc(var(--grid-size) * 4);
  background-position:
    0 0,
    0 0,
    0 0,
    0 0;
}

.theme-workshop {
  --bg: #faf8f3;
  --grid: #dfe6ec;
  --ink: #1f2937;
  background-color: var(--bg);
  background-image:
    linear-gradient(var(--grid), var(--grid)), linear-gradient(90deg, var(--grid), var(--grid));
  background-size: var(--grid-size) var(--grid-size);
}
```

**B) Tailwind Plugin (tokens + utilities)**

```ts
// tailwind.blueprint.config.ts
import plugin from 'tailwindcss/plugin';

export default plugin(({ addUtilities, addBase, theme }) => {
  addBase({
    ':root': {
      '--bp-grid-size': '16px',
      '--bp-line-weak': 'rgba(255,255,255,0.06)',
      '--bp-line-strong': 'rgba(255,255,255,0.12)',
    },
  });
  addUtilities({
    '.bg-blueprint': {
      backgroundColor: '#0E1A2B',
      backgroundImage: `linear-gradient(var(--bp-line-weak), var(--bp-line-weak)),
                        linear-gradient(90deg, var(--bp-line-weak), var(--bp-line-weak))`,
      backgroundSize: 'var(--bp-grid-size) var(--bp-grid-size)',
    },
    '.bp-sheet': {
      boxShadow: '0 0 0 1px rgba(207,232,255,0.12), 0 8px 24px rgba(0,0,0,0.25)',
      background: 'linear-gradient(0deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02))',
      borderRadius: '16px',
    },
    '.bp-border': { border: '1.5px solid rgba(207,232,255,0.24)' },
    '.bp-ruler': {
      backgroundImage:
        'repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,0.12) 15px, rgba(255,255,255,0.12) 16px)',
    },
  });
});
```

**C) React Example (shadcn + Tailwind)**

```tsx
import { Card, CardContent } from '@/components/ui/card';

export default function BlueprintSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-blueprint text-[var(--ink)] py-20">
      <div className="container mx-auto px-6">
        <div className="bp-sheet">
          <div className="bp-border rounded-2xl p-8">
            <h2 className="font-display text-4xl tracking-tight mb-4">{title}</h2>
            <div className="bp-ruler h-[1px] w-full mb-8 opacity-40" />
            <Card>
              <CardContent className="p-6">{children}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 9) 3D CAD Layer (Viewer Styling)

**Stage:** dark blueprint floor with 1m major grid + 10cm minor grid; origin marker (red/green/blue axes) scaled to scene.
**Overlays:** dimension lines, hotspots (numbered), section plane badges, material chips.
**Controls:** snapping feedback (ticks), easing `cubic-bezier(0.16, 1, 0.3, 1)`.

**Visual Defaults**

- Environment: soft HDRI, low contrast, blueprint‑tinted reflection.
- Shadows: contact‑shadow only by default; enable soft shadows on desktop only.
- Materials: PBR with slight roughness (0.3–0.5) for legibility.

---

## 10) Motion & Interaction Language

- **Micro:** cursor hover reveals edges; axis gizmo pulses on drag start; rulers slide in at 120ms.
- **Macro:** section transitions use blueprint “wipe” (angled mask) at 300–450ms.
- **Physics:** movement “snaps” with short overshoot (10–15%).
- **Reduced Motion:** respect `prefers-reduced-motion`; disable auto‑rotate and large parallax.

Timing & Easing

```
XS 120ms  | S 180ms | M 240ms | L 320ms | XL 450ms
Easing: standard (0.2, 0.8, 0.2, 1), entrance (0.16, 1, 0.3, 1)
```

---

## 11) Components (Blueprint Variants)

**Navigation**

- Top bar with micro‑grid backdrop; active link underlines rendered as **dimension lines**.
- Utility labels (locale, theme, contact) appear as **stamps**.

**Cards**

- “Sheet” surface with blueprint border; corner crop marks on hover.
- Metadata row uses monospace + separators `│` or `•`.

**Buttons**

- Primary: green accent with thin **ink** keyline; hover adds 1px **glow**.
- Secondary: outline with dashed variant `.btn--dashed` (for try‑in‑browser tools).

**Tabs & Pills**

- Underline tabs become ruler ticks on selection; Pills show `CAPS` engraving.

**Tooltips**

- Monospace, 12px; pointer is triangular arrowhead; 1.5px stroke.

**Annotations**

- Numbered circles `① ② ③…` connected by leader lines; callout blocks with `bp-sheet` styling.

---

## 12) Data Viz & Overlays

- Use grid background faintly behind charts.
- Axis labels monospace; grid lines at 8% opacity; highlight series in green accent.
- Never overuse blueprint pattern under small text; prefer solid surfaces for tables.

---

## 13) Imagery & Rendering

- **Lighting:** neutral key light with slight cool tint; avoid overly dramatic contrast.
- **Background:** transparent/blueprint‑tinted; use contact shadow to ground objects.
- **Angles:** isometric (30°/30°) or ortho plan/elevation for hero composites.
- **Post:** subtle grain (1–2%), chromatic aberration ≤ 0.2px.

---

## 14) Accessibility

- Contrast ratios: text ≥ **4.5:1**; essential lines ≥ **3:1** vs surface.
- Provide **pattern toggle** to reduce grid intensity for sensitive users.
- Respect reduced‑motion; expose toggles for auto‑rotate, parallax, and grid density.
- Focus states: high‑visibility green ring with 2px offset.

---

## 15) Implementation — Tailwind Tokens

**Tailwind Config Snippet**

```ts
// tailwind.config.ts (excerpt)
import blueprint from './tailwind.blueprint.config';

export default {
  darkMode: ['class', '[data-theme="blueprint"]'],
  theme: {
    extend: {
      colors: {
        bp: {
          bg: '#0E1A2B',
          grid: '#163552',
          ink: '#CFE8FF',
          accent: '#34D399',
          accent2: '#10B981',
          warning: '#F59E0B',
        },
        wk: {
          bg: '#FAF8F3',
          grid: '#DFE6EC',
          ink: '#1F2937',
          accent: '#065F46',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui'],
        body: ['Inter', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace'],
      },
    },
  },
  plugins: [blueprint],
};
```

**Utility Examples**

```html
<section data-theme="blueprint" class="bg-blueprint text-bp-ink">
  <div class="container mx-auto p-8">
    <h1 class="font-display text-5xl tracking-tight">Parametric Playground</h1>
    <p class="mt-4 font-body text-lg max-w-prose opacity-90">
      Real‑time controls meet blueprint clarity.
    </p>
  </div>
</section>
```

---

## 16) Page Compositions (Patterns)

**Hero — “Blueprint Stage”**

- Top plane with dense grid; center 3D object; axis gizmo bottom‑left; intro copy top‑right.
- CTA pair: **Primary** (green) + **Ghost** (outline dashed).
- Meta bar beneath with dimension‑style separators.

**Case Study — “Sheet Stack”**

- Stack of blueprint sheets; each section header gets a stamped label: `CHALLENGE`, `SOLUTION`, `RESULTS`.

**Tools — “Workbench”**

- Left: control panel (params); Right: 3D viewport; Bottom: measurements log.

---

## 17) Asset Kit (Deliverables)

- SVG tiles: 8px/16px grid (light/dark), isometric grid overlay.
- Axis gizmo icons (XYZ), origin marker, section plane glyphs.
- Corner crop marks, stamps, arrowheads.
- HDRI (low‑contrast studio) with blueprint tint LUT.
- Figma library: tokens, components, and examples.

---

## 18) QA Checklist (Brand Conformance)

- [ ] Blueprint grid visible but **never** competes with copy.
- [ ] Headings legible; body ≥ 16px; contrast OK.
- [ ] Axis/ruler cues present in hero and 3D scenes.
- [ ] Buttons: primary green; focus ring visible.
- [ ] Animations respect reduced‑motion.
- [ ] Performance: background patterns are **CSS/SVG**, not heavy bitmaps.
- [ ] Mobile: grid simplifies, rulers hidden, spacing breathes.

---

## 19) Governance

- **Single Source of Truth:** tokens in code → synced to Figma via plugin.
- **Change Control:** propose updates via PR; include screenshots on desktop/mobile.
- **Versioning:** bump minor when tokens or components change; patch for bug fixes.

---

### Appendix A — Do / Don’t

**Do**

- Use blueprint lines to imply structure and precision.
- Keep grid opacity ≤ 10% behind text.
- Use green accents sparingly for actions/focus.

**Don’t**

- Place small text over dense grid without a solid surface.
- Mix too many line weights within one component.
- Use photographic textures behind code or tables.

---

### Appendix B — Future Extensions

- Animated plotter line drawing for hero headlines.
- Sound micro‑UX (muted): pen scratch, snap ticks.
- Print stylesheet for blueprint‑style PDFs of case studies.
