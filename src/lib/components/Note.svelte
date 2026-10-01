<script lang="ts">
	import { env } from '$env/dynamic/public';

	let { children } = $props();

	const show = env.PUBLIC_SHOW_NOTES === 'true';
</script>

{#if show}
	<span
		class="inline-flex items-baseline gap-[.4em] rounded border border-dashed border-(--color-note-line) bg-(--color-note-bg) px-[.55em] py-[.2em] font-mono text-[.74rem] leading-[1.35] text-(--color-note-fg)"
	>
		<span class="font-medium tracking-[.06em] uppercase">do potwierdzenia</span>
		{@render children()}
	</span>
{/if}
