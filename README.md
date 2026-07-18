# ⚡ Ente Portfolio

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Bangers&size=32&duration=3000&pause=1000&color=FDE047&center=true&vCenter=true&width=600&height=60&lines=VISHNU+PRASAD;CREATIVE+DEVELOPER;SHIP+SMART.+BUILD+FOR+IMPACT." alt="Typing SVG" />
</div>

<p align="center">
  <a href="https://github.com/v3shn">
    <img src="https://img.shields.io/github/stars/v3shn/portfolio?style=for-the-badge&color=e63229&logo=github" alt="Stars Badge"/>
  </a>
  <a href="https://github.com/v3shn/portfolio/network/members">
    <img src="https://img.shields.io/github/forks/v3shn/portfolio?style=for-the-badge&color=fbbf24&logo=git" alt="Forks Badge"/>
  </a>
  <a href="https://github.com/v3shn/portfolio/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/v3shn/portfolio?style=for-the-badge&color=0d9488" alt="License Badge"/>
  </a>
</p>

---

## 🔗 Live Preview

💡 **Experience the comic book in action here: [v3shn.me](https://v3shn.me/)**

---

## 📖 About The Project

Welcome to the **Comic Book Portfolio** of **Vishnu Prasad**. This website is built to feel like an interactive, tactile comic book issue. It incorporates halftone dots, speech bubbles, bold action lines, and advanced 3D shaders to deliver a visual style that stands out from default portfolio templates.

### 🎨 Visual & Interaction Highlights
*   **Tactile 3D Book Reveal:** An interactive, scroll-bound 3D comic book constructed using `@react-three/fiber` and custom GLSL vertex/fragment shaders for authentic cylindrical page curls.
*   **Rich Micro-Animations:** Custom interactive cursor transitions, letter-by-letter hover animations, glitchy text offsets, and physics-based particle bursts.
*   **Polaroid Photo Gallery:** Interactive canvas snaps stack that dynamically scatters into a lazy-loaded grid layout with lightboxes on click.
*   **Modern Web Design Standards:** CURATED HSL color palette, custom comic issue badges, fully responsive design, and tailored touch-screen controls.

---

## 🚀 Key Features & Interactive Mechanics

### 📖 Scroll-Bound 3D Page Curl Shader
The highlight of the portfolio is the interactive 3D book that curls and reveals its pages as you scroll.
*   **Vertex Shader (`pageCurlVertexShader`):** Implements a cylindrical coordinate transformation. Maps coordinate `x` along a cylinder of radius `uWidth / PI` as `uBend` transitions from `0` to `1`.
*   **Fragment Shader (`pageCurlFragmentShader`):** Generates active lighting and shadows dynamically. Applies a soft gradient to the right edge during curling to simulate depth, alongside a stationary spine shadow on the left edge.
*   **GSAP ScrollTrigger:** Binds standard scroll movements directly to the uniform variables (`uBend`) in real time.

### ⚡ Interactive Cursor & Hover States
*   **Dynamic Custom Cursor:** Follows the mouse position using Framer Motion springs (`useSpring`). The outer ring turns into a square, swaps borders to red, and expands when hovering over clickable components (`a`, `button`, input fields).
*   **Glitch Flash Titles:** Headers dynamically trigger red and cyan offset channels (`GlitchFlash` component) to mimic retro printing alignment offsets on hover.
*   **Zap Explosions:** Hovering titles triggers custom comic bursts like `BAM!`, `ZAP!`, and `POW!` with starburst stickers and emojis using spring-stiffness parameters.

---

## 🛠️ The Arsenal (Tech Stack)

<p align="left">
  <a href="https://react.dev/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/danielcranney/profileme-dev/master/public/icons/skills/react-colored.svg" alternate="React" width="40" height="40" />
  </a>
  &nbsp;
  <a href="https://vite.dev/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/danielcranney/profileme-dev/master/public/icons/skills/vite.svg" alternate="Vite" width="40" height="40" />
  </a>
  &nbsp;
  <a href="https://threejs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/mrdoob/three.js/master/files/icon.svg" alternate="ThreeJS" width="40" height="40" />
  </a>
  &nbsp;
  <a href="https://gsap.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/danielcranney/profileme-dev/master/public/icons/skills/gsap.svg" alternate="GSAP" width="40" height="40" />
  </a>
  &nbsp;
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/danielcranney/profileme-dev/master/public/icons/skills/css3-colored.svg" alternate="CSS3" width="40" height="40" />
  </a>
  &nbsp;
  <a href="https://nodejs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/danielcranney/profileme-dev/master/public/icons/skills/nodejs-colored.svg" alternate="NodeJS" width="40" height="40" />
  </a>
</p>

*   **Core:** React 18+ (Functional Components, Hooks, Callbacks)
*   **3D Graphics & Shaders:** Three.js / WebGL with custom GLSL shaders (`pageCurlVertexShader`, `pageCurlFragmentShader`)
*   **Physics & Animation Engine:** Framer Motion (page transitions, entry states) & GSAP ScrollTrigger (for the scroll-bound book opening animation)
*   **Styling:** Vanilla CSS (rich layout styling, media queries, keyframe animations)
*   **Build tool:** Vite

---

## ⚡ Quick Start

To run this project locally, execute the following commands:

1. **Clone the repository**
   ```bash
   git clone https://github.com/v3shn/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Launch the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🗺️ Project Structure

```
portfolio/
├── dist/                      # Production build output
├── public/                    # Static assets
└── src/
    ├── assets/                # Images, snaps and styling assets
    ├── components/            # UI components
    │   ├── AnimatedTitle.jsx  # Comic-style header with particles & glitch effects
    │   ├── Cursor.jsx         # Custom spring cursor with magnetic scaling
    │   ├── LoadingScreen.jsx  # Customized preloader with stage status
    │   ├── Navbar.jsx         # Mobile-drawer & desktop menu navigation
    │   └── PageFlipBook.jsx   # Three.js curling page simulation scene
    ├── sections/              # Page layout sections
    │   ├── Cover.jsx          # PG.01 Issue cover & intro motto
    │   ├── About.jsx          # Profile origin story & specialty cards
    │   ├── Skills.jsx         # Skill arsenal progress power levels
    │   ├── Projects.jsx       # Case files & epic missions list
    │   ├── Gallery.jsx        # Snap bundle scatter grid gallery
    │   ├── BackCover.jsx      # End cover with rating stamps & barcodes
    │   └── Contact.jsx        # WhatsApp/Email contact panel
    ├── shaders/               # GLSL vertex & fragment page curl shaders
    │   └── pageCurl.js        # Mathematical transformations for the page flip
    ├── App.jsx                # Main application entrypoint
    ├── index.css              # Custom stylesheet (1700+ lines of comic layout styling)
    └── main.jsx               # React client rendering entrypoint
```

---

## 🤝 Contribution Guidelines

Got ideas to make this portfolio even more action-packed? Feel free to pitch in!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/EpicUpgrade`).
3. Commit your changes (`git commit -m 'Add some EpicUpgrade'`).
4. Push to the Branch (`git push origin feature/EpicUpgrade`).
5. Open a Pull Request.

---

<div align="center">
  <p>Created by <a href="https://github.com/v3shn">Vishnu Prasad</a> · 2026</p>
  <img src="https://views.whatilearened.today/views/github/v3shn/portfolio.svg" alt="Views" />
</div>

