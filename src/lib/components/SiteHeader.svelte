<script lang="ts">
	import { nap } from '$lib/data/site';
</script>

<header
	class="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80"
>
	<div class="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-4 py-3">
		<a href="#top" class="flex items-center gap-2 no-underline" aria-label="{nap.name} — początek strony">
			<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" class="shrink-0">
				<path d="M3 24 L12 11 L17 17 L22 9 L31 24 Z" fill="var(--color-forest)" stroke="var(--color-moss)" stroke-width="1" />
				<path
					d="M3 28 q4 -3 7 0 t7 0 t7 0 t7 0"
					fill="none"
					stroke="var(--color-water)"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
			<span class="font-display text-[1.12rem] leading-tight text-fg">Dom nad<br />Rycerskim Potokiem</span>
		</a>
		<nav class="hidden gap-5 text-[0.95rem] md:flex" aria-label="Sekcje">
			<a href="#dom" class="text-muted no-underline hover:text-fg">Dom</a>
			<a href="#apartamenty" class="text-muted no-underline hover:text-fg">Apartamenty</a>
			<a href="#udogodnienia" class="text-muted no-underline hover:text-fg">Udogodnienia</a>
			<a href="#okolica" class="text-muted no-underline hover:text-fg">Okolica</a>
			<a href="#opinie" class="text-muted no-underline hover:text-fg">Opinie</a>
			<a href="#kontakt" class="text-muted no-underline hover:text-fg">Kontakt</a>
		</nav>
		<a
			href="#kontakt"
			class="inline-flex shrink-0 items-center gap-2 rounded-(--radius-token) bg-wood px-4 py-2 text-[0.9rem] font-semibold text-white no-underline hover:bg-wood-ink"
		>
			Zapytaj o termin
		</a>
	</div>
</header>
