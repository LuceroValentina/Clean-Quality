document.addEventListener('DOMContentLoaded', () => {

    //Buscador de títulos del header de todas las páginas
    const buscador = document.getElementById('buscador');

    //Selecciona todos los títulos (h1 a h6) dentro del contenedor con id="contenido"
    const titulos = document.querySelectorAll('#contenido h1, #contenido h2, #contenido h3, #contenido h4, #contenido h5, #contenido h6');

    // Verifica que existan tanto el buscador como los títulos antes de ejecutar el código
    if (buscador && titulos.length > 0) {

        //Guarda el contenido original de todos los títulos (para poder restaurarlos después)
        const titulosOriginales = Array.from(titulos).map(t => t.innerHTML);

        //Agrega un "escuchador" de eventos al buscador (cada vez que el usuario escribe algo)
        buscador.addEventListener('input', () => {
            //Toma el texto que el usuario escribió, quitando espacios al principio y final
            const palabra = buscador.value.trim();
            //Variable para saber si ya se encontró el primer resultado
            let encontrado = false;

            //Recorre todos los títulos de la página
            titulos.forEach((titulo, index) => {
                //Restaura el texto original del título (borra resaltados anteriores)
                titulo.innerHTML = titulosOriginales[index];

                //Si el campo está vacío, no hace nada
                if (palabra === '') return;

                //Crea una expresión regular para buscar la palabra escrita (sin distinguir mayúsculas/minúsculas)
                const regex = new RegExp(`(${palabra})`, 'gi');

                //Si el título contiene la palabra buscada...
                if (regex.test(titulo.textContent)) {
                    //Resalta la palabra encontrada con un fondo rojo
                    titulo.innerHTML = titulo.textContent.replace(
                        regex,
                        '<span style="background-color: red;">$1</span>'
                    );

                    //Hace scroll suave hasta el primer título encontrado
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
        cascada: {
            planificacion: "Secuencial, fases fijas",
            flexibilidad: "Muy baja",
            retroalimentacion: "Al final del proyecto",
            entrega: "Producto único al final",
            roles: "Analista, desarrollador, tester",
            herramientas: "Documentación, diagramas de Gantt",
            objetivos: "Cumplir especificaciones iniciales"
        },
        modelov: {
            planificacion: "Secuencial con pruebas asociadas",
            flexibilidad: "Muy baja",
            retroalimentacion: "Al final de cada validación",
            entrega: "Única al final",
            roles: "Analista, diseñador, tester",
            herramientas: "Documentación y pruebas",
            objetivos: "Garantizar calidad y verificación"
        },
        iterativo: {
            planificacion: "Iteraciones planificadas y entregas parciales",
            flexibilidad: "Media a alta",
            retroalimentacion: "En cada incremento",
            entrega: "Parcial y frecuente",
            roles: "Equipo técnico y gestor",
            herramientas: "Jira, Trello, herramientas de seguimiento",
            objetivos: "Adaptarse a cambios gradualmente"
        },
        scrum: {
            planificacion: "Iteraciones (Sprints)",
            flexibilidad: "Alta",
            retroalimentacion: "En cada sprint",
            entrega: "En cada sprint",
            roles: "Product Owner, Scrum Master, Equipo",
            herramientas: "Jira, Trello",
            objetivos: "Entregar valor y mejorar continuamente"
        },
        kanban: {
            planificacion: "Flujo continuo",
            flexibilidad: "Muy alta",
            retroalimentacion: "Continua",
            entrega: "Entrega continua",
            roles: "Sin roles definidos",
            herramientas: "Trello, Kanbanize",
            objetivos: "Mantener flujo eficiente"
        },
        xp: {
            planificacion: "Iteraciones cortas",
            flexibilidad: "Alta",
            retroalimentacion: "Constante",
            entrega: "Entregas frecuentes",
            roles: "Programadores y cliente activo",
            herramientas: "Git, Jenkins",
            objetivos: "Mejorar calidad del código"
        },
    };

    // Función que actualiza la tabla comparativa según los valores seleccionados
    function actualizar() {
        // Obtiene los elementos <select> del HTML
        const select1 = document.getElementById("select1");
        const select2 = document.getElementById("select2");
        if (!select1 || !select2) return; // Si no existen, sale

        // Guarda los valores seleccionados de ambos select
        const metodo1 = select1.value;
        const metodo2 = select2.value;

        // Deshabilita en cada select el método que ya está elegido en el otro
        Array.from(select1.options).forEach(opt => opt.disabled = (opt.value === metodo2 && opt.value !== ""));
        Array.from(select2.options).forEach(opt => opt.disabled = (opt.value === metodo1 && opt.value !== ""));

        // Recorre todos los elementos con clase .info (las celdas de la tabla)
        document.querySelectorAll(".info").forEach(div => {
            const row = div.dataset.row; // tipo de dato (planificacion, flexibilidad, etc.)
            const col = div.dataset.col; // columna (2 = primer método, 3 = segundo método)

            // Si corresponde a la columna del primer select, muestra sus datos
            if (col === "2" && metodo1 && data[metodo1])
                div.textContent = data[metodo1][row] || "";

            // Si corresponde a la columna del segundo select, muestra sus datos
            if (col === "3" && metodo2 && data[metodo2])
                div.textContent = data[metodo2][row] || "";
        });
    }

    // Obtiene las referencias de los select
    const s1 = document.getElementById("select1");
    const s2 = document.getElementById("select2");

    // Si existen, agrega eventos para actualizar la tabla al cambiar las opciones
    if (s1 && s2) {
        s1.addEventListener("change", actualizar);
        s2.addEventListener("change", actualizar);
        actualizar(); // Llama una vez al cargar la página para inicializar
    }


    // Formulario de contacto 
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


    //Botón que despliega el formulario, en la página Sobre Nosotros
    const btn = document.getElementById('btn-formulario');
    const container = document.getElementById('container-formulario');
    if (btn && container) {
        btn.addEventListener('click', () => {
            container.classList.toggle('active');
        });
    }


    // Encuesta de página encuesta de preferencias
    const encuestaForm = document.getElementById("formulario");
    const resultado = document.getElementById("resultado");

    // Si alguno de los dos elementos no existe, el script no se ejecuta
    if (!encuestaForm || !resultado) return;

    encuestaForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y recargue la página

        // Obtiene todas las preguntas del formulario (cada una con clase .pregunta)
        const preguntas = document.querySelectorAll(".pregunta");

        // Crea un objeto para contar cuántas respuestas corresponden a cada metodología
        let conteo = {
            "Modelo V": 0,
            "Cascada": 0,
            "Scrum": 0,
            "Kanban": 0,
            "Incremental": 0
        };

        // Variable para saber si el formulario está completo
        let valido = true;

        // Recorre todas las preguntas
        preguntas.forEach((pregunta, index) => {
            // Busca cuál opción del radio html fue seleccionada dentro de la pregunta
            const seleccion = pregunta.querySelector('input[type="radio"]:checked');

            // Si no hay ninguna opción seleccionada, muestra un aviso
            if (!seleccion) {
                alert(`Falta seleccionar una opción en la pregunta ${index + 1}`);
                valido = false; // Marca que hay un error
            } else {
                // Si hay una opción elegida, suma 1 al conteo de la metodología elegida
                conteo[seleccion.value]++;
            }
        });

        // Si alguna pregunta no fue respondida, detiene la ejecución
        if (!valido) return;

        // Busca el valor más alto dentro del objeto conteo (la metodología más elegida)
        const max = Math.max(...Object.values(conteo));

        // Busca todas las metodologías que tienen ese valor máximo (por si hay empate)
        const maxValues = Object.keys(conteo).filter(key => conteo[key] === max);

        let metodologia = "";
        if (maxValues.length === 1) {
            // Si hay una sola metodología ganadora, se elige esa
            metodologia = maxValues[0];
        } else {
            // Si hay empate, las une con "o"
            metodologia = maxValues.join(" o ");
        }

        // Muestra en pantalla el resultado final dentro del elemento con id "resultado"
        resultado.textContent = `Recomendamos: ${metodologia}`;
    });



});
//Juego de Cartas (Memotest) Página Recursos y Aprendizajes

const totalCartas = 12;
let cartas = [];
let cartasSeleccionadas = [];
let currentMove = 0;
let intentos = 0;
let bloqueo = false;

// Listas base de metodologías y sus imágenes asociadas
const metodologiasBase = ["Kanban", "Scrum", "Iterativo", "Cascada", "Modelo V", "XP"];
const graficosMetodologias = [
    "../imagenes/minigraficokanban.png",
    "../imagenes/minigraficoscrum.png",
    "../imagenes/minigraficoiterativo.png",
    "../imagenes/minigraficocascada.png",
    "../imagenes/minigraficomodelov.png",
    "../imagenes/minigraficoxp.png"
];

// Plantilla HTML de una carta
const TemplateCarta = `
  <div class="carta">
    <div class="cruz"><img src="../imagenes/logo.png" class="img"></div>
    <div class="cara"></div>
  </div>
`;

//Genera 12 cartas: 6 con nombres y 6 con imágenes
let valores = [];
for (let i = 0; i < metodologiasBase.length; i++) {
    valores.push({ tipo: "nombre", valor: metodologiasBase[i] }); // Carta con nombre
    valores.push({ tipo: "grafico", valor: graficosMetodologias[i] }); // Carta con gráfico
}
// Mezcla las cartas de forma aleatoria
valores = valores.sort(() => Math.random() - 0.5);

//Crea las cartas 
for (let i = 0; i < totalCartas; i++) {
    const div = document.createElement("div");
    div.innerHTML = TemplateCarta;
    cartas.push(div);
    document.querySelector("#game").append(cartas[i]);
    const cara = cartas[i].querySelector(".cara");

    // Si es una carta de nombre, muestra texto; si es gráfica, muestra imagen
    if (valores[i].tipo === "nombre") {
        cara.textContent = valores[i].valor;
    } else {
        cara.innerHTML = `<img src="${valores[i].valor}" class="grafico">`;
    }

    // Agrega el evento de clic a cada carta
    cartas[i].querySelector(".carta").addEventListener("click", activate);
}

//Función que se ejecuta al hacer clic en una carta
function activate(e) {
    if (bloqueo) return; // Si está bloqueado, no hace nada
    const carta = e.currentTarget;
    if (carta.classList.contains("active")) return; // Ignora cartas ya activas

    carta.classList.add("active"); // Muestra la carta
    cartasSeleccionadas.push(carta);
    currentMove++;

    // Si se seleccionaron dos cartas, las compara
    if (currentMove === 2) {
        bloqueo = true; // Bloquea clics mientras se comparan
        intentos++;
        document.querySelector("#stats").innerHTML = intentos + " intentos";

        const valor1 = getValor(cartasSeleccionadas[0]);
        const valor2 = getValor(cartasSeleccionadas[1]);

        // Si son pareja correcta
        if (sonPareja(valor1, valor2)) {
            cartasSeleccionadas = [];
            currentMove = 0;
            bloqueo = false; // Desbloquea clics
            checkWin(); // Verifica si ganó el juego
        } else {
            // Si no coinciden, las voltea nuevamente
            setTimeout(() => {
                cartasSeleccionadas[0].classList.remove("active");
                cartasSeleccionadas[1].classList.remove("active");
                cartasSeleccionadas = [];
                currentMove = 0;
                bloqueo = false;
            }, 800);
        }
    }
}

//Devuelve el valor de una carta (nombre o ruta de imagen)
function getValor(carta) {
    return (
        carta.querySelector(".cara").textContent.trim() ||
        carta.querySelector(".cara img")?.getAttribute("src")
    );
}

//Verifica si dos cartas son pareja 
function sonPareja(valor1, valor2) {
    for (let i = 0; i < metodologiasBase.length; i++) {
        if (
            (valor1 === metodologiasBase[i] && valor2.includes(graficosMetodologias[i])) ||
            (valor2 === metodologiasBase[i] && valor1.includes(graficosMetodologias[i]))
        ) {
            return true;
        }
    }
    return false;
}

// Comprueba si se ganó el juego
function checkWin() {
    const activas = document.querySelectorAll(".carta.active").length;
    if (activas === totalCartas) {
        setTimeout(() => {
            alert("🎉 ¡Felicidades, ganaste! 🎉");
        }, 300);
    }
}

//Juego "Unir con Definiciones" Página Recursos y Aprendizajes
document.addEventListener('DOMContentLoaded', () => {
    // Listas de nombres y sus definiciones correspondientes
    const nombres = ["Kanban", "Scrum", "XP", "Modelo V", "Cascada", "Iterativo"];
    const definiciones = [
        "Es ideal para equipos, en entornos cambiantes, donde las tareas surgen y se resuelven de manera continua",
        "Garantiza la eficiencia del equipo y la calidad del producto, por medio de tres roles: Product Owner, Scrum máster y equipo de desarrollo.",
        "Se aplica en proyectos que exigen gran calidad técnica, rapidez de entrega y adaptación constante, como startups tecnológicas",
        "Metodología que representa el ciclo de vida de un proyecto emparejando las fases de desarrollo (lado izquierdo) con las fases de prueba correspondientes (lado derecho).",
        "Se basa en una secuencia rígida de etapas, donde cada fase debe completarse antes de pasar a la siguiente.",
        "Modelo en donde el sistema se construye en ciclos repetidos, donde cada ciclo revisa, mejora y amplía lo ya desarrollado"
    ];

    // Elementos
    const gameNombres = document.getElementById('nombres');
    const gameDefiniciones = document.getElementById('definiciones');
    const resultado = document.getElementById('resultado');
    let selectedName = null; // Guarda el nombre seleccionado actualmente

    //Mezcla aleatoriamente las definiciones
    const shuffledDefiniciones = definiciones
        .map(def => ({ def, sort: Math.random() })) // Asigna un valor aleatorio
        .sort((a, b) => a.sort - b.sort) // Ordena según el número aleatorio
        .map(obj => obj.def); // Devuelve solo el texto

    //Crea los elementos de los nombres
    nombres.forEach((name, index) => {
        const div = document.createElement('div');
        div.textContent = name;
        div.classList.add('item');
        div.dataset.index = index; // Guarda su posición
        div.addEventListener('click', () => selectName(div));
        gameNombres.appendChild(div);
    });

    //Crea los elementos de las definiciones (mezcladas)
    shuffledDefiniciones.forEach((def, index) => {
        const div = document.createElement('div');
        div.textContent = def;
        div.classList.add('item');
        div.dataset.def = def; // Guarda el texto de la definición
        div.addEventListener('click', () => selectDefinition(div));
        gameDefiniciones.appendChild(div);
    });

    //Selecciona un nombre para emparejar
    function selectName(div) {
        if (div.classList.contains('matched')) return; // Ignora si ya está emparejado
        selectedName = div;
        highlight(div); // Resalta el nombre elegido
    }

    //Selecciona una definición para emparejar con el nombre seleccionado
    function selectDefinition(div) {
        if (!selectedName || div.classList.contains('matched')) return;

        const nameIndex = parseInt(selectedName.dataset.index);
        // Compara si la definición seleccionada corresponde al nombre
        if (definiciones[nameIndex] === div.dataset.def) {
            selectedName.classList.add('matched');
            div.classList.add('matched');
            alert("Correcto"); // Acierto
        } else {
            alert("Intenta de nuevo"); // Error
        }

        selectedName = null; // Reinicia selección
        clearHighlights(); // Quita resaltados
    }

    //Resalta el nombre seleccionado
    function highlight(div) {
        clearHighlights();
        div.style.backgroundColor = "#ffd700";
    }

    //Limpia los colores de los elementos no emparejados
    function clearHighlights() {
        document.querySelectorAll('.item').forEach(item => {
            if (!item.classList.contains('matched')) {
                item.style.backgroundColor = "#ffe477ff";
                item.style.color = "rgb(39, 39, 39)";
            }
        });
    }
});

//Comportamiento de preguntas tipo acordeón (abre y cierra)
const botones = document.querySelectorAll(".pregunta button");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const pregunta = boton.parentElement;

        // Cierra las demás preguntas abiertas
        document.querySelectorAll(".pregunta").forEach(p => {
            if (p !== pregunta) p.classList.remove("activa");
        });

        // Alterna la pregunta actual (abre o cierra)
        pregunta.classList.toggle("activa");
    });
});
