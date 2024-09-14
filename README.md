# `eight-ball`

A Web Component for
showing a random selection
from a group of options
(and allowing you to shake it up).

## Features


**[Demo](https://mirisuzanne.github.io/eight-ball/index.html)**

[![Open in StackBlitz][]](https://stackblitz.com/~/github.com/mirisuzanne/eight-ball?file=eight-ball.js&initialPath=/index.html)

[Open in StackBlitz]: https://developer.stackblitz.com/img/open_in_stackblitz.svg

## Examples

General usage example:

```html
<script type="module" src="eight-ball.js"></script>

<eight-ball>
  <span>It is certain</span>
  <span hidden>It is decidedly so</span>
  <span hidden>Without a doubt</span>
  <span hidden>Yes definitely</span>
  <span hidden>You may rely on it</span>
</eight-ball>
```

## Installation

You have a few options (choose one):

1. Install via
   [npm](https://www.npmjs.com/package/@terriblemia/eight-ball):
   `npm install @terriblemia/eight-ball`
2. [Download the source manually from GitHub](https://github.com/mirisuzanne/eight-ball/releases)
   into your project.
3. Skip this step
   and use the script directly
   via a 3rd party CDN
   (not recommended for production use)

## Usage

Make sure you include the `<script>` in your project
(choose one, and update the version number as needed):

```html
<!-- Host yourself -->
<script type="module" src="eight-ball.js"></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://www.unpkg.com/@terriblemia/eight-ball@0.2.0/eight-ball.js"
></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://esm.sh/@terriblemia/eight-ball@0.2.0"
></script>
```

Or use the built in
[WebC](https://www.11ty.dev/docs/languages/webc/) component
with [Eleventy](https://www.11ty.dev/docs/),
by adding `"npm:@terriblemia/eight-ball/*.webc"`
to the Eleventy WebC Plugin `components` registry:

```js
// Only one module.exports per configuration file, please!
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: [
      // Add as a global WebC component
      "npm:@11ty/eight-ball/*.webc",
    ],
  });
}
```

## Attributes & parts

- By default,
  a `::part(button)` is exposed
  for styling.
- Optionally provide a `data-action`
  attribute to override
  the inner text of `::part(button)`
- Optionally set `data-current`
  on one of the options
  to enforce an initial state
- Optionally add the (boolean) `view-transition` attribute
  to transition between values in supporting browsers.

## Slots

- Any element in the default slot
  will be treated as an option
- If any element is marked for
  `slot="options"`,
  the children of that element
  will be the options to choose from
  (this overrides the default slot)
- Anything in `slot="action"`
  will replace the `::part(button)`,
  and the fist `button` in the slot
  will be used as a trigger
  for getting a new random selection

## Properties & methods

- `EightBall.options` (read-only, `array`):
  the collection of elements to select from
- `EightBall.action` (read-only, `HTMLButtonElement`):
  the action button that controls the eight-ball
- `EightBall.actionText` (read/write, `string`):
  the action button's inner text
- `EightBall.current` (read/write, `HTMLElement`):
  the currently selected option, if any
- `EightBall.onDeck` (read-only, `array`):
  the options that have not yet been displayed
  (or all non-current options,
  once all have been seen)
- `EightBall.shake()`:
  hide the current selection,
  and show a new one from the list
  of options currently on-deck!

## ToDo

Things we _might_ need…

- [ ] Allow moving the action before the options?
- [ ] More repeat options (maybe `data-repeat`):
  - `cycle`: the current behavior
  - `always`: everything is always 'on-deck'
  - `never`: only go through the options once???

## Support

At [OddBird](https://oddbird.net/),
we enjoy collaborating and contributing
as part of an open web community.
But those contributions take time and effort.
If you're interested in supporting our
open-source work,
consider becoming a
[GitHub sponsor](https://github.com/sponsors/oddbird),
or contributing to our
[Open Collective](https://opencollective.com/oddbird-open-source).

❤️ Thanks!

## Credit

With thanks to the following people:

- [David Darnes](https://darn.es/) for the
  [Web Component repo template](https://github.com/daviddarnes/component-template)
  that this one is based on.
