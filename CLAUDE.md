# Dom nad Rycerskim Potokiem — strona wizytówka (one-page)

Strona dla domu wakacyjnego w Rycerce Górnej (Beskid Żywiecki). Cel: ruch z Google na frazy lokalne
i rezerwacje bezpośrednie (telefon), zamiast wyłącznie przez Booking/Airbnb.
Projekt idzie też do portfolio SiteConcept — jakość jak PianaPur.com (struktura, SEO, performance).

## Źródła prawdy

- `docs/context.md` — JEDYNE źródło faktów o obiekcie. Nie dopisuj niczego, czego tam nie ma
  (żadnych wymyślonych udogodnień, odległości, cen, opinii ani cytatów gości).
- `koncept/index.html` — zatwierdzony koncept layoutu (statyczny HTML). Wzór dla struktury sekcji,
  tokenów kolorów, typografii i copy. Port 1:1 wizualnie, potem ulepszenia.
- Pozycje z ⚠️ w context.md = niepotwierdzone. W kodzie oznaczaj je jako `pending` (patrz niżej).

## Stack

- SvelteKit (Svelte 5, runes) + TypeScript
- Tailwind CSS v4 (tokeny w `@theme` w `src/app.css`)
- `@sveltejs/adapter-vercel`, hosting Vercel
- Obrazy: `@sveltejs/enhanced-img` (AVIF/WebP, srcset, wymiary)
- Fonty self-hosted przez `@fontsource` (Young Serif, Hanken Grotesk, IBM Plex Mono) — bez Google Fonts CDN (RODO + performance)
- Bez frameworków UI, bez bibliotek animacji. Strona jest prerenderowana (`export const prerender = true`).

## Struktura

```
src/
  app.css                      # Tailwind v4 + @theme (tokeny z konceptu, light + dark)
  app.html                     # lang="pl"
  lib/
    data/site.ts               # wszystkie treści i fakty (NAP, apartamenty, udogodnienia, okolica, opinie, FAQ)
    components/
      SiteHeader.svelte
      Note.svelte              # znacznik „do potwierdzenia” (render tylko gdy PUBLIC_SHOW_NOTES=true)
      Seo.svelte               # meta, OG, canonical, JSON-LD
      sections/
        Hero.svelte            # H1 + wideo 15 s (poster, muted, playsinline; reduced-motion → sam poster)
        Facts.svelte
        About.svelte
        Apartments.svelte
        Amenities.svelte       # + blok „Nocleg z psem”
        Area.svelte            # szlaki (znaczki PTTK) + odległości na wspólnej skali 0–30 km
        Reviews.svelte
        Booking.svelte         # zasady rezerwacji + FAQ (<details>)
        Contact.svelte         # NAP + telefon + link do Map Google
      SiteFooter.svelte
  routes/
    +layout.svelte
    +page.svelte               # składa sekcje
    +page.ts                   # prerender = true
    sitemap.xml/+server.ts
static/
  robots.txt
  media/                       # wideo hero, poster, og-image
src/lib/assets/photos/         # zdjęcia przez enhanced:img
```

## Zasady treści i SEO

- Jedno H1 (hero). H2 per sekcja. Frazy z sekcji 9 context.md wplatać naturalnie — bez upychania.
- NAP identyczny wszędzie: „Dom nad Rycerskim Potokiem, Rycerka Górna 359D, 34-370 Rajcza, +48 604 278 378”.
- JSON-LD: `VacationRental` (lub `LodgingBusiness`) z adresem, geo, telefonem, `petsAllowed`, `amenityFeature`,
  `aggregateRating` (nocowanie.pl 9,3 / 15). Dodatkowo `FAQPage` z sekcji FAQ.
- Opinie: tylko oceny i motywy z context.md. Pełne cytaty dopiero po zgodzie właścicielki — nie wymyślaj.
- Copy: konkretnie, krótkie zdania, strona czynna, bez marketingowego nadęcia i bez em-dashów jako ozdobników.

## Dane niepotwierdzone (pending)

- W `site.ts` każde pole niepewne ma flagę, np. `{ value: '...', pending: 'Booking vs nocowanie — ustalić' }`.
- `<Note>` renderuje się tylko gdy `PUBLIC_SHOW_NOTES === 'true'` (preview deploy dla właścicielki).
  Na produkcji: pole pending bez potwierdzonej wartości NIE jest wyświetlane.
- Aktualna lista pending: godziny check-in/out, obiady z dowozem, wyciągi narciarskie,
  odległości i kolor szlaku na Przegibek/Rycerzową, link Airbnb, kominek (wewnątrz czy
  kominek-grill w ogrodzie — Airbnb), zdjęcia tymczasowe z portali — podmienić na oryginały
  od właścicielki.

## Jakość (Definition of Done)

- Lighthouse mobile: Performance ≥ 95, SEO 100, Accessibility 100, Best Practices 100.
- Brak poziomego scrolla przy 360 px. Fokus widoczny. `prefers-reduced-motion` respektowane.
- Light + dark mode z tokenów (bez kolorów zapisanych na sztywno w komponentach).
- Wideo hero: ≤ 2 MB (WebM + MP4), `preload="metadata"`, poster jako LCP (AVIF, z `fetchpriority="high"`).

## Workflow

- Po każdym etapie: `npm run check` i `npm run build` muszą przejść.
- `git add` / `git commit` — OK bez pytania. `git push` — NIGDY bez mojej zgody.
- `npm install` — każdy pakiet osobno, z uzasadnieniem.
- Odpowiadaj po polsku, konkretnie.
