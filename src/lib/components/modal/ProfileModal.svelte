<script lang="ts">
	import Modal from './Modal.svelte';
	export let open = false;
</script>

<Modal title="Setting" bind:open>
	<div class="flex flex-col w-full items-center gap-2">
		<div class="w-40 aspect-square flex justify-center">
			<img
				src="https://github.com/identicons/asddddddddddddddddd.png"
				alt="Profile Img"
				class="rounded-md w-full h-full"
			/>
		</div>
    <div class="w-full p-2 border">
      <p class="text-start w-full">Display name</p>
      <div class="w-full flex gap-2">
        <input
          class="flex-1 p-2 bg-transparent border rounded-none"
          placeholder="Display name"
          type="text"
          name=""
          id=""
        />
        <button
          class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
          >Change</button
        >
      </div>
    </div>
    <div class="w-full p-2 border">
      <p class="text-start w-full">Password</p>
      <div class="w-full flex flex-col gap-2">
        <input
          class="w-full p-2 bg-transparent border rounded-none"
          placeholder="Current Password"
          type="text"
          name=""
          id=""
        />
        <input
          class="w-full p-2 bg-transparent border rounded-none"
          placeholder="New Password"
          type="text"
          name=""
          id=""
        />
        <input
          class="w-full p-2 bg-transparent border rounded-none"
          placeholder="Confirm Password"
          type="text"
          name=""
          id=""
        />
        <button
          class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
          >Change</button
        >
      </div>
    </div>
	</div>
</Modal>
