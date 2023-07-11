const url = 'https://rickandmortyapi.com/api/character';
let array = [];

function leerApi() {
   fetch(url)
   .then(function(response) {
      return response.json();
   })
   .then(function(data) {
      data.results.forEach(function(item) {
         const ob = {
               "id" : item.id,
               "nombre" : item.name,
               "especie" : item.species,
               "origen" : item.origin.name,
               "imagen" : item.image
         };
         array.push(ob);
      });

      console.table(array);
      actualizarTabla();
   })
   .catch(function(error) {
      console.log(error);
   });
}

function actualizarTabla() {
   let tbody = document.getElementById("pjs");
   tbody.innerHTML = "";
   for( let index = 0; index < array.length; index++) {
      let fila = document.createElement("tr");

      let columnId = document.createElement("td");
      columnId.textContent = array[index].id;
      fila.appendChild(columnId);

      let columnName = document.createElement("td");
      columnName.textContent = array[index].nombre;
      fila.appendChild(columnName);

      let columnEspecie = document.createElement("td");
      columnEspecie.textContent = array[index].especie;
      fila.appendChild(columnEspecie);

      let columnOrigen = document.createElement("td");
      columnOrigen.textContent = array[index].origen;
      fila.appendChild(columnOrigen);

      let columnImagen = document.createElement("td");

      let imagen = document.createElement("img");
      imagen.src = array[index].imagen;
      imagen.alt = array[index].nombre;
      imagen.classList.add("personaje-imagen");
      columnImagen.appendChild(imagen);
      fila.appendChild(columnImagen);

      // Crear la columna de opciones
      let columnOpciones = document.createElement("td");
      let btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.className = "btn btn-danger me-2";
      btnEliminar.addEventListener("click", function () {
         eliminarElemento(index);
      });
      columnOpciones.appendChild(btnEliminar);

      fila.appendChild(columnOpciones);

      tbody.appendChild(fila);

      // Aquí guarde los datos en el array**
   };
}
document.addEventListener("DOMContentLoaded", actualizarTabla);

function eliminarElemento(index) {
   array.splice(index, 1);
   actualizarTabla();
}