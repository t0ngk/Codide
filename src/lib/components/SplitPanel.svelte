<script lang="ts">
	import Split from 'split.js';
	import { onMount } from 'svelte';
	export let options: Split.Options;
  let classes: string = '';
  export { classes as class };
	let element: HTMLDivElement;

	onMount(() => {
		const children = element.children;
		const panels = [];
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
      const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
			child.id = `split-${id}`;
			panels.push(`#split-${id}`);
		}
    if (panels.length <= 1) return;
		Split(panels, options);
	});
</script>

<div id="split" bind:this={element} class={`${classes || ''}`}>
	<slot />
</div>
