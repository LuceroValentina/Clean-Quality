const buscador = document.getElementById('buscador');
const titulos = document.querySelectorAll('#contenido h1, #contenido h2, #contenido h3, #contenido h4, #contenido h5, #contenido h6');

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
