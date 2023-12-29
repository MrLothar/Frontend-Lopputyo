<script>
    // Tuodaan sisään tarvittavat komponentit ja moduulit
    import Linkbox from '@components/linkbox.svelte';
    import { Courses } from '@components/Courses.js';
    import { Notes } from '@components/Notes.js';
    import { get } from 'svelte/store';

    // Käytetään paikallista tallennusta Courses- ja Notes-tilanhallinnoille
    Courses.useLocalStorage();
    Notes.useLocalStorage();
</script>

  
<!-- Sisältö komponentin "piirtoa" varten -->

{#if $Courses && $Courses.length > 0}
    <Linkbox href="/create" text="Create notes for class" />
{/if}

<Linkbox href="/list" text="List notes" />
<Linkbox href="/add" text="Add courses" />