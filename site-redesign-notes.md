# Jabulani Quarry Site Redesign Notes

## Current project state

This workspace now contains a redesigned 5-page quarry website based on the user's direction and inspired by Rhino Quarries, while preserving the custom red, white, and black identity already started in the original theme.

Main public pages:

- `index.html`
- `about.html`
- `products.html`
- `gallery.html`
- `contact.html`

Shared design system files:

- `css/quarry-site.css`
- `js/quarry-site.js`
- `js/gallery-page.js`
- `js/gallery-data.js`
- `scripts/generate-gallery-data.ps1`

## Core direction agreed

- Keep a shared video-first hero across the main quarry content pages.
- Use a clean red/white/black quarry look with full light/dark mode support.
- Reduce theme clutter and keep the site focused on quarry operations, hardware, building materials, and contact.
- Keep navigation and footer simple and consistent.
- Reuse local assets from `images/`, `images-theme/`, `videos/`, and now `images/community-work/` and `portfolio/`.

## What has been implemented

### Shared site system

- Added a dedicated stylesheet: `css/quarry-site.css`
- Added a lightweight JS controller: `js/quarry-site.js`
- Added persistent light/dark mode
- Added mobile nav toggle
- Added sticky header behavior
- Added custom community image slider behavior for About page
- Added safe contact form mailto behavior
- Added gallery data generator for portfolio folders
- Added modern gallery page with category tabs, masonry layout, lazy loading, skeletons, lightbox, and load-more-on-scroll

### Shared hero treatment

The main quarry content pages now use:

- the same hero video: `videos/jabulani_hero3.mp4`
- compact `Extract / Process / Distribute` hero tiles
- no extra paragraph/button clutter over the video
- a fixed dark base behind the video so section images do not flash through during refresh

### Shared footer

All public pages now use the same traditional footer design:

- logo
- short quarry/company description
- quick links
- contact details

## Homepage status

`index.html` has been reworked heavily and now includes:

- shared video hero with compact process tiles
- reduced-size lower process image strip
- `Open Cast Mine` label in navbar brand eyebrow
- quarry information / open-cast mine split section
- quarry information content with `View More` and `Get a Quote`
- `About us` company block
- `Top-Quality hardware & building products for you` section
- `Expertise That Drives Your Building success` section
- quarry stats grid with:
  - 30m quarry depth
  - 50+ team members
  - A1 grade stone quality
  - 20+ years experience
  - 100k+ tons supplied
  - 1 open cast quarry
- trusted brands section changed into a horizontal sliding logo strip

Sections that were removed from Home during cleanup:

- old theme-heavy stats section
- old extra CTA explore section
- old brand grid version
- extra hero text/buttons
- other filler sections carried from the original theme

## About page status

`about.html` now includes:

- shared video hero with compact process tiles
- lower process image strip
- `About us` company section
- quarry information section
- `Why Choose Us` section
- `Team Jabulani` section
- `Key benefits` section
- `Community work` section
- simplified `How we work` timeline

### Community work section

A new community-focused section was added with:

- messaging about:
  - shelter homes
  - water support for poor areas
  - community work
  - free community events
- images loaded from `images/community-work/`
- center-focused slider with left/right previews
- manual previous/next controls

### About page cleanup

The About page content was later tightened to reduce repetition between:

- About us
- Quarry information
- Why Choose Us
- Key benefits
- How we work

## Products page status

`products.html` now includes:

- shared video hero with compact process tiles
- alternating image/content product sections
- `View Image` links
- quarry-specific, more practical product descriptions
- `Gallery` navigation link in shared nav/footer

Current products shown:

- `Crush Dust`
- `13mm Crush Stone`
- `19mm Crush Stone`
- `Gabion Stone`

Product data source used for this refinement:

- reference pulled from the user's other local project file:
  - `D:\Faizi related Data\JabulaniStore-Antigravity\product-single.html`

## Contact page status

`contact.html` now includes:

- shared video hero with compact process tiles
- redesigned `Get in touch` two-column contact layout
- left-side contact information block
- right-side enquiry form
- embedded Google Map section

Changes made during refinement:

- removed the old `Our approach` section completely
- tightened spacing between contact section and map
- updated the contact layout to feel closer to the user's preferred structure
- `Gallery` navigation link in shared nav/footer

## Gallery page status

`gallery.html` now includes:

- a modern portfolio/gallery page styled to fit the quarry theme
- top navigation and footer matching the rest of the site
- horizontally scrollable folder/category tabs
- active tab highlighting
- responsive masonry-style image layout
- hover zoom and overlay treatment
- lazy-loaded images
- load-more-on-scroll behavior
- lightbox preview for clicked images
- loading skeletons during category switches

### Gallery data source

The gallery does not try to read folders directly in-browser. Instead it now uses:

- `scripts/generate-gallery-data.ps1`
- generated output file: `js/gallery-data.js`

This script scans the local `portfolio/` directory and converts folders into gallery categories.

Current portfolio folders detected:

- `portfolio/community-work`
- `portfolio/Crushing`
- `portfolio/products`
- `portfolio/quarry`

Current note:

- `community-work` and `quarry` are present as categories but currently empty, so the gallery shows an empty-state message for those tabs until images are added and the manifest is regenerated.

## Brand slider status

The home brands section was changed from a static grid to an auto-sliding horizontal strip.

It now:

- scrolls logos horizontally
- duplicates logos for seamless movement
- uses mask fade at edges
- stays lighter than the old swiper-based theme section

## Mobile/responsive work completed

Multiple responsive passes were completed across the site:

- homepage mobile spacing tightened
- hero tiles compacted for tablet/mobile
- process cards reduced on smaller screens
- About / Products / Contact mobile spacing improved
- contact form and map made mobile friendly
- typography rebalanced for smaller screens
- footer spacing tightened for mobile
- community slider adapted for tablet/mobile

## Typography and visual refinement completed

Completed visual polish includes:

- stronger heading hierarchy
- improved paragraph widths and line lengths
- tighter spacing between tags and titles
- cleaner button styling
- better light/dark contrast
- stronger red accent usage
- improved card and surface contrast

## Local assets confirmed in use

### Video

- `videos/jabulani_hero3.mp4`

### Main branding

- `images/quarryimages/logo_red.png`

### Quarry / homepage / about images

- `images/extract.webp`
- `images/distribution.webp`
- `images/distribute.webp`
- `images/quarry2.webp`
- `images/quarrypic4.webp`
- `images-theme/JABULANI_Fleet.webp`
- `images-theme/JBQ7.webp`

### Product images

- `images-theme/crush2.webp`
- `images-theme/sand_trucks.webp`
- `images-theme/quarrypic3.webp`

### Team / content images

- `images-theme/Faizan.webp`
- `images-theme/zeeshan.webp`
- `images-theme/thando.webp`
- `images-theme/yusuf.webp`
- `images-theme/office.png`

### Community images

- `images/community-work/WhatsApp Image 2026-04-13 at 6.40.16 PM.jpeg`
- `images/community-work/WhatsApp Image 2026-04-13 at 6.40.17 PM (1).jpeg`
- `images/community-work/WhatsApp Image 2026-04-13 at 6.40.17 PM (2).jpeg`
- `images/community-work/WhatsApp Image 2026-04-13 at 6.40.17 PM.jpeg`
- `images/community-work/WhatsApp Image 2026-04-13 at 6.40.18 PM.jpeg`
- `images/community-work/WhatsApp Image 2026-04-13 at 6.40.27 PM.jpeg`

### Brand logos used

- `images/jab_logo.png`
- `images/Ingco_Logo.png`
- `images/hendok.png`
- `images/harvey.png`
- `images/makita.png`
- `images/Duramlogo.png`
- `images/Afrisam.png`
- `images/PGBISON.png`
- `images/Lasher.png`
- `images/Roofco.png`
- `images/geo.png`
- `images/jojotanks.png`
- `images/Eureka.png`
- `images/Flash.png`
- `images/Corobrik.png`

## Current content notes

- Product descriptions are now more quarry-specific, but can still be improved further with exact technical grading/spec data later.
- Some contact/location details vary between Tsolo and Mount Frere references from different source materials; these may still need one final consistency pass.
- The site has been substantially cleaned and themed, but still benefits from a final browser QA pass for exact visual spacing.
- The gallery depends on regenerating `js/gallery-data.js` whenever portfolio folders/images are changed.
- Legacy theme pages, unused legacy CSS/JS libraries, old favicon/manifest files, and the `RhinoQuarries/` reference folder were removed after dependency review so the project now only keeps the live site files and required assets.

## Recommended next steps

Best next actions after this note update:

- final browser-based visual QA on all main pages plus gallery
- unify any remaining location/address references
- replace general quarry product wording with final technical product specs if available
- add images into `portfolio/community-work` and `portfolio/quarry`, then regenerate `js/gallery-data.js`
- optionally add autoplay + pause-on-hover to the community slider
- optionally add pause-on-hover / speed control to the brands slider
