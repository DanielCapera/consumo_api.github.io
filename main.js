const URL_API = 'https://apigithubio-production.up.railway.app/usuarios';
const tabla = document.querySelector('#usuarios');

// Función para actualizar la tabla de usuarios
async function actualizarTabla() {
  tabla.innerHTML = '';
  const respuesta = await fetch(URL_API);
  const usuarios = await respuesta.json();
  usuarios.forEach(usuario => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td>${usuario.correoElectronico}</td>
      <td>${usuario.edad}</td>
      <td>
        <button class="boton-actualizar" data-id="${usuario.id}">Actualizar</button>
        <button class="boton-eliminar" data-id="${usuario.id}">Eliminar</button>
      </td>
    `;
    tabla.appendChild(tr);
  });
  // Escuchar eventos para actualizar o eliminar usuarios
  const botonesActualizar = document.querySelectorAll('.boton-actualizar');
  botonesActualizar.forEach(boton => {
    boton.addEventListener('click', async () => {
      const id = boton.dataset.id;
      const respuesta = await fetch(`${URL_API}/${id}`);
      const usuario = await respuesta.json();
      const nombreInput = document.querySelector('#nombre');
      nombreInput.value = usuario.nombre;
      const apellidoInput = document.querySelector('#apellido');
      apellidoInput.value = usuario.apellido;
      const correoInput = document.querySelector('#correoElectronico');
      correoInput.value = usuario.correoElectronico;
      const edadInput = document.querySelector('#edad');
      edadInput.value = usuario.edad;
      const botonSubmit = document.querySelector('form button[type="submit"]');
      botonSubmit.dataset.id = id;
      botonSubmit.textContent = 'Actualizar usuario';
    });
  });
  const botonesEliminar = document.querySelectorAll('.boton-eliminar');
  botonesEliminar.forEach(boton => {
  boton.addEventListener('click', async () => {
  const id = boton.dataset.id;
  const confirmacion = confirm(`Estás seguro de que quieres eliminar el usuario con ID ${id}?`);
  if (confirmacion) {
  const respuesta = await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
  if (respuesta.ok) {
  actualizarTabla();
  } else {
  alert('Error al eliminar el usuario');
  }
  }
  });
  });
  }
  
  // Función para agregar un nuevo usuario
  async function agregarUsuario(evento) {
  evento.preventDefault();
  const nombreInput = document.querySelector('#nombre');
  const apellidoInput = document.querySelector('#apellido');
  const correoInput = document.querySelector('#correoElectronico');
  const edadInput = document.querySelector('#edad');
  const usuario = {
  nombre: nombreInput.value,
  apellido: apellidoInput.value,
  correoElectronico: correoInput.value,
  edad: edadInput.value,
  };
  const respuesta = await fetch(URL_API, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(usuario),
  });
  if (respuesta.ok) {
  nombreInput.value = '';
  apellidoInput.value = '';
  correoInput.value = '';
  edadInput.value = '';
  const botonSubmit = document.querySelector('form button[type="submit"]');
  botonSubmit.removeAttribute('data-id');
  botonSubmit.textContent = 'Agregar usuario';
  actualizarTabla();
  } else {
  alert('Error al agregar el usuario');
  }
  }
  
  // Escuchar eventos para actualizar o agregar usuarios
  actualizarTabla();
  const formulario = document.querySelector('form');
  formulario.addEventListener('submit', agregarUsuario);
  