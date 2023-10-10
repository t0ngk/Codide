<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;


	type Language = 'html' | 'css' | 'javascript' | '';

	export let value: string = '';
	export let language: Language = '';

	$: if (editor && editor.getValue() != value) {
		const position = editor.getPosition();
		editor.setValue(value);
		if (position) editor.setPosition(position);
	}

	onMount(async () => {
		monaco = (await import('./monaco')).default;
		editor = monaco.editor.create(editorContainer, {
			theme: 'vs-dark',
			automaticLayout: true,
			minimap: {
				enabled: false
			}
		});
		const model = monaco.editor.createModel(value, language);
		editor.setModel(model);
		editor.onDidChangeModelContent(() => {
      if (!editor) return;
			value = editor.getValue();
		});
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div class="w-full h-full bg-[#1e1e1e]">
	<div class="h-full" bind:this={editorContainer} />
</div>
