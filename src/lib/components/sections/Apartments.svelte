<script lang="ts">
	import { apartments, offer, wholeHouse } from '$lib/data/site';
	import Pending from '$lib/components/Pending.svelte';
</script>

<section id="apartamenty" class="py-12 md:py-20">
	<div class="mx-auto max-w-[1120px] px-4">
		<div class="mb-9 grid max-w-[60ch] gap-3">
			<p class="font-mono text-[0.78rem] tracking-[0.08em] text-moss uppercase">Apartamenty</p>
			<h2 class="font-display text-step-3 leading-[1.12] text-fg">Cały dom albo jeden apartament</h2>
			<p class="max-w-[62ch] text-muted">{offer.priceNote}</p>
		</div>

		<div class="grid gap-4 md:grid-cols-2">
			{#each apartments as apartment (apartment.id)}
				<article class="flex flex-col gap-4 rounded-(--radius-token) border border-line bg-surface p-6 md:p-8">
					<div class="flex flex-wrap items-baseline justify-between gap-4">
						<div>
							<p class="font-mono text-[0.8rem] tracking-[0.04em] text-moss uppercase">
								<Pending field={apartment.capacity}>
									{#snippet children(capacity)}{capacity}{/snippet}
									{#snippet empty()}zapytaj telefonicznie{/snippet}
								</Pending>
							</p>
							<h3 class="mt-1 font-display text-step-1 text-fg">{apartment.name}</h3>
						</div>
						<p class="font-mono text-[0.95rem] text-muted">
							od <b class="text-[1.35rem] font-medium text-fg">{apartment.priceFrom} zł</b> / {apartment.priceUnit}
						</p>
					</div>

					<ul class="m-0 grid list-none gap-[0.35rem] p-0" aria-label="Układ łóżek">
						<Pending field={apartment.beds}>
							{#snippet children(beds)}
								{#each beds as bed (bed)}
									<li class="border-b border-dotted border-line pb-[0.35rem] text-[0.95rem] text-fg">{bed}</li>
								{/each}
							{/snippet}
							{#snippet empty()}
								<li class="text-[0.95rem] text-muted">Szczegóły telefonicznie.</li>
							{/snippet}
						</Pending>
					</ul>

					<ul class="m-0 flex flex-wrap gap-x-[0.9rem] gap-y-[0.4rem] list-none p-0 text-[0.92rem] text-muted">
						{#each apartment.features as feature (feature)}
							<li class="before:mr-[0.45rem] before:inline-block before:h-[0.45rem] before:w-[0.45rem] before:rounded-full before:bg-moss before:content-['']">
								{feature}
							</li>
						{/each}
					</ul>
				</article>
			{/each}

			<div
				class="flex flex-wrap items-center justify-between gap-4 rounded-(--radius-token) bg-forest p-6 text-on-forest md:col-span-2 md:p-8"
			>
				<div>
					<h3 class="font-display text-step-1">{wholeHouse.title}</h3>
					<p class="mt-2 max-w-[55ch] text-on-forest/80">{wholeHouse.description}</p>
				</div>
				<a
					href="#kontakt"
					class="inline-flex shrink-0 items-center gap-2 rounded-(--radius-token) bg-wood px-[1.15rem] py-[0.85rem] font-semibold text-white no-underline hover:bg-wood-ink"
				>
					Zapytaj o cały dom
				</a>
			</div>
		</div>
	</div>
</section>
