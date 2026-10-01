<script lang="ts">
	import { trails, distanceGroups, distanceScaleMaxKm, activities, cellSignalNote } from '$lib/data/site';
	import { resolvePending } from '$lib/data/pending';
	import Note from '$lib/components/Note.svelte';

	function formatKm(km: number): string {
		return km < 1 ? `${Math.round(km * 1000)} m` : `${String(km).replace('.', ',')} km`;
	}

	const resolvedTrails = trails.map((trail) => ({
		...trail,
		color: resolvePending(trail.blazeColor) ?? 'var(--color-line)',
		km: resolvePending(trail.distanceKm)
	}));
</script>

<section id="okolica" class="py-12 md:py-20">
	<div class="mx-auto max-w-[1120px] px-4">
		<div class="mb-9 grid max-w-[60ch] gap-3">
			<p class="font-mono text-[0.78rem] tracking-[0.08em] text-moss uppercase">Okolica</p>
			<h2 class="font-display text-step-3 leading-[1.12] text-fg">Szlaki od progu, Słowacja za grzbietem</h2>
			<p class="max-w-[62ch] text-muted">
				Przy domu krzyżują się szlaki turystyczne. Na Wielką Raczę, najwyższy szczyt w okolicy, idzie się prosto z ogrodu.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-14">
			<div>
				<ul class="m-0 grid list-none p-0">
					{#each trails as trail, i (trail.name)}
						{@const color = resolvedTrails[i].color}
						{@const km = resolvedTrails[i].km}
						<li class="grid grid-cols-[2.2rem_1fr_auto] items-center gap-[0.9rem] border-b border-line py-[0.85rem] first:border-t">
							<span
								class="h-6 w-[2.2rem] rounded-[2px] shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)]"
								style="background: linear-gradient(#fff 0 33%, {color} 33% 67%, #fff 67%)"
								aria-hidden="true"
							></span>
							<span>
								<b class="font-semibold text-fg">{trail.name}</b>
								<small class="block text-[0.86rem] text-muted">{trail.note}</small>
							</span>
							<span class="whitespace-nowrap font-mono text-[0.9rem] text-muted">{km !== null ? formatKm(km) : '—'}</span>
						</li>
						{#if trail.distanceKm.pending || trail.blazeColor.pending}
							<li class="border-b border-line py-2">
								{#if trail.distanceKm.pending}<Note>{trail.distanceKm.pending}</Note>{/if}
								{#if trail.blazeColor.pending}<Note>{trail.blazeColor.pending}</Note>{/if}
							</li>
						{/if}
					{/each}
				</ul>

				<p class="mt-6 max-w-[62ch] text-muted">
					{activities.summary}
					{#if activities.skiLifts.pending}<Note>{activities.skiLifts.pending}</Note>{/if}
				</p>
				<p class="mt-3 text-muted">{cellSignalNote}</p>
			</div>

			<div>
				<div class="mb-2 ml-auto flex w-28 justify-between font-mono text-[0.72rem] text-muted sm:w-28">
					<span>0</span><span>{distanceScaleMaxKm / 2}</span><span>{distanceScaleMaxKm} km</span>
				</div>
				{#each distanceGroups as group (group.title)}
					<h3 class="mt-6 mb-2 text-[1.1rem] text-fg first:mt-0">{group.title}</h3>
					{#each group.items as item (item.label)}
						<div class="grid grid-cols-[minmax(0,1fr)_7rem_3.8rem] items-center gap-3 py-[0.35rem] text-[0.94rem]">
							<span class="text-fg">{item.label}</span>
							<span class="relative h-[0.45rem] rounded-full bg-line/70" aria-hidden="true">
								<i
									class="absolute inset-y-0 left-0 rounded-full bg-water not-italic"
									style="width: {Math.max((item.km / distanceScaleMaxKm) * 100, 1.5)}%"
								></i>
							</span>
							<span class="text-right font-mono text-[0.8rem] tabular-nums text-muted">{formatKm(item.km)}</span>
						</div>
					{/each}
				{/each}
			</div>
		</div>
	</div>
</section>
