<script lang="ts">
	import { nap, onlinePresence } from '$lib/data/site';
</script>

<footer class="py-8 text-[0.88rem] text-muted">
	<div class="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-4">
		<span>© {nap.name} · {nap.addressLine} · {nap.phone}</span>
		<ul class="m-0 flex flex-wrap gap-x-4 gap-y-1 list-none p-0" aria-label="Obiekt w serwisach">
			{#each onlinePresence.platforms as platform (platform)}
				<li>{platform}</li>
			{/each}
		</ul>
	</div>
</footer>
