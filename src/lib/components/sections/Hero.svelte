<script lang="ts">
	import { hero, nap } from '$lib/data/site';
	import { resolvePending } from '$lib/data/pending';

	const geo = resolvePending(nap.geo);
</script>

<div id="top" class="mx-auto grid max-w-[1120px] items-center gap-8 px-4 py-10 md:grid-cols-[1.05fr_1fr] md:gap-14 md:py-16">
	<div>
		<p class="font-mono text-[0.78rem] tracking-[0.08em] text-moss uppercase">{hero.eyebrow}</p>
		<h1 class="mt-3 text-balance font-display text-step-4 leading-[1.12] text-fg">
			{hero.titlePrefix}
			<em class="text-water not-italic">{hero.titleEmphasis}</em>
		</h1>
		<p class="mt-5 max-w-[38ch] text-step-1 leading-snug text-muted">{hero.lead}</p>
		<div class="mt-7 flex flex-wrap gap-3">
			<a
				href={nap.phoneTel}
				class="inline-flex items-center gap-2 rounded-(--radius-token) bg-wood px-[1.15rem] py-[0.85rem] font-semibold text-white no-underline hover:bg-wood-ink"
			>
				Zadzwoń: {nap.phone}
			</a>
			<a
				href="#apartamenty"
				class="inline-flex items-center gap-2 rounded-(--radius-token) border border-line px-[1.15rem] py-[0.85rem] font-semibold text-fg no-underline hover:border-fg"
			>
				Zobacz apartamenty
			</a>
		</div>
		<ul class="mt-6 flex flex-wrap gap-2 list-none p-0" aria-label="Najważniejsze cechy">
			{#each hero.chips as chip (chip)}
				<li class="rounded-full border border-line px-3 py-[0.3rem] text-[0.88rem] text-fg">{chip}</li>
			{/each}
		</ul>
	</div>

	<div
		class="relative aspect-4/5 overflow-hidden rounded-(--radius-token) bg-linear-to-br from-forest via-water/40 to-forest md:aspect-4/3"
		aria-label="Miejsce na wideo z widokiem na dom i dolinę"
	>
		<div class="absolute inset-x-3 bottom-3 flex flex-wrap justify-between gap-2 font-mono text-[0.74rem] text-on-forest">
			{#if geo}
				<span class="rounded-[3px] bg-forest/70 px-2 py-1">{geo.lat.toFixed(4)}° N, {geo.lng.toFixed(4)}° E</span>
			{/if}
			<span class="rounded-[3px] bg-forest/70 px-2 py-1">≈ {nap.elevationM.min}–{nap.elevationM.max} m n.p.m.</span>
		</div>
	</div>
</div>
