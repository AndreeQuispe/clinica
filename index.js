document.addEventListener('DOMContentLoaded', () => {
    const pacienteInfo = document.getElementById('paciente-info');
    const paciente = JSON.parse(localStorage.getItem('paciente'));

    // Verifica si hay datos de paciente
    if (paciente) {
        pacienteInfo.innerHTML = `
            <p>Nombre: ${paciente.nombre}</p>
            <p>Edad: ${paciente.edad}</p>
            <p>Diagnóstico: ${paciente.diagnostico}</p>
        `;
    } else {
        pacienteInfo.innerHTML = '<p>No hay pacientes registrados</p>';
    }
});
