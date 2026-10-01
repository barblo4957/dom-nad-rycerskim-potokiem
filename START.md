# Start w Claude Code — kolejne prompty

Rozpakuj paczkę, wejdź do folderu i uruchom `claude`. Prompty wklejaj po kolei, każdy po zakończeniu poprzedniego.
Folder ma już `CLAUDE.md`, `docs/context.md` i `koncept/index.html` — Claude Code przeczyta je sam.

---

## 1. Szkielet projektu

```
Przeczytaj CLAUDE.md, docs/context.md i koncept/index.html.
Postaw w tym folderze projekt SvelteKit (Svelte 5, TypeScript, minimal template) bez nadpisywania
CLAUDE.md, docs/ i koncept/. Dodaj Tailwind v4, adapter-vercel, enhanced-img i fonty @fontsource
(Young Serif, Hanken Grotesk 400/500/600/700, IBM Plex Mono 400/500).
Każdy npm install osobno — pokaż mi listę pakietów przed instalacją.
Przenieś tokeny z :root konceptu (light + dark) do @theme w src/app.css.
Utwórz strukturę katalogów z CLAUDE.md, pustą stronę z prerender = true. npm run check + build, potem commit.
```

## 2. Dane

```
Utwórz src/lib/data/site.ts z typami TS i wszystkimi treściami z docs/context.md oraz copy z konceptu.
Pozycje z ⚠️ oznacz polem pending (opis rozbieżności). Nie dodawaj żadnych faktów spoza context.md.
Dodaj komponent Note.svelte sterowany PUBLIC_SHOW_NOTES. Pokaż mi listę wszystkich pól pending. Commit.
```

## 3. Sekcje

```
Przenieś sekcje z koncept/index.html do komponentów w src/lib/components/sections/ — wizualnie 1:1,
treść wyłącznie z site.ts, style w Tailwind (tokeny z @theme, zero kolorów na sztywno).
Kolejność: SiteHeader, Hero, Facts, About, Apartments, Amenities, Area, Reviews, Booking, Contact, SiteFooter.
Canvas z hero zostaw jako fallback do czasu wideo. Wykres odległości zrób w czystym HTML/CSS (bez JS).
Po każdych 2–3 sekcjach: npm run check, build, commit.
```

## 4. SEO

```
Dodaj Seo.svelte: title, meta description (pod frazy z sekcji 9 context.md), canonical, Open Graph,
JSON-LD VacationRental + FAQPage z danych w site.ts. Dodaj robots.txt i sitemap.xml.
Sprawdź: jedno H1, poprawna hierarchia H2/H3, alt-y, lang="pl". Commit.
```

## 5. Media (gdy będą zdjęcia i wideo)

```
Zdjęcia wrzuciłem do src/lib/assets/photos/, wideo do static/media/.
Podepnij zdjęcia przez enhanced:img w About i Apartments (alt-y opisowe, z frazami tam gdzie naturalne).
W Hero: <video> muted autoplay loop playsinline, preload="metadata", poster AVIF z fetchpriority="high";
przy prefers-reduced-motion tylko poster. Usuń canvas. Commit.
```

## 6. Audyt przed pokazaniem właścicielce

```
Zrób audyt względem Definition of Done z CLAUDE.md: Lighthouse mobile (npx lighthouse na npm run preview),
360 px bez poziomego scrolla, dark mode, reduced-motion, kontrast. Wypisz problemy i popraw je.
Na koniec lista pending do omówienia z właścicielką. Commit — bez push.
```

---

## Deploy na Vercel (ręcznie)

1. Repo na GitHubie → import w Vercel (framework: SvelteKit, wykryje się sam).
2. Preview dla właścicielki: env `PUBLIC_SHOW_NOTES=true` tylko dla środowiska Preview.
3. Production: bez tej zmiennej → notatki i niepotwierdzone pola znikają.
4. Po starcie: Google Search Console + link do strony we wszystkich ogłoszeniach (sekcja 8 context.md).
