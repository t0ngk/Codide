<script lang="ts">
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';
</script>

<div class="w-full h-full flex flex-col justify-center items-center gap-2 text-white bg-[#080404]">
	<p>404 Not found.</p>
	<button
		class="px-2 py-1 border"
		on:click={() => {
			goto('/code/new');
		}}>Code something</button
	>
</div>
