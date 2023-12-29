import { Courses } from './components/Courses.js';
import { Notes } from './components/Notes.js';
import { get } from 'svelte/store';

// Käytetään paikallista tallennustilaa Courses- ja Notes-komponenteille
Courses.useLocalStorage();
Notes.useLocalStorage();

// Määritetään yleinen funktio datan käsittelylle
function processData(url, expectedKeys, store) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Suodatetaan data, joka ei vastaa odotettuja avaimia
      if (Array.isArray(data)) {
        data = data.filter(item => JSON.stringify(Object.keys(item)) === JSON.stringify(expectedKeys));
      }

      // Haetaan tallennetut kohteet
      let items = get(store);

      // Suodatetaan tallennetut kohteet, jotka eivät vastaa odotettuja avaimia
      if (Array.isArray(items)) {
        items = items.filter(item => JSON.stringify(Object.keys(item)) === JSON.stringify(expectedKeys));
      }

      // Asetetaan tallennustila uudelleen käsitellylle datalle
      if (!Array.isArray(items)) {
        store.set(data);
      } else if (Array.isArray(data)) {
        data.forEach(item => {
          // Lisätään uudet kohteet, jotka eivät ole jo tallennettuna
          if (!items.some(dict => JSON.stringify(dict) === JSON.stringify(item))) {
            items.push(item);
          }
        });
        store.set(items);
      }
    })
    .catch(error => {
      // Käsittelee virhe, aseta tallennustila tyhjäksi
      if (!get(store)) store.set([]);
    });
}

// Käsittellään Notes-data
processData(
  'https://luentomuistiinpano-api.netlify.app:443/.netlify/functions/notes',
  ["id", "text", "course", "timestamp"],
  Notes
);

// Käsittellään Courses-data
processData(
  'https://luentomuistiinpano-api.netlify.app:443/.netlify/functions/courses',
  ["id", "name"],
  Courses
);
