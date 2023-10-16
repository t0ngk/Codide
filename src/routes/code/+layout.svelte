<script lang="ts">
	import CodeNavbar from '$lib/components/navbar/CodeNavbar.svelte';
	import type { Project } from '$lib/types/project';
	import type { User } from '$lib/types/user';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const user:User = data.user;
  const project:Project | null = data.project;
</script>

<svelte:head>
	<title>{project?.name} - Codide</title>
	<meta name="title" content={`${project?.name} - Codide`} />
	<meta property="twitter:title" content={`${project?.name} - Codide`} />
</svelte:head>

<div class="w-full h-full">
	<div class="h-[10%]">
		<CodeNavbar user={user} project={project} />
	</div>
	<div class="h-[90%] w-full">
		<slot />
	</div>
</div>
