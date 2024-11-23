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
