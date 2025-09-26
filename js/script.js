const buscador = document.getElementById('buscador');
const titulos = document.querySelectorAll('#contenido h1, #contenido h2, #contenido h3, #contenido h4, #contenido h5, #contenido h6');

// Guardamos los contenidos originales de los títulos
const titulosOriginales = Array.from(titulos).map(t => t.innerHTML);

buscador.addEventListener('input', () => {
    const palabra = buscador.value.trim();

    titulos.forEach((titulo, index) => {
        // Restaurar el texto original antes de cada búsqueda
        titulo.innerHTML = titulosOriginales[index];

        if (palabra === '') return; // si no hay búsqueda, no hacemos nada

        const regex = new RegExp(`(${palabra})`, 'gi');
        if (regex.test(titulo.textContent)) {
            // Resaltamos solo dentro del título
            titulo.innerHTML = titulo.textContent.replace(regex, '<span style="background-color: red;">$1</span>');
        }
    });
});
