<script lang="ts">
	import { amenities, dog } from '$lib/data/site';
	import Pending from '$lib/components/Pending.svelte';

	const groups = [
		{ title: 'Ogród i teren', items: amenities.garden },
		{ title: 'Basen', items: amenities.pool },
		{ title: 'W apartamentach', items: amenities.inApartments },
		{ title: 'Łazienki', items: amenities.bathroom },
		{ title: 'Przyjazd', items: amenities.arrival },
		{ title: 'Rodziny i rozrywka', items: amenities.family }
	];
</script>

<section id="udogodnienia" class="py-12 md:py-20">
	<div class="mx-auto max-w-[1120px] px-4">
		<div class="mb-9 grid max-w-[60ch] gap-3">
			<p class="font-mono text-[0.78rem] tracking-[0.08em] text-moss uppercase">Udogodnienia</p>
			<h2 class="font-display text-step-3 leading-[1.12] text-fg">Na miejscu jest wszystko, czego potrzebujesz na urlop</h2>
		</div>

		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
			{#each groups as group (group.title)}
				<div>
					<h3 class="border-b border-line pb-2 text-[1.15rem] text-fg">{group.title}</h3>
					<ul class="m-0 mt-[0.6rem] grid list-none gap-[0.3rem] p-0 text-[0.95rem] text-muted">
						{#each group.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			{/each}

			<div>
				<h3 class="border-b border-line pb-2 text-[1.15rem] text-fg">Dodatkowo</h3>
				<ul class="m-0 mt-[0.6rem] grid list-none gap-[0.3rem] p-0 text-[0.95rem] text-muted">
					{#each amenities.other as item (item)}
						<li>{item}</li>
					{/each}
					<li>
						<Pending field={amenities.meals}>
							{#snippet children(meals)}{meals}{/snippet}
						</Pending>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-12 grid items-center gap-6 rounded-(--radius-token) border border-line bg-surface p-6 sm:grid-cols-[auto_1fr] md:p-7">
			<svg viewBox="0 0 64 64" aria-hidden="true" class="h-16 w-16">
				<circle cx="32" cy="32" r="31" fill="var(--color-bg)" stroke="var(--color-line)" />
				<g fill="var(--color-moss)">
					<ellipse cx="32" cy="38" rx="9" ry="8" />
					<ellipse cx="20" cy="27" rx="4" ry="5" />
					<ellipse cx="28" cy="21" rx="4" ry="5" />
					<ellipse cx="36" cy="21" rx="4" ry="5" />
					<ellipse cx="44" cy="27" rx="4" ry="5" />
				</g>
			</svg>
			<div>
				<h3 class="font-display text-step-1 text-fg">{dog.title}</h3>
				<p class="mt-2 max-w-[62ch] text-muted">{dog.description}</p>
				<p class="mt-2 text-muted">
					Opłata za psa:
					<Pending field={dog.fee}>
						{#snippet children(fee)}{fee}{/snippet}
						{#snippet empty()}zapytaj telefonicznie{/snippet}
					</Pending>
				</p>
			</div>
		</div>
	</div>
</section>
