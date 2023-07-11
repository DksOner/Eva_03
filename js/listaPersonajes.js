const url = 'https://rickandmortyapi.com/api/character';
let datosAPI = [];

function mostrarPersonajes() {
   fetch(url)
   .then(function(response) {
      return response.json();
   })
   .then( data => {
      let tbody = document.getElementById("pjs");
      for( let i of data["results"]) {
         const fila = tbody.insertRow();
         const columnId = fila.insertCell();
         const columnName = fila.insertCell();
         const columnEspecie = fila.insertCell();
         const columnOrigen = fila.insertCell();
         const columnImagen = fila.insertCell();

         columnId.textContent = i.id;
         columnName.textContent = i.name;
         columnEspecie.textContent = i.species;
         columnOrigen.textContent = i.origin.name;

         const imagen = document.createElement("img");
         imagen.src = i.image;
         imagen.alt = i.name;
         imagen.classList.add("personaje-imagen");
         columnImagen.appendChild(imagen);

         // Aquí guarde los datos en el array**
         datosAPI.push({
            id: i.id,
            name: i.name,
            species: i.species,
            origin: i.origin.name,
            image: i.image
         });
      };
   })
   .catch(function(error) {
      console.log(error);
   });
}

function agregarFila() {
   
}