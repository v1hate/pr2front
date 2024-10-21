// Función para cargar usuarios conectados
function loadUsers() {
    fetch('https://pr2back.onrender.com/users')  // Cambia esto por la URL de producción
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';  // Limpiar la lista
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.username;
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar usuarios:', error));
}

// Llamar a la función al cargar la página
window.onload = loadUsers;

document.getElementById('sendFile').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        fetch('https://pr2back.onrender.com/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            loadUsers();  // Volver a cargar los usuarios después de enviar el archivo
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        console.log('Por favor selecciona un archivo.');
    }
});
