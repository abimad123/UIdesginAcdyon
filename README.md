# TRACE — Visual Project-Context Workspace

A premium frontend implementation built for the **AcDyOn Technologies Frontend Challenge**.

TRACE connects the history of a project — decisions, design changes, implementations, and releases — into one visual project timeline, so teams can understand not just *what* changed, but *why*.

---

## 🛠 Tech Stack

* **React 19** & **Vite 8** for rapid development and production builds.
* **Tailwind CSS v4** combined with native CSS variables for strict, consistent design tokens.
* **Framer Motion (`motion/react`)** for high-performance, accessible micro-interactions.
* **Geist & Geist Mono** (via CDN) for an editorial, code-friendly typographic aesthetic.

## ✨ Features & Design Philosophy

* **Editorial UI/UX:** Intentionally avoids SaaS boilerplate trends (no massive gradients, glassmorphism, floating 3D blobs, or fake social proof). Instead, the design leans heavily on strict typographic hierarchy, disciplined whitespace, and a restrained custom HSL color palette.
* **Interactive Product Showcase:** The timeline visualization is not a static image—it's a fully functional React component that swaps context and metadata dynamically.
* **Responsive Architecture:** Desktop viewports utilize a 12-column editorial grid and horizontal interactive timelines. Mobile viewports seamlessly collapse into stacked readable flows and vertical timelines without horizontal scrolling.
* **Accessibility First:** 
  * Full semantic HTML markup and robust DOM hierarchy.
  * `prefers-reduced-motion` deeply integrated—all staggered animation delays and transitions immediately flatten to `0ms` when enabled by the OS.
  * True focus traps and dialog semantics implemented for overlays.
* **Zero Console Errors:** Production-ready code resulting in zero warnings and zero linter errors.

## 🚀 Getting Started

To run the project locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🔍 Easter Egg

There is a fully accessible, zero-dependency developer console hidden within the page. 
Hint: *It requires 10 specific keystrokes to uncover the truth behind the context.* 

*(Press `Escape` to cleanly exit once found).*

---
*Designed and engineered specifically for the AcDyOn Technologies technical challenge.*
