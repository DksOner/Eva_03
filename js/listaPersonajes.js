const url = 'https://rickandmortyapi.com/api/character';
let array = [];
let ultimoId = 0;
let imagenURL = null;

function leerApi() {
   fetch(url)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         data.results.forEach(function (item) {
            const ob = {
               "id": item.id,
               "nombre": item.name,
               "especie": item.species,
               "origen": item.origin.name,
               "imagen": item.image
            };
            array.push(ob);
         });

         console.table(array);
         actualizarTablaAPI();
      })
      .catch(function (error) {
         console.log(error);
      });
}

function actualizarTablaAPI() {
   let tbody = document.getElementById("pjs");
   tbody.innerHTML = "";
   for (let index = 0; index < array.length; index++) {
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
   };
}
document.addEventListener("DOMContentLoaded", actualizarTablaAPI);


let nombre = document.getElementById("nombre");
let origen = document.getElementById("origen");
let especie = document.getElementById("especie");
let imagen = document.getElementById("imagen");

imagen.addEventListener('change', function() {
   const file = imagen.files[0];
   const reader = new FileReader();
   reader.addEventListener('load', function() {
      imagenURL = reader.result;
   });
   if (file) {
      reader.readAsDataURL(file);
   }
});

function validNombre() {
   let regex = /^[A-Za-z\s]+$/;
   let validNombre = document.getElementById("validNombre");
   if (!regex.test(nombre.value)) {
      validNombre.style.color = "display:block;";
      validNombre.innerText = "El nombre debe tener al menos 1 caracter";
      validNombre.className = "text-danger";

      nombre.className = "form-control border-input-error";
      return false;
   }
   nombre.className = "form-control border-input-success";
   validNombre.style = "display:none;";
   return true;
}

function validOrigen() {
   let regex = /^[A-Za-z\s]+$/;
   let validOrigen = document.getElementById("validOrigen");
   if (!regex.test(origen.value)) {
      validOrigen.style.color = "display:block;";
      validOrigen.innerText = "El nombre debe tener al menos 1 caracter";
      validOrigen.className = "text-danger";

      origen.className = "form-control border-input-error";
      return false;
   }
   origen.className = "form-control border-input-success";
   validOrigen.style = "display:none;";
   return true;
}

function validEspecie() {
   let regex = /^[A-Za-z\s]+$/;
   let validEspecie = document.getElementById("validEspecie");
   if (!regex.test(especie.value)) {
      validEspecie.style.color = "display:block;";
      validEspecie.innerText = "El nombre debe tener al menos 1 caracter";
      validEspecie.className = "text-danger";

      especie.className = "form-control border-input-error";
      return false;
   }
   especie.className = "form-control border-input-success";
   validEspecie.style = "display:none;";
   return true;
}
nombre.addEventListener('input', validNombre);
origen.addEventListener('input', validOrigen);
especie.addEventListener('input', validEspecie);

function leerInput() {
   let valid1 = validNombre();
   let valid2 = validOrigen();
   let valid3 = validEspecie();

   if (valid1 && valid2 && valid3) {
      let ob = {
         "id": array.length > 0 ? array[array.length - 1].id + 1 : 1,
         "nombre": nombre.value,
         "origen": origen.value,
         "especie": especie.value
      };
      array.push(ob);
      ob.imagen = imagenURL
      actualizarTablaForm();
      console.table(array);
      limpiar();
   }
}

function limpiar() {
   nombre.value = "";
   nombre.className = "form-control";
   origen.value = "";
   origen.className = "form-control";
   especie.value = "";
   especie.className = "form-control";
   imagen.value = null;
   imagenURL = null;
   origen.focus();
}

function actualizarTablaForm() {
   let tbody = document.getElementById("pjs");
   tbody.innerHTML = "";
   for (let index = 0; index < array.length; index++) {
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

      if (array[index].imagen) {
         let imagen = document.createElement("img");
         imagen.src = array[index].imagen;
         imagen.alt = array[index].nombre;
         imagen.classList.add("personaje-imagen");
         columnImagen.appendChild(imagen);
      } else {
         columnImagen.textContent = "Imagen no disponible";
      }
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
   };
}
document.addEventListener("DOMContentLoaded", actualizarTablaForm);


function eliminarElemento(index) {
   array.splice(index, 1);
   actualizarTablaAPI();
}