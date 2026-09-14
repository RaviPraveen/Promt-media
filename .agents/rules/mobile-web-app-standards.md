# Mobile & Web Application Engineering Standards

## 1. Professional UI & Aesthetic Standard (Zero-Generic UI)
- All creative applications must present a stunning, luxury first impression.
- **Color Palette**: Curated obsidian/dark canvas (`#05070B`, `#08090F`) with luminous accent glows (e.g. Electric Cyan `#2997FF`, Deep Violet `#9333EA`, Neon Magenta `#FF2A85`).
- **Glassmorphism**: Use translucent frosted panels (`rgba(255, 255, 255, 0.05 - 0.08)`) with subtle 1px border highlights (`rgba(255, 255, 255, 0.12)`), soft ambient backdrops, and multi-layer drop shadows.
- **Micro-Interactions**: Provide smooth feedback on input focus (glow borders), button press effects (`activeOpacity={0.8}`), password toggle switches, and tab segment sliders.
- **Social Sign-In**: Provide authentic Apple and Google authentication buttons with native brand colors and vector icons conforming to Apple Human Interface Guidelines and Google Identity Guidelines.

## 2. Universal Responsiveness & Device Matrix
Every screen must adapt fluidly across three distinct device classes:
1. **Mobile (< 600px - Android & iPhone)**:
   - Full edge-to-edge layout with safe area insets.
   - `KeyboardAvoidingView` to prevent software keyboards from obscuring inputs.
   - 48px–52px minimum touch target height for buttons and inputs.
2. **Tablet (600px - 1024px - Apple iPad & Android Tablets)**:
   - Centered luxury glass card (max-width: 480px–520px).
   - Set `"supportsTablet": true` in `app.json`.
   - Balanced atmospheric ambient glows filling the letterbox canvas.
3. **Desktop (> 1024px - Web)**:
   - Dual-column showcase presentation: Left showcase card displaying hero artwork/social proof, Right card hosting interactive form.
   - Centered vertically and horizontally with rich visual depth.

## 3. Version Control & Build Number Configuration
In Expo / React Native applications, versions must be consistently maintained:
- **`app.json`**:
  - `expo.version`: The public marketing release version (e.g., `"1.0.0"`).
  - `expo.ios.buildNumber`: The Apple App Store / TestFlight build number string (e.g., `"1"`).
  - `expo.android.versionCode`: The Google Play Console build number integer (e.g., `1`).
  - `expo.ios.supportsTablet`: Set to `true` when tablet support is required.
- **`package.json`**:
  - `"version"`: Mirrors `app.json` (e.g., `"1.0.0"`).

## 4. Git Repository Cleanliness & Hygiene
- **Never commit screenshots or test artifacts**:
  - `.playwright-mcp/`, `*.png` test captures, `screen*.png`, `login*.png`, `register*.png`, and temporary media recordings must be strictly ignored in `.gitignore`.
  - Always verify with `git status` before committing to ensure only source code, assets, and project manifests are staged.
