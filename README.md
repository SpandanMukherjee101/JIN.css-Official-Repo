
# JIN.css

JIN.css is a lightweight utility-first CSS framework built with SCSS. It provides ready-to-use utility classes and simple component styles for layout, spacing, typography, colors, borders, shadows, transitions, and animations.

## Features

- Responsive layout helpers for flexbox and grid
- Spacing utilities for margin, padding, gap, and child spacing
- Sizing utilities for width, height, and min/max dimensions
- Typography helpers for font size, weight, alignment, transforms, and text overflow
- Color, border, outline, ring, and shadow utilities
- Transition, transform, and animation utilities
- State variants for hover, focus, active, and disabled styling
- Basic components for buttons, cards, badges, and alerts

## Installation

Install the project dependencies using the repository's current `package.json`:

```bash
npm install
```

## Build

Compile the SCSS source into the CSS bundle from this repo root:

```bash
npx sass JIN.scss JIN.css
```

For a compressed CSS build:

```bash
npx sass --style=compressed JIN.scss JIN.css
```

To generate a purged/minified output after compiling `JIN.css`, run the local package script from this repository root:

```bash
npm run jin
```

You can also specify a custom output path:

```bash
npm run jin -- --out ./dist/JIN.min.css
```

If you install `jin.css` as a dependency in another project, you do not need to add a custom script. Use the built-in package CLI directly:

```bash
npx jin --out ./dist/jin.min.css
```

Or, if you prefer npm exec:

```bash
npm exec jin -- --out ./dist/jin.min.css
```

## Usage

Include the generated stylesheet in your HTML:

```html
<link rel="stylesheet" href="./JIN.css">
```

Example:

```html
<div class="container mx-auto p-6">
  <div class="card shadow-md">
    <h2 class="text-2xl font-bold mb-4">Welcome</h2>
    <p class="text-gray-600 mb-6">A small example using JIN.css utilities.</p>
    <button class="btn btn-primary">Get started</button>
  </div>
</div>
```

## Utility Categories

### Layout and Display

Use these classes to control layout and positioning:

- `.container`, `.container-fluid`
- `.flex`, `.inline-flex`, `.grid`
- `.flex-row`, `.flex-col`, `.flex-wrap`
- `.justify-center`, `.justify-between`, `.items-center`
- `.relative`, `.absolute`, `.fixed`, `.sticky`
- `.hidden`, `.block`, `.inline`, `.inline-block`

### Spacing

Spacing utilities cover margin, padding, gap, and child spacing:

- `.m-4`, `.mt-6`, `.mx-auto`, `.mb-8`
- `.p-4`, `.px-6`, `.py-3`
- `.gap-4`, `.gap-x-2`, `.gap-y-3`
- `.space-x-4`, `.space-y-2`

### Sizing

Control widths and heights with utilities such as:

- `.w-full`, `.w-1/2`, `.w-32`
- `.h-full`, `.h-screen`, `.h-16`
- `.min-w-sm`, `.max-w-prose`

### Typography

Typography helpers include:

- `.text-left`, `.text-center`, `.text-right`
- `.text-sm`, `.text-lg`, `.text-2xl`
- `.font-bold`, `.font-semibold`, `.font-light`
- `.uppercase`, `.lowercase`, `.italic`, `.underline`
- `.truncate`, `.whitespace-nowrap`, `.break-words`

### Colors and Borders

Use semantic and palette-based classes for visual styling:

- `.text-primary`, `.bg-success`, `.border-danger`
- `.text-blue-500`, `.bg-gray-100`, `.border-gray-300`
- `.rounded`, `.rounded-lg`, `.rounded-full`
- `.shadow`, `.shadow-md`, `.shadow-xl`

### Transforms and Animations

Add motion and visual effects with classes like:

- `.scale-105`, `.rotate-45`, `.translate-x-4`
- `.transition`, `.duration-300`, `.ease-in-out`
- `.fade-in`, `.spin`, `.bounce`, `.slide-in`, `.zoom-in`, `.shake`, `.pulse`
- `.flip`, `.slide-down`, `.light-speed-in`, `.heartbeat`

### Responsive Variants

Responsive utilities are available using breakpoint prefixes:

- `sm:`
- `md:`
- `lg:`
- `xl:`
- `xxl:`
- `xxxl:`

Example:

```html
<div class="hidden md:flex justify-between items-center">
  Content
</div>
```

### State and Interaction Variants

JIN.css also includes state-based helpers such as:

- `.hover:bg-primary`
- `.focus:ring`
- `.active:scale-95`
- `.disabled:opacity-50`

### Components

Predefined component styles are included for:

- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-outline`
- `.card`, `.card-header`
- `.badge`, `.badge-primary`, `.badge-success`, `.badge-danger`
- `.alert`, `.alert-info`, `.alert-success`, `.alert-danger`

## Customization

Most of the framework is configurable from [JIN.scss](JIN.scss). You can adjust:

- Breakpoints in the `$breakpoints` map
- Spacing values in the `$spacing-scale` map
- Color palettes in the `$colors` map
- Font sizes, weights, and border radius variables

## License

This project is licensed under the ISC license. See [package.json](package.json) for the full license details.
