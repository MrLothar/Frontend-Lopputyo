<script>
  import { Courses } from '@components/Courses.js';
  import { Notes } from '@components/Notes.js';
  import ListBox from '@components/listbox.svelte';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  // Käytetään paikallista tallennustilaa Courses- ja Notes-komponenteille
  Courses.useLocalStorage();
  Notes.useLocalStorage(); 

  // Määrittää valitun kurssin
  let selected;
  
  // Alustetaan valittujen muistiinpanojen lista
  let Selected_List = get(Notes);

  // Virheteksti, näytetään, jos ei ole muistiinpanoja
  let Error_text;

  // Tilataan muutokset Notes-tilasta ja päivitä listaa
  Notes.subscribe(value => {
    UpdateList();
  })

  // Päivittää listaa komponentin mountin aikana
  onMount(() => {
    UpdateList();
  });

  // Päivittää valittujen muistiinpanojen lista
  function UpdateList() {
    // Haetaan kaikki muistiinpanot
    let Full_list = get(Notes);
    
    // Jos muistiinpanot eivät ole taulukko(ja), alusta tyhjäksi taulukoksi
    if (!Array.isArray(Full_list)) {
      Full_list = [];
    }

    // Suodata muistiinpanot valitun kurssin perusteella
    let Temp_list = [];
    Full_list.forEach(note => {
      if (selected === 'all' || note.course.name === selected) {
        Temp_list.push(note);
      }
    });

    // Näytä virheteksti, jos muistiinpanoja ei ole
    try {
      if (Temp_list.length == 0) {
        Error_text.innerText = 'Ei muistiinpanoja!';
      } else {
        Error_text.innerHTML = '';
      }
    } catch {}

    // Päivitä valittujen muistiinpanojen lista
    Selected_List = Temp_list;
  }
</script>

<!-- Näytä kurssin valinta "dropdownina" -->
<label for="notes_dropdown_list">Course: </label>
<select name="Courses" id="notes_dropdown_list" bind:value={selected} on:change={UpdateList}>
    <option value="all">All</option>
    {#if $Courses && $Courses.length > 0}
      {#each $Courses as course}
        <option value={course.name}>{course.name[0].toUpperCase() + course.name.slice(1)}</option>
      {/each}
    {/if}
</select><br>

<!-- Näytä virheteksti, jos ei ole muistiinpanoja -->
<p bind:this={Error_text}></p>

<!-- Näytä jokainen valitun kurssin muistiinpano käyttäen ListBox-komponenttia -->
{#each Selected_List as note (note.id)}
  <ListBox note_course={note.course.name}, note_id={note.id}, note_text={note.text}, note_time={note.timestamp} />
{/each}

<style>
  
  #notes_dropdown_list {
    text-align: right;
  }
</style>
