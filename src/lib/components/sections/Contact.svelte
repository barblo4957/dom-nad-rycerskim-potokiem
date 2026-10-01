<script lang="ts">
	import { contactCopy, nap, onlinePresence } from '$lib/data/site';
</script>

<section id="kontakt" class="bg-forest text-on-forest">
	<div class="mx-auto grid max-w-[1120px] items-start gap-8 px-4 py-12 md:grid-cols-[1.2fr_1fr] md:gap-14 md:py-20">
		<div>
			<p class="font-mono text-[0.78rem] tracking-[0.08em] text-on-forest/70 uppercase">{contactCopy.eyebrow}</p>
			<h2 class="mt-2 font-display text-step-3 leading-[1.12]">{contactCopy.title}</h2>
			<p class="mt-4 max-w-[48ch] text-on-forest/80">{contactCopy.description}</p>
			<div class="mt-7 flex flex-wrap items-center gap-3">
				<a
					href={nap.phoneTel}
					class="font-mono text-[clamp(1.5rem,3.6vw,2.2rem)] tracking-[0.02em] text-on-forest no-underline select-all"
				>
					{nap.phone}
				</a>
			</div>
			<p class="mt-3 text-[0.9rem] text-on-forest/70">
				Wolisz rezerwować online?
				<a href={onlinePresence.bookingUrl} target="_blank" rel="noopener" class="text-on-forest underline">
					Booking.com
				</a>
			</p>
		</div>
		<address class="grid gap-1 rounded-(--radius-token) border border-on-forest/20 p-6 not-italic">
			<b class="font-display text-[1.25rem] text-on-forest">{nap.name}</b>
			<span>{nap.street}</span>
			<span>{nap.postalCode} {nap.city}</span>
			<span>{nap.region}</span>
			<a href={nap.mapsUrl} target="_blank" rel="noopener" class="mt-2 text-on-forest underline">
				Otwórz w Mapach Google
			</a>
		</address>
	</div>
</section>
