<script lang="ts">
    import CodeNavbar from '$lib/components/navbar/CodeNavbar.svelte';
import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>

<div class="w-full h-full">
    <div class="h-[10%]">
        <CodeNavbar />
    </div>
    <div class="h-[90%] w-full">
        <slot />
    </div>
</div>
