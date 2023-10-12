<script lang="ts">
	import ProfileModal from '../modal/ProfileModal.svelte';
  import Navbar from './Navbar.svelte';
  let openModal = false;
</script>

<ProfileModal bind:open={openModal} />
<Navbar>
	<div slot="action">
		<!-- <div class="flex gap-2 items-center">
			<button
				class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
				>Start Coding</button
			>
			<button
        on:click={() => {
          openModal = true;
        }}
				class="px-2 py-1 border transition text-red-500 border-red-500 hover:bg-red-500 active:bg-red-600 hover:text-[#080404]"
				>Setting</button
			>
		</div> -->
	</div>
</Navbar>
