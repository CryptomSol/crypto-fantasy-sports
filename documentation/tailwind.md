# Tailwind CSS LLMs.txt Documentation

> This document provides a comprehensive overview of Tailwind CSS utility classes, examples, and customization options. It covers various CSS properties like layout, spacing, typography, backgrounds, borders, effects, transitions, transforms, and more, explaining how to use Tailwind's utility classes to style web elements effectively and responsively.

This document details the documentation of Tailwind CSS utilities. It explains how Tailwind scans source files for classes, the importance of using complete class names, and how utility classes can be applied conditionally using variants for states (hover, focus), responsive breakpoints, dark mode, and other conditions. It also covers customization via theme variables and adding custom styles.

**Core Concepts (from styling-with-utility-classes.mdx & responsive-design.mdx):**

- **Utility-First:** Style elements by combining many single-purpose utility classes directly in HTML.
- **Constraint-Based:** Utilities generally pull values from a predefined design system (theme), promoting consistency.
- **Responsive Variants:** Prefix utilities with breakpoint names (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) to apply them only at that breakpoint and above (mobile-first). Example: `w-16 md:w-32 lg:w-48`.
- **State Variants:** Prefix utilities with state names (`hover:`, `focus:`, `active:`, `disabled:`, `group-hover:`, `peer-checked:`, etc.) to apply styles conditionally.
- **Dark Mode:** Use the `dark:` variant to apply styles when dark mode is active (`dark:bg-gray-800`).
- **Arbitrary Values:** Use square bracket notation (`top-[117px]`, `bg-[#bada55]`) for one-off values outside the theme. Use underscores for spaces (`grid-cols-[1fr_500px_2fr]`). Use type hints if needed (`text-(length:--my-var)`).
- **Arbitrary Properties:** Use square bracket notation for CSS properties not covered by utilities (`[mask-type:luminance]`).
- **Class Composition:** Multiple utilities (even for the same property like `filter`) can be combined, often using CSS variables internally (`blur-sm grayscale`).
- **Conflict Management:** The utility class appearing later in the generated CSS wins. Avoid applying conflicting classes directly. Use `!` suffix for `!important` (`bg-red-500!`).

**Browser Support & Compatibility (from compatibility.mdx):**

- Requires modern browsers: Safari 16.4+, Chrome 111+, Firefox 128+.
- Not designed for use with preprocessors like Sass/Less/Stylus; Tailwind acts as the preprocessor.
- Handles imports (`@import`), nesting, and vendor prefixing automatically.
- Native CSS variables (`var(--variable)`) and math functions (`calc()`, `min()`) are recommended over preprocessor features.
- CSS Modules, Vue `<style>`, Svelte `<style>`: These are processed separately. Use `@reference` to import main CSS for context if using `@apply` or `@variant`. Using CSS variables directly is often better for performance.

**Preflight Base Styles (from preflight.mdx):**

- Built on `modern-normalize`.
- Removes default margins from elements (headings, paragraphs, etc.).
- Resets border styles (`border: 0 solid;`) so the `border` utility adds a 1px solid border.
- Headings (`h1`-`h6`) are unstyled (inherit font size and weight).
- Lists (`ul`, `ol`) are unstyled (no bullets/numbers). Use list utilities like `list-disc` to style. Add `role="list"` for accessibility if unstyled.
- Images and replaced elements (`img`, `svg`, `video`, etc.) are `display: block` by default. Use `inline` utility to override.
- Images and videos have `max-width: 100%` and `height: auto` by default. Use `max-w-none` to override.
- Can be extended using `@layer base` or disabled by adjusting imports.

**Functions and Directives (from functions-and-directives.mdx):**

- `@import`: Inlines CSS files (e.g., `@import "tailwindcss";`).
- `@theme`: Defines custom design tokens (theme variables like `--color-midnight: #121063;`).
- `@source`: Explicitly adds source files/directories for class detection (e.g., `@source "../node_modules/lib";`). Use `not` to ignore (`@source not "../legacy";`). Use `source(none)` with `@import` to disable automatic detection. Use `inline("...")` to safelist classes (e.g., `@source inline("{hover:,}bg-red-50");`).
- `@utility`: Adds custom utility classes (e.g., `@utility tab-4 { tab-size: 4; }`). Supports functional utilities (`@utility tab-* { tab-size: --value(integer); }`).
- `@variant`: Applies Tailwind variants within custom CSS (e.g., `.my-element { @variant dark { background: black; } }`).
- `@custom-variant`: Defines new custom variants (e.g., `@custom-variant theme-midnight (&:where([data-theme="midnight"] *));`).
- `@apply`: Inlines utility classes into custom CSS (e.g., `.btn { @apply px-4 py-2 rounded; }`). Requires `@reference` in separate CSS contexts (modules, SFC styles).
- `@reference`: Imports styles for context (theme variables, utilities, variants) without duplicating CSS output, necessary for `@apply`/`@variant` in separate CSS files (e.g., `@reference "../app.css";`).
- `--alpha()`: Function to adjust color opacity (e.g., `color: --alpha(var(--color-lime-300) / 50%);`).
- `--spacing()`: Function to generate spacing values (e.g., `margin: --spacing(4);`).
- Compatibility: `@config`, `@plugin`, `theme()` function are for v3 compatibility. Use CSS variables (`var(--color-red-500)`) instead of `theme(colors.red.500)`.

**Upgrade Guide Notes (from upgrade-guide.mdx):**

- Use `npx @tailwindcss/upgrade` for automated migration (requires Node.js 20+).
- **Browser Requirements:** v4 targets Safari 16.4+, Chrome 111+, Firefox 128+. Use v3.4 for older browser support.
- **Directives:** Replace `@tailwind base;` etc. with `@import "tailwindcss";`.
- **Packages:** PostCSS plugin is now `@tailwindcss/postcss`. CLI is `@tailwindcss/cli`. Vite plugin is `@tailwindcss/vite`.
- **Removed Utilities:** Opacity utils (`bg-opacity-*`) replaced by slash syntax (`bg-black/50`). `flex-shrink-*` -> `shrink-*`, `flex-grow-*` -> `grow-*`, `overflow-ellipsis` -> `text-ellipsis`, `decoration-slice/clone` -> `box-decoration-slice/clone`.
- **Renamed Utilities:** `shadow-sm` -> `shadow-xs`, `shadow` -> `shadow-sm`, `drop-shadow-sm` -> `drop-shadow-xs`, `drop-shadow` -> `drop-shadow-sm`, `blur-sm` -> `blur-xs`, `blur` -> `blur-sm`, `backdrop-blur-sm` -> `backdrop-blur-xs`, `backdrop-blur` -> `backdrop-blur-sm`, `rounded-sm` -> `rounded-xs`, `rounded` -> `rounded-sm`, `outline-none` -> `outline-hidden`, `ring` -> `ring-3`.
- **Space Between Selector:** Changed from `> :not([hidden]) ~ :not([hidden])` to `> :not(:last-child)`. Might affect inline elements or custom margins. Prefer `gap` with flex/grid.
- **Gradient Variants:** Variants preserve other gradient stops (e.g., `dark:from-blue-500` on a red-to-yellow gradient results in blue-to-yellow in dark mode). Use `via-none` explicitly if needed.
- **Container Config:** `center` and `padding` options removed. Extend with `@utility container`.
- **Default Border Color:** Changed from `gray-200` to `currentColor`. Specify colors explicitly or add base styles to restore v3 behavior.
- **Default Ring:** Changed from 3px blue-500 to 1px currentColor. Use `ring-3 ring-blue-500` for v3 equivalent, or set `--default-ring-*` theme variables (compat only).
- **Preflight Changes:** Placeholder color uses text color at 50% opacity (was gray-400). Buttons use `cursor: default` (was `pointer`). `<dialog>` margins reset. Add base styles to restore v3 behavior if needed.
- **Prefix:** Now applied like a variant (`tw:bg-red-500`). Theme variables defined without prefix, but generated CSS variables _include_ the prefix (`--tw-color-red-500`).
- **Custom Utilities/Components:** Use `@utility` instead of `@layer utilities` or `@layer components` for utilities that should work with variants.
- **Variant Stacking Order:** Changed from right-to-left to left-to-right. Reverse order-sensitive stacked variants (e.g., `*:first:`).
- **Variables in Arbitrary Values:** Use `(...)` shorthand instead of `[...]` (e.g., `bg-(--brand-color)`).
- **Hover on Mobile:** `hover` variant now only applies when primary input supports hover (`@media (hover: hover)`). Override with `@custom-variant hover (&:hover)` if needed.
- **Transition Property:** Includes `outline-color`. Set outline color explicitly for both states if needed.
- **JS Config/Theme:** `corePlugins`, `safelist`, `separator` JS options unsupported. Load JS config explicitly with `@config`. `resolveConfig` removed; use CSS variables in JS via `getComputedStyle` or directly in supporting libraries (like Motion).

## Stroke Width

> Utilities for styling the stroke width of SVG elements.

- `stroke-<number>`: Sets `stroke-width: <number>;`. Example: `stroke-1`, `stroke-2`.
- `stroke-(length:<custom-property>)`: Sets `stroke-width: var(<custom-property>);`.
- `stroke-[<value>]`: Sets `stroke-width: <value>;`. Example: `stroke-[1.5]`.
- **Usage:** Apply to SVG elements, useful for icons.
- **Responsive:** Use breakpoint prefixes like `md:stroke-2`.

## Columns

> Utilities for controlling the number of columns within an element.

- `columns-<number>`: Sets `columns: <number>;`. Fixes the number of columns. Example: `columns-3`.
- `columns-{size}`: Sets `columns` to an ideal width (`var(--container-{size})`), number adjusts automatically. Sizes: `3xs` (16rem), `2xs` (18rem), `xs` (20rem), `sm` (24rem), `md` (28rem), `lg` (32rem), `xl` (36rem), `2xl` (42rem), `3xl` (48rem), `4xl` (56rem), `5xl` (64rem), `6xl` (72rem), `7xl` (80rem). Example: `columns-sm`.
- `columns-auto`: Sets `columns: auto;`.
- `columns-(<custom-property>)`: Sets `columns: var(<custom-property>);`.
- `columns-[<value>]`: Sets `columns: <value>;`. Example: `columns-[30vw]`.
- **Gap:** Use `gap-*` utilities to control spacing between columns.
- **Responsive:** Use breakpoint prefixes like `sm:columns-3`.
- **Customization:** Extend the `container` theme key to add named widths.

## Transition Duration

> Utilities for controlling the duration of CSS transitions.

- `duration-<number>`: Sets `transition-duration: <number>ms;`. Example: `duration-150`, `duration-700`.
- `duration-initial`: Sets `transition-duration: initial;`.
- `duration-(<custom-property>)`: Sets `transition-duration: var(<custom-property>);`.
- `duration-[<value>]`: Sets `transition-duration: <value>;`. Example: `duration-[1s,15s]`.
- **Responsive:** Use breakpoint prefixes like `md:duration-300`.

## Filter: Blur

> Utilities for applying blur filters to an element.

- `blur-{size}`: Sets `filter: blur(var(--blur-{size}));`. Sizes: `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (24px), `2xl` (40px), `3xl` (64px). Example: `blur-sm`.
- `blur-none`: Removes blur filter (`filter: ;`).
- `blur-(<custom-property>)`: Sets `filter: blur(var(<custom-property>));`.
- `blur-[<value>]`: Sets `filter: blur(<value>);`. Example: `blur-[2px]`.
- **Responsive:** Use breakpoint prefixes like `md:blur-lg`.
- **Customization:** Extend the `blur` theme key.

## Grid Column Start / End / Span

> Utilities for controlling how elements are sized and placed across grid columns.

- `col-span-<number>`: Makes element span `<number>` columns (`grid-column: span <number> / span <number>;`). Example: `col-span-2`.
- `col-span-full`: Makes element span all columns (`grid-column: 1 / -1;`).
- `col-span-(<custom-property>)`: `grid-column: span var(<custom-property>) / span var(<custom-property>);`.
- `col-span-[<value>]`: `grid-column: span <value> / span <value>;`.
- `col-start-<number>`: Element starts at grid line `<number>`. Example: `col-start-2`.
- `-col-start-<number>`: Element starts at grid line `<number>` from the end.
- `col-start-auto`: Automatic start placement.
- `col-start-(<custom-property>)`: `grid-column-start: var(<custom-property>);`.
- `col-start-[<value>]`: `grid-column-start: <value>;`.
- `col-end-<number>`: Element ends at grid line `<number>`. Example: `col-end-3`.
- `-col-end-<number>`: Element ends at grid line `<number>` from the end.
- `col-end-auto`: Automatic end placement.
- `col-end-(<custom-property>)`: `grid-column-end: var(<custom-property>);`.
- `col-end-[<value>]`: `grid-column-end: <value>;`.
- `col-auto`: Sets `grid-column: auto;`.
- `col-<number>`: Sets start/end line (`grid-column: <number>;`).
- `-col-<number>`: Sets start/end line from end (`grid-column: calc(<number> * -1);`).
- `col-(<custom-property>)`: `grid-column: var(<custom-property>);`.
- `col-[<value>]`: `grid-column: <value>;`. Example: `col-[16_/_span_16]`.
- **Responsive:** Use breakpoint prefixes like `md:col-span-6`.

## Scroll Snap Type

> Utilities for controlling how strictly snap points are enforced in a snap container.

- `snap-none`: Disables scroll snapping (`scroll-snap-type: none;`).
- `snap-x`: Enables horizontal scroll snapping (`scroll-snap-type: x var(--tw-scroll-snap-strictness);`).
- `snap-y`: Enables vertical scroll snapping (`scroll-snap-type: y var(--tw-scroll-snap-strictness);`).
- `snap-both`: Enables scroll snapping on both axes (`scroll-snap-type: both var(--tw-scroll-snap-strictness);`).
- `snap-mandatory`: Forces the scroll container to rest on a snap point (`--tw-scroll-snap-strictness: mandatory;`).
- `snap-proximity`: Allows the scroll container to rest on a snap point if close (`--tw-scroll-snap-strictness: proximity;`).
- **Usage:** Requires `scroll-snap-align` utilities on child elements.
- **Responsive:** Use breakpoint prefixes like `md:snap-x`.

## Backdrop Filter: Opacity

> Utilities for applying backdrop opacity filters to an element.

- `backdrop-opacity-<number>`: Sets backdrop opacity (`backdrop-filter: opacity(<number>%);`). Example: `backdrop-opacity-50`, `backdrop-opacity-10`.
- `backdrop-opacity-(<custom-property>)`: Sets `backdrop-filter: opacity(var(<custom-property>));`.
- `backdrop-opacity-[<value>]`: Sets `backdrop-filter: opacity(<value>);`. Example: `backdrop-opacity-[.15]`.
- **Usage:** Controls the opacity of _all_ backdrop filters on an element.
- **Responsive:** Use breakpoint prefixes like `md:backdrop-opacity-60`.

## Pointer Events

> Utilities for controlling whether an element responds to pointer events.

- `pointer-events-auto`: Element responds to pointer events (`pointer-events: auto;`). Default browser behavior.
- `pointer-events-none`: Element ignores pointer events (like hover, click) (`pointer-events: none;`). Events pass through to elements underneath. Child elements can still trigger events unless they also have `pointer-events-none`.
- **Usage:** Useful for making overlaid elements like icons non-interactive.
- **Responsive:** Use breakpoint prefixes like `md:pointer-events-auto`.

## Padding

> Utilities for controlling an element's padding.

- `p-<number>`: Sets padding on all sides (`padding: calc(var(--spacing) * <number>);`). Example: `p-4`, `p-8`.
- `p-px`: Sets padding on all sides to `1px`.
- `pt-<number>`, `pr-<number>`, `pb-<number>`, `pl-<number>`: Sets padding on top, right, bottom, left respectively. Example: `pt-6`, `pl-2`.
- `px-<number>`: Sets horizontal padding (`padding-inline`). Example: `px-8`.
- `py-<number>`: Sets vertical padding (`padding-block`). Example: `py-8`.
- `ps-<number>`: Sets padding start (left in LTR, right in RTL) (`padding-inline-start`). Example: `ps-4`.
- `pe-<number>`: Sets padding end (right in LTR, left in RTL) (`padding-inline-end`). Example: `pe-8`.
- Supports `px`, `(<custom-property>)`, `[<value>]` suffixes for all variants. Example: `pb-[5px]`, `px-(--my-padding)`.
- **Responsive:** Use breakpoint prefixes like `sm:py-8`.
- **Customization:** Extend the `spacing` theme key.

## Box Sizing

> Utilities for controlling how the browser should calculate an element's total size.

- `box-border`: Includes border and padding in the element's total width and height (`box-sizing: border-box;`). This is the default in Tailwind Preflight. Example: A `size-32` element with `p-5` and `border-4` renders as 128px x 128px total.
- `box-content`: Adds border and padding _on top of_ the element's specified width and height (`box-sizing: content-box;`). Example: A `size-32` element with `p-5` and `border-4` renders as 168px x 168px total (`128 + 2*20 + 2*4`).
- **Responsive:** Use breakpoint prefixes like `md:box-border`.

## Translate

> Utilities for translating elements.

- `translate-<number>`: Translates on both X and Y axes using the spacing scale (`translate: calc(var(--spacing) * <number>) calc(var(--spacing) * <number>);`). Example: `translate-2`.
- `-translate-<number>`: Negative translation on both axes. Example: `-translate-6`.
- `translate-<fraction>`: Translates by a percentage of element size on both axes (`translate: calc(<fraction> * 100%) calc(<fraction> * 100%);`). Example: `translate-1/2`.
- `-translate-<fraction>`: Negative percentage translation. Example: `-translate-1/4`.
- `translate-full`, `-translate-full`: Translates by 100% or -100%.
- `translate-px`, `-translate-px`: Translates by 1px or -1px.
- `translate-x-<value>`, `translate-y-<value>`: Translate on a single axis (supports `<number>`, `-<number>`, `<fraction>`, `-<fraction>`, `full`, `-full`, `px`, `-px`). Example: `translate-x-4`, `-translate-y-1/2`.
- `translate-z-<number>`, `-translate-z-<number>`: Translate on Z axis. Requires `transform-3d` on parent. Example: `translate-z-6`, `-translate-z-12`.
- `translate-z-px`, `-translate-z-px`: Translate on Z axis by 1px.
- `translate-none`: Removes translation (`translate: none;`).
- Supports `(<custom-property>)` and `[<value>]` suffixes for all variants. Example: `translate-x-[3.142rad]`, `translate-y-(--my-offset)`.
- **Responsive:** Use breakpoint prefixes like `md:translate-x-0`.

## Content

> Utilities for controlling the content of the before and after pseudo-elements.

- `content-[<value>]`: Sets `content: <value>;`. Use with `before:` or `after:` variants. Example: `after:content-['_↗']`. Underscores `_` are converted to spaces. Escape underscores with `\`. Example: `before:content-['Hello_World']`, `before:content-['Hello\_World']`.
- `content-none`: Sets `content: none;`.
- `content-(<custom-property>)`: Sets `content: var(<custom-property>);`.
- `content-[attr(<name>)]`: Uses the value of an HTML attribute. Example: `before:content-[attr(before)]`.
- **Responsive:** Use breakpoint prefixes like `md:before:content-['Desktop']`.

## Outline Width

> Utilities for controlling the width of an element's outline.

- `outline`: Sets `outline-width: 1px;`.
- `outline-<number>`: Sets `outline-width: <number>px;`. Example: `outline-2`, `outline-4`. Automatically sets `outline-style: solid`.
- `outline-(length:<custom-property>)`: Sets `outline-width: var(<custom-property>);`.
- `outline-[<value>]`: Sets `outline-width: <value>;`. Example: `outline-[2vw]`.
- **Usage:** Often combined with `outline-offset-*` and `outline-*` color utilities.
- **States:** Apply conditionally using variants like `focus:outline-2`.
- **Responsive:** Use breakpoint prefixes like `md:outline-4`.

## Transition Delay

> Utilities for controlling the delay of CSS transitions.

- `delay-<number>`: Sets `transition-delay: <number>ms;`. Example: `delay-150`, `delay-700`.
- `delay-(<custom-property>)`: Sets `transition-delay: var(<custom-property>);`.
- `delay-[<value>]`: Sets `transition-delay: <value>;`. Example: `delay-[1s,250ms]`.
- **Responsive:** Use breakpoint prefixes like `md:delay-300`.

## User Select

> Utilities for controlling whether the user can select text in an element.

- `select-none`: Prevents text selection in the element and children (`user-select: none;`).
- `select-text`: Allows text selection (`user-select: text;`).
- `select-all`: Selects all text in the element on a single click (`user-select: all;`).
- `select-auto`: Uses default browser behavior (`user-select: auto;`).
- **Responsive:** Use breakpoint prefixes like `md:select-all`.

## Flex Basis

> Utilities for controlling the initial size of flex items.

- `basis-<number>`: Sets initial size based on spacing scale (`flex-basis: calc(var(--spacing) * <number>);`). Example: `basis-64`.
- `basis-<fraction>`: Sets initial size as a percentage (`flex-basis: calc(<fraction> * 100%);`). Example: `basis-1/3`.
- `basis-full`: Sets `flex-basis: 100%;`.
- `basis-auto`: Sets `flex-basis: auto;`.
- `basis-{size}`: Sets initial size based on container scale (`flex-basis: var(--container-{size});`). Sizes: `3xs` to `7xl`. Example: `basis-sm`.
- `basis-(<custom-property>)`: Sets `flex-basis: var(<custom-property>);`.
- `basis-[<value>]`: Sets `flex-basis: <value>;`. Example: `basis-[30vw]`.
- **Responsive:** Use breakpoint prefixes like `md:basis-1/3`.
- **Customization:** Extend the `container` or `spacing` theme keys.

## Backface Visibility

> Utilities for controlling if an element's backface is visible.

- `backface-hidden`: Hides the backface of a transformed element (`backface-visibility: hidden;`).
- `backface-visible`: Shows the backface of a transformed element (`backface-visibility: visible;`).
- **Usage:** Useful for 3D transforms like cubes. Often used with `transform-3d`.
- **Responsive:** Use breakpoint prefixes like `md:backface-hidden`.

## Theme Variables

> Using utility classes as an API for your design tokens.

- **Definition:** Special CSS variables defined in `@theme { ... }` that drive utility class generation. Example: `@theme { --color-mint-500: oklch(0.72 0.11 178); }`.
- **Utility Generation:** Creates corresponding utilities (`bg-mint-500`, `text-mint-500`).
- **CSS Variables:** Also generates standard CSS variables (`:root { --color-mint-500: ...; }`) for use in custom CSS or arbitrary values.
- **Namespaces:** Organized by prefix (e.g., `--color-*`, `--font-*`, `--spacing-*`, `--breakpoint-*`, `--shadow-*`, `--animate-*`). See digest for full list.
- **Default Theme:** Tailwind includes a default theme (`tailwindcss/theme.css`) with common palettes, scales, etc.
- **Customization:**
  - Extend: Add new variables in `@theme`.
  - Override: Redefine existing variables in `@theme`.
  - Remove Namespace: Set a namespace to initial (`--color-*: initial;`) to remove all defaults in that namespace.
  - Remove All Defaults: Set `--*: initial;` to disable the entire default theme.
- **Animation Keyframes:** Define `@keyframes` inside `@theme` alongside `--animate-*` variables.
- **Referencing Variables:** Use `@theme inline { --font-sans: var(--font-inter); }` when a theme variable references another to ensure correct value inlining in utilities.
- **Static Generation:** Use `@theme static { ... }` to force generation of all CSS variables, even if unused.
- **Sharing:** Put theme variables in a separate `.css` file and `@import` it.

## Caret Color

> Utilities for controlling the color of the text input cursor.

- `caret-{color}`: Sets `caret-color` using the theme's color palette. Example: `caret-pink-500`.
- `caret-inherit`, `caret-current`, `caret-transparent`: Sets specific `caret-color` values.
- `caret-(<custom-property>)`: Sets `caret-color: var(<custom-property>);`.
- `caret-[<value>]`: Sets `caret-color: <value>;`. Example: `caret-[#50d71e]`.
- **Responsive:** Use breakpoint prefixes like `md:caret-lime-600`.
- **Customization:** Extend the `color` theme key.

## Grid Row Start / End / Span

> Utilities for controlling how elements are sized and placed across grid rows.

- `row-span-<number>`: Makes element span `<number>` rows (`grid-row: span <number> / span <number>;`). Example: `row-span-3`.
- `row-span-full`: Makes element span all rows (`grid-row: 1 / -1;`).
- `row-span-(<custom-property>)`: `grid-row: span var(<custom-property>) / span var(<custom-property>);`.
- `row-span-[<value>]`: `grid-row: span <value> / span <value>;`.
- `row-start-<number>`: Element starts at grid row line `<number>`. Example: `row-start-2`.
- `-row-start-<number>`: Element starts at grid row line `<number>` from the end.
- `row-start-auto`: Automatic start placement.
- `row-start-(<custom-property>)`: `grid-row-start: var(<custom-property>);`.
- `row-start-[<value>]`: `grid-row-start: <value>;`.
- `row-end-<number>`: Element ends at grid row line `<number>`. Example: `row-end-3`.
- `-row-end-<number>`: Element ends at grid row line `<number>` from the end.
- `row-end-auto`: Automatic end placement.
- `row-end-(<custom-property>)`: `grid-row-end: var(<custom-property>);`.
- `row-end-[<value>]`: `grid-row-end: <value>;`.
- `row-auto`: Sets `grid-row: auto;`.
- `row-<number>`: Sets start/end row line (`grid-row: <number>;`).
- `-row-<number>`: Sets start/end row line from end (`grid-row: calc(<number> * -1);`).
- `row-(<custom-property>)`: `grid-row: var(<custom-property>);`.
- `row-[<value>]`: `grid-row: <value>;`. Example: `row-[span_16_/_span_16]`.
- **Responsive:** Use breakpoint prefixes like `md:row-span-4`.

## Transform Origin

> Utilities for specifying the origin for an element's transformations.

- `origin-{position}`: Sets `transform-origin`. Positions: `center`, `top`, `top-right`, `right`, `bottom-right`, `bottom`, `bottom-left`, `left`, `top-left`. Example: `origin-top-left`, `origin-bottom`.
- `origin-(<custom-property>)`: Sets `transform-origin: var(<custom-property>);`.
- `origin-[<value>]`: Sets `transform-origin: <value>;`. Example: `origin-[33%_75%]`.
- **Responsive:** Use breakpoint prefixes like `md:origin-top`.

## Font Stretch

> Utilities for selecting the width of a font face.

- `font-stretch-{amount}`: Sets `font-stretch`. Amounts: `ultra-condensed` (50%), `extra-condensed` (62.5%), `condensed` (75%), `semi-condensed` (87.5%), `normal` (100%), `semi-expanded` (112.5%), `expanded` (125%), `extra-expanded` (150%), `ultra-expanded` (200%). Example: `font-stretch-condensed`.
- `font-stretch-<percentage>`: Sets `font-stretch: <percentage>;`. Example: `font-stretch-50%`.
- `font-stretch-(<custom-property>)`: Sets `font-stretch: var(<custom-property>);`.
- `font-stretch-[<value>]`: Sets `font-stretch: <value>;`. Example: `font-stretch-[66.66%]`.
- **Note:** Only applies to fonts with multiple width variations.
- **Responsive:** Use breakpoint prefixes like `md:font-stretch-expanded`.

## Background Image

> Utilities for controlling an element's background image.

- `bg-[<value>]`: Sets `background-image: <value>;`. Often used with `url()`. Example: `bg-[url(/img/mountains.jpg)]`.
- `bg-(image:<custom-property>)`: Sets `background-image: var(<custom-property>);`.
- `bg-none`: Removes background image (`background-image: none;`).
- **Linear Gradients:**
  - `bg-linear-{direction}`: Sets direction (`to t`, `to tr`, `to r`, `to br`, `to b`, `to bl`, `to l`, `to tl`). Example: `bg-linear-to-r`.
  - `bg-linear-<angle>`, `-bg-linear-<angle>`: Sets angle. Example: `bg-linear-65`.
  - `bg-linear-(<custom-property>)`: Sets gradient stops via CSS variable.
  - `bg-linear-[<value>]`: Sets gradient stops via arbitrary value.
- **Radial Gradients:**
  - `bg-radial`: Basic radial gradient.
  - `bg-radial-[<position>]`: Sets position. Example: `bg-radial-[at_50%_75%]`.
  - `bg-radial-(<custom-property>)`: Sets gradient stops via CSS variable.
  - `bg-radial-[<value>]`: Sets gradient stops via arbitrary value.
- **Conic Gradients:**
  - `bg-conic`: Basic conic gradient.
  - `bg-conic-<angle>`, `-bg-conic-<angle>`: Sets start angle. Example: `bg-conic-180`.
  - `bg-conic-(<custom-property>)`: Sets gradient via CSS variable.
  - `bg-conic-[<value>]`: Sets gradient via arbitrary value.
- **Color Stops:**
  - `from-{color}`: Sets starting color (`--tw-gradient-from`). Example: `from-cyan-500`.
  - `via-{color}`: Sets middle color (`--tw-gradient-via`). Example: `via-purple-500`.
  - `to-{color}`: Sets ending color (`--tw-gradient-to`). Example: `to-blue-500`.
  - Also supports `inherit`, `current`, `transparent`.
  - Also supports `(<custom-property>)` and `[<value>]` suffixes.
- **Stop Positions:**
  - `from-<percentage>`, `from-<number>`: Sets start position. Example: `from-10%`.
  - `via-<percentage>`, `via-<number>`: Sets middle position. Example: `via-30%`.
  - `to-<percentage>`, `to-<number>`: Sets end position. Example: `to-90%`.
  - Also supports `(<custom-property>)` and `[<value>]` suffixes.
- **Interpolation Mode:** Use modifier `/` after direction/angle (e.g., `bg-linear-to-r/hsl`, `bg-linear-65/oklch`). Modes: `srgb`, `hsl`, `oklab` (default), `oklch`, `longer`, `shorter`, `increasing`, `decreasing`.
- **Responsive:** Use breakpoint prefixes like `md:bg-gradient-to-t`.
- **Customization:** Extend the `color` theme key for gradient stops.

## Justify Content

> Utilities for controlling how flex and grid items are positioned along a container's main axis.

- `justify-start`: Align items to the start (`justify-content: flex-start;`).
- `justify-center`: Align items to the center (`justify-content: center;`).
- `justify-center-safe`: Align items to the center, but fall back to start if overflow (`justify-content: safe center;`).
- `justify-end`: Align items to the end (`justify-content: flex-end;`).
- `justify-end-safe`: Align items to the end, but fall back to start if overflow (`justify-content: safe flex-end;`).
- `justify-between`: Distribute items evenly, first item at start, last at end (`justify-content: space-between;`).
- `justify-around`: Distribute items evenly with equal space on each side (`justify-content: space-around;`).
- `justify-evenly`: Distribute items evenly with equal space between and around them (`justify-content: space-evenly;`).
- `justify-stretch`: Items fill available space (for grid items) (`justify-content: stretch;`).
- `justify-baseline`: Align items based on their baseline (`justify-content: baseline;`).
- `justify-normal`: Default alignment (`justify-content: normal;`).
- **Responsive:** Use breakpoint prefixes like `md:justify-between`.

## Transition Timing Function

> Utilities for controlling the easing of CSS transitions.

- `ease-linear`: `transition-timing-function: linear;`.
- `ease-in`: `transition-timing-function: var(--ease-in);` (cubic-bezier(0.4, 0, 1, 1)).
- `ease-out`: `transition-timing-function: var(--ease-out);` (cubic-bezier(0, 0, 0.2, 1)).
- `ease-in-out`: `transition-timing-function: var(--ease-in-out);` (cubic-bezier(0.4, 0, 0.2, 1)).
- `ease-initial`: `transition-timing-function: initial;`.
- `ease-(<custom-property>)`: `transition-timing-function: var(<custom-property>);`.
- `ease-[<value>]`: `transition-timing-function: <value>;`. Example: `ease-[cubic-bezier(0.95,0.05,0.795,0.035)]`.
- **Responsive:** Use breakpoint prefixes like `md:ease-in`.
- **Customization:** Extend the `ease` theme key.

## Animation

> Utilities for animating elements with CSS animations.

- `animate-spin`: Linear spin animation (`animation: var(--animate-spin);`).
- `animate-ping`: Scale and fade animation like radar ping (`animation: var(--animate-ping);`).
- `animate-pulse`: Gentle fade in/out, for skeleton loaders (`animation: var(--animate-pulse);`).
- `animate-bounce`: Bounce up and down, for indicators (`animation: var(--animate-bounce);`).
- `animate-none`: Removes animation (`animation: none;`).
- `animate-(<custom-property>)`: Sets `animation: var(<custom-property>);`.
- `animate-[<value>]`: Sets `animation: <value>;`. Example: `animate-[wiggle_1s_ease-in-out_infinite]`.
- **Reduced Motion:** Use `motion-safe:` and `motion-reduce:` variants to conditionally apply animations.
- **Responsive:** Use breakpoint prefixes like `md:animate-spin`.
- **Customization:** Extend the `animate` theme key and define corresponding `@keyframes` within `@theme`.

## Grid Auto Rows

> Utilities for controlling the size of implicitly-created grid rows.

- `auto-rows-auto`: Implicit rows sized automatically (`grid-auto-rows: auto;`).
- `auto-rows-min`: Implicit rows sized to `min-content`.
- `auto-rows-max`: Implicit rows sized to `max-content`.
- `auto-rows-fr`: Implicit rows sized to `minmax(0, 1fr)`.
- `auto-rows-(<custom-property>)`: Sets `grid-auto-rows: var(<custom-property>);`.
- `auto-rows-[<value>]`: Sets `grid-auto-rows: <value>;`. Example: `auto-rows-[minmax(0,2fr)]`.
- **Responsive:** Use breakpoint prefixes like `md:auto-rows-min`.

## Box Decoration Break

> Utilities for controlling how element fragments should be rendered across multiple lines, columns, or pages.

- `box-decoration-clone`: Renders fragments as distinct blocks (`box-decoration-break: clone;`). Background, border, padding etc. are applied to each fragment independently.
- `box-decoration-slice`: Renders fragments as if one continuous element (`box-decoration-break: slice;`). Background, border etc. are sliced.
- **Responsive:** Use breakpoint prefixes like `md:box-decoration-slice`.

## Visibility

> Utilities for controlling the visibility of an element.

- `visible`: Element is visible (`visibility: visible;`).
- `invisible`: Element is hidden but still affects layout (`visibility: hidden;`). Use `hidden` (display: none) to remove from layout entirely.
- `collapse`: Hides table rows/columns like `display: none` but preserves table layout (`visibility: collapse;`).
- **Responsive:** Use breakpoint prefixes like `md:invisible`.

## Max Width

> Utilities for setting the maximum width of an element.

- `max-w-<number>`: Sets max width based on spacing scale (`max-width: calc(var(--spacing) * <number>);`). Example: `max-w-64`.
- `max-w-<fraction>`: Sets percentage-based max width (`max-width: calc(<fraction> * 100%);`). Example: `max-w-1/2`.
- `max-w-{size}`: Sets max width based on container scale (`max-width: var(--container-{size});`). Sizes: `3xs` to `7xl`. Example: `max-w-md`.
- `max-w-none`: Removes max width (`max-width: none;`).
- `max-w-px`: Sets `max-width: 1px;`.
- `max-w-full`: Sets `max-width: 100%;`.
- `max-w-screen`: Sets `max-width: 100vw;`.
- `max-w-{vp-unit}`: Sets max width based on viewport units (`dvw`, `dvh`, `lvw`, `lvh`, `svw`, `svh`). Example: `max-w-dvw`.
- `max-w-min`: Sets `max-width: min-content;`.
- `max-w-max`: Sets `max-width: max-content;`.
- `max-w-fit`: Sets `max-width: fit-content;`.
- `container`: Sets max width matching current breakpoint min-width. Needs `mx-auto` for centering.
- `max-w-(<custom-property>)`: Sets `max-width: var(<custom-property>);`.
- `max-w-[<value>]`: Sets `max-width: <value>;`. Example: `max-w-[220px]`.
- **Responsive:** Use breakpoint prefixes like `lg:max-w-lg`.
- **Customization:** Extend the `spacing` or `container` theme keys.

## Rotate

> Utilities for rotating elements.

- `rotate-<number>`: Rotates element by degrees (`rotate: <number>deg;`). Example: `rotate-45`.
- `-rotate-<number>`: Negative rotation. Example: `-rotate-45`.
- `rotate-x-<number>`, `-rotate-x-<number>`: Rotates around X-axis. Example: `rotate-x-50`.
- `rotate-y-<number>`, `-rotate-y-<number>`: Rotates around Y-axis. Example: `-rotate-y-30`.
- `rotate-z-<number>`, `-rotate-z-<number>`: Rotates around Z-axis. Example: `rotate-z-45`.
- `rotate-none`: Removes rotation (`rotate: none;`).
- Supports `(<custom-property>)` and `[<value>]` suffixes for all variants. Example: `rotate-[3.142rad]`, `rotate-x-(--my-angle)`.
- **Note:** 3D rotations (`rotate-x`, `rotate-y`, `rotate-z`) may require `transform-3d` on the parent or element itself depending on context.
- **Responsive:** Use breakpoint prefixes like `md:rotate-60`.

## Grid Template Columns

> Utilities for specifying the columns in a grid layout.

- `grid-cols-<number>`: Creates a grid with `<number>` equal-width columns (`grid-template-columns: repeat(<number>, minmax(0, 1fr));`). Example: `grid-cols-4`.
- `grid-cols-none`: Sets `grid-template-columns: none;`.
- `grid-cols-subgrid`: Adopts column tracks from parent grid (`grid-template-columns: subgrid;`).
- `grid-cols-[<value>]`: Sets specific column tracks (`grid-template-columns: <value>;`). Example: `grid-cols-[200px_minmax(900px,_1fr)_100px]`.
- `grid-cols-(<custom-property>)`: Sets `grid-template-columns: var(<custom-property>);`.
- **Responsive:** Use breakpoint prefixes like `md:grid-cols-6`.

## Max Height

> Utilities for setting the maximum height of an element.

- `max-h-<number>`: Sets max height based on spacing scale (`max-height: calc(var(--spacing) * <number>);`). Example: `max-h-64`.
- `max-h-<fraction>`: Sets percentage-based max height (`max-height: calc(<fraction> * 100%);`). Example: `max-h-1/2`.
- `max-h-none`: Removes max height (`max-height: none;`).
- `max-h-px`: Sets `max-height: 1px;`.
- `max-h-full`: Sets `max-height: 100%;`.
- `max-h-screen`: Sets `max-height: 100vh;`.
- `max-h-{vp-unit}`: Sets max height based on viewport units (`dvh`, `dvw`, `lvh`, `lvw`, `svh`, `svw`). Example: `max-h-dvh`.
- `max-h-min`: Sets `max-height: min-content;`.
- `max-h-max`: Sets `max-height: max-content;`.
- `max-h-fit`: Sets `max-height: fit-content;`.
- `max-h-(<custom-property>)`: Sets `max-height: var(<custom-property>);`.
- `max-h-[<value>]`: Sets `max-height: <value>;`. Example: `max-h-[220px]`.
- **Responsive:** Use breakpoint prefixes like `md:max-h-screen`.
- **Customization:** Extend the `spacing` theme key.

## Transition Behavior

> Utilities to control the behavior of CSS transitions.

- `transition-normal`: Normal transition behavior (`transition-behavior: normal;`). Transitions only apply to continuously animatable properties.
- `transition-discrete`: Allows transitions on discrete properties (like `display`) (`transition-behavior: allow-discrete;`). Enables effects like fade-out when changing from `block` to `hidden`.
- **Responsive:** Use breakpoint prefixes like `md:transition-normal`.

## Upgrade Guide Snippets

> Key changes noted in the upgrade guide.

- Use `npx @tailwindcss/upgrade` for automated v3 -> v4 migration.
- V4 requires modern browsers (Safari 16.4+, Chrome 111+, Firefox 128+).
- Replace `@tailwind` directives with `@import "tailwindcss";`.
- Replace opacity utilities (`bg-opacity-*`) with slash syntax (`bg-black/50`).
- Update renamed utilities: `shadow-sm`->`xs`, `shadow`->`sm`, `blur-sm`->`xs`, `blur`->`sm`, `rounded-sm`->`xs`, `rounded`->`sm`, `outline-none`->`hidden`, `ring`->`ring-3`.
- `space-x-*`/`space-y-*` selector changed; prefer `gap` with flex/grid if issues arise.
- Gradient variants preserve other stops; use `via-none` explicitly if needed.
- Container `center`/`padding` options removed; extend with `@utility container`.
- Default border/divide color is `currentColor` (was `gray-200`).
- Default ring is 1px `currentColor` (was 3px `blue-500`).
- Preflight changes: Placeholder color uses 50% opacity text color; Buttons use `cursor: default`; `<dialog>` margins reset.
- Prefixes applied like variants (`tw:bg-red-500`).
- Use `@utility` instead of `@layer utilities`/`@layer components` for custom utilities needing variants.
- Variant stacking order is now left-to-right.
- Use `(...)` instead of `[...]` for variable shorthand in arbitrary values (`bg-(--brand-color)`).
- `hover` variant respects `@media (hover: hover)`. Override with `@custom-variant hover (&:hover)` if needed.
- `transition` utilities include `outline-color`.
- `corePlugins` option removed.
- Use CSS variables (`var(--color-red-500)`) instead of `theme()` function.
- Use `@reference` to import main CSS in separate CSS contexts (Vue/Svelte `<style>`, CSS Modules) if using `@apply`/`@variant`.

## Transform

> Utilities for transforming elements.

- `transform-gpu`: Forces hardware acceleration (`transform: translateZ(0) ...;`).
- `transform-cpu`: Forces transform back to CPU (`transform: ...;` without `translateZ(0)`).
- `transform-none`: Removes all transforms (`transform: none;`).
- `transform-(<custom-property>)`: Sets `transform: var(<custom-property>);`.
- `transform-[<value>]`: Sets `transform: <value>;`. Example: `transform-[matrix(1,2,3,4,5,6)]`.

## Scroll Snap Stop

> Utilities for controlling whether you can skip past possible snap positions.

- `snap-normal`: Allows skipping snap points (`scroll-snap-stop: normal;`).
- `snap-always`: Forces stopping at each snap point (`scroll-snap-stop: always;`). Usually used with `snap-mandatory`.
- **Responsive:** Use breakpoint prefixes like `md:snap-normal`.

## Touch Action

> Utilities for controlling how an element can be scrolled and zoomed on touchscreens.

- `touch-auto`: Default browser behavior.
- `touch-none`: Disables panning and zooming.
- `touch-pan-x`, `touch-pan-left`, `touch-pan-right`: Allows horizontal panning only.
- `touch-pan-y`, `touch-pan-up`, `touch-pan-down`: Allows vertical panning only.
- `touch-pinch-zoom`: Allows zooming only.
- `touch-manipulation`: Enables panning and zooming but disables double-tap to zoom.
- **Responsive:** Use breakpoint prefixes like `md:touch-auto`.

## Backdrop Filter: Contrast

> Utilities for applying backdrop contrast filters to an element.

- `backdrop-contrast-<number>`: Sets backdrop contrast (`backdrop-filter: contrast(<number>%);`). Example: `backdrop-contrast-50`, `backdrop-contrast-200`.
- `backdrop-contrast-(<custom-property>)`: Sets `backdrop-filter: contrast(var(<custom-property>));`.
- `backdrop-contrast-[<value>]`: Sets `backdrop-filter: contrast(<value>);`. Example: `backdrop-contrast-[.25]`.
- **Responsive:** Use breakpoint prefixes like `md:backdrop-contrast-150`.

## Filter: Grayscale

> Utilities for applying grayscale filters to an element.

- `grayscale`: Sets 100% grayscale (`filter: grayscale(100%);`).
- `grayscale-<number>`: Sets grayscale percentage (`filter: grayscale(<number>%);`). Example: `grayscale-25`, `grayscale-50`. `grayscale-0` removes effect.
- `grayscale-(<custom-property>)`: Sets `filter: grayscale(var(<custom-property>));`.
- `grayscale-[<value>]`: Sets `filter: grayscale(<value>);`. Example: `grayscale-[0.5]`.
- **Responsive:** Use breakpoint prefixes like `md:grayscale-0`.

## Table Layout

> Utilities for controlling the table layout algorithm.

- `table-auto`: Column widths based on content (`table-layout: auto;`).
- `table-fixed`: Column widths based on table/column widths (`table-layout: fixed;`). Ignores cell content. Useful for fixed-width columns.
- **Responsive:** Use breakpoint prefixes like `md:table-fixed`.

## Border Collapse

> Utilities for controlling whether table borders should collapse or be separated.

- `border-collapse`: Adjacent cell borders are combined (`border-collapse: collapse;`).
- `border-separate`: Each cell has its own distinct borders (`border-collapse: separate;`). Use with `border-spacing-*` utilities.
- **Responsive:** Use breakpoint prefixes like `md:border-separate`.

## Box Shadow

> Utilities for controlling the box shadow of an element.

- `shadow-{size}`: Applies outer box shadow. Sizes: `2xs`, `xs` (v3 `sm`), `sm` (v3 `shadow`), `md`, `lg`, `xl`, `2xl`. Example: `shadow-md`.
- `shadow-none`: Removes box shadow (`box-shadow: 0 0 #0000;`).
- `shadow-{color}`: Sets shadow color (`--tw-shadow-color`). Example: `shadow-indigo-500`.
- `shadow-{color}/{opacity}`: Sets shadow color and opacity. Example: `shadow-cyan-500/50`.
- `inset-shadow-{size}`: Applies inset box shadow. Sizes: `2xs`, `xs`, `sm`. Example: `inset-shadow-sm`.
- `inset-shadow-none`: Removes inset shadow (`box-shadow: inset 0 0 #0000;`).
- `inset-shadow-{color}`: Sets inset shadow color (`--tw-inset-shadow-color`). Example: `inset-shadow-indigo-500`.
- `inset-shadow-{color}/{opacity}`: Sets inset shadow color and opacity. Example: `inset-shadow-indigo-500/50`.
- `ring`, `ring-<number>`: Applies solid ring (box shadow). `ring` is 1px (was 3px in v3). `ring-2`, `ring-4` set width in px. Default color is `currentColor`. Example: `ring-2`.
- `ring-{color}`: Sets ring color (`--tw-ring-color`). Example: `ring-blue-500`.
- `ring-{color}/{opacity}`: Sets ring color and opacity. Example: `ring-blue-500/50`.
- `inset-ring`, `inset-ring-<number>`: Applies solid inset ring. Example: `inset-ring-2`.
- `inset-ring-{color}`: Sets inset ring color (`--tw-inset-ring-color`). Example: `inset-ring-blue-500`.
- `inset-ring-{color}/{opacity}`: Sets inset ring color and opacity. Example: `inset-ring-blue-500/50`.
- Supports `(<custom-property>)`, `(color:<custom-property>)`, `[<value>]` suffixes. Example: `shadow-[0_35px_35px_rgba(0,0,0,0.25)]`.
- **Responsive:** Use breakpoint prefixes like `md:shadow-lg`.
- **Customization:** Extend `shadow`, `inset-shadow`, `color` theme keys.

## Clear

> Utilities for controlling the wrapping of content around an element.

- `clear-left`: Position below preceding left-floated elements (`clear: left;`).
- `clear-right`: Position below preceding right-floated elements (`clear: right;`).
- `clear-both`: Position below all preceding floated elements (`clear: both;`).
- `clear-start`: Logical property, maps to left/right based on text direction (`clear: inline-start;`).
- `clear-end`: Logical property, maps to left/right based on text direction (`clear: inline-end;`).
- `clear-none`: Resets clears (`clear: none;`).
- **Responsive:** Use breakpoint prefixes like `md:clear-none`.

## Font Smoothing

> Utilities for controlling the font smoothing of an element.

- `antialiased`: Grayscale antialiasing (`-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`).
- `subpixel-antialiased`: Subpixel antialiasing (`-webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto;`).
- **Responsive:** Use breakpoint prefixes like `md:subpixel-antialiased`.

## Flex

> Utilities for controlling how flex items both grow and shrink.

- `flex-<number>`: Sets `flex: <number>;`. Shorthand, often used as `flex-1`.
- `flex-<fraction>`: Sets `flex: calc(<fraction> * 100%);`.
- `flex-auto`: Allows item to grow/shrink based on initial size (`flex: 1 1 auto;`).
- `flex-initial`: Allows item to shrink but not grow, based on initial size (`flex: 0 1 auto;`).
- `flex-none`: Prevents item from growing or shrinking (`flex: none;`).
- `flex-(<custom-property>)`: Sets `flex: var(<custom-property>);`.
- `flex-[<value>]`: Sets `flex: <value>;`. Example: `flex-[3_1_auto]`.
- **Responsive:** Use breakpoint prefixes like `md:flex-1`.

## Float

> Utilities for controlling the wrapping of content around an element.

- `float-right`: Floats element to the right (`float: right;`).
- `float-left`: Floats element to the left (`float: left;`).
- `float-start`: Logical property, floats start (left in LTR, right in RTL) (`float: inline-start;`).
- `float-end`: Logical property, floats end (right in LTR, left in RTL) (`float: inline-end;`).
- `float-none`: Resets floats (`float: none;`).
- **Responsive:** Use breakpoint prefixes like `md:float-left`.

## Flex Shrink

> Utilities for controlling how flex items shrink.

- `shrink`: Allows item to shrink if needed (`flex-shrink: 1;`).
- `shrink-0`: Prevents item from shrinking (`flex-shrink: 0;`).
- `shrink-<number>`: Sets specific shrink factor (`flex-shrink: <number>;`).
- `shrink-[<value>]`: Sets `flex-shrink: <value>;`.
- `shrink-(<custom-property>)`: Sets `flex-shrink: var(<custom-property>);`. Example: `shrink-[calc(100vw-var(--sidebar))]`.
- **Responsive:** Use breakpoint prefixes like `md:shrink-0`.

## Skew

> Utilities for skewing elements with transform.

- `skew-<number>`: Skews on both X and Y axes (`transform: skewX(<number>deg) skewY(<number>deg);`). Example: `skew-6`.
- `-skew-<number>`: Negative skew on both axes. Example: `-skew-3`.
- `skew-x-<number>`: Skews on X-axis only (`transform: skewX(<number>deg);`). Example: `skew-x-12`.
- `-skew-x-<number>`: Negative X-axis skew. Example: `-skew-x-12`.
- `skew-y-<number>`: Skews on Y-axis only (`transform: skewY(<number>deg);`). Example: `skew-y-6`.
- `-skew-y-<number>`: Negative Y-axis skew. Example: `-skew-y-12`.
- Supports `(<custom-property>)` and `[<value>]` suffixes for all variants. Example: `skew-[3.142rad]`, `skew-x-(--my-skew)`.
- **Responsive:** Use breakpoint prefixes like `md:skew-12`.

## Text Align

> Utilities for controlling the alignment of text.

- `text-left`: Align text left (`text-align: left;`).
- `text-center`: Align text center (`text-align: center;`).
- `text-right`: Align text right (`text-align: right;`).
- `text-justify`: Justify text (`text-align: justify;`).
- `text-start`: Align text to the start (left in LTR, right in RTL) (`text-align: start;`).
- `text-end`: Align text to the end (right in LTR, left in RTL) (`text-align: end;`).
- **Responsive:** Use breakpoint prefixes like `md:text-center`.

## Font Size

> Utilities for controlling the font size of an element.

- `text-{size}`: Sets `font-size` and default `line-height`. Sizes: `xs` (0.75rem), `sm` (0.875rem), `base` (1rem), `lg` (1.125rem), `xl` (1.25rem), `2xl` (1.5rem), `3xl` (1.875rem), `4xl` (2.25rem), `5xl` (3rem), `6xl` (3.75rem), `7xl` (4.5rem), `8xl` (6rem), `9xl` (8rem). Example: `text-lg`.
- `text-{size}/{leading}`: Sets `font-size` and specific `line-height`. Leading can be `<number>` (from spacing scale), `(<custom-property>)`, or `[<value>]`. Example: `text-sm/6`.
- `text-(length:<custom-property>)`: Sets `font-size: var(<custom-property>);`.
- `text-[<value>]`: Sets `font-size: <value>;`. Example: `text-[14px]`.
- **Responsive:** Use breakpoint prefixes like `md:text-base`.
- **Customization:** Extend the `text` theme key. Can include default line-height, letter-spacing, font-weight per size (e.g., `--text-tiny--line-height`).

## Flex Wrap

> Utilities for controlling how flex items wrap.

- `flex-nowrap`: Items do not wrap, may overflow (`flex-wrap: nowrap;`).
- `flex-wrap`: Items wrap onto multiple lines (`flex-wrap: wrap;`).
- `flex-wrap-reverse`: Items wrap in reverse order (`flex-wrap: wrap-reverse;`).
- **Responsive:** Use breakpoint prefixes like `md:flex-wrap-reverse`.

## Font Weight

> Utilities for controlling the font weight of an element.

- `font-{weight}`: Sets `font-weight`. Weights: `thin` (100), `extralight` (200), `light` (300), `normal` (400), `medium` (500), `semibold` (600), `bold` (700), `extrabold` (800), `black` (900). Example: `font-bold`.
- `font-(<custom-property>)`: Sets `font-weight: var(<custom-property>);`.
- `font-[<value>]`: Sets `font-weight: <value>;`. Example: `font-[1000]`.
- **Responsive:** Use breakpoint prefixes like `md:font-bold`.
- **Customization:** Extend the `font-weight` theme key.

## Align Self

> Utilities for controlling how an individual flex or grid item is positioned along its container's cross axis.

- `self-auto`: Item aligns based on container's `align-items` (`align-self: auto;`).
- `self-start`: Aligns item to the start (`align-self: flex-start;`).
- `self-end`: Aligns item to the end (`align-self: flex-end;`).
- `self-end-safe`: Aligns item to the end, falls back to start if overflow (`align-self: safe flex-end;`).
- `self-center`: Aligns item to the center (`align-self: center;`).
- `self-center-safe`: Aligns item to the center, falls back to start if overflow (`align-self: safe center;`).
- `self-stretch`: Stretches item to fill cross axis (`align-self: stretch;`).
- `self-baseline`: Aligns item's baseline with container's baseline (`align-self: baseline;`).
- `self-baseline-last`: Aligns item's baseline with container's _last_ baseline (`align-self: last baseline;`). Useful for multi-line text alignment.
- **Responsive:** Use breakpoint prefixes like `md:self-end`.

## List Style Type

> Utilities for controlling the marker style of a list.

- `list-disc`: Use disc markers (`list-style-type: disc;`).
- `list-decimal`: Use decimal number markers (`list-style-type: decimal;`).
- `list-none`: No markers (`list-style-type: none;`).
- `list-(<custom-property>)`: Sets `list-style-type: var(<custom-property>);`.
- `list-[<value>]`: Sets `list-style-type: <value>;`. Example: `list-[upper-roman]`.
- **Usage:** Apply to `<ul>` or `<ol>` elements. Often combined with `list-inside` or `list-outside`.
- **Responsive:** Use breakpoint prefixes like `md:list-disc`.

## Isolation

> Utilities for controlling whether an element should explicitly create a new stacking context.

- `isolate`: Creates a new stacking context (`isolation: isolate;`). Prevents element from blending with backdrop elements when using `mix-blend-mode`.
- `isolation-auto`: Default behavior (`isolation: auto;`).
- **Responsive:** Use breakpoint prefixes like `md:isolation-auto`.

## Background Position

> Utilities for controlling the position of an element's background image.

- `bg-{position}`: Sets `background-position`. Positions: `top-left`, `top`, `top-right`, `left`, `center`, `right`, `bottom-left`, `bottom`, `bottom-right`. Example: `bg-center`.
- `bg-position-(<custom-property>)`: Sets `background-position: var(<custom-property>);`.
- `bg-position-[<value>]`: Sets `background-position: <value>;`. Example: `bg-position-[center_top_1rem]`.
- **Responsive:** Use breakpoint prefixes like `md:bg-top`.

## Perspective Origin

> Utilities for controlling an element's perspective origin when placed in 3D space.

- `perspective-origin-{position}`: Sets `perspective-origin`. Positions: `center`, `top`, `top-right`, `right`, `bottom-right`, `bottom`, `bottom-left`, `left`, `top-left`. Example: `perspective-origin-top-left`.
- `perspective-origin-(<custom-property>)`: Sets `perspective-origin: var(<custom-property>);`.
- `perspective-origin-[<value>]`: Sets `perspective-origin: <value>;`. Example: `perspective-origin-[200%_150%]`.
- **Usage:** Affects how 3D transformed children appear relative to the vanishing point.
- **Responsive:** Use breakpoint prefixes like `md:perspective-origin-bottom-left`.

## Order

> Utilities for controlling the order of flex and grid items.

- `order-<number>`: Sets `order: <number>;`. Example: `order-1`, `order-3`.
- `-order-<number>`: Sets negative order (`order: calc(<number> * -1);`). Example: `-order-1`.
- `order-first`: Sets `order: calc(-infinity);`. Renders item first.
- `order-last`: Sets `order: calc(infinity);`. Renders item last.
- `order-none`: Resets order (`order: 0;`).
- `order-(<custom-property>)`: Sets `order: var(<custom-property>);`.
- `order-[<value>]`: Sets `order: <value>;`. Example: `order-[min(var(--total-items),10)]`.
- **Responsive:** Use breakpoint prefixes like `md:order-last`.

## Aspect Ratio

> Utilities for controlling the aspect ratio of an element.

- `aspect-<ratio>`: Sets aspect ratio. Ratio format `W/H`. Example: `aspect-3/2`.
- `aspect-square`: Sets `aspect-ratio: 1 / 1;`.
- `aspect-video`: Sets `aspect-ratio: var(--aspect-ratio-video);` (defaults to 16 / 9).
- `aspect-auto`: Resets aspect ratio (`aspect-ratio: auto;`).
- `aspect-(<custom-property>)`: Sets `aspect-ratio: var(<custom-property>);`.
- `aspect-[<value>]`: Sets `aspect-ratio: <value>;`. Example: `aspect-[calc(4*3+1)/3]`.
- **Responsive:** Use breakpoint prefixes like `md:aspect-square`.
- **Customization:** Extend the `aspect` theme key.

## Position

> Utilities for controlling how an element is positioned in the document.

- `static`: Default positioning, follows normal flow (`position: static;`). Ignores top/right/bottom/left offsets.
- `relative`: Positioned relative to normal flow (`position: relative;`). Offsets relative to normal position. Creates stacking context for absolute children.
- `absolute`: Positioned outside normal flow (`position: absolute;`). Offsets relative to nearest non-static ancestor.
- `fixed`: Positioned relative to viewport (`position: fixed;`). Offsets relative to viewport.
- `sticky`: Relative until threshold crossed, then fixed until parent scrolls off screen (`position: sticky;`). Needs offset (e.g., `top-0`).
- **Responsive:** Use breakpoint prefixes like `md:absolute`.

## Filter: Brightness

> Utilities for applying brightness filters to an element.

- `brightness-<number>`: Sets brightness percentage (`filter: brightness(<number>%);`). Example: `brightness-50`, `brightness-125`.
- `brightness-(<custom-property>)`: Sets `filter: brightness(var(<custom-property>));`.
- `brightness-[<value>]`: Sets `filter: brightness(<value>);`. Example: `brightness-[1.75]`.
- **Responsive:** Use breakpoint prefixes like `md:brightness-150`.

## Detecting Classes in Source Files

> Understanding and customizing how Tailwind scans your source files.

- **Mechanism:** Scans plain text for tokens matching class name patterns. Does not parse code or understand dynamic concatenation (`text-{{error ? 'red' : 'green'}}-600` won't work).
- **Rule:** Always use complete, full class names in your source code (`{{error ? 'text-red-600' : 'text-green-600'}}`). Map dynamic values (props, variables) to full class strings.
- **Scanned Files:** Scans everything not in `.gitignore`, not binary, not CSS, not lock files.
- **`@source` Directive:**
  - Explicitly include paths: `@source "../node_modules/@acmecorp/ui-lib";`.
  - Ignore paths: `@source not "../src/legacy";`.
  - Set base path: `@import "tailwindcss" source("../src");`.
  - Disable auto-detection: `@import "tailwindcss" source(none);`.
- **Safelisting:** Force generation of unused classes: `@source inline("underline");`. Supports variants (`inline("{hover:,}underline")`) and brace expansion (`inline("bg-red-{50,{100..900..100},950}")`).
- **Excluding:** Prevent generation: `@source not inline("bg-red-*");`.

## Break After

> Utilities for controlling how a column or page should break after an element.

- `break-after-auto`: Default break behavior.
- `break-after-avoid`: Avoid break after element.
- `break-after-all`: Force break after element (for columns/pages).
- `break-after-avoid-page`: Avoid page break after element.
- `break-after-page`: Force page break after element.
- `break-after-left`: Force break to next left page.
- `break-after-right`: Force break to next right page.
- `break-after-column`: Force column break after element.
- **Responsive:** Use breakpoint prefixes like `md:break-after-auto`.

## Border Width

> Utilities for controlling the width of an element's borders.

- `border`: Sets `border-width: 1px;` on all sides.
- `border-<number>`: Sets border width in px on all sides. Example: `border-2`, `border-4`.
- `border-x`, `border-x-<number>`: Sets horizontal border width (`border-inline-width`).
- `border-y`, `border-y-<number>`: Sets vertical border width (`border-block-width`).
- `border-s`, `border-s-<number>`: Sets start border width (`border-inline-start-width`).
- `border-e`, `border-e-<number>`: Sets end border width (`border-inline-end-width`).
- `border-t`, `border-t-<number>`: Sets top border width.
- `border-r`, `border-r-<number>`: Sets right border width.
- `border-b`, `border-b-<number>`: Sets bottom border width.
- `border-l`, `border-l-<number>`: Sets left border width.
- **Dividers:** Add borders between child elements.
  - `divide-x`, `divide-x-<number>`: Adds right border (left in RTL) to all but last child.
  - `divide-y`, `divide-y-<number>`: Adds bottom border to all but last child.
  - `divide-x-reverse`, `divide-y-reverse`: Reverses border side for `flex-*-reverse` layouts.
- Supports `(length:<custom-property>)` and `[<value>]` suffixes for all variants. Example: `border-[2vw]`, `border-t-(length:--my-width)`, `divide-y-[3px]`.
- **Responsive:** Use breakpoint prefixes like `md:border-t-4`.

## Text Shadow

> Utilities for controlling the shadow of a text element.

- `text-shadow-{size}`: Applies text shadow. Sizes: `2xs`, `xs`, `sm`, `md`, `lg`. Example: `text-shadow-sm`.
- `text-shadow-none`: Removes text shadow (`text-shadow: none;`).
- `text-shadow-{color}`: Sets shadow color (`--tw-text-shadow-color`). Example: `text-shadow-sky-300`.
- `text-shadow-{color}/{opacity}`: Sets shadow color and opacity. Example: `text-shadow-cyan-500/50`.
- `text-shadow-(<custom-property>)`: Sets `text-shadow: var(<custom-property>);`.
- `text-shadow-(color:<custom-property>)`: Sets `--tw-text-shadow-color: var(<custom-property>);`.
- `text-shadow-[<value>]`: Sets `text-shadow: <value>;`. Example: `text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]`.
- **Responsive:** Use breakpoint prefixes like `md:text-shadow-lg`.
- **Customization:** Extend `text-shadow` and `color` theme keys.

## Stroke

> Utilities for styling the stroke of SVG elements.

- `stroke-{color}`: Sets `stroke` color using theme palette. Example: `stroke-cyan-500`.
- `stroke-none`: Sets `stroke: none;`.
- `stroke-inherit`: Sets `stroke: inherit;`.
- `stroke-current`: Sets `stroke: currentColor;`. Useful for inheriting text color.
- `stroke-transparent`: Sets `stroke: transparent;`.
- `stroke-(<custom-property>)`: Sets `stroke: var(<custom-property>);`.
- `stroke-[<color>]`: Sets `stroke: <color>;`. Example: `stroke-[#243c5a]`.
- **Responsive:** Use breakpoint prefixes like `md:stroke-cyan-700`.
- **Customization:** Extend the `color` theme key.

## Width

> Utilities for setting the width of an element.

- `w-<number>`: Sets width based on spacing scale (`width: calc(var(--spacing) * <number>);`). Example: `w-64`.
- `w-<fraction>`: Sets percentage-based width (`width: calc(<fraction> * 100%);`). Example: `w-1/2`.
- `w-{size}`: Sets width based on container scale (`width: var(--container-{size});`). Sizes: `3xs` to `7xl`. Example: `w-sm`.
- `w-auto`: Sets `width: auto;`.
- `w-px`: Sets `width: 1px;`.
- `w-full`: Sets `width: 100%;`.
- `w-screen`: Sets `width: 100vw;`.
- `w-{vp-unit}`: Sets width based on viewport units (`dvw`, `dvh`, `lvw`, `lvh`, `svw`, `svh`). Example: `w-dvw`.
- `w-min`: Sets `width: min-content;`.
- `w-max`: Sets `width: max-content;`.
- `w-fit`: Sets `width: fit-content;`.
- `w-(<custom-property>)`: Sets `width: var(<custom-property>);`.
- `w-[<value>]`: Sets `width: <value>;`. Example: `w-[5px]`.
- **Size Utility:** `size-*` sets _both_ width and height simultaneously. Uses same suffixes as `w-*` and `h-*`. Example: `size-16`, `size-full`, `size-[50px]`.
- **Responsive:** Use breakpoint prefixes like `md:w-full`.
- **Customization:** Extend the `spacing` or `container` theme keys.

## Flex Direction

> Utilities for controlling the direction of flex items.

- `flex-row`: Items align horizontally, LTR (`flex-direction: row;`).
- `flex-row-reverse`: Items align horizontally, RTL (`flex-direction: row-reverse;`). Use with `space-x-reverse`.
- `flex-col`: Items align vertically, top-to-bottom (`flex-direction: column;`).
- `flex-col-reverse`: Items align vertically, bottom-to-top (`flex-direction: column-reverse;`). Use with `space-y-reverse`.
- **Responsive:** Use breakpoint prefixes like `md:flex-row`.

## Backdrop Filter: Blur

> Utilities for applying backdrop blur filters to an element.

- `backdrop-blur-{size}`: Sets backdrop blur (`backdrop-filter: blur(var(--blur-{size}));`). Sizes: `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (24px), `2xl` (40px), `3xl` (64px). Example: `backdrop-blur-sm`.
- `backdrop-blur-none`: Removes backdrop blur (`backdrop-filter: ;`).
- `backdrop-blur-(<custom-property>)`: Sets `backdrop-filter: blur(var(<custom-property>));`.
- `backdrop-blur-[<value>]`: Sets `backdrop-filter: blur(<value>);`. Example: `backdrop-blur-[2px]`.
- **Responsive:** Use breakpoint prefixes like `md:backdrop-blur-lg`.
- **Customization:** Extend the `blur` theme key.

## Filter: Saturate

> Utilities for applying saturation filters to an element.

- `saturate-<number>`: Sets saturation percentage (`filter: saturate(<number>%);`). Example: `saturate-50`, `saturate-150`.
- `saturate-(<custom-property>)`: Sets `filter: saturate(var(<custom-property>));`.
- `saturate-[<value>]`: Sets `filter: saturate(<value>);`. Example: `saturate-[.25]`.
- **Responsive:** Use breakpoint prefixes like `md:saturate-150`.

## Justify Items

> Utilities for controlling how grid items are aligned along their inline axis.

- `justify-items-start`: Align grid items to the start (`justify-items: start;`).
- `justify-items-end`: Align grid items to the end (`justify-items: end;`).
- `justify-items-end-safe`: Align to end, falls back to start if overflow (`justify-items: safe end;`).
- `justify-items-center`: Align grid items to the center (`justify-items: center;`).
- `justify-items-center-safe`: Align to center, falls back to start if overflow (`justify-items: safe center;`).
- `justify-items-stretch`: Items stretch to fill grid area (`justify-items: stretch;`). Default.
- `justify-items-normal`: Default justification behavior (`justify-items: normal;`).
- **Responsive:** Use breakpoint prefixes like `md:justify-items-center`.

## Colors

> Using and customizing the color palette in Tailwind CSS projects.

- **Palette:** Includes 22 default colors (red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, plus slate, gray, zinc, neutral, stone, black, white). Each has 11 shades (50-950).
- **Usage:** Apply via utilities like `bg-sky-500`, `text-pink-700`, `border-gray-300`, etc.
- **Opacity:** Use slash syntax (`/`) for opacity. Example: `bg-black/75`, `text-blue-600/50`. Supports arbitrary values (`/[71.37%])` and variable shorthand (`/(--my-alpha-value)`).
- **Dark Mode:** Use `dark:` variant (`dark:bg-gray-800`).
- **CSS Variables:** Colors exposed as `--color-{name}-{shade}` (e.g., `--color-blue-500`). Reference in CSS (`var(--color-blue-500)`) or arbitrary values (`bg-[var(--color-gray-950)]`). Use `--alpha()` function to adjust opacity (`--alpha(var(--color-gray-950) / 10%)`).
- **Customization:**
  - Add colors: `@theme { --color-brand-primary: #ff00ff; }`.
  - Override defaults: `@theme { --color-blue-500: oklch(0.6 0.2 260); }`.
  - Disable defaults: Set namespace to initial (`--color-lime-*: initial;` or `--color-*: initial;` for all).
  - Reference variables: Use `@theme inline { --color-canvas: var(--acme-canvas-color); }`.

## Object Position

> Utilities for controlling how a replaced element's content should be positioned within its container.

- `object-{position}`: Sets `object-position`. Positions: `top-left`, `top`, `top-right`, `left`, `center`, `right`, `bottom-left`, `bottom`, `bottom-right`. Example: `object-center`.
- `object-(<custom-property>)`: Sets `object-position: var(<custom-property>);`.
- `object-[<value>]`: Sets `object-position: <value>;`. Example: `object-[25%_75%]`.
- **Usage:** Works with replaced elements like `<img>`, `<video>`. Often used with `object-fit` utilities.
- **Responsive:** Use breakpoint prefixes like `md:object-top`.

## Transition Property

> Utilities for controlling which CSS properties transition.

- `transition`: Transitions common properties (colors, opacity, shadow, transform) (`transition-property: color, background-color, ...;`). Includes default timing function and duration.
- `transition-all`: Transitions all properties (`transition-property: all;`).
- `transition-colors`: Transitions color-related properties.
- `transition-opacity`: Transitions `opacity`.
- `transition-shadow`: Transitions `box-shadow`.
- `transition-transform`: Transitions `transform`, `translate`, `scale`, `rotate`.
- `transition-none`: No properties transition (`transition-property: none;`).
- `transition-(<custom-property>)`: Sets `transition-property: var(<custom-property>);`.
- `transition-[<value>]`: Sets `transition-property: <value>;`. Example: `transition-[height]`.
- **Note:** All except `transition-none` include default timing function (`--default-transition-timing-function`) and duration (`--default-transition-duration`).
- **Reduced Motion:** Use `motion-safe:` and `motion-reduce:` variants.
- **Responsive:** Use breakpoint prefixes like `md:transition-all`.

## Overflow

> Utilities for controlling how an element handles content that is too large for the container.

- `overflow-auto`: Adds scrollbars only if content overflows (`overflow: auto;`).
- `overflow-hidden`: Clips overflowing content, no scrollbars (`overflow: hidden;`).
- `overflow-clip`: Clips overflowing content, stricter than hidden (`overflow: clip;`).
- `overflow-visible`: Allows content to overflow (`overflow: visible;`). Default.
- `overflow-scroll`: Always adds scrollbars, even if not needed (`overflow: scroll;`).
- `overflow-x-{keyword}`, `overflow-y-{keyword}`: Controls overflow on a single axis. Keywords: `auto`, `hidden`, `clip`, `visible`, `scroll`. Example: `overflow-x-auto`, `overflow-y-scroll`.
- **Responsive:** Use breakpoint prefixes like `md:overflow-scroll`.

## Align Items

> Utilities for controlling how flex and grid items are positioned along a container's cross axis.

- `items-start`: Align items to the start (`align-items: flex-start;`).
- `items-end`: Align items to the end (`align-items: flex-end;`).
- `items-end-safe`: Align to end, falls back to start if overflow (`align-items: safe flex-end;`).
- `items-center`: Align items to the center (`align-items: center;`).
- `items-center-safe`: Align to center, falls back to start if overflow (`align-items: safe center;`).
- `items-baseline`: Align items by their baseline (`align-items: baseline;`).
- `items-baseline-last`: Align items by their _last_ baseline (`align-items: last baseline;`).
- `items-stretch`: Stretch items to fill cross axis (`align-items: stretch;`). Default.
- **Responsive:** Use breakpoint prefixes like `md:items-center`.

## Forced Color Adjust

> Utilities for opting in and out of forced colors.

- `forced-color-adjust-auto`: Element adheres to forced colors mode (`forced-color-adjust: auto;`). Default.
- `forced-color-adjust-none`: Opts element out of forced colors mode (`forced-color-adjust: none;`). Useful for preserving specific colors (e.g., color swatches) that would otherwise be overridden.
- **Usage:** Combine with `forced-colors:` variant for conditional styling in forced colors mode.
- **Responsive:** Use breakpoint prefixes like `lg:forced-color-adjust-auto`.

## Place Self

> Utilities for controlling how an individual item is justified and aligned at the same time.

- `place-self-auto`: Align based on container's `place-items` (`place-self: auto;`).
- `place-self-start`: Align item to start on both axes (`place-self: start;`).
- `place-self-end`: Align item to end on both axes (`place-self: end;`).
- `place-self-end-safe`: Align to end, falls back to start if overflow (`place-self: safe end;`).
- `place-self-center`: Align item to center on both axes (`place-self: center;`).
- `place-self-center-safe`: Align to center, falls back to start if overflow (`place-self: safe center;`).
- `place-self-stretch`: Stretch item on both axes (`place-self: stretch;`).
- **Responsive:** Use breakpoint prefixes like `md:place-self-end`.

## Backdrop Filter: Brightness

> Utilities for applying backdrop brightness filters to an element.

- `backdrop-brightness-<number>`: Sets backdrop brightness (`backdrop-filter: brightness(<number>%);`). Example: `backdrop-brightness-50`, `backdrop-brightness-150`.
- `backdrop-brightness-(<custom-property>)`: Sets `backdrop-filter: brightness(var(<custom-property>));`.
- `backdrop-brightness-[<value>]`: Sets `backdrop-filter: brightness(<value>);`. Example: `backdrop-brightness-[1.75]`.
- **Responsive:** Use breakpoint prefixes like `md:backdrop-brightness-150`.

## Cursor

> Utilities for controlling the cursor style when hovering over an element.

- `cursor-{type}`: Sets `cursor`. Types include: `auto`, `default`, `pointer`, `wait`, `text`, `move`, `help`, `not-allowed`, `none`, `context-menu`, `progress`, `cell`, `crosshair`, `vertical-text`, `alias`, `copy`, `no-drop`, `grab`, `grabbing`, `all-scroll`, resize cursors (`col-resize`, `row-resize`, `n-resize`, `e-resize`, `s-resize`, `w-resize`, `ne-resize`, `nw-resize`, `se-resize`, `sw-resize`, `ew-resize`, `ns-resize`, `nesw-resize`, `nwse-resize`), zoom cursors (`zoom-in`, `zoom-out`). Example: `cursor-pointer`.
- `cursor-(<custom-property>)`: Sets `cursor: var(<custom-property>);`.
- `cursor-[<value>]`: Sets `cursor: <value>;`. Example: `cursor-[url(hand.cur),_pointer]`.
- **Responsive:** Use breakpoint prefixes like `md:cursor-auto`.

## Background Color

> Utilities for controlling an element's background color.

- `bg-{color}`: Sets `background-color` using theme palette. Example: `bg-indigo-500`.
- `bg-inherit`: Sets `background-color: inherit;`.
- `bg-current`: Sets `background-color: currentColor;`.
- `bg-transparent`: Sets `background-color: transparent;`.
- `bg-{color}/{opacity}`: Sets background color with opacity. Example: `bg-sky-500/75`.
- `bg-(<custom-property>)`: Sets `background-color: var(<custom-property>);`.
- `bg-[<value>]`: Sets `background-color: <value>;`. Example: `bg-[#50d71e]`.
- **States:** Apply conditionally using variants like `hover:bg-fuchsia-500`.
- **Responsive:** Use breakpoint prefixes like `md:bg-green-500`.
- **Customization:** Extend the `color` theme key.

## Grid Auto Flow

> Utilities for controlling how elements in a grid are auto-placed.

- `grid-flow-row`: Auto-placement fills rows (`grid-auto-flow: row;`). Default.
- `grid-flow-col`: Auto-placement fills columns (`grid-auto-flow: column;`).
- `grid-flow-dense`: Uses "dense" packing algorithm to fill holes (`grid-auto-flow: dense;`).
- `grid-flow-row-dense`: Fills rows using dense packing (`grid-auto-flow: row dense;`).
- `grid-flow-col-dense`: Fills columns using dense packing (`grid-auto-flow: column dense;`).
- **Responsive:** Use breakpoint prefixes like `md:grid-flow-row`.

## Place Items

> Utilities for controlling how items are justified and aligned at the same time.

- `place-items-start`: Align items to start on both axes (`place-items: start;`).
- `place-items-end`: Align items to end on both axes (`place-items: end;`).
- `place-items-end-safe`: Align to end, falls back to start if overflow (`place-items: safe end;`).
- `place-items-center`: Align items to center on both axes (`place-items: center;`).
- `place-items-center-safe`: Align to center, falls back to start if overflow (`place-items: safe center;`).
- `place-items-baseline`: Align items along baseline (`place-items: baseline;`).
- `place-items-stretch`: Stretch items to fill grid area on both axes (`place-items: stretch;`). Default.
- **Responsive:** Use breakpoint prefixes like `md:place-items-center`.

## List Style Image

> Utilities for controlling the marker images for list items.

- `list-image-[<value>]`: Sets marker image (`list-style-image: <value>;`). Typically `url()`. Example: `list-image-[url(/img/checkmark.png)]`.
- `list-image-(<custom-property>)`: Sets `list-style-image: var(<custom-property>);`.
- `list-image-none`: Removes marker image (`list-style-image: none;`).
- **Responsive:** Use breakpoint prefixes like `md:list-image-[url(...)]`.

## Outline Offset

> Utilities for controlling the offset of an element's outline.

- `outline-offset-<number>`: Sets outline offset in px (`outline-offset: <number>px;`). Example: `outline-offset-2`.
- `-outline-offset-<number>`: Sets negative outline offset (`outline-offset: calc(<number>px * -1);`).
- `outline-offset-(<custom-property>)`: Sets `outline-offset: var(<custom-property>);`.
- `outline-offset-[<value>]`: Sets `outline-offset: <value>;`. Example: `outline-offset-[2vw]`.
- **Responsive:** Use breakpoint prefixes like `md:outline-offset-2`.

## Adding Custom Styles

> Best practices for adding your own custom styles in Tailwind projects.

- **Custom Theme:** Use `@theme` directive (see Theme Variables section).
- **Arbitrary Values:** Use `[...]` for one-off values (e.g., `top-[117px]`, `bg-[#bada55]`). Use `(...)` for CSS variable shorthand (`fill-(--my-brand-color)`). Use type hints (`text-(length:--my-var)`) for ambiguity.
- **Arbitrary Properties:** Use `[property:value]` for properties without utilities (e.g., `[mask-type:luminance]`). Works with variants.
- **Arbitrary Variants:** Use `[selector]:utility` for custom variants (e.g., `[&.is-dragging]:cursor-grabbing`, `[@supports(display:grid)]:grid`). Use `&` to position the generated class within the selector (`[:nth-of-type(3)_&]:block`).
- **Custom CSS:** Write plain CSS directly in your stylesheet.
- **Base Styles:** Add classes to `html`/`body` or use `@layer base { ... }` for element defaults (e.g., `h1 { font-size: var(--text-2xl); }`).
- **Component Classes:** Use `@layer components { ... }` for reusable component styles (e.g., `.btn`, `.card`). Utilities can override these.
- **Using Variants in CSS:** Use `@variant <name> { ... }` (e.g., `@variant dark { background: black; }`). Nest for multiple variants.
- **Adding Custom Utilities:** Use `@utility name { property: value; }` (e.g., `@utility content-auto { content-visibility: auto; }`). Supports functional utilities (`@utility tab-* { tab-size: --value(integer); }`) using `--value()` and `--modifier()` functions.

## Scale

> Utilities for scaling elements.

- `scale-<number>`: Scales on both X and Y axes by percentage (`scale: <number>% <number>%;`). Example: `scale-75`, `scale-150`.
- `-scale-<number>`: Negative scale on both axes.
- `scale-x-<number>`: Scales on X-axis only. Example: `scale-x-75`.
- `-scale-x-<number>`: Negative X-axis scale.
- `scale-y-<number>`: Scales on Y-axis only. Example: `scale-y-125`.
- `-scale-y-<number>`: Negative Y-axis scale.
- `scale-z-<number>`: Scales on Z-axis only. Requires `transform-3d`. Example: `scale-z-50`.
- `-scale-z-<number>`: Negative Z-axis scale.
- `scale-3d`: Explicitly sets X, Y, Z scale using CSS variables.
- `scale-none`: Removes scaling (`scale: none;`).
- Supports `(<custom-property>)` and `[<value>]` suffixes for all variants. Example: `scale-[1.7]`, `scale-x-(--my-scale)`.
- **States:** Apply conditionally using variants like `hover:scale-120`.
- **Responsive:** Use breakpoint prefixes like `md:scale-100`.

## Grid Auto Columns

> Utilities for controlling the size of implicitly-created grid columns.

- `auto-cols-auto`: Implicit columns sized automatically (`grid-auto-columns: auto;`).
- `auto-cols-min`: Implicit columns sized to `min-content`.
- `auto-cols-max`: Implicit columns sized to `max-content`.
- `auto-cols-fr`: Implicit columns sized to `minmax(0, 1fr)`.
- `auto-cols-(<custom-property>)`: Sets `grid-auto-columns: var(<custom-property>);`.
- `auto-cols-[<value>]`: Sets `grid-auto-columns: <value>;`. Example: `auto-cols-[minmax(0,2fr)]`.
- **Responsive:** Use breakpoint prefixes like `md:auto-cols-min`.

## Line Height (Leading)

> Utilities for controlling the leading, or line height, of an element.

- `leading-<number>`: Sets line height based on spacing scale (`line-height: calc(var(--spacing) * <number>);`). Example: `leading-6`.
- `leading-none`: Sets `line-height: 1;`.
- `leading-tight`: Sets `line-height: 1.25;`.
- `leading-snug`: Sets `line-height: 1.375;`.
- `leading-normal`: Sets `line-height: 1.5;`.
- `leading-relaxed`: Sets `line-height: 1.625;`.
- `leading-loose`: Sets `line-height: 2;`.
- `leading-(<custom-property>)`: Sets `line-height: var(<custom-property>);`.
- `leading-[<value>]`: Sets `line-height: <value>;`. Example: `leading-[1.5]`.
- **Combined:** Use `text-{size}/{leading}` to set font size and line height together. Example: `text-sm/6`.
- **Responsive:** Use breakpoint prefixes like `md:leading-6`.
- **Customization:** Extend the `spacing` or `leading` theme keys.

## Text Overflow

> Utilities for controlling how the text of an element overflows.

- `truncate`: Prevents wrapping, hides overflow, adds ellipsis (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`).
- `text-ellipsis`: Adds ellipsis to overflowing text (`text-overflow: ellipsis;`). Requires `overflow: hidden` and often `whitespace-nowrap`.
- `text-clip`: Clips text at the content area limit (`text-overflow: clip;`). Default browser behavior. Requires `overflow: hidden`.
- **Responsive:** Use breakpoint prefixes like `md:text-clip`.

## Mix Blend Mode

> Utilities for controlling how an element should blend with the background.

- `mix-blend-{mode}`: Sets `mix-blend-mode`. Modes include `normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosity`, `plus-darker`, `plus-lighter`. Example: `mix-blend-multiply`.
- **Isolation:** Use `isolate` utility on parent to prevent blending with elements behind the parent.
- **Responsive:** Use breakpoint prefixes like `md:mix-blend-overlay`.

## Backdrop Filter: Hue Rotate

> Utilities for applying backdrop hue-rotate filters to an element.

- `backdrop-hue-rotate-<number>`: Rotates backdrop hue by degrees (`backdrop-filter: hue-rotate(<number>deg);`). Example: `backdrop-hue-rotate-90`.
- `-backdrop-hue-rotate-<number>`: Negative rotation. Example: `-backdrop-hue-rotate-15`.
- `backdrop-hue-rotate-(<custom-property>)`: Sets `backdrop-filter: hue-rotate(var(<custom-property>));`.
- `backdrop-hue-rotate-[<value>]`: Sets `backdrop-filter: hue-rotate(<value>);`. Example: `backdrop-hue-rotate-[3.142rad]`.
- **Responsive:** Use breakpoint prefixes like `md:backdrop-hue-rotate-0`.

## Mask Composite

> Utilities for controlling how multiple masks are combined together.

- `mask-add`: Adds mask layers (`mask-composite: add;`).
- `mask-subtract`: Subtracts mask layers (`mask-composite: subtract;`).
- `mask-intersect`: Intersects mask layers (`mask-composite: intersect;`). Default for linear/radial/conic mask utilities.
- `mask-exclude`: Excludes mask layers (`mask-composite: exclude;`).
- **Responsive:** Use breakpoint prefixes like `md:mask-subtract`.

## Background Clip

> Utilities for controlling the bounding box of an element's background.

- `bg-clip-border`: Background extends to the outside edge of the border (`background-clip: border-box;`). Default.
- `bg-clip-padding`: Background extends to the inside edge of the border (`background-clip: padding-box;`).
- `bg-clip-content`: Background extends only to the edge of the content box (`background-clip: content-box;`).
- `bg-clip-text`: Background is clipped to the foreground text (`background-clip: text;`). Often used with `text-transparent` and a gradient background.
- **Responsive:** Use breakpoint prefixes like `md:bg-clip-padding`.

## Backdrop Filter: Saturate

> Utilities for applying backdrop saturation filters to an element.

- `backdrop-saturate-<number>`: Sets backdrop saturation percentage (`backdrop-filter: saturate(<number>%);`). Example: `backdrop-saturate-50`, `backdrop-saturate-200`.
- `backdrop-saturate-(<custom-property>)`: Sets `backdrop-filter: saturate(var(<custom-property>));`.
- `backdrop-saturate-[<value>]`: Sets `backdrop-filter: saturate(<value>);`. Example: `backdrop-saturate-[.25]`.
- **Responsive:** Use breakpoint prefixes like `md:backdrop-saturate-150`.

## Overflow Wrap

> Utilities for controlling line breaks within words in an overflowing element.

- `wrap-normal`: Normal word breaking (`overflow-wrap: normal;`). Default.
- `wrap-break-word`: Allows breaks between letters if needed (`overflow-wrap: break-word;`). Does not affect intrinsic sizing.
- `wrap-anywhere`: Allows breaks anywhere, affects intrinsic sizing (`overflow-wrap: anywhere;`). Useful in flex containers to prevent overflow without `min-width: 0`.
- **Responsive:** Use breakpoint prefixes like `md:wrap-break-word`.

## Hyphens

> Utilities for controlling how words should be hyphenated.

- `hyphens-none`: Prevents hyphenation, even with `&shy;` (`hyphens: none;`).
- `hyphens-manual`: Hyphenates only at `&shy;` (`hyphens: manual;`). Default browser behavior.
- `hyphens-auto`: Allows browser to automatically hyphenate based on language (`hyphens: auto;`). Requires `lang` attribute. `&shy;` is preferred over automatic points.
- **Responsive:** Use breakpoint prefixes like `md:hyphens-auto`.

## Opacity

> Utilities for controlling the opacity of an element.

- `opacity-<number>`: Sets opacity percentage (`opacity: <number>%;`). Example: `opacity-75`, `opacity-25`.
- `opacity-(<custom-property>)`: Sets `opacity: var(<custom-property>);`.
- `opacity-[<value>]`: Sets `opacity: <value>;`. Example: `opacity-[.67]`.
- **States:** Apply conditionally using variants like `disabled:opacity-75`.
- **Responsive:** Use breakpoint prefixes like `md:opacity-100`.

## Filter: Sepia

> Utilities for applying sepia filters to an element.

- `sepia`: Sets 100% sepia (`filter: sepia(100%);`).
- `sepia-<number>`: Sets sepia percentage (`filter: sepia(<number>%);`). Example: `sepia-50`. `sepia-0` removes effect.
- `sepia-(<custom-property>)`: Sets `filter: sepia(var(<custom-property>));`.
- `sepia-[<value>]`: Sets `filter: sepia(<value>);`. Example: `sepia-[.25]`.
- **Responsive:** Use breakpoint prefixes like `md:sepia-0`.

## Vertical Align

> Utilities for controlling the vertical alignment of an inline or table-cell box.

- `align-baseline`: Align baseline with parent's baseline (`vertical-align: baseline;`).
- `align-top`: Align top with top of the line (`vertical-align: top;`).
- `align-middle`: Align middle with parent baseline + half x-height (`vertical-align: middle;`).
- `align-bottom`: Align bottom with bottom of the line (`vertical-align: bottom;`).
- `align-text-top`: Align top with top of parent's font (`vertical-align: text-top;`).
- `align-text-bottom`: Align bottom with bottom of parent's font (`vertical-align: text-bottom;`).
- `align-sub`: Align as subscript (`vertical-align: sub;`).
- `align-super`: Align as superscript (`vertical-align: super;`).
- `align-(<custom-property>)`: Sets `vertical-align: var(<custom-property>);`.
- `align-[<value>]`: Sets `vertical-align: <value>;`. Example: `align-[4px]`.
- **Responsive:** Use breakpoint prefixes like `md:align-top`.

## Font Variant Numeric

> Utilities for controlling the variant of numbers.

- `normal-nums`: Resets numeric variants (`font-variant-numeric: normal;`).
- `ordinal`: Enables ordinal glyphs (1st, 2nd) (`font-variant-numeric: ordinal;`).
- `slashed-zero`: Enables zero with a slash (`font-variant-numeric: slashed-zero;`).
- `lining-nums`: Use baseline-aligned figures (`font-variant-numeric: lining-nums;`).
- `oldstyle-nums`: Use figures with descenders (`font-variant-numeric: oldstyle-nums;`).
- `proportional-nums`: Use figures with proportional widths (`font-variant-numeric: proportional-nums;`).
- `tabular-nums`: Use figures with uniform/tabular widths (`font-variant-numeric: tabular-nums;`).
- `diagonal-fractions`: Use diagonal fractions (1/2) (`font-variant-numeric: diagonal-fractions;`).
- `stacked-fractions`: Use stacked fractions (`font-variant-numeric: stacked-fractions;`). Requires font support.
- **Usage:** Utilities are composable (e.g., `slashed-zero tabular-nums`). Only work if the font supports the feature.
- **Responsive:** Use breakpoint prefixes like `md:tabular-nums`.

## List Style Position

> Utilities for controlling the position of bullets and numbers in lists.

- `list-inside`: Markers are inside the list item, text indents (`list-style-position: inside;`).
- `list-outside`: Markers are outside the list item, text does not indent (`list-style-position: outside;`). Default.
- **Responsive:** Use breakpoint prefixes like `md:list-inside`.

## Background Origin

> Utilities for controlling how an element's background is positioned relative to borders, padding, and content.

- `bg-origin-border`: Background relative to border box (`background-origin: border-box;`). Default.
- `bg-origin-padding`: Background relative to padding box (`background-origin: padding-box;`).
- `bg-origin-content`: Background relative to content box (`background-origin: content-box;`).
- **Responsive:** Use breakpoint prefixes like `md:bg-origin-padding`.

## Perspective

> Utilities for controlling an element's perspective when placed in 3D space.

- `perspective-{amount}`: Sets perspective distance (`perspective: var(--perspective-{amount}));`). Amounts: `dramatic` (100px), `near` (300px), `normal` (500px), `midrange` (800px), `distant` (1200px). Example: `perspective-normal`.
- `perspective-none`: Removes perspective (`perspective: none;`).
- `perspective-(<custom-property>)`: Sets `perspective: var(<custom-property>);`.
- `perspective-[<value>]`: Sets `perspective: <value>;`. Example: `perspective-[750px]`.
- **Usage:** Applied to the parent container of 3D transformed elements. Affects how "close" the vanishing point appears.
- **Responsive:** Use breakpoint prefixes like `md:perspective-dramatic`.
- **Customization:** Extend the `perspective` theme key.

## Text Indent

> Utilities for controlling the amount of empty space shown before text in a block.

- `indent-<number>`: Sets text indent based on spacing scale (`text-indent: calc(var(--spacing) * <number>);`). Example: `indent-8`.
- `-indent-<number>`: Negative indent. Example: `-indent-8`.
- `indent-px`: Sets `text-indent: 1px;`.
- `-indent-px`: Sets `text-indent: -1px;`.
- `indent-(<custom-property>)`: Sets `text-indent: var(<custom-property>);`.
- `indent-[<value>]`: Sets `text-indent: <value>;`. Example: `indent-[50%]`.
- **Responsive:** Use breakpoint prefixes like `md:indent-8`.

## Mask Type

> Utilities for controlling how an SVG mask is interpreted.

- `mask-type-alpha`: Uses alpha channel for mask visibility (`mask-type: alpha;`).
- `mask-type-luminance`: Uses luminance value for mask visibility (`mask-type: luminance;`). Grayscale masks recommended for predictable results.
- **Usage:** Applies to SVG masks.
- **Responsive:** Use breakpoint prefixes like `md:mask-type-luminance`.

## Break Before

> Utilities for controlling how a column or page should break before an element.

- `break-before-auto`: Default break behavior.
- `break-before-avoid`: Avoid break before element.
- `break-before-all`: Force break before element (for columns/pages).
- `break-before-avoid-page`: Avoid page break before element.
- `break-before-page`: Force page break before element.
- `break-before-left`: Force break to next left page.
- `break-before-right`: Force break to next right page.
- `break-before-column`: Force column break before element.
- **Responsive:** Use breakpoint prefixes like `md:break-before-auto`.

## Border Style

> Utilities for controlling the style of an element's borders.

- `border-{style}`: Sets `border-style`. Styles: `solid`, `dashed`, `dotted`, `double`, `hidden`, `none`. Example: `border-dashed`.
- **Dividers:**
  - `divide-{style}`: Sets border style between child elements. Styles: `solid`, `dashed`, `dotted`, `double`, `hidden`, `none`. Example: `divide-dashed`.
- **Responsive:** Use breakpoint prefixes like `md:border-dotted`.

## Text Transform

> Utilities for controlling the capitalization of text.

- `uppercase`: Transforms text to uppercase (`text-transform: uppercase;`).
- `lowercase`: Transforms text to lowercase (`text-transform: lowercase;`).
- `capitalize`: Capitalizes the first letter of each word (`text-transform: capitalize;`).
- `normal-case`: Preserves original casing (`text-transform: none;`). Useful for resetting capitalization.
- **Responsive:** Use breakpoint prefixes like `md:uppercase`.

## White Space

> Utilities for controlling an element's white-space property.

- `whitespace-normal`: Normal wrapping, collapses whitespace/newlines. Default.
- `whitespace-nowrap`: Prevents wrapping, collapses whitespace/newlines.
- `whitespace-pre`: Preserves whitespace/newlines, no wrapping.
- `whitespace-pre-line`: Preserves newlines, collapses spaces, wraps normally.
- `whitespace-pre-wrap`: Preserves whitespace/newlines, wraps normally.
- `whitespace-break-spaces`: Like `pre-wrap`, but trailing spaces wrap instead of hanging.
- **Responsive:** Use breakpoint prefixes like `md:whitespace-normal`.

## Appearance

> Utilities for suppressing native form control styling.

- `appearance-none`: Resets browser-specific styling (`appearance: none;`). Useful for custom form controls.
- `appearance-auto`: Restores default browser styling (`appearance: auto;`). Useful for reverting `appearance-none` in specific modes (e.g., forced colors).
- **Responsive:** Use breakpoint prefixes like `md:appearance-none`.

## Text Decoration Color

> Utilities for controlling the color of text decorations.

- `decoration-{color}`: Sets `text-decoration-color` using theme palette. Example: `decoration-sky-500`.
- `decoration-inherit`, `decoration-current`, `decoration-transparent`: Specific color values.
- `decoration-{color}/{opacity}`: Sets decoration color with opacity. Example: `decoration-indigo-500/30`.
- `decoration-(<custom-property>)`: Sets `text-decoration-color: var(<custom-property>);`.
- `decoration-[<value>]`: Sets `text-decoration-color: <value>;`. Example: `decoration-[#50d71e]`.
- **States:** Apply conditionally using variants like `hover:decoration-pink-500`.
- **Responsive:** Use breakpoint prefixes like `md:decoration-blue-400`.
- **Customization:** Extend the `color` theme key.

## Field Sizing

> Utilities for controlling the sizing of form controls.

- `field-sizing-fixed`: Form control uses fixed size (`field-sizing: fixed;`). Default.
- `field-sizing-content`: Form control size adjusts based on content (`field-sizing: content;`).
- **Usage:** Primarily for `<textarea>` and `<input>`.
- **Responsive:** Use breakpoint prefixes like `md:field-sizing-fixed`.

## Border Spacing

> Utilities for controlling the spacing between table borders.

- `border-spacing-<number>`: Sets spacing on both axes (`border-spacing: calc(var(--spacing) * <number>);`). Requires `border-separate`. Example: `border-spacing-2`.
- `border-spacing-x-<number>`: Sets horizontal spacing. Example: `border-spacing-x-3`.
- `border-spacing-y-<number>`: Sets vertical spacing.
- Supports `(<custom-property>)` and `[<value>]` suffixes. Example: `border-spacing-[7px]`, `border-spacing-x-(--my-space)`.
- **Responsive:** Use breakpoint prefixes like `md:border-spacing-4`.
- **Customization:** Extend the `spacing` theme key.

## Text Decoration Line

> Utilities for controlling the decoration of text.

- `underline`: Underlines text (`text-decoration-line: underline;`).
- `overline`: Overlines text (`text-decoration-line: overline;`).
- `line-through`: Strikes through text (`text-decoration-line: line-through;`).
- `no-underline`: Removes decoration (`text-decoration-line: none;`).
- **States:** Apply conditionally using variants like `hover:underline`.
- **Responsive:** Use breakpoint prefixes like `md:underline`.

## Mask Mode

> Utilities for controlling an element's mask mode.

- `mask-alpha`: Uses alpha channel for mask visibility (`mask-mode: alpha;`).
- `mask-luminance`: Uses luminance value for mask visibility (`mask-mode: luminance;`). Grayscale masks recommended.
- `mask-match`: Uses luminance if mask is luminance-based, alpha otherwise (`mask-mode: match-source;`).
- **Responsive:** Use breakpoint prefixes like `md:mask-luminance`.

## Scroll Snap Align

> Utilities for controlling the scroll snap alignment of an element.

- `snap-start`: Snaps element's start edge to container's snap port (`scroll-snap-align: start;`).
- `snap-end`: Snaps element's end edge (`scroll-snap-align: end;`).
- `snap-center`: Snaps element's center (`scroll-snap-align: center;`).
- `snap-align-none`: No snap alignment (`scroll-snap-align: none;`).
- **Usage:** Applied to child items within a scroll snap container (`snap-x`/`snap-y`). Often used with `scroll-m-*`.
- **Responsive:** Use breakpoint prefixes like `md:snap-start`.

## Mask Size

> Utilities for controlling the size of an element's mask image.

- `mask-auto`: Uses default mask image size (`mask-size: auto;`).
- `mask-cover`: Scales mask to cover the layer (`mask-size: cover;`).
- `mask-contain`: Scales mask to fit within the layer (`mask-size: contain;`).
- `mask-size-(<custom-property>)`: Sets `mask-size: var(<custom-property>);`.
- `mask-size-[<value>]`: Sets `mask-size: <value>;`. Example: `mask-size-[auto_100px]`.
- **Responsive:** Use breakpoint prefixes like `md:mask-contain`.

## Backdrop Filter: Sepia

> Utilities for applying backdrop sepia filters to an element.

- `backdrop-sepia`: Sets 100% backdrop sepia (`backdrop-filter: sepia(100%);`).
- `backdrop-sepia-<number>`: Sets backdrop sepia percentage (`backdrop-filter: sepia(<number>%);`). Example: `backdrop-sepia-50`. `backdrop-sepia-0` removes effect.
- `backdrop-sepia-(<custom-property>)`: Sets `backdrop-filter: sepia(var(<custom-property>));`.
- `backdrop-sepia-[<value>]`: Sets `backdrop-filter: sepia(<value>);`. Example: `backdrop-sepia-[.25]`.
- **Responsive:** Use breakpoint prefixes like `md:backdrop-sepia-0`.

## Grid Template Rows

> Utilities for specifying the rows in a grid layout.

- `grid-rows-<number>`: Creates a grid with `<number>` equal-height rows (`grid-template-rows: repeat(<number>, minmax(0, 1fr));`). Example: `grid-rows-4`.
- `grid-rows-none`: Sets `grid-template-rows: none;`.
- `grid-rows-subgrid`: Adopts row tracks from parent grid (`grid-template-rows: subgrid;`).
- `grid-rows-[<value>]`: Sets specific row tracks (`grid-template-rows: <value>;`). Example: `grid-rows-[200px_minmax(900px,1fr)_100px]`.
- `grid-rows-(<custom-property>)`: Sets `grid-template-rows: var(<custom-property>);`.
- **Responsive:** Use breakpoint prefixes like `md:grid-rows-6`.

## Resize

> Utilities for controlling how an element can be resized.

- `resize-none`: Element cannot be resized (`resize: none;`).
- `resize`: Element is resizable horizontally and vertically (`resize: both;`).
- `resize-y`: Element is vertically resizable (`resize: vertical;`).
- `resize-x`: Element is horizontally resizable (`resize: horizontal;`).
- **Usage:** Often applied to `<textarea>`.
- **Responsive:** Use breakpoint prefixes like `md:resize`.

## Break Inside

> Utilities for controlling how a column or page should break within an element.

- `break-inside-auto`: Default break behavior.
- `break-inside-avoid`: Avoid break inside element.
- `break-inside-avoid-page`: Avoid page break inside element.
- `break-inside-avoid-column`: Avoid column break inside element.
- **Responsive:** Use breakpoint prefixes like `md:break-inside-auto`.

## Text Underline Offset

> Utilities for controlling the offset of a text underline.

- `underline-offset-<number>`: Sets underline offset in px (`text-underline-offset: <number>px;`). Example: `underline-offset-2`.
- `-underline-offset-<number>`: Sets negative offset.
- `underline-offset-auto`: Default browser offset (`text-underline-offset: auto;`).
- `underline-offset-(<custom-property>)`: Sets `text-underline-offset: var(<custom-property>);`.
- `underline-offset-[<value>]`: Sets `text-underline-offset: <value>;`. Example: `underline-offset-[3px]`.
- **Usage:** Requires an `underline` utility.
- **Responsive:** Use breakpoint prefixes like `md:underline-offset-4`.

## Height

> Utilities for setting the height of an element.

- `h-<number>`: Sets height based on spacing scale (`height: calc(var(--spacing) * <number>);`). Example: `h-64`.
- `h-<fraction>`: Sets percentage-based height (`height: calc(<fraction> * 100%);`). Example: `h-1/2`.
- `h-auto`: Sets `height: auto;`.
- `h-px`: Sets `height: 1px;`.
- `h-full`: Sets `height: 100%;`.
- `h-screen`: Sets `height: 100vh;`.
- `h-{vp-unit}`: Sets height based on viewport units (`dvh`, `dvw`, `lvh`, `lvw`, `svh`, `svw`). Example: `h-dvh`.
- `h-min`: Sets `height: min-content;`.
- `h-max`: Sets `height: max-content;`.
- `h-fit`: Sets `height: fit-content;`.
- `h-(<custom-property>)`: Sets `height: var(<custom-property>);`.
- `h-[<value>]`: Sets `height: <value>;`. Example: `h-[32rem]`.
- **Size Utility:** `size-*` sets _both_ width and height simultaneously. Uses same suffixes as `w-*` and `h-*`. Example: `size-16`, `size-full`, `size-[50px]`.
- **Responsive:** Use breakpoint prefixes like `md:h-full`.
- **Customization:** Extend the `spacing` theme key.

## Scroll Margin

> Utilities for controlling the scroll offset around items in a snap container.

- `scroll-m-<number>`: Sets scroll margin on all sides. Example: `scroll-m-4`.
- `scroll-mt-<number>`, `scroll-mr-<number>`, `scroll-mb-<number>`, `scroll-ml-<number>`: Sets scroll margin on one side. Example: `scroll-ml-6`.
- `scroll-mx-<number>`: Sets horizontal scroll margin.
- `scroll-my-<number>`: Sets vertical scroll margin.
- `scroll-ms-<number>`: Sets scroll margin start (logical property).
- `scroll-me-<number>`: Sets scroll margin end (logical property).
- `-scroll-m-<number>`, `-scroll-mt-<number>`, etc.: Sets negative scroll margin. Example: `-scroll-ml-6`.
- Supports `(<custom-property>)` and `[<value>]` suffixes. Example: `scroll-ml-[24rem]`, `scroll-me-(--my-margin)`.
- **Usage:** Defines the outset from the edges of the scrollport used for snapping.
- **Responsive:** Use breakpoint prefixes like `md:scroll-m-0`.
- **Customization:** Extend the `spacing` theme key.

## Scroll Padding

> Utilities for controlling an element's scroll offset within a snap container.

- `scroll-p-<number>`: Sets scroll padding on all sides.
- `scroll-pt-<number>`, `scroll-pr-<number>`, `scroll-pb-<number>`, `scroll-pl-<number>`: Sets scroll padding on one side. Example: `scroll-pl-6`.
- `scroll-px-<number>`: Sets horizontal scroll padding.
- `scroll-py-<number>`: Sets vertical scroll padding.
- `scroll-ps-<number>`: Sets scroll padding start (logical property). Example: `scroll-ps-6`.
- `scroll-pe-<number>`: Sets scroll padding end (logical property).
- `-scroll-p-<number>`, `-scroll-pt-<number>`, etc.: Sets negative scroll padding. Example: `-scroll-ps-6`.
- Supports `(<custom-property>)` and `[<value>]` suffixes. Example: `scroll-p-[24rem]`, `scroll-px-(--my-padding)`.
- **Usage:** Defines the offset from the edges of the scrollport used for snapping.
- **Responsive:** Use breakpoint prefixes like `md:scroll-p-0`.
- **Customization:** Extend the `spacing` theme key.

## Background Blend Mode

> Utilities for controlling how an element's background image should blend with its background color.

- `bg-blend-{mode}`: Sets `background-blend-mode`. Modes include `normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosity`, `plus-darker`, `plus-lighter`. Example: `bg-blend-multiply`.
- **Responsive:** Use breakpoint prefixes like `md:bg-blend-darken`.

## Accent Color

> Utilities for controlling the accented color of a form control.

- `accent-{color}`: Sets `accent-color` using theme palette. Example: `accent-pink-500`.
- `accent-inherit`, `accent-current`, `accent-transparent`: Specific color values.
- `accent-{color}/{opacity}`: Sets accent color with opacity (Firefox only). Example: `accent-purple-500/75`.
- `accent-(<custom-property>)`: Sets `accent-color: var(<custom-property>);`.
- `accent-[<value>]`: Sets `accent-color: <value>;`. Example: `accent-[#50d71e]`.
- **Usage:** Styles native checkboxes, radio buttons, range inputs, progress bars.
- **States:** Apply conditionally using variants like `hover:accent-pink-500`.
- **Responsive:** Use breakpoint prefixes like `md:accent-pink-500`.
- **Customization:** Extend the `color` theme key.

## Min Width

> Utilities for setting the minimum width of an element.

- `min-w-<number>`: Sets min width based on spacing scale (`min-width: calc(var(--spacing) * <number>);`). Example: `min-w-64`.
- `min-w-<fraction>`: Sets percentage-based min width (`min-width: calc(<fraction> * 100%);`). Example: `min-w-1/2`.
- `min-w-{size}`: Sets min width based on container scale (`min-width: var(--container-{size});`). Sizes: `3xs` to `7xl`. Example: `min-w-xs`.
- `min-w-auto`: Sets `min-width: auto;`.
- `min-w-px`: Sets `min-width: 1px;`.
- `min-w-full`: Sets `min-width: 100%;`.
- `min-w-screen`: Sets `min-width: 100vw;`.
- `min-w-{vp-unit}`: Sets min width based on viewport units (`dvw`, `dvh`, `lvw`, `lvh`, `svw`, `svh`). Example: `min-w-dvw`.
- `min-w-min`: Sets `min-width: min-content;`.
- `min-w-max`: Sets `min-width: max-content;`.
- `min-w-fit`: Sets `min-width: fit-content;`.
- `min-w-(<custom-property>)`: Sets `min-width: var(<custom-property>);`.
- `min-w-[<value>]`: Sets `min-width: <value>;`. Example: `min-w-[220px]`.
- **Responsive:** Use breakpoint prefixes like `lg:min-w-0`.
- **Customization:** Extend the `spacing` or `container` theme keys.

## Filter: Invert

> Utilities for applying invert filters to an element.

- `invert`: Sets 100% inversion (`filter: invert(100%);`).
- `invert-<number>`: Sets inversion percentage (`filter: invert(<number>%);`). Example: `invert-20`. `invert-0` removes effect.
- `invert-(<custom-property>)`: Sets `filter: invert(var(<custom-property>));`.
- `invert-[<value>]`: Sets `filter: invert(<value>);`. Example: `invert-[.25]`.
- **Responsive:** Use breakpoint prefixes like `md:invert-0`.

## Backdrop Filter: Grayscale

> Utilities for applying backdrop grayscale filters to an element.

- `backdrop-grayscale`: Sets 100% backdrop grayscale (`backdrop-filter: grayscale(100%);`).
- `backdrop-grayscale-<number>`: Sets backdrop grayscale percentage (`backdrop-filter: grayscale(<number>%);`). Example: `backdrop-grayscale-50`. `backdrop-grayscale-0` removes effect.
- `backdrop-grayscale-(<custom-property>)`: Sets `backdrop-filter: grayscale(var(<custom-property>));`.
- `backdrop-grayscale-[<value>]`: Sets `backdrop-filter: grayscale(<value>);`. Example: `backdrop-grayscale-[0.5]`.
- **Responsive:** Use breakpoint prefixes like `md:backdrop-grayscale-0`.

## Border Radius

> Utilities for controlling the border radius of an element.

- `rounded-{size}`: Sets border radius on all corners. Sizes: `xs` (v3 `sm`), `sm` (v3 `rounded`), `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`. Example: `rounded-lg`.
- `rounded-none`: Removes border radius (`border-radius: 0;`).
- `rounded-full`: Creates pill shapes/circles (`border-radius: calc(infinity * 1px);`).
- **Sides:**
  - `rounded-t-{size}`: Top corners.
  - `rounded-r-{size}`: Right corners.
  - `rounded-b-{size}`: Bottom corners.
  - `rounded-l-{size}`: Left corners.
  - `rounded-s-{size}`: Start corners (logical: top-left, bottom-left in LTR).
  - `rounded-e-{size}`: End corners (logical: top-right, bottom-right in LTR).
- **Corners:**
  - `rounded-tl-{size}`: Top-left.
  - `rounded-tr-{size}`: Top-right.
  - `rounded-br-{size}`: Bottom-right.
  - `rounded-bl-{size}`: Bottom-left.
  - `rounded-ss-{size}`: Start-start corner (logical: top-left in LTR).
  - `rounded-se-{size}`: Start-end corner (logical: top-right in LTR).
  - `rounded-es-{size}`: End-start corner (logical: bottom-left in LTR).
  - `rounded-ee-{size}`: End-end corner (logical: bottom-right in LTR).
- Supports `(<custom-property>)` and `[<value>]` suffixes. Example: `rounded-[2vw]`, `rounded-t-(--my-radius)`.
- **Responsive:** Use breakpoint prefixes like `md:rounded-lg`.
- **Customization:** Extend the `radius` theme key.

## Color Scheme

> Utilities for controlling the color scheme of an element.

- `scheme-normal`: No specific color scheme. Browser default.
- `scheme-light`: Hints element is designed for light mode.
- `scheme-dark`: Hints element is designed for dark mode.
- `scheme-light-dark`: Hints element supports both light and dark mode.
- `scheme-only-light`: Forces light mode rendering.
- `scheme-only-dark`: Forces dark mode rendering.
- **Usage:** Affects browser UI elements (scrollbars, form controls) and system colors (`CanvasText`, `Field`).
- **States:** Apply conditionally using variants like `dark:scheme-dark`.

## Filter

> Utilities for applying filters to an element.

- Combines individual filter utilities: `blur-*`, `brightness-*`, `contrast-*`, `drop-shadow-*`, `grayscale-*`, `hue-rotate-*`, `invert-*`, `saturate-*`, `sepia-*`. Example: `blur-xs grayscale`.
- `filter-none`: Removes all filters (`filter: none;`).
- `filter-(<custom-property>)`: Sets `filter: var(<custom-property>);`.
- `filter-[<value>]`: Sets `filter: <value>;`. Example: `filter-[url('filters.svg#filter-id')]`.
- **States:** Apply conditionally using variants like `hover:filter-none`.
- **Responsive:** Use breakpoint prefixes like `md:filter-none`.

## Mask Position

> Utilities for controlling the position of an element's mask image.

- `mask-{position}`: Sets `mask-position`. Positions: `top-left`, `top`, `top-right`, `left`, `center`, `right`, `bottom-left`, `bottom`, `bottom-right`. Example: `mask-center`.
- `mask-position-(<custom-property>)`: Sets `mask-position: var(<custom-property>);`.
- `mask-position-[<value>]`: Sets `mask-position: <value>;`. Example: `mask-position-[center_top_1rem]`.
- **Responsive:** Use breakpoint prefixes like `md:mask-top`.

## Flex Grow

> Utilities for controlling how flex items grow.

- `grow`: Allows item to grow to fill available space (`flex-grow: 1;`).
- `grow-0`: Prevents item from growing (`flex-grow: 0;`).
- `grow-<number>`: Sets specific grow factor (`flex-grow: <number>;`). Example: `grow-3`. Items grow proportionally.
- `grow-[<value>]`: Sets `flex-grow: <value>;`.
- `grow-(<custom-property>)`: Sets `flex-grow: var(<custom-property>);`. Example: `grow-[25vw]`.
- **Responsive:** Use breakpoint prefixes like `md:grow-0`.

## Text Decoration Style

> Utilities for controlling the style of text decorations.

- `decoration-{style}`: Sets `text-decoration-style`. Styles: `solid` (default), `double`, `dotted`, `dashed`, `wavy`. Example: `decoration-dashed`.
- **Usage:** Requires a line utility like `underline`.
- **Responsive:** Use breakpoint prefixes like `md:decoration-dashed`.

## Outline Style

> Utilities for controlling the style of an element's outline.

- `outline-{style}`: Sets `outline-style`. Styles: `solid`, `dashed`, `dotted`, `double`, `none`. Example: `outline-dashed`.
- `outline-hidden`: Hides browser outline but preserves it for forced colors mode (`outline: 2px solid transparent; outline-offset: 2px;`). Recommended over `outline-none` for accessibility if not providing custom focus styles.
- `outline-none`: Completely removes outline (`outline-style: none;`). Ensure custom focus styles are provided for accessibility.
- **Note:** `outline-solid` is implicitly applied by `outline-<number>` width utilities.
- **Responsive:** Use breakpoint prefixes like `md:outline-dashed`.

## Filter: Contrast

> Utilities for applying contrast filters to an element.

- `contrast-<number>`: Sets contrast percentage (`filter: contrast(<number>%);`). Example: `contrast-50`, `contrast-125`.
- `contrast-(<custom-property>)`: Sets `filter: contrast(var(<custom-property>));`.
- `contrast-[<value>]`: Sets `filter: contrast(<value>);`. Example: `contrast-[.25]`.
- **Responsive:** Use breakpoint prefixes like `md:contrast-150`.

## Object Fit

> Utilities for controlling how a replaced element's content should be resized.

- `object-contain`: Resizes content to fit within container, preserving aspect ratio (`object-fit: contain;`).
- `object-cover`: Resizes content to cover container, cropping if necessary, preserving aspect ratio (`object-fit: cover;`).
- `object-fill`: Stretches content to fit container, ignoring aspect ratio (`object-fit: fill;`).
- `object-none`: Displays content at original size, ignoring container size (`object-fit: none;`).
- `object-scale-down`: Displays content as `contain` if smaller than container, or `none` if larger (`object-fit: scale-down;`).
- **Usage:** Applies to replaced elements like `<img>`, `<video>`.
- **Responsive:** Use breakpoint prefixes like `md:object-cover`.

## Text Wrap

> Utilities for controlling how text wraps within an element.

- `text-wrap`: Normal wrapping at logical points (`text-wrap: wrap;`). Default.
- `text-nowrap`: Prevents wrapping (`text-wrap: nowrap;`).
- `text-balance`: Distributes text evenly across lines (`text-wrap: balance;`). Best for short blocks (~6 lines) like headings due to performance limits.
- `text-pretty`: Prevents orphans (single words on last line) (`text-wrap: pretty;`).
- **Responsive:** Use breakpoint prefixes like `md:text-balance`.

## Display

> Utilities for controlling the display box type of an element.

- **Basic:** `block`, `inline-block`, `inline`.
- **Flow Root:** `flow-root` (creates new block formatting context).
- **Flex:** `flex`, `inline-flex`.
- **Grid:** `grid`, `inline-grid`.
- **Contents:** `contents` (element is ignored, children act as direct children of parent).
- **Table:** `table`, `inline-table`, `table-caption`, `table-cell`, `table-column`, `table-column-group`, `table-footer-group`, `table-header-group`, `table-row-group`, `table-row`.
- **List Item:** `list-item`.
- **Hiding:**
  - `hidden`: Removes element from layout (`display: none;`).
  - `sr-only`: Hides element visually but keeps accessible to screen readers.
  - `not-sr-only`: Undoes `sr-only`.
- **Responsive:** Use breakpoint prefixes like `md:flex`.

## Text Color

> Utilities for controlling the text color of an element.

- `text-{color}`: Sets `color` using theme palette. Example: `text-blue-600`.
- `text-inherit`: Sets `color: inherit;`.
- `text-current`: Sets `color: currentColor;`.
- `text-transparent`: Sets `color: transparent;`.
- `text-{color}/{opacity}`: Sets text color with opacity. Example: `text-blue-600/75`.
- `text-(<custom-property>)`: Sets `color: var(<custom-property>);`.
- `text-[<value>]`: Sets `color: <value>;`. Example: `text-[#50d71e]`.
- **States:** Apply conditionally using variants like `hover:text-blue-600`.
- **Responsive:** Use breakpoint prefixes like `md:text-green-600`.
- **Customization:** Extend the `color` theme key.

## Place Content

> Utilities for controlling how content is justified and aligned at the same time.

- `place-content-center`: Packs items in center on both axes (`place-content: center;`).
- `place-content-center-safe`: Center alignment, falls back to start if overflow (`place-content: safe center;`).
- `place-content-start`: Packs items at start on both axes (`place-content: start;`).
- `place-content-end`: Packs items at end on both axes (`place-content: end;`).
- `place-content-end-safe`: End alignment, falls back to start if overflow (`place-content: safe end;`).
- `place-content-between`: Distributes items evenly on block axis, first/last rows at edges (`place-content: space-between;`).
- `place-content-around`: Distributes items evenly with equal space around each row (`place-content: space-around;`).
- `place-content-evenly`: Distributes items evenly with equal space between and around rows (`place-content: space-evenly;`).
- `place-content-baseline`: Aligns items along baseline (`place-content: baseline;`).
- `place-content-stretch`: Stretches items to fill grid area (`place-content: stretch;`).
- **Responsive:** Use breakpoint prefixes like `md:place-content-center`.

## Background Attachment

> Utilities for controlling how a background image behaves when scrolling.

- `bg-fixed`: Background is fixed relative to the viewport (`background-attachment: fixed;`).
- `bg-local`: Background scrolls with the element's content (`background-attachment: local;`).
- `bg-scroll`: Background scrolls with the viewport, not the element's content (`background-attachment: scroll;`). Default.
- **Responsive:** Use breakpoint prefixes like `md:bg-fixed`.

## Mask Clip

> Utilities for controlling the bounding box of an element's mask.

- `mask-clip-border`: Mask extends to the outside edge of the border (`mask-clip: border-box;`). Default.
- `mask-clip-padding`: Mask extends to the inside edge of the border (`mask-clip: padding-box;`).
- `mask-clip-content`: Mask extends only to the edge of the content box (`mask-clip: content-box;`).
- `mask-clip-fill`: Clips to object bounding box (`mask-clip: fill-box;`).
- `mask-clip-stroke`: Clips to stroke bounding box (`mask-clip: stroke-box;`).
- `mask-clip-view`: Clips to nearest SVG viewport (`mask-clip: view-box;`).
- `mask-no-clip`: No clipping (`mask-clip: no-clip;`).
- **Responsive:** Use breakpoint prefixes like `md:mask-clip-padding`.

## Filter: Drop Shadow

> Utilities for applying drop-shadow filters to an element.

- `drop-shadow-{size}`: Applies drop shadow filter. Sizes: `xs` (v3 `sm`), `sm` (v3 `drop-shadow`), `md`, `lg`, `xl`, `2xl`. Example: `drop-shadow-md`.
- `drop-shadow-none`: Removes drop shadow (`filter: drop-shadow(0 0 #0000);`).
- `drop-shadow-{color}`: Sets shadow color (`--tw-drop-shadow-color`). Example: `drop-shadow-indigo-500`.
- `drop-shadow-{color}/{opacity}`: Sets shadow color and opacity. Example: `drop-shadow-cyan-500/50`.
- `drop-shadow-(<custom-property>)`: Sets filter via CSS variable.
- `drop-shadow-(color:<custom-property>)`: Sets color via CSS variable.
- `drop-shadow-[<value>]`: Sets `filter: drop-shadow(<value>);`. Example: `drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]`.
- **Usage:** Useful for irregular shapes (text, SVG). Use `box-shadow` for regular elements.
- **Responsive:** Use breakpoint prefixes like `md:drop-shadow-xl`.
- **Customization:** Extend `drop-shadow` and `color` theme keys.

## Mask Repeat

> Utilities for controlling the repetition of an element's mask image.

- `mask-repeat`: Repeats mask image horizontally and vertically (`mask-repeat: repeat;`).
- `mask-no-repeat`: Prevents mask image repetition (`mask-repeat: no-repeat;`).
- `mask-repeat-x`: Repeats horizontally only (`mask-repeat: repeat-x;`).
- `mask-repeat-y`: Repeats vertically only (`mask-repeat: repeat-y;`).
- `mask-repeat-space`: Repeats without clipping, adding space if needed (`mask-repeat: space;`).
- `mask-repeat-round`: Repeats without clipping, stretching/compressing if needed (`mask-repeat: round;`).
- **Responsive:** Use breakpoint prefixes like `md:mask-repeat-x`.

## Transform Style

> Utilities for controlling if an elements children are placed in 3D space.

- `transform-flat`: Children are positioned in the 2D plane of the element (`transform-style: flat;`). Default.
- `transform-3d`: Children are positioned in 3D space (`transform-style: preserve-3d;`). Allows 3D transforms on children (like `translate-z-*`, `rotate-x-*`) to have visual depth.
- **Responsive:** Use breakpoint prefixes like `md:transform-flat`.

## Background Repeat

> Utilities for controlling the repetition of an element's background image.

- `bg-repeat`: Repeats background image horizontally and vertically (`background-repeat: repeat;`).
- `bg-no-repeat`: Prevents background image repetition (`background-repeat: no-repeat;`).
- `bg-repeat-x`: Repeats horizontally only (`background-repeat: repeat-x;`).
- `bg-repeat-y`: Repeats vertically only (`background-repeat: repeat-y;`).
- `bg-repeat-space`: Repeats without clipping, adding space if needed (`background-repeat: space;`).
- `bg-repeat-round`: Repeats without clipping, stretching/compressing if needed (`background-repeat: round;`).
- **Responsive:** Use breakpoint prefixes like `md:bg-repeat-x`.

## Gap

> Utilities for controlling gutters between grid and flexbox items.

- `gap-<number>`: Sets gap between rows and columns (`gap: calc(var(--spacing) * <value>);`). Example: `gap-4`.
- `gap-x-<number>`: Sets column gap only (`column-gap: calc(var(--spacing) * <value>);`). Example: `gap-x-8`.
- `gap-y-<number>`: Sets row gap only (`row-gap: calc(var(--spacing) * <value>);`). Example: `gap-y-4`.
- Supports `(<custom-property>)` and `[<value>]` suffixes. Example: `gap-[10vw]`, `gap-x-(--my-gap)`.
- **Responsive:** Use breakpoint prefixes like `md:gap-6`.

## Mask Image

> Utilities for controlling an element's mask image.

- `mask-[<value>]`: Sets `mask-image: <value>;`. Typically `url()` or gradients. Example: `mask-[url(/img/scribble.png)]`.
- `mask-(<custom-property>)`: Sets `mask-image: var(<custom-property>);`.
- `mask-none`: Removes mask image (`mask-image: none;`).
- **Linear Gradient Masks:**
  - `mask-{t|r|b|l}-{from|to}-{value}`: Creates linear gradient mask from one side. Value can be `<number>` (spacing scale), `<percentage>`, `<color>`, `(<custom-property>)`, `[<value>]`. Example: `mask-b-from-50%`, `mask-l-to-90%`.
  - `mask-{x|y}-{from|to}-{value}`: Creates linear gradient mask from two opposite sides (horizontal/vertical). Example: `mask-x-from-70%`. Uses `mask-composite: intersect`.
  - `mask-linear-<angle>`, `-mask-linear-<angle>`: Creates angled linear gradient mask. Use with `mask-linear-from/to`. Example: `mask-linear-50`.
- **Radial Gradient Masks:**
  - `mask-radial-from-{value}`, `mask-radial-to-{value}`: Sets start/end stops for radial gradient mask. Value can be `<number>`, `<percentage>`, `<color>`, `(<custom-property>)`, `[<value>]`. Example: `mask-radial-from-80%`.
  - `mask-radial-[<value>]`: Defines full radial gradient.
  - `mask-radial-{shape}`: Sets shape (`circle`, `ellipse`).
  - `mask-radial-{size}`: Sets size (`closest-corner`, `closest-side`, `farthest-corner`, `farthest-side`). Can use `[<size>]` or `[<size>_<size>]`.
  - `mask-radial-at-{position}`: Sets position (`top-left`, `top`, `top-right`, `left`, `center`, `right`, `bottom-left`, `bottom`, `bottom-right`).
- **Conic Gradient Masks:**
  - `mask-conic-from-{value}`, `mask-conic-to-{value}`: Sets start/end stops for conic gradient mask. Value can be `<number>`, `<percentage>`, `<color>`, `(<custom-property>)`, `[<value>]`. Example: `mask-conic-from-75%`.
  - `mask-conic-<angle>`, `-mask-conic-<angle>`: Sets start angle. Example: `mask-conic-180`.
- **Combining:** Gradient utilities can be combined. Default composite mode is `intersect`.
- **Responsive:** Use breakpoint prefixes like `md:mask-radial-from-50%`.
- **Customization:** Extend `color` theme key for gradient stops.

## Top / Right / Bottom / Left (Inset)

> Utilities for controlling the placement of positioned elements.

- `inset-<number>`, `inset-x-<number>`, `inset-y-<number>`: Sets position on all, horizontal, or vertical sides. Example: `inset-0`.
- `top-<number>`, `right-<number>`, `bottom-<number>`, `left-<number>`: Sets position on a single side. Example: `top-0`, `bottom-4`.
- `start-<number>`: Sets `inset-inline-start` (left in LTR, right in RTL). Example: `start-0`.
- `end-<number>`: Sets `inset-inline-end` (right in LTR, left in RTL). Example: `end-4`.
- **Values:** Supports `<number>` (spacing scale), `<fraction>` (percentage), `px`, `full` (100%), `auto`.
- **Negative Values:** Prefix utility with `-`. Example: `-top-4`, `-inset-x-full`.
- Supports `(<custom-property>)` and `[<value>]` suffixes. Example: `top-[3px]`, `inset-(--my-offset)`.
- **Usage:** Applies to elements with `position: absolute`, `fixed`, or `sticky`.
- **Responsive:** Use breakpoint prefixes like `md:top-6`.
- **Customization:** Extend the `spacing` theme key.

## Fill

> Utilities for styling the fill of SVG elements.

- `fill-{color}`: Sets `fill` color using theme palette. Example: `fill-blue-500`.
- `fill-none`: Sets `fill: none;`.
- `fill-inherit`: Sets `fill: inherit;`.
- `fill-current`: Sets `fill: currentColor;`. Inherits text color.
- `fill-transparent`: Sets `fill: transparent;`.
- `fill-(<custom-property>)`: Sets `fill: var(<custom-property>);`.
- `fill-[<color>]`: Sets `fill: <color>;`. Example: `fill-[#243c5a]`.
- **Responsive:** Use breakpoint prefixes like `md:fill-cyan-700`.
- **Customization:** Extend the `color` theme key.

## Backdrop Filter: Invert

> Utilities for applying backdrop invert filters to an element.

- `backdrop-invert`: Sets 100% backdrop inversion (`backdrop-filter: invert(100%);`).
- `backdrop-invert-<number>`: Sets backdrop inversion percentage (`backdrop-filter: invert(<number>%);`). Example: `backdrop-invert-65`. `backdrop-invert-0` removes effect.
- `backdrop-invert-(<custom-property>)`: Sets `backdrop-filter: invert(var(<custom-property>));`.
- `backdrop-invert-[<value>]`: Sets `backdrop-filter: invert(<value>);`. Example: `backdrop-invert-[.25]`.
- **Responsive:** Use breakpoint prefixes like `md:backdrop-invert-0`.

## Caption Side

> Utilities for controlling the alignment of a caption element inside of a table.

- `caption-top`: Positions caption above the table (`caption-side: top;`). Default.
- `caption-bottom`: Positions caption below the table (`caption-side: bottom;`).
- **Usage:** Apply to `<caption>` elements within `<table>`.
- **Responsive:** Use breakpoint prefixes like `md:caption-bottom`.

## Overscroll Behavior

> Utilities for controlling how the browser behaves when reaching the boundary of a scrolling area.

- `overscroll-auto`: Default browser overscroll behavior (`overscroll-behavior: auto;`). Allows parent scrolling.
- `overscroll-contain`: Prevents parent scrolling but allows "bounce" effect (`overscroll-behavior: contain;`).
- `overscroll-none`: Prevents parent scrolling and bounce effect (`overscroll-behavior: none;`).
- `overscroll-x-{keyword}`, `overscroll-y-{keyword}`: Controls overscroll on a single axis. Keywords: `auto`, `contain`, `none`. Example: `overscroll-y-contain`.
- **Responsive:** Use breakpoint prefixes like `md:overscroll-contain`.

## Word Break

> Utilities for controlling word breaks in an element.

- `break-normal`: Normal word breaking (`word-break: normal;`). Default.
- `break-all`: Allows breaks anywhere, even mid-word (`word-break: break-all;`).
- `break-keep`: Prevents breaks in CJK text (`word-break: keep-all;`). Behaves like `break-normal` for non-CJK text.
- **Responsive:** Use breakpoint prefixes like `md:break-all`.

## Mask Origin

> Utilities for controlling how an element's mask image is positioned relative to borders, padding, and content.

- `mask-origin-border`: Mask positioned relative to border box (`mask-origin: border-box;`). Default.
- `mask-origin-padding`: Mask positioned relative to padding box (`mask-origin: padding-box;`).
- `mask-origin-content`: Mask positioned relative to content box (`mask-origin: content-box;`).
- `mask-origin-fill`: Origin is object bounding box (`mask-origin: fill-box;`).
- `mask-origin-stroke`: Origin is stroke bounding box (`mask-origin: stroke-box;`).
- `mask-origin-view`: Origin is nearest SVG viewport (`mask-origin: view-box;`).
- **Responsive:** Use breakpoint prefixes like `md:mask-origin-padding`.

## Scroll Behavior

> Utilities for controlling the scroll behavior of an element.

- `scroll-auto`: Instant scrolling (`scroll-behavior: auto;`). Default browser behavior.
- `scroll-smooth`: Smooth scrolling (`scroll-behavior: smooth;`). Affects browser-triggered scrolling (e.g., navigation fragments, `scrollIntoView()`).
- **Responsive:** Use breakpoint prefixes like `md:scroll-auto`.
