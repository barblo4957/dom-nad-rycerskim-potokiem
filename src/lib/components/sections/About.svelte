<script lang="ts">
	import { about } from '$lib/data/site';

	const photos = [
		{ caption: 'dom od strony ogrodu', tall: true },
		{ caption: 'potok przy działce', tall: false },
		{ caption: 'basen i leżaki', tall: false },
		{ caption: 'altana z grillem', tall: false },
		{ caption: 'salon / hol z TV', tall: false }
	];
</script>

<section id="dom" class="py-12 md:py-20">
	<div class="mx-auto grid max-w-[1120px] items-start gap-8 px-4 md:grid-cols-[1fr_1.15fr] md:gap-14">
		<div>
			<p class="font-mono text-[0.78rem] tracking-[0.08em] text-moss uppercase">{about.eyebrow}</p>
			<h2 class="mt-2 text-balance font-display text-step-3 leading-[1.12] text-fg">{about.title}</h2>
			<div class="mt-5 max-w-[62ch] space-y-[0.9em] text-muted">
				{#each about.paragraphs as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		</div>
		<div class="grid grid-cols-2 gap-[0.6rem]">
			{#each photos as photo (photo.caption)}
				<figure
					class="relative m-0 flex items-end overflow-hidden rounded-(--radius-token) bg-linear-to-br from-moss/35 to-water/30 p-[0.6rem] {photo.tall
						? 'row-span-2 aspect-auto'
						: 'aspect-4/3'}"
				>
					<figcaption class="rounded-[3px] bg-surface/85 px-[0.45rem] py-[0.2rem] font-mono text-[0.72rem] text-fg">
						{photo.caption}
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>
