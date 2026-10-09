# Speaker cards with bio preview

Front-end prototype for **CHAT-2088: Introduce ability to view external speaker profiles on events/conferences**.

Each speaker card shows the first two lines of a short bio. Choosing **View more** (or anywhere on the card) expands the full bio, and for internal Chatham House speakers reveals a **Read more** link to their profile page.

## Files

```
speaker-bios/
├── index.html                 Demo page with six example speakers
├── preview.html               Client preview with Desktop / Mobile switch
├── css/speaker-cards.css      Component styles and Chatham tokens
├── js/speaker-cards.js        Progressive enhancement for the toggles
├── images/                    Placeholder portrait
└── fonts/                     Add the Calibre font files here (not committed)
```

Open `index.html` in a browser to try it. No build step is needed.

## Client preview

Open `preview.html` to show the component inside fixed device viewports, as in the design prototype:

- **Desktop:** 1280 × 832
- **Mobile:** 393 × 852

A floating Desktop / Mobile switch at the bottom of the screen swaps between them, and each viewport scrolls independently. Add `#mobile` to the URL to open straight onto the mobile view. Use a browser window wider than 1280px so the desktop viewport isn't cropped.

## Fonts

The stylesheet expects these files in `fonts/`:

- `Calibre-Regular.otf`
- `Calibre-Medium.otf`
- `Calibre-Semibold.otf`

Calibre is a licensed typeface, so check the licence before committing the files, particularly if this repository is public. Without them the page falls back to Helvetica Neue.

## Behaviour

- **Two-line preview.** Bios are clamped to two lines with CSS. The toggle only appears when the bio is actually truncated, or when there's a profile link to reveal.
- **Whole-card click.** The toggle's hit area is stretched over the card, so clicking anywhere on the card expands it. The toggle remains the single focusable control.
- **Profile links.** Internal speakers' **Read more** link sits above the stretched hit area, so it still navigates rather than toggling.
- **Independent expansion.** Only the expanded card grows. Neighbouring cards keep their own height. The name and role area has a minimum height at 768px and above so previews line up across a row.
- **Responsive.** One column below 768px, two columns from 768px, three from 1280px. Type sizes follow the Sitekit 320, 768 and 1440 text styles.
- **Progressive enhancement.** Without JavaScript, every bio shows in full and profile links are visible.

## Accessibility

- The toggle is a real `<button>` with `aria-expanded` and `aria-controls`, and includes the speaker's name as visually hidden text so repeated "View more" buttons are distinguishable.
- Profile links also carry the speaker's name as visually hidden text.
- The clamp is visual only, so screen readers can access the full bio text.
- Focus states use the Chatham dark blue outline, and the chevron animation respects `prefers-reduced-motion`.
- Touch targets are at least 44px tall.

## Drupal and CMS notes

- **Short bio field.** Add a plain text field to the person entity (internal and external) for the card bio. Suggested limit: 400 characters, enforced in the field settings, with editorial guidance that the first sentence should work on its own as the preview.
- **Profile link.** Render **Read more** only when the person has a published profile page (internal speakers).
- **Image.** Cards currently assume a portrait. A no-photo state still needs designing.
- **Markup.** Each card needs unique IDs for the heading and bio container, used by `aria-labelledby` and `aria-controls`.

## Open questions

- Agreed character limit for the bio field.
- No-photo state for speakers without a headshot.
- Whether internal speakers' **Read more** link should be visible before expanding.
- Real speaker content: the bios and names in `index.html` are placeholders.

## Known trade-off

Because the whole card is a click target, users can't select and copy bio text. This is usual for teaser cards but worth confirming with the client.
