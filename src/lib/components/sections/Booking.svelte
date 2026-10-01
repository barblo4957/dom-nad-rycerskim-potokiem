<script lang="ts">
	import { bookingRules, faq } from '$lib/data/site';
	import { resolvePending } from '$lib/data/pending';
	import Pending from '$lib/components/Pending.svelte';

	const visibleFaq = faq
		.map((item) => ({ ...item, resolvedAnswer: resolvePending(item.answer) }))
		.filter((item) => item.resolvedAnswer);
</script>

<section id="zasady" class="py-12 md:py-20">
	<div class="mx-auto grid max-w-[1120px] gap-8 px-4 md:grid-cols-[1fr_1.3fr] md:gap-14">
		<div>
			<p class="font-mono text-[0.78rem] tracking-[0.08em] text-moss uppercase">Rezerwacja</p>
			<h2 class="mt-2 mb-6 font-display text-step-3 leading-[1.12] text-fg">Jak zarezerwować</h2>
			<dl class="m-0 grid grid-cols-[auto_1fr] gap-x-5 gap-y-[0.6rem]">
				<dt class="pt-[0.2rem] font-mono text-[0.8rem] tracking-[0.05em] text-muted uppercase">Kontakt</dt>
				<dd class="m-0">{bookingRules.contact}</dd>
				<dt class="pt-[0.2rem] font-mono text-[0.8rem] tracking-[0.05em] text-muted uppercase">Zadatek</dt>
				<dd class="m-0">{bookingRules.deposit}</dd>
				<dt class="pt-[0.2rem] font-mono text-[0.8rem] tracking-[0.05em] text-muted uppercase">Płatność</dt>
				<dd class="m-0">{bookingRules.payment}</dd>
				<dt class="pt-[0.2rem] font-mono text-[0.8rem] tracking-[0.05em] text-muted uppercase">Opłata klimat.</dt>
				<dd class="m-0">{bookingRules.climateTax}</dd>
				<dt class="pt-[0.2rem] font-mono text-[0.8rem] tracking-[0.05em] text-muted uppercase">Faktura</dt>
				<dd class="m-0">{bookingRules.invoice}</dd>
				<dt class="pt-[0.2rem] font-mono text-[0.8rem] tracking-[0.05em] text-muted uppercase">Przyjazd</dt>
				<dd class="m-0">
					{bookingRules.selfCheckIn}
					<Pending field={bookingRules.checkInOut}>
						{#snippet children(hours)}, godziny: {hours}{/snippet}
					</Pending>
				</dd>
			</dl>
		</div>
		<div>
			<p class="font-mono text-[0.78rem] tracking-[0.08em] text-moss uppercase">Pytania</p>
			<h2 class="mt-2 mb-6 font-display text-step-3 leading-[1.12] text-fg">Najczęściej pytacie</h2>
			{#each visibleFaq as item (item.question)}
				<details class="border-b border-line py-[0.95rem] first:border-t">
					<summary
						class="flex cursor-pointer list-none justify-between gap-4 font-semibold marker:content-none after:font-mono after:text-muted after:content-['+'] open:after:content-['–']"
					>
						{item.question}
					</summary>
					<p class="mt-[0.6rem] max-w-[60ch] text-muted">{item.resolvedAnswer}</p>
				</details>
			{/each}
		</div>
	</div>
</section>
