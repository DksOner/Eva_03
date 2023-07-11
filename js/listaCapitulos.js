const url = 'https://rickandmortyapi.com/api/episode';
let capitulos = [];

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
               "estreno" : item.air_date,
               "capitulo" : item.episode
         };
         capitulos.push(ob);
      });

      console.table(capitulos);
      actualizarTablaAPI();
   })
   .catch(function(error) {
      console.log(error);
   });
}

function actualizarTablaAPI() {
   let tbody = document.getElementById("caps");
   tbody.innerHTML = "";
   for( let index = 0; index < capitulos.length; index++) {
      let fila = document.createElement("tr");

      let columnId = document.createElement("td");
      columnId.textContent = capitulos[index].id;
      fila.appendChild(columnId);

      let columnName = document.createElement("td");
      columnName.textContent = capitulos[index].nombre;
      fila.appendChild(columnName);

      let columnEstreno = document.createElement("td");
      columnEstreno.textContent = capitulos[index].estreno;
      fila.appendChild(columnEstreno);

      let columnCapitulo = document.createElement("td");
      columnCapitulo.textContent = capitulos[index].capitulo;
      fila.appendChild(columnCapitulo);

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

      // Aquí guarde los datos en el capitulos**
   };
}
document.addEventListener("DOMContentLoaded", actualizarTablaAPI);

function eliminarElemento(index) {
   capitulos.splice(index, 1);
   actualizarTablaAPI();
}