<script lang="ts">
import ProfileNavbar from '$lib/components/navbar/ProfileNavbar.svelte';
	import type { User } from '$lib/types/user';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>



<div class="w-full h-full">
	<div class="w-full h-[10%]">
		<ProfileNavbar user={data.user} />
	</div>
	<div class="w-full h-[90%]">
		<slot />
	</div>
</div>
