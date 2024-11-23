// Variable para almacenar el índice del paciente a modificar
let indiceModificar = -1;

// Función para registrar o modificar paciente
function registrarPaciente() {
    // Obtén los valores del formulario de registro
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const diagnostico = document.getElementById("diagnostico").value;

    // Crea un objeto paciente
    const paciente = {
        nombre: nombre,
        edad: edad,
        diagnostico: diagnostico
    };

    // Obtén la lista de pacientes del localStorage o inicializa una nueva
    let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    if (indiceModificar === -1) {
        // Si no estamos modificando, agrega un nuevo paciente
        pacientes.push(paciente);
    } else {
        // Si estamos modificando, actualiza el paciente existente
        pacientes[indiceModificar] = paciente;
        indiceModificar = -1; // Reiniciar índice después de modificar
    }

    // Guarda la nueva lista en el almacenamiento local
    localStorage.setItem('pacientes', JSON.stringify(pacientes));

    // Muestra mensaje de éxito
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";
    setTimeout(() => {
        successMessage.style.display = "none"; // Ocultar después de 3 segundos
    }, 3000);

    // Limpia el formulario de registro
    document.getElementById("registroForm").reset();

    // Actualiza la lista de pacientes
    actualizarListaPacientes();

    return false; // Evita que el formulario se envíe
}

// Función para actualizar la lista de pacientes en el acordeón
function actualizarListaPacientes() {
    const pacientesList = document.getElementById('pacientes-list');
    pacientesList.innerHTML = ''; // Limpia la lista actual

    // Obtén la lista de pacientes del localStorage
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    // Agrega cada paciente a la lista
    pacientes.forEach((paciente, index) => {
        const pacienteItem = document.createElement('div');

        // Añadir un enlace en el nombre para redirigir a la página de ayuda
        pacienteItem.innerHTML = `
            <p><strong>Nombre:</strong> <a href="ayuda_paciente.html?nombre=${encodeURIComponent(paciente.nombre)}">${paciente.nombre}</a></p>
            <p><strong>Edad:</strong> ${paciente.edad} años</p>
            <p><strong>Diagnóstico:</strong> ${paciente.diagnostico}</p>
            <button onclick="eliminarPaciente(${index})">Eliminar</button>
            <button onclick="cargarPaciente(${index})">Modificar</button>
            <hr>
        `;
        pacientesList.appendChild(pacienteItem);
    });
}

// Función para agregar un nuevo síntoma
function agregarSintoma() {
    const nuevoSintoma = document.getElementById('nuevoSintoma').value;
    if (nuevoSintoma) {
        const sintomasDiv = document.getElementById('sintomas');
        
        // Crea un nuevo checkbox para el síntoma
        const nuevoCheckbox = document.createElement('div');
        nuevoCheckbox.innerHTML = `<input type="checkbox"> ${nuevoSintoma}<br>`;
        
        sintomasDiv.appendChild(nuevoCheckbox);
        document.getElementById('nuevoSintoma').value = ''; // Limpia el campo de entrada
    } else {
        alert('Por favor ingresa un síntoma.');
    }
}

// Función para cargar los datos del paciente en el formulario para modificar
function cargarPaciente(index) {
    console.log("Cargar paciente en índice:", index);
    // Obtén la lista de pacientes del localStorage
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const paciente = pacientes[index];

    // Rellena el formulario con los datos del paciente
    document.getElementById("nombre").value = paciente.nombre;
    document.getElementById("edad").value = paciente.edad;
    document.getElementById("diagnostico").value = paciente.diagnostico;

    // Establece el índice del paciente a modificar
    indiceModificar = index;
}

// Función para eliminar paciente
function eliminarPaciente(index) {
    // Obtén la lista de pacientes del localStorage
    let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    // Elimina el paciente de la lista
    pacientes.splice(index, 1);

    // Guarda la nueva lista en el almacenamiento local
    localStorage.setItem('pacientes', JSON.stringify(pacientes));

    // Actualiza la lista de pacientes
    actualizarListaPacientes();
}

// Cargar pacientes al iniciar
document.addEventListener("DOMContentLoaded", actualizarListaPacientes);

// Función para actualizar la lista de usuarios en el acordeón
function actualizarListaUsuarios() {
    const usuariosList = document.getElementById('usuarios-list');
    usuariosList.innerHTML = ''; // Limpia la lista actual

    // Obtén la lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Agrega cada usuario a la lista
    usuarios.forEach((usuario, index) => {
        const usuarioItem = document.createElement('div');
        usuarioItem.innerHTML = `
            <p><strong>Usuario:</strong> ${usuario.username}</p>
            <button onclick="eliminarUsuario(${index})">Eliminar</button>
            <button onclick="cargarUsuario(${index})">Modificar</button>
            <hr>
        `;
        usuariosList.appendChild(usuarioItem);
    });
}

// Variable para almacenar el índice del usuario a modificar
let indiceModificarUsuario = -1;

// Función para registrar o modificar usuario
function registrarUsuario() {
    // Obtén los valores del formulario de registro
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;

    // Crea un objeto usuario
    const usuario = {
        username: username,
        password: password // En un entorno real, no se recomienda almacenar contraseñas en texto plano
    };

    // Obtén la lista de usuarios del localStorage o inicializa una nueva
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (indiceModificarUsuario === -1) {
        // Si no estamos modificando, agrega un nuevo usuario
        usuarios.push(usuario);
    } else {
        // Si estamos modificando, actualiza el usuario existente
        usuarios[indiceModificarUsuario] = usuario;
        indiceModificarUsuario = -1; // Reiniciar índice después de modificar
    }

    // Guarda la nueva lista en el almacenamiento local
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Muestra mensaje de éxito
    const registerMessage = document.getElementById("register-message");
    registerMessage.style.display = "block";
    setTimeout(() => {
        registerMessage.style.display = "none"; // Ocultar después de 3 segundos
    }, 3000);

    // Limpia el formulario de registro
    document.getElementById("registerForm").reset();

    // Actualiza la lista de usuarios
    actualizarListaUsuarios();

    return false; // Evita que el formulario se envíe
}

// Función para actualizar la lista de usuarios en el acordeón
function actualizarListaUsuarios() {
    const usuariosList = document.getElementById('usuarios-list');
    usuariosList.innerHTML = ''; // Limpia la lista actual

    // Obtén la lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Agrega cada usuario a la lista
    usuarios.forEach((usuario, index) => {
        const usuarioItem = document.createElement('div');
        usuarioItem.innerHTML = `
            <p><strong>Usuario:</strong> ${usuario.username}</p>
            <button onclick="eliminarUsuario(${index})">Eliminar</button>
            <button onclick="cargarUsuario(${index})">Modificar</button>
            <hr>
        `;
        usuariosList.appendChild(usuarioItem);
    });
}

// Función para cargar los datos del usuario en el formulario para modificar
function cargarUsuario(index) {
    console.log("Cargar usuario en índice:", index);
    // Obtén la lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    // Rellena el formulario con los datos del usuario
    document.getElementById("new-username").value = usuario.username;
    document.getElementById("new-password").value = usuario.password;

    // Establece el índice del usuario a modificar
    indiceModificarUsuario = index;
}

// Función para eliminar usuario
function eliminarUsuario(index) {
    // Obtén la lista de usuarios del localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Elimina el usuario de la lista
    usuarios.splice(index, 1);

    // Guarda la nueva lista en el almacenamiento local
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Actualiza la lista de usuarios
    actualizarListaUsuarios();
}

// Cargar usuarios al iniciar
document.addEventListener("DOMContentLoaded", actualizarListaUsuarios);
