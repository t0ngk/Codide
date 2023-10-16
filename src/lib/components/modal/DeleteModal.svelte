<script lang="ts">
	import Icon from "@iconify/svelte";
	import Modal from "./Modal.svelte";

  export let open = false;
  export let confirmDelete = () => {};
  export let loading = false;
</script>

<Modal bind:open close={false} class="w-[90%] md:w-auto" title="">
  <h1 class="text-xl">
    Are you sure you want to delete this project?
  </h1>
  <div class="flex gap-2 mt-2">
    <button class="w-full px-2 py-1 border transition text-red-500 border-red-500 hover:bg-red-500 active:bg-red-600 hover:text-[#080404] flex justify-center items-center gap-1" on:click={() => {confirmDelete();}}>
      {#if loading}
        <Icon icon="line-md:loading-loop" />
      {/if}
      Delete
    </button>
    <button class="w-full px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]" on:click={() => (open = false)}>Cancel</button>
  </div>
</Modal>
