<script>
  // Tuodaan sisään tarvittavat moduulit
  import { Courses } from '@components/Courses.js';
  import { Notes } from '@components/Notes.js';
  import ListBoxSimple from '@components/ListBoxSimple.svelte';
  import { writable, get } from 'svelte/store';

  // Käytetään paikallista tallennusta Courses- ja Notes-tilanhallinnoille
  Courses.useLocalStorage();
  Notes.useLocalStorage();

  // Alustetaan muuttujat ja tilanhallinta
  let selectedCourseName;
  let inputNote = '';
  let selectObj;

  // Käytetään paikallista tilaa lisätyille muistiinpanoille
  let addedNotes = [];

  // Funktio: Lisää uusi muistiinpano valittuun kurssiin
  function addNote() {
    if (!inputNote.trim()) {
      return;
    }

    // Etsitään valittu kurssi
    const selectedCourse = get(Courses).find(course => course.name === selectedCourseName);

    // Etsitään suurin id-arvo nykyisistä muistiinpanoista ja lisätyistä muistiinpanoista
    const maxId = Math.max(...get(Notes).map(note => note.id), ...addedNotes.map(note => note.id), 0);

    // Luodaan uusi muistiinpano-objekti
    const newNote = {
      id: maxId + 1,
      text: inputNote,
      course: selectedCourse,
      timestamp: getTime()
    };

    // Päivitetään paikallinen tila suoraan
    addedNotes = [...addedNotes, newNote];

    // Tyhjennetään tekstikenttä
    inputNote = '';
  }

  // Funktio: Hae aikaleima nykyisestä ajasta
  function getTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  // Funktio: Tallenna muistiinpanot
  function saveNotes() {
    const currentNotes = get(Notes);
    Notes.set([...currentNotes, ...addedNotes]);

    // Tyhjennetään paikallinen tila tallennuksen jälkeen
    addedNotes = [];
    
    // Otetaan select-elementti uudelleen käyttöön ja tyhjennertään tekstikenttä
    selectObj.disabled = false;
    inputNote = '';
  }
</script>

<!-- Sisältökomponentin piirtoa varten -->
<p>Add new notes to course</p><br>

<label for="courses_dropdown_list">Course: </label>
<select name="Courses" id="courses_dropdown_list" bind:value={selectedCourseName} bind:this={selectObj}>
  {#if $Courses && $Courses.length > 0}
    {#each $Courses as course}
      <option value={course.name}>{course.name[0].toUpperCase() + course.name.slice(1)}</option>
    {/each}
  {/if}
</select><br>

<textarea name="note_input" id="note_input" bind:value={inputNote}></textarea>

<button on:click={addNote}>Add</button>
<button on:click={saveNotes}>Save</button><br>

<!-- Näytä lisätyt muistiinpanot -->
{#if addedNotes.length > 0}
  {#each addedNotes as note }
    <ListBoxSimple note_text={note.text}/>
  {/each}
{/if}

<style>
  #courses_dropdown_list {
    text-align: right;
  }

  p {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333; 
  }

  label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0px;
    color: #333;
  }

  #note_input {
    display: block;
    border: none;
    outline: none;
    width: 40%;
    height: 100px;
    margin: 10px 0;
    background-color: #f5f5f5; 
    padding: 10px; 
  }

  button {
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }

  button:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
</style>
