const buscador = document.getElementById('buscador');
const titulos = document.querySelectorAll('#contenido h1, #contenido h2, #contenido h3, #contenido h4, #contenido h5, #contenido h6');
const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const info = document.getElementById("info");

// Guardamos los contenidos originales de los títulos
const titulosOriginales = Array.from(titulos).map(t => t.innerHTML);

buscador.addEventListener('input', () => {
    const palabra = buscador.value.trim();
    let encontrado = false; // lleva al primer resultado que encuentra

    titulos.forEach((titulo, index) => {
        // Restaurar el texto original antes de cada búsqueda
        titulo.innerHTML = titulosOriginales[index];

        if (palabra === '') return; // si no hay búsqueda no hace nada

        const regex = new RegExp(`(${palabra})`, 'gi');
        if (regex.test(titulo.textContent)) {
            // Resaltamos solo dentro del título
            titulo.innerHTML = titulo.textContent.replace(regex, '<span style="background-color: red;">$1</span>');

            // Se desplaza al primer titulo que encuentra
            if (!encontrado) {
                titulo.scrollIntoView({ behavior: 'smooth', block: 'center' });// genera el scroll hasta donde se encuentra la palabra
                encontrado = true;
            }
        }
    });
});


//Código del comparador de metodologías
// Función para actualizar las opciones disponibles en select2
function actualizarSelect2() {
  const valor1 = select1.value;
  for (let option of select2.options) {
    option.disabled = option.value === valor1 && valor1 !== "";
  }
}

// Función para mostrar información según la combinación
function mostrarInfo() {
  const valor1 = select1.value;
  const valor2 = select2.value;

  if (valor1 && valor2) {
    // Aquí defines la información que quieres mostrar según la combinación
    if (valor1 === "opcion1" && valor2 === "opcion2") {
      info.innerHTML = "Has elegido Opción 1 y Opción 2.";
    } else if (valor1 === "opcion2" && valor2 === "opcion3") {
      info.innerHTML = "Has elegido Opción 2 y Opción 3.";
    } else {
      info.innerHTML = `Combinación: ${valor1} + ${valor2}`;
    }
  } else {
    info.innerHTML = "";
  }
}

// Event listeners
select1.addEventListener("change", () => {
  actualizarSelect2();
  mostrarInfo();
});

select2.addEventListener("change", mostrarInfo);
