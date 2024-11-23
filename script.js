function registrarPaciente() {
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const diagnostico = document.getElementById("diagnostico").value;

    // Crea un objeto paciente
    const paciente = {
        nombre: nombre,
        edad: edad,
        diagnostico: diagnostico
    };

    // Guarda el paciente en el almacenamiento local
    localStorage.setItem('paciente', JSON.stringify(paciente));

    // Muestra mensaje de éxito
    document.getElementById("success-message").style.display = "block";

    // Limpia el formulario
    document.getElementById("registroForm").reset();

    return false; // Evita que el formulario se envíe
}

// Selecciona todos los elementos con la clase "accordion"
var acc = document.getElementsByClassName("accordion");
var i;

// Itera sobre cada elemento y agrega un evento de clic
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        // Alterna la clase "active" para el botón
        this.classList.toggle("active");

        // Selecciona el siguiente panel asociado al botón
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

const backgrounds = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg'
];

let currentIndex = 0;

function changeBackground() {
    currentIndex = (currentIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
}

// Cambiar la imagen de fondo cada 10 segundos
setInterval(changeBackground, 10000); // 10000 ms = 10 segundos

// Función para cargar la información del paciente
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const nombrePaciente = urlParams.get('nombre') || 'Anonimo';
    const edadPaciente = urlParams.get('edad') || 'No especificada';

    const infoPaciente = document.getElementById('info-paciente');
    infoPaciente.innerHTML = `<p>Paciente: ${nombrePaciente}</p><p>Edad: ${edadPaciente} años</p>`;
});

// Función para agregar un nuevo síntoma
function agregarSintoma() {
    const nuevoSintoma = document.getElementById('nuevoSintoma').value;
    if (nuevoSintoma) {
        const sintomasDiv = document.getElementById('sintomas');
        
        const nuevoCheckbox = document.createElement('div');
        nuevoCheckbox.innerHTML = `<input type="checkbox"> ${nuevoSintoma}<br>`;
        
        sintomasDiv.appendChild(nuevoCheckbox);
        document.getElementById('nuevoSintoma').value = '';
    } else {
        alert('Por favor ingresa un síntoma.');
    }
}

// Función para enviar ayuda
function enviarAyuda() {
    const sintomas = [];
    const checkboxes = document.querySelectorAll('#sintomas input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) sintomas.push(checkbox.nextSibling.textContent.trim());
    });

    const descripcionAyuda = document.getElementById('descripcionAyuda').value;

    // Crear los parámetros para la URL
    const queryParams = new URLSearchParams();
    queryParams.append('sintomas', sintomas.join(', '));
    queryParams.append('descripcionAyuda', descripcionAyuda);

    // Redirigir a la página de registro_ayuda.html con los datos
    window.location.href = `registro_ayuda.html?${queryParams.toString()}`;
}

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);

    // Obtener los datos del paciente
    const nombrePaciente = urlParams.get('nombre') || 'No disponible';
    const edadPaciente = urlParams.get('edad') || 'No especificada';

    // Obtener los síntomas y la descripción de la ayuda
    const sintomas = urlParams.get('sintomas') || 'No hay síntomas';
    const descripcionAyuda = urlParams.get('descripcionAyuda') || 'No se ha proporcionado descripción';

    // Insertar los datos del paciente en la página
    document.getElementById('nombre-paciente').textContent = nombrePaciente;
    document.getElementById('edad-paciente').textContent = edadPaciente;

    // Obtener la tabla y su cuerpo (tbody)
    const tablaAyuda = document.getElementById('tabla-ayuda').getElementsByTagName('tbody')[0];

    // Asegurarse de que no haya filas previas
    tablaAyuda.innerHTML = ''; // Limpiar el tbody si deseas borrar las filas anteriores (si las hay)

    // Crear una nueva fila
    const nuevaFila = document.createElement('tr');

    // Crear las celdas para los síntomas y la descripción
    const celdaSintomas = document.createElement('td');
    celdaSintomas.textContent = sintomas;

    const celdaDescripcion = document.createElement('td');
    celdaDescripcion.textContent = descripcionAyuda;

    // Agregar las celdas a la nueva fila
    nuevaFila.appendChild(celdaSintomas);
    nuevaFila.appendChild(celdaDescripcion);

    // Agregar la nueva fila a la tabla (tbody)
    tablaAyuda.appendChild(nuevaFila);
});




// para el chatbox
function enviarMensaje() {
    const userMessage = document.getElementById('userMessage').value;

    if (userMessage.trim() !== "") {
        const chatMessages = document.getElementById('chatMessages');
        
        // Crear mensaje del usuario
        const userMsgElement = document.createElement('div');
        userMsgElement.className = 'user-message';
        userMsgElement.textContent = userMessage;
        chatMessages.appendChild(userMsgElement);

        // Deshabilitar el campo de entrada mientras el bot "escribe"
        document.getElementById('userMessage').disabled = true;

        // Mostrar "Escribiendo..." del bot
        const typingElement = document.createElement('div');
        typingElement.className = 'bot-message typing';
        typingElement.textContent = "Escribiendo...";
        chatMessages.appendChild(typingElement);

        // Retraso para simular que el bot "piensa"
        setTimeout(function() {
            // Reemplazar "Escribiendo..." con la respuesta real del bot
            typingElement.textContent = getBotResponse(userMessage);

            // Desplazar hacia el último mensaje
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Habilitar el campo de entrada de nuevo
            document.getElementById('userMessage').disabled = false;
        }, 1000); // 1 segundo de retraso
    }
}

function limpiarChat() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';  // Limpia todos los mensajes del chat
}

function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Respuestas a enfermedades comunes
    if (lowerCaseMessage.includes("gripe")) {
        return "La gripe puede causar fiebre, tos y dolor corporal. Te recomiendo descansar, tomar líquidos y un analgésico como Paracetamol. Si los síntomas persisten, consulta un médico. Para la gripe, es recomendable la vacuna anual contra la gripe.";
    } else if (lowerCaseMessage.includes("tos")) {
        return "La tos puede ser un síntoma de diversas condiciones. Si es persistente, te sugiero un jarabe como Ambroxol para la tos. Si es muy severa o va acompañada de fiebre, te recomiendo visitar a un médico.";
    } else if (lowerCaseMessage.includes("dolor de cabeza")) {
        return "El dolor de cabeza puede ser causado por diversos factores. Un medicamento como el Paracetamol puede ser útil. Si el dolor es intenso o recurrente, es importante hacer una consulta médica.";
    } else if (lowerCaseMessage.includes("fiebre")) {
        return "La fiebre puede ser un signo de infección. Un medicamento como Paracetamol puede ayudar a reducirla. Si tienes fiebre alta o persistente, es importante que consultes a un médico.";
    } else if (lowerCaseMessage.includes("diabetes")) {
        return "Para la diabetes, es fundamental el control de la glucosa. Te recomendaría consultar con un endocrinólogo para tratamiento y manejo. Además, es importante llevar una dieta adecuada y seguir las recomendaciones médicas.";
    } else if (lowerCaseMessage.includes("hipertensión")) {
        return "En caso de hipertensión, es necesario un control regular de la presión arterial y seguir un tratamiento que podría incluir medicamentos como los inhibidores de la ECA. Consulta a un cardiólogo para más detalles.";
    }

    // Respuestas a enfermedades comunes y médicos recomendados
    else if (lowerCaseMessage.includes("alergias")) {
        return "Las alergias pueden ser causadas por diferentes factores, como polen, polvo o alimentos. Te recomiendo que consultes a un **alergólogo** para un diagnóstico adecuado y tratamiento.";
    } else if (lowerCaseMessage.includes("asma")) {
        return "El asma es una condición respiratoria que causa dificultad para respirar. Un **neumólogo** puede ayudarte con el diagnóstico y tratamiento, que generalmente incluye inhaladores y medicamentos.";
    } else if (lowerCaseMessage.includes("colitis")) {
        return "La colitis es la inflamación del colon y puede causar dolor abdominal, diarrea o sangrado. Es importante que veas a un **gastroenterólogo** para recibir el tratamiento adecuado.";
    } else if (lowerCaseMessage.includes("artritis")) {
        return "La artritis es la inflamación de las articulaciones que causa dolor y rigidez. Un **reumatólogo** puede diagnosticar y recomendarte el tratamiento adecuado.";
    } else if (lowerCaseMessage.includes("insomnio")) {
        return "El insomnio puede ser causado por varios factores, como estrés o problemas médicos. Si tienes dificultad para dormir, un **neurólogo** o un **médico general** puede ayudarte.";
    } else if (lowerCaseMessage.includes("anemia")) {
        return "La anemia ocurre cuando tienes menos glóbulos rojos o hemoglobina de lo normal. Un **hematólogo** puede realizar un diagnóstico adecuado y ofrecerte opciones de tratamiento.";
    } else if (lowerCaseMessage.includes("hipotiroidismo")) {
        return "El hipotiroidismo ocurre cuando la tiroides no produce suficientes hormonas. Te recomiendo que consultes a un **endocrinólogo** para recibir el tratamiento adecuado.";
    } else if (lowerCaseMessage.includes("cáncer de mama")) {
        return "El cáncer de mama es una enfermedad en la que las células de la mama se desarrollan de manera anormal. Un **oncólogo** puede ayudarte a diagnosticar y tratar esta enfermedad.";
    } else if (lowerCaseMessage.includes("infección urinaria")) {
        return "Las infecciones urinarias pueden causar dolor y ardor al orinar. Un **urólogo** puede diagnosticar la causa y prescribir el tratamiento adecuado.";
    } else if (lowerCaseMessage.includes("obesidad")) {
        return "La obesidad es una condición que puede aumentar el riesgo de enfermedades graves. Te sugiero que consultes a un **endocrinólogo** o un **nutricionista** para desarrollar un plan de tratamiento personalizado.";
    } else if (lowerCaseMessage.includes("depresión")) {
        return "La depresión es un trastorno mental que afecta el estado de ánimo y puede tener un impacto negativo en la vida diaria. Un **psiquiatra** o **psicólogo** puede ayudarte a tratar la depresión con terapia y, si es necesario, medicamentos.";
    }

    // Respuestas a tratamientos (pastillas, jarabes, etc.)
    else if (lowerCaseMessage.includes("pastilla") || lowerCaseMessage.includes("medicación")) {
        if (lowerCaseMessage.includes("gripe")) {
            return "Para la gripe, un medicamento como Paracetamol o un jarabe para la tos como Ambroxol puede ser útil. Es importante que sigas las indicaciones de un médico.";
        } else if (lowerCaseMessage.includes("dolor de cabeza")) {
            return "Te recomiendo una pastilla de Paracetamol o Ibuprofeno para aliviar el dolor de cabeza. Si el dolor persiste, consulta a un médico.";
        } else if (lowerCaseMessage.includes("tos")) {
            return "Para la tos, un jarabe expectorante como Ambroxol o un medicamento antitusígeno como Dextrometorfano pueden ayudar. Consulta con un médico si la tos persiste.";
        }
    }

    // Respuestas a vacunas
    else if (lowerCaseMessage.includes("vacuna")) {
        if (lowerCaseMessage.includes("gripe")) {
            return "La vacuna contra la gripe es recomendada anualmente, especialmente para personas con sistemas inmunitarios débiles, niños pequeños, y adultos mayores. Consulta con tu médico para más detalles.";
        } else if (lowerCaseMessage.includes("hepatitis")) {
            return "La vacuna contra la hepatitis B es muy importante para prevenir la infección por el virus. Si no has recibido la vacuna, te sugiero hablar con tu médico para aplicártela.";
        } else if (lowerCaseMessage.includes("covid")) {
            return "La vacuna contra el COVID-19 es esencial para prevenir la enfermedad y sus complicaciones. Si no la has recibido, te recomiendo que consultes con tu médico sobre las opciones disponibles.";
        } else if (lowerCaseMessage.includes("sarampión")) {
            return "La vacuna contra el sarampión es parte del esquema de vacunación infantil. Si no la has recibido o tienes dudas, consulta con tu pediatra.";
        }
    }

    // Mensajes generales
    else if (lowerCaseMessage.includes("hola")) {
        return "¡Hola! ¿En qué puedo ayudarte hoy?";
    } else if (lowerCaseMessage.includes("gracias")) {
        return "De nada. Si necesitas más ayuda, no dudes en preguntar.";
    } else {
        return "Lo siento, no entendí eso. ¿Podrías preguntar de otra manera o ser más específico?";
    }
}

function minimizarChat() {
    const chatBox = document.getElementById('chatBox');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.querySelector('.chat-input');
    
    // Alternar la clase 'minimized' para minimizar y restaurar
    if (chatBox.classList.contains('minimized')) {
        chatBox.classList.remove('minimized');
        chatMessages.classList.remove('minimized');
        chatInput.classList.remove('minimized');
    } else {
        chatBox.classList.add('minimized');
        chatMessages.classList.add('minimized');
        chatInput.classList.add('minimized');
    }
}


 // CITAS
 // Manejador del formulario
document.getElementById("form-citas").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const doctor = document.getElementById("doctor").value;

    // Verificar que todos los campos están llenos
    if (!nombre || !fecha || !hora || !doctor) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear una nueva fila para la tabla
    const tabla = document.getElementById("tabla-citas");
    const fila = document.createElement("tr");

    // Crear y agregar las celdas a la fila
    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = nombre;
    fila.appendChild(celdaNombre);

    const celdaFecha = document.createElement("td");
    celdaFecha.textContent = fecha;
    fila.appendChild(celdaFecha);

    const celdaHora = document.createElement("td");
    celdaHora.textContent = hora;
    fila.appendChild(celdaHora);

    const celdaDoctor = document.createElement("td");
    celdaDoctor.textContent = doctor;
    fila.appendChild(celdaDoctor);

    // Agregar la fila a la tabla
    tabla.appendChild(fila);

    // Limpiar el formulario
    document.getElementById("form-citas").reset();
});

