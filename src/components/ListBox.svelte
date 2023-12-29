<script>
  import { Notes } from '@components/Notes.js';  // Tuodaan Notes-tilanhallinnan moduuli
  import { get } from 'svelte/store';

  // Skriptin ulkopuolelta annetut ominaisuudet (props)
  export let note_course;  
  export let note_id;      
  export let note_text;    
  export let note_time;    

  // Muunnetaan aikaleima "suomalaiseen" muotoon
  let date = new Date(note_time);
  let date2 = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

  // Muunnetaan kurssin nimi näytettävään muotoon
  let output = note_course.replace(/[^a-zäö\s]/gi, "");  
  output = output[0].toUpperCase() + output.slice(1);     

  // Funktio: Poista muistiinpano
  function delete_div(e) {
    let del_id = e.target.getAttribute('data');  
    let current_list = get(Notes);  
    let newlist = [];

    // Käydään läpi nykyiset muistiinpanot ja lisätään ne uuteen listaan, paitsi poistettava
    current_list.forEach(note => {
      if (del_id != note.id) {
        newlist.push(note);
      }
    });

    // Päivitetään muistiinpanot
    Notes.set(newlist);
  }
</script>

<!-- HTML-rakenne: Yhdistetty muistiinpanon sisältö ja poistopainike -->
<div class="list-box">
  <div class="list-header">{output} (id {note_id.slice(0, -1)})</div>
  <div class="list-time">{date2}</div>
  <button class="delete-button" on:click={delete_div} data={note_id.slice(0, -1)}>x</button>
  <div class="list-text">{note_text.slice(0, -1)}</div>
</div>

<style>
  .page-container {
    min-height: auto;
    overflow-y: auto;
  }

  .list-box {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    transition: box-shadow 0.3s, transform 0.3s;
    position: relative;
    margin: 20px auto;
  }

  .list-box:hover {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }

  .list-header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .list-time {
    color: #888;
    margin-bottom: 10px;
  }

  .delete-button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .delete-button:hover {
    background-color: #c0392b;
    transform: scale(1.1);
  }

  .list-text {
    margin-top: 20px;
    position: relative;
  }
</style>
