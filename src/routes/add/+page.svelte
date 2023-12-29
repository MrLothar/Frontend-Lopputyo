<script>
    import { Courses } from '@components/Courses.js';
    import { Notes } from '@components/Notes.js';
    import ListBoxSimple from '@components/ListBoxSimple.svelte';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
  
    // Käytetään paikallista tallennusta Courses- ja Notes-tilanhallinnoille
    Courses.useLocalStorage();
    Notes.useLocalStorage();
  
    // Luodaan paikallinen tilanhallinta addedCourses-listalle
    const addedCourses = writable([]);
    let inputText = '';
  

    // Funktioidaan lisää kurssin listaan ja päivitetään tila
    function addToList() {
      if (!inputText.trim()) {
        return;
      }
    // Haetaan nykyiset kurssit
      const currentCourses = get(Courses);
    // Tarkistetaan, onko kurssi jo olemassa
      if (currentCourses.some(course => course.name === inputText)) {
        return;
      }
    // Luodaan uusi kurssi-objekti
      const newCourse = {
        id: currentCourses.length > 0 ? Math.max(...currentCourses.map(course => course.id)) + 1 : 1,
        name: inputText
      };
    // Päivitetään kurssit ja lisää uusi kurssi addedCourses-listaan
      Courses.set([...currentCourses, newCourse]);
      addedCourses.update(list => [...list, newCourse]);
    }
    // Lisää kurssit tekstikentän ja painikkeen avulla
  </script>
  <p>Add courses</p>
  <textarea type="text" id="course_input" bind:value={inputText}></textarea><br>
  <button on:click={addToList}>Save</button>
  
  {#each $addedCourses as course}
    <ListBoxSimple note_text={`Opintojakso ${course.name} lisätty id:llä ${course.id}`} />
  {/each}
  
  <style>

    p {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333; 
    }

    textarea {
      display: block;
      width: 40%;
      height: 100px;
      margin: 10px 0;
      border: none;
      outline: none;
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
  