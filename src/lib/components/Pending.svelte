<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { resolvePending, type PendingField } from '$lib/data/pending';
	import Note from './Note.svelte';

	let {
		field,
		children,
		empty
	}: {
		field: PendingField<T>;
		children: Snippet<[T]>;
		empty?: Snippet;
	} = $props();

	const resolved = $derived(resolvePending(field));
</script>

{#if resolved !== null}
	{@render children(resolved)}
{:else if empty}
	{@render empty()}
{/if}
{#if field.pending}
	<Note>{field.pending}</Note>
{/if}
