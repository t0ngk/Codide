<script lang="ts">
	import Monaco from '$lib/components/monaco/Monaco.svelte';
	import Icon from '@iconify/svelte';
	// import Monaco from 'svelte-monaco';

	type Language = 'html' | 'css' | 'javascript' | '';

	export let icon: string = 'mdi:file-document-multiple';
	export let title: string = 'Page';
	export let language: Language = '';
	export let value: string = '';
</script>

<div class="w-full overflow-hidden flex flex-col bg-[#1e1e1e]">
	<div class="p-2 text-white flex justify-between items-center gap-1">
    <div class="flex items-center gap-1">
      <Icon {icon} />
      <p>{title}</p>
    </div>
    <div>
      <slot name="actions" />
    </div>
	</div>
	<div class="h-full flex-1">
		<Monaco language={language} bind:value />
    
		<!-- <Monaco
			options={{
				language,
        automaticLayout: true,
				minimap: {
					enabled: false
				}
			}}
			theme="vs-dark"
			bind:value
		/> -->
	</div>
</div>
