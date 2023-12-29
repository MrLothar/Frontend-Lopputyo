// Sisältää muistiinpanojen tilanhallinnan luomisen ja paikallisen tallennuksen
import { writable } from 'svelte/store';

// Funktion luominen paikallisen tilanhallinnan luomiseksi
const createLocalStore = (key) => {
  let value;

  // Tarkistetaan, onko selainympäristössä saatavilla localStorage
  if (typeof localStorage !== 'undefined') {
    value = JSON.parse(localStorage.getItem(key));
  } else {
    value = null; // `null` > tyhjä merkkijono.
  }

  // Luodaan tilanhallinnan tila ja päivitysfunktio
  const { subscribe, set } = writable(value);

  // Palautetaan tilanhallinnan rajapinta ja paikallisen tallennuksen funktio
  return {
    subscribe,
    set,
    useLocalStorage: () => {
      // Tilan päivitysfunktio, joka tallentaa tilan localStorageen
      subscribe(current => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(current));
        }
      });
    }
  };
};

// Viedään ulos luotu tilanhallinta Notes-nimisenä
export const Notes = createLocalStore('Notes');