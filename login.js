// Función para validar el inicio de sesión
function validarLogin() {
    // Datos de inicio de sesión válidos (puedes modificar estos datos)
    const usuarioValido = "admin";
    const contrasenaValida = "1234";

    // Obtén los valores del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verifica si los datos son correctos
    if (username === usuarioValido && password === contrasenaValida) {
        // Redirige a la página principal
        window.location.href = "index.html";
        return false; // Evita que el formulario se envíe
    } else {
        // Muestra mensaje de error
        document.getElementById("error-message").style.display = "block";
        return false; // Evita que el formulario se envíe
    }
}

// Función para validar el inicio de sesión
function validarLogin2() {
    // Obtén los valores del formulario de inicio de sesión
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Obtén la lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica si hay un usuario con el nombre de usuario y contraseña proporcionados
    const usuarioValido = usuarios.some(usuario => {
        return usuario.username === username && usuario.password === password;
    });

    // Si el usuario es válido, redirige a la página de inicio
    if (usuarioValido) {
        window.location.href = "index.html"; // Cambia a la ruta de tu página de inicio
    } else {
        // Muestra el mensaje de error
        document.getElementById("error-message").style.display = "block";
    }

    return false; // Evita que el formulario se envíe
}

// Función para registrar un nuevo usuario
function registrarUsuario() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    // Obtén la lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica si el usuario ya existe
    const usuarioExistente = usuarios.some(usuario => usuario.username === newUsername);
    if (usuarioExistente) {
        document.getElementById('register-error-message').style.display = 'block'; // Muestra mensaje de error
        return false; // Evita el envío del formulario
    }

    // Agrega el nuevo usuario a la lista
    usuarios.push({ username: newUsername, password: newPassword });
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guarda en localStorage

    // Muestra mensaje de éxito
    document.getElementById('register-message').style.display = 'block';
    document.getElementById('register-error-message').style.display = 'none';
    
    // Resetea el formulario
    document.getElementById('registerForm').reset();

    return false; // Evita el envío del formulario
}



// Función para registrar pacientes
function registrarPaciente() {
    // Obtén los valores del formulario de registro
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const diagnostico = document.getElementById("diagnostico").value;

    // Aquí podrías hacer una llamada a un API para guardar los datos en una base de datos
    console.log("Paciente registrado:", {
        nombre,
        edad,
        diagnostico
    });

    // Agregar el nuevo paciente al acordeón
    const pacienteList = document.getElementById("pacientes-list");
    const nuevoPaciente = document.createElement('p');
    nuevoPaciente.textContent = `Nombre: ${nombre}, Edad: ${edad}, Diagnóstico: ${diagnostico}`;
    pacienteList.appendChild(nuevoPaciente);

    // Muestra mensaje de éxito
    document.getElementById("success-message").style.display = "block";

    // Limpia el formulario de registro
    document.getElementById("registerForm").reset();

    return false; // Evita que el formulario se envíe
}

// Función para el acordeón
const accordions = document.getElementsByClassName("accordion");
for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
