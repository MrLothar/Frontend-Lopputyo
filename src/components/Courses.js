// Moduuli tuodaan svelte/storesta
import { writable } from 'svelte/store';

// Luo paikallisen tallennusmoduulin
const createLocalStore = (key) => {
  // Alustetaan arvo
  let value;

  // Tarkistetaan, onko selaimessa localStorage-tuki
  if (typeof localStorage !== 'undefined') {
    // Jos on, ladataan arvo localStoragesta
    value = JSON.parse(localStorage.getItem(key));
  } else {
    // Jos ei ole, arvoksi asetetaan null
    value = null;
  }

  // Luodaan tila, joka on tilaobjekti svelte/storesta
  const { subscribe, set } = writable(value);

  // Palautetaan rajapinta
  return {
    subscribe,
    set,
    // Käyttöliittymä paikallisen tallennuksen kanssa
    useLocalStorage: () => {
      subscribe(current => {
        // Tarkistetaan uudestaan, onko selaimessa localStorage-tuki
        if (typeof localStorage !== 'undefined') {
          // Tallennetaan tila localStorageen
          localStorage.setItem(key, JSON.stringify(current));
        }
      });
    }
  };
};

// Viedään Courses-nimellä
export const Courses = createLocalStore('Courses');
