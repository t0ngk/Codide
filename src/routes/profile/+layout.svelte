<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
import ProfileNavbar from '$lib/components/navbar/ProfileNavbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="w-full h-full">
	<div class="w-full h-[10%]">
		<ProfileNavbar />
	</div>
	<div class="w-full h-[90%]">
		<slot />
	</div>
</div>
