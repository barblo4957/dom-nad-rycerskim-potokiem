<script lang="ts">
	import { about } from '$lib/data/site';
	import domZOgrodu from '$lib/assets/photos/dom-z-ogrodu.jpg?enhanced';
	import potokPrzyDzialce from '$lib/assets/photos/potok-przy-dzialce.jpg?enhanced';
	import basenILezaki from '$lib/assets/photos/basen-i-lezaki.jpg?enhanced';
	import altanaZGrillem from '$lib/assets/photos/altana-z-grillem.jpg?enhanced';
	import salonHolTv from '$lib/assets/photos/salon-hol-tv.jpg?enhanced';

	const featured = {
		src: domZOgrodu,
		alt: 'Dom nad Rycerskim Potokiem w Rycerce Górnej – widok od strony ogrodu',
		caption: 'dom od strony ogrodu'
	};

	const gridPhotos = [
		{
			src: potokPrzyDzialce,
			alt: 'Rycerski Potok płynący tuż przy działce domu w Rycerce Górnej',
			caption: 'potok przy działce'
		},
		{
			src: basenILezaki,
			alt: 'Odkryty basen i leżaki w ogrodzie domu wakacyjnego',
			caption: 'basen i leżaki'
		},
		{
			src: altanaZGrillem,
			alt: 'Altana z grillem w ogrodzie, miejsce na wspólne grillowanie',
			caption: 'altana z grillem'
		},
		{
			src: salonHolTv,
			alt: 'Salon z telewizorem w apartamencie domu nad Rycerskim Potokiem',
			caption: 'salon / hol z TV'
		}
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
		<div class="grid gap-[0.6rem]">
			<figure class="relative m-0 flex aspect-16/9 items-end overflow-hidden rounded-(--radius-token) bg-surface">
				<enhanced:img
					src={featured.src}
					alt={featured.alt}
					sizes="(min-width: 768px) 560px, calc(100vw - 2rem)"
					class="absolute inset-0 h-full w-full object-cover"
				/>
				<figcaption class="relative m-[0.6rem] rounded-[3px] bg-surface/85 px-[0.45rem] py-[0.2rem] font-mono text-[0.72rem] text-fg">
					{featured.caption}
				</figcaption>
			</figure>
			<div class="grid grid-cols-2 gap-[0.6rem]">
				{#each gridPhotos as photo (photo.caption)}
					<figure class="relative m-0 flex aspect-16/9 items-end overflow-hidden rounded-(--radius-token) bg-surface">
						<enhanced:img
							src={photo.src}
							alt={photo.alt}
							sizes="(min-width: 768px) 270px, 45vw"
							class="absolute inset-0 h-full w-full object-cover"
						/>
						<figcaption class="relative m-[0.6rem] rounded-[3px] bg-surface/85 px-[0.45rem] py-[0.2rem] font-mono text-[0.72rem] text-fg">
							{photo.caption}
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</div>
</section>
