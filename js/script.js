document.addEventListener('DOMContentLoaded', () => {

    //Buscador de títulos
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

    //Comparador de metodologías
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

    // Formulario de contacto FIJARSE SI ANDA
    const contactoForm = document.getElementById('formulario-contacto');
    if (contactoForm) {
        contactoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const campos = contactoForm.querySelectorAll('input');
            let vacio = false;
            campos.forEach(campo => { if (campo.value.trim() === "") vacio = true; });

            if (vacio) {
                alert("Por favor, completá todos los campos antes de enviar.");
            } else {
                alert("¡El formulario se envió con éxito!");
            }
        });
    }


    //Botón desplegar formulario
    const btn = document.getElementById('btn-formulario');
    const container = document.getElementById('container-formulario');
    if (btn && container) {
        btn.addEventListener('click', () => {
            container.classList.toggle('active');
        });
    }


    // Encuesta
    const encuestaForm = document.getElementById("formulario");
    const resultado = document.getElementById("resultado");

    if (!encuestaForm || !resultado) return;

    encuestaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const preguntas = document.querySelectorAll(".pregunta");
        let conteo = {
            "Modelo V": 0,
            "Cascada": 0,
            "Scrum": 0,
            "Kanban": 0,
            "Incremental": 0
        };
        let valido = true;

        preguntas.forEach((pregunta, index) => {
            const seleccion = pregunta.querySelector('input[type="radio"]:checked');

            if (!seleccion) {
                alert(`Falta seleccionar una opción en la pregunta ${index + 1}`);
                valido = false;
            } else {
                conteo[seleccion.value]++;
            }
        });

        if (!valido) return;

        // Buscamos la(s) metodología(s) con más puntos
        const max = Math.max(...Object.values(conteo));
        const maxValues = Object.keys(conteo).filter(key => conteo[key] === max);

        let metodologia = "";
        if (maxValues.length === 1) {
            metodologia = maxValues[0]; // solo la que tiene más puntos
        } else {
            metodologia = maxValues.join(" o "); // empate
        }

        resultado.textContent = `Recomendamos: ${metodologia}`;
    });

    // Juego de memoria con metodologías

});
const totalCartas = 12;
let cartas = [];
let Cartaseleccionada = [];
let currentMove = 0;
let intentos = 0;

// Lista de metodologías (se repetirán para hacer pares)
const metodologiasBase = ["Kanban", "Scrum", "Iterativo", "Cascada", "Modelo V", "XP"];

let TemplateCarta = `
  <div class="carta">
    <div class="cruz"><img src="../imagenes/logo.png" class="img"></div>
    <div class="cara"></div>
  </div>
`;

// Función que se ejecuta al hacer clic en una carta
function activate(e) {
    const carta = e.currentTarget;
    if (carta.classList.contains("active")) return;

    if (currentMove < 2) {
        carta.classList.add("active");
        Cartaseleccionada.push(carta);
        currentMove++;

        if (currentMove === 2) {
            intentos++;
            document.querySelector("#stats").innerHTML = intentos + " intentos";

            const valor1 = Cartaseleccionada[0].querySelector(".cara").innerHTML;
            const valor2 = Cartaseleccionada[1].querySelector(".cara").innerHTML;

            if (valor1 === valor2) {
                // Pareja correcta
                Cartaseleccionada = [];
                currentMove = 0;

                // 🔹 Verificar si ganó
                checkWin();

            } else {
                // No coinciden
                setTimeout(() => {
                    Cartaseleccionada[0].classList.remove("active");
                    Cartaseleccionada[1].classList.remove("active");
                    Cartaseleccionada = [];
                    currentMove = 0;
                }, 600);
            }
        }
    }
}

// 🔹 Función para comprobar si ganó
function checkWin() {
    const activas = document.querySelectorAll(".carta.active").length;
    if (activas === totalCartas) {
        setTimeout(() => {
            alert("🎉 ¡Felicidades, ganaste! 🎉");
        }, 300);
    }
}

// Generar los valores de las cartas (pares aleatorios)
function generarValores() {
    let valores = [...metodologiasBase, ...metodologiasBase]; // duplicamos para hacer pares
    valores = valores.sort(() => Math.random() - 0.5); // mezclamos
    return valores.slice(0, totalCartas);
}

const valoresFinales = generarValores();

// Crear las cartas en el DOM
for (let i = 0; i < totalCartas; i++) {
    const div = document.createElement("div");
    div.innerHTML = TemplateCarta;
    cartas.push(div);
    document.querySelector("#game").append(cartas[i]);
    const cara = cartas[i].querySelector(".cara");
    cara.innerHTML = valoresFinales[i];
    cartas[i].querySelector(".carta").addEventListener("click", activate);
}



//unir con definiciones
document.addEventListener('DOMContentLoaded', () => {
    const nombres = ["Kanban", "Scrum", "XP", "Modelo V", "Cascada", "Iterativo"];
    const definiciones = [
        "Es ideal para equipos, en entornos cambiantes, donde las tareas surgen y se resuelven de manera continua",
        "Garantiza la eficiencia del equipo y la calidad del producto, por medio de tres roles: Product Owner, Scrum máster y equipo de desarrollo.",
        "Se aplica en proyectos que exigen gran calidad técnica, rapidez de entrega y adaptación constante, como startups tecnológicas",
        "Metodología que representa el ciclo de vida de un proyecto emparejando las fases de desarrollo (lado izquierdo) con las fases de prueba correspondientes (lado derecho).",
        "Se basa en una secuencia rígida de etapas, donde cada fase debe completarse antes de pasar a la siguiente.",
        "Modelo en donde el sistema se construye en ciclos repetidos, donde cada ciclo revisa, mejora y amplía lo ya desarrollado"
    ];

    const gameNombres = document.getElementById('nombres');
    const gameDefiniciones = document.getElementById('definiciones');
    const resultado = document.getElementById('resultado');

    let selectedName = null;

    // Mezclar definiciones para que no queden ordenadas
    const shuffledDefiniciones = definiciones
        .map(def => ({ def, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(obj => obj.def);

    // Crear elementos HTML
    nombres.forEach((name, index) => {
        const div = document.createElement('div');
        div.textContent = name;
        div.classList.add('item');
        div.dataset.index = index;
        div.addEventListener('click', () => selectName(div));
        gameNombres.appendChild(div);
    });

    shuffledDefiniciones.forEach((def, index) => {
        const div = document.createElement('div');
        div.textContent = def;
        div.classList.add('item');
        div.dataset.def = def;
        div.addEventListener('click', () => selectDefinition(div));
        gameDefiniciones.appendChild(div);
    });

    function selectName(div) {
        if (div.classList.contains('matched')) return;
        selectedName = div;
        highlight(div);
    }

    function selectDefinition(div) {
        if (!selectedName || div.classList.contains('matched')) return;

        const nameIndex = parseInt(selectedName.dataset.index);
        if (definiciones[nameIndex] === div.dataset.def) {
            // Correcto
            selectedName.classList.add('matched');
            div.classList.add('matched');
            alert("Correcto");
        } else {
            alert("Intenta de nuevo");
            ;
        }

        selectedName = null;
        clearHighlights();
    }

    function highlight(div) {
        clearHighlights();
        div.style.backgroundColor = "#ffd700";
    }

    function clearHighlights() {
        document.querySelectorAll('.item').forEach(item => {
            if (!item.classList.contains('matched')) {
                item.style.backgroundColor = "#ffe477ff";
                item.style.color = "rgb(39, 39, 39)";

            }
        });
    }
});
// Selecciona todos los botones
const botones = document.querySelectorAll(".pregunta button");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const pregunta = boton.parentElement;

    // Cierra otras preguntas si querés que solo una esté abierta
    document.querySelectorAll(".pregunta").forEach(p => {
      if (p !== pregunta) p.classList.remove("activa");
    });

    // Alterna la clase activa
    pregunta.classList.toggle("activa");
  });
});
