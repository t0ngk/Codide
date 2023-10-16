<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import Gear from '../icon/Gear.svelte';
	const {
		elements: { menu, item, trigger }
	} = createDropdownMenu();
  export let openModal = false;

	const logout = async () => {
		const res = await fetch('/api/logout');
		if (res.ok) {
			window.location.href = '/login';
		} else {
			console.log(await res.json());
		}
	};
</script>

<button
	use:melt={$trigger}
	class="p-1 text-2xl border transition md:hover:bg-white active:bg-slate-200 active:text-[#080404] md:hover:text-[#080404]"
	><Gear />
</button>
<div class="w-[350px] md:w-[300px] text-white bg-[#080404] border p-2 space-y-2" use:melt={$menu}>
	<div use:melt={$item}>
		<button
			class="w-full px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
      on:click={() => (openModal = true)}
			>Setting</button
		>
	</div>
	<div use:melt={$item}>
		<button
			class="w-full px-2 py-1 border transition text-red-500 border-red-500 hover:bg-red-500 active:bg-red-600 hover:text-[#080404]"
			on:click={logout}
			>Logout</button
		>
	</div>
</div>
