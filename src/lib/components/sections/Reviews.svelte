<script lang="ts">
	import { reviews } from '$lib/data/site';
	import Pending from '$lib/components/Pending.svelte';
</script>

<section id="opinie" class="py-12 md:py-20">
	<div class="mx-auto max-w-[1120px] px-4">
		<div class="mb-9 grid max-w-[60ch] gap-3">
			<p class="font-mono text-[0.78rem] tracking-[0.08em] text-moss uppercase">Opinie gości</p>
			<h2 class="font-display text-step-3 leading-[1.12] text-fg">Co goście piszą po pobycie</h2>
		</div>

		<div class="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each reviews.scores as score (score.source)}
				<div class="flex items-center gap-5 rounded-(--radius-token) border border-line bg-surface px-6 py-5">
					<b class="font-display text-[2.8rem] leading-none text-fg">{score.rating}</b>
					<span class="text-[0.92rem] text-muted">
						{#if score.label}
							<strong class="block font-semibold text-fg">{score.label}</strong>
						{/if}
						{score.source} · {score.count} opinii
						{#if score.url}
							·
							<a href={score.url} target="_blank" rel="noopener" class="text-water underline">
								{score.linkLabel}
							</a>
						{/if}
					</span>
				</div>
			{/each}
		</div>

		<ul class="m-0 grid list-none gap-x-10 gap-y-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
			{#each reviews.motifs as motif (motif.title)}
				<li class="border-t-2 border-water pt-3">
					<b class="block font-display text-[1.2rem] text-fg">{motif.title}</b>
					<span class="text-[0.95rem] text-muted">{motif.description}</span>
				</li>
			{/each}
		</ul>

		<p class="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.8rem] text-muted">
			{#each reviews.bookingSubscores as sub (sub.label)}
				<span>{sub.label}: {sub.value}</span>
			{/each}
		</p>

		<Pending field={reviews.fullQuotes}>
			{#snippet children(quotes)}
				{#if quotes.length > 0}
					<ul class="mt-8 grid list-none gap-4 p-0">
						{#each quotes as quote (quote.quote)}
							<li class="rounded-(--radius-token) border border-line bg-surface p-5">
								<p class="text-fg">„{quote.quote}"</p>
								<p class="mt-2 text-[0.9rem] text-muted">— {quote.name}, {quote.source}</p>
							</li>
						{/each}
					</ul>
				{/if}
			{/snippet}
		</Pending>
	</div>
</section>
