<script lang="ts">
	import { facts } from '$lib/data/site';
</script>

<div
	class="mx-auto grid max-w-[1120px] grid-cols-2 border-y border-line px-4 sm:grid-cols-4"
	aria-label="Dom w liczbach"
>
	{#each facts as fact, i (fact.label)}
		<div
			class="border-line px-4 py-5 {i % 2 === 1 ? 'border-l' : ''} {i === 2
				? 'sm:border-l'
				: ''} {i >= 2 ? 'border-t sm:border-t-0' : ''}"
		>
			<b class="block font-mono text-[1.5rem] font-medium tabular-nums text-fg">{fact.value}</b>
			<span class="text-[0.9rem] text-muted">{fact.label}</span>
		</div>
	{/each}
</div>
