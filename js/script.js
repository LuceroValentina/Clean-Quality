document.addEventListener('DOMContentLoaded', () => {

    // 1️⃣ Buscador de títulos
    const buscador = document.getElementById('buscador');
    const titulos = document.querySelectorAll('#contenido h1, #contenido h2, #contenido h3, #contenido h4, #contenido h5, #contenido h6');

    if (buscador && titulos.length > 0) {
        const titulosOriginales = Array.from(titulos).map(t => t.innerHTML);

        buscador.addEventListener('input', () => {
            const palabra = buscador.value.trim();
            let encontrado = false;

            titulos.forEach((titulo, index) => {
                titulo.innerHTML = titulosOriginales[index];

                if (palabra === '') return;

                const regex = new RegExp(`(${palabra})`, 'gi');
                if (regex.test(titulo.textContent)) {
                    titulo.innerHTML = titulo.textContent.replace(regex, '<span style="background-color: red;">$1</span>');

                    if (!encontrado) {
                        titulo.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        encontrado = true;
                    }
                }
            });
        });
    }

    // 2️⃣ Comparador de metodologías
    const data = {
        cascada: { planificacion: "Secuencial, fases fijas", flexibilidad: "Muy baja", retroalimentacion: "Al final del proyecto", entrega: "Producto único al final", roles: "Analista, desarrollador, tester", herramientas: "Documentación, diagramas de Gantt", objetivos: "Cumplir especificaciones iniciales" },
        modelov: { planificacion: "Secuencial con pruebas asociadas", flexibilidad: "Muy baja", retroalimentacion: "Al final de cada validación", entrega: "Única al final", roles: "Analista, diseñador, tester", herramientas: "Documentación y pruebas", objetivos: "Garantizar calidad y verificación" },
        iterativo: { planificacion: "Iteraciones planificadas y entregas parciales", flexibilidad: "Media a alta", retroalimentacion: "En cada incremento", entrega: "Parcial y frecuente", roles: "Equipo técnico y gestor", herramientas: "Jira, Trello, herramientas de seguimiento", objetivos: "Adaptarse a cambios gradualmente" },
        scrum: { planificacion: "Iteraciones (Sprints)", flexibilidad: "Alta", retroalimentacion: "En cada sprint", entrega: "En cada sprint", roles: "Product Owner, Scrum Master, Equipo", herramientas: "Jira, Trello", objetivos: "Entregar valor y mejorar continuamente" },
        kanban: { planificacion: "Flujo continuo", flexibilidad: "Muy alta", retroalimentacion: "Continua", entrega: "Entrega continua", roles: "Sin roles definidos", herramientas: "Trello, Kanbanize", objetivos: "Mantener flujo eficiente" },
        xp: { planificacion: "Iteraciones cortas", flexibilidad: "Alta", retroalimentacion: "Constante", entrega: "Entregas frecuentes", roles: "Programadores y cliente activo", herramientas: "Git, Jenkins", objetivos: "Mejorar calidad del código" },
    };

    function actualizar() {
        const select1 = document.getElementById("select1");
        const select2 = document.getElementById("select2");
        if (!select1 || !select2) return;

        const metodo1 = select1.value;
        const metodo2 = select2.value;

        Array.from(select1.options).forEach(opt => opt.disabled = (opt.value === metodo2 && opt.value !== ""));
        Array.from(select2.options).forEach(opt => opt.disabled = (opt.value === metodo1 && opt.value !== ""));

        document.querySelectorAll(".info").forEach(div => {
            const row = div.dataset.row;
            const col = div.dataset.col;

            if (col === "2" && metodo1 && data[metodo1]) div.textContent = data[metodo1][row] || "";
            if (col === "3" && metodo2 && data[metodo2]) div.textContent = data[metodo2][row] || "";
        });
    }

    const s1 = document.getElementById("select1");
    const s2 = document.getElementById("select2");
    if (s1 && s2) {
        s1.addEventListener("change", actualizar);
        s2.addEventListener("change", actualizar);
        actualizar();
    }

    // 3️⃣ Formulario de contacto
    const form = document.getElementById('formulario');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const campos = form.querySelectorAll('input');
            let vacio = false;
            campos.forEach(campo => { if (campo.value.trim() === "") vacio = true; });

            if (vacio) {
                alert("Por favor, completá todos los campos antes de enviar.");
            } else {
                alert("¡El formulario se envió con éxito!");
            }
        });
    }

    // 4️⃣ Botón desplegar formulario
    const btn = document.getElementById('btn-formulario');
    const container = document.getElementById('container-formulario');
    if (btn && container) {
        btn.addEventListener('click', () => {
            container.classList.toggle('active');
        });
    }

});
