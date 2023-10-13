class Estudiante {
  constructor(codigo, nombre, carrera) {
    this.codigo = parseInt(codigo);
    this.nombre = nombre;
    this.carrera = carrera;
  }
}

class Curso {
  constructor(codigo, nombre, especialidad, duracion, creditos) {
    this.codigo = parseInt(codigo);
    this.nombre = nombre;
    this.especialidad = especialidad;
    this.duracion = duracion;
    this.creditos = parseInt(creditos);
    this.estudiantes = [];
  }
}

class Horario {
  constructor(codigoCurso, codigoEstudiante, dia, horaInicio, horaFin) {
    this.codigoCurso = parseInt(codigoCurso);
    this.codigoEstudiante = parseInt(codigoEstudiante);
    this.dia = dia;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
  }
}

const estudiantes = [];
const cursos = [];
const horarios = [];


const storedEstudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
const storedCursos = JSON.parse(localStorage.getItem('cursos')) || [];
const storedHorarios = JSON.parse(localStorage.getItem('horarios')) || [];


estudiantes.push(...storedEstudiantes);
cursos.push(...storedCursos);
horarios.push(...storedHorarios);

function estudianteExiste(codigo) {
  return estudiantes.some(estudiante => estudiante.codigo === codigo);
}

function cursoExiste(codigo) {
  return cursos.some(curso => curso.codigo === codigo);
}

function agregarEstudiante(codigo, nombre, carrera) {
  if (estudiantes.some(estudiante => estudiante.codigo === parseInt(codigo))) {
    alert('Ya existe un estudiante con ese código.');
  } else {
    const estudiante = new Estudiante(codigo, nombre, carrera);
    estudiantes.push(estudiante);
    alert('Estudiante registrado: ');
    actualizarTablaEstudiantes();
    actualizarLocalStorage();
  }
}

function agregarCurso(codigo, nombre, especialidad, duracion, creditos) {
  if (cursos.some(curso => curso.codigo === parseInt(codigo))) {
    alert('Ya existe un curso con ese código.');
  } else {
    const curso = new Curso(codigo, nombre, especialidad, duracion, creditos);
    cursos.push(curso);
    alert('Curso registrado: ');
    actualizarTablaCursos();
    actualizarLocalStorage();
  }
}

function agregarEstudianteACurso(cursoCodigo, estudianteCodigo) {
  const curso = cursos.find(curso => curso.codigo === cursoCodigo);
  if (curso) {
    if (estudianteExiste(estudianteCodigo)) {
      if (!curso.estudiantes.includes(estudianteCodigo)) {
        curso.estudiantes.push(estudianteCodigo);
        alert('Estudiante inscrito en el curso correctamente.');
        actualizarLocalStorage();
      } else {
        alert('El estudiante ya está inscrito en este curso.');
      }
    } else {
      alert('El estudiante no existe.');
    }
  } else {
    alert('El curso no existe.');
  }
}

function modificarEstudiante(codigo) {
  const estudiante = estudiantes.find(e => e.codigo === codigo);
  if (estudiante) {
    const nuevoNombre = prompt('Ingrese el nuevo nombre:');
    const nuevaCarrera = prompt('Ingrese la nueva carrera:');
    if (nuevoNombre) {
      estudiante.nombre = nuevoNombre;
    }
    if (nuevaCarrera) {
      estudiante.carrera = nuevaCarrera;
    }
    alert('Estudiante modificado: ');
    actualizarTablaEstudiantes();
    actualizarLocalStorage();
  } else {
    alert('Estudiante no encontrado.');
  }
}

function modificarCurso(codigo) {
  const curso = cursos.find(c => c.codigo === codigo);
  if (curso) {
    const nuevoNombre = prompt('Ingrese el nuevo nombre:');
    const nuevaEspecialidad = prompt('Ingrese la nueva especialidad:');
    const nuevaDuracion = prompt('Ingrese la nueva duración:');
    const nuevosCreditos = prompt('Ingrese los nuevos créditos:');
    if (nuevoNombre) {
      curso.nombre = nuevoNombre;
    }
    if (nuevaEspecialidad) {
      curso.especialidad = nuevaEspecialidad;
    }
    if (nuevaDuracion) {
      curso.duracion = nuevaDuracion;
    }
    if (nuevosCreditos) {
      curso.creditos = nuevosCreditos;
    }
    alert('Curso modificado: ');
    actualizarTablaCursos();
    actualizarLocalStorage();
  } else {
    alert('Curso no encontrado.');
  }
}

function modificarHorario(codigo) {
  const horario = horarios.find(h => h.codigoCurso === codigo || h.codigoEstudiante === codigo);
  if (horario) {
    const nuevoDia = prompt('Ingrese el nuevo día:');
    const nuevaHoraInicio = prompt('Ingrese la nueva hora de inicio:');
    const nuevaHoraFin = prompt('Ingrese la nueva hora de fin:');
    if (nuevoDia) {
      horario.dia = nuevoDia;
    }
    if (nuevaHoraInicio) {
      horario.horaInicio = nuevaHoraInicio;
    }
    if (nuevaHoraFin) {
      horario.horaFin = nuevaHoraFin;
    }
    alert('Horario modificado: ');
    actualizarTablaHorarios();
    actualizarLocalStorage();
  } else {
    alert('Horario no encontrado.');
  }
}

function eliminarEstudiante(codigo) {
  const estudianteIndex = estudiantes.findIndex(e => e.codigo === codigo);
  if (estudianteIndex !== -1) {
    estudiantes.splice(estudianteIndex, 1);
    alert('Estudiante eliminado con éxito.');
    actualizarTablaEstudiantes();
    actualizarLocalStorage();
  } else {
    alert('Estudiante no encontrado.');
  }
}

function eliminarCurso(codigo) {
  const cursoIndex = cursos.findIndex(c => c.codigo === codigo);
  if (cursoIndex !== -1) {
    cursos.splice(cursoIndex, 1);
    alert('Curso eliminado con éxito.');
    actualizarTablaCursos();
    actualizarLocalStorage();
  } else {
    alert('Curso no encontrado.');
  }
}

function eliminarHorario(codigo) {
  const horarioIndex = horarios.findIndex(h => h.codigoCurso === codigo || h.codigoEstudiante === codigo);
  if (horarioIndex !== -1) {
    horarios.splice(horarioIndex, 1);
    alert('Horario eliminado con éxito.');
    actualizarTablaHorarios();
    actualizarLocalStorage();
  } else {
    alert('Horario no encontrado.');
  }
}

function agregarHorario(codigoCurso, codigoEstudiante, dia, horaInicio, horaFin) {
  const horario = new Horario(codigoCurso, codigoEstudiante, dia, horaInicio, horaFin);
  horarios.push(horario);
  alert('Horario registrado: ');
  actualizarTablaHorarios();
  actualizarLocalStorage();
}

function actualizarTablaEstudiantes() {
  const tabla = document.getElementById('listaEstudiantes');
  tabla.innerHTML = `
      <tr>
        <th>Código</th>
        <th>Nombre</th>
        <th>Carrera</th>
        <th>Modificar</th>
        <th>Eliminar</th>
      </tr>
    `;
  estudiantes.forEach(estudiante => {
    tabla.innerHTML += `
        <tr>
          <td>${estudiante.codigo}</td>
          <td>${estudiante.nombre}</td>
          <td>${estudiante.carrera}</td>
          <td><button onclick="modificarEstudiante(${estudiante.codigo})">Modificar</button></td>
          <td><button onclick="eliminarEstudiante(${estudiante.codigo})">Eliminar</button></td>
        </tr>
      `;
  });
}

function actualizarTablaCursos() {
  const tabla = document.getElementById('listaCursos');
  tabla.innerHTML = `
      <tr>
        <th>Código</th>
        <th>Nombre</th>
        <th>Especialidad</th>
        <th>Duración</th>
        <th>Créditos</th>
        <th>Modificar</th>
        <th>Eliminar</th>
      </tr>
    `;
  cursos.forEach(curso => {
    tabla.innerHTML += `
        <tr>
          <td>${curso.codigo}</td>
          <td>${curso.nombre}</td>
          <td>${curso.especialidad}</td>
          <td>${curso.duracion}</td>
          <td>${curso.creditos}</td>
          <td><button onclick="modificarCurso(${curso.codigo})">Modificar</button></td>
          <td><button onclick="eliminarCurso(${curso.codigo})">Eliminar</button></td>
        </tr>
      `;
  });
}

function actualizarTablaHorarios() {
  const tabla = document.getElementById('listaHorarios');
  tabla.innerHTML = `
      <tr>
        <th>Código Curso</th>
        <th>Código Estudiante</th>
        <th>Día</th>
        <th>Hora de Inicio</th>
        <th>Hora de Fin</th>
        <th>Modificar</th>
        <th>Eliminar</th>
      </tr>
    `;
  horarios.forEach(horario => {
    tabla.innerHTML += `
        <tr>
          <td>${horario.codigoCurso}</td>
          <td>${horario.codigoEstudiante}</td>
          <td>${horario.dia}</td>
          <td>${horario.horaInicio}</td>
          <td>${horario.horaFin}</td>
          <td><button onclick="modificarHorario(${horario.codigoCurso})">Modificar</button></td>
          <td><button onclick="eliminarHorario(${horario.codigoCurso})">Eliminar</button></td>
        </tr>
      `;
  });
}

function actualizarLocalStorage() {
  localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
  localStorage.setItem('cursos', JSON.stringify(cursos));
  localStorage.setItem('horarios', JSON.stringify(horarios));
}

document.getElementById('estudianteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const codigo = document.getElementById('estudianteCodigo').value;
  const nombre = document.getElementById('estudianteNombre').value;
  const carrera = document.getElementById('estudianteCarrera').value;

  if (estudianteExiste(codigo)) {
    console.log('Ya existe un estudiante con ese código.');
  } else {
    agregarEstudiante(codigo, nombre, carrera);
  }
});

document.getElementById('cursoForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const codigo = document.getElementById('cursoCodigo').value;
  const nombre = document.getElementById('cursoNombre').value;
  const especialidad = document.getElementById('cursoEspecialidad').value;
  const duracion = document.getElementById('cursoDuracion').value;
  const creditos = document.getElementById('cursoCreditos').value;

  if (cursoExiste(codigo)) {
    console.log('Ya existe un curso con ese código.');
  } else {
    agregarCurso(codigo, nombre, especialidad, duracion, creditos);
  }
});

document.getElementById('horarioForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const codigoCurso = document.getElementById('horarioCursoCodigo').value;
  const codigoEstudiante = document.getElementById('horarioEstudianteCodigo').value;
  const dia = document.getElementById('horarioDia').value;
  const horaInicio = document.getElementById('horarioHoraInicio').value;
  const horaFin = document.getElementById('horarioHoraFin').value;
  agregarHorario(codigoCurso, codigoEstudiante, dia, horaInicio, horaFin);
});

document.getElementById('agregarEstudiantesCurso').addEventListener('submit', function (e) {
  e.preventDefault();
  const cursoCodigo = document.getElementById('cursoCodigo').value;
  const estudianteCodigo = document.getElementById('estudianteCodigoACurso').value;
  agregarEstudianteACurso(parseInt(cursoCodigo), parseInt(estudianteCodigo));
});

function agregarBotonModificacion(id, modificar) {
  document.getElementById(id).addEventListener('click', function () {
    const codigo = prompt(`Ingrese el código a modificar:`);
    const codigoNumerico = parseInt(codigo);
    if (!isNaN(codigoNumerico)) {
      modificar(codigoNumerico);
    } else {
      alert('El código ingresado no es válido.');
    }
  });
}

function agregarBotonEliminacion(id, eliminar) {
  document.getElementById(id).addEventListener('click', function () {
    const codigo = prompt(`Ingrese el código a eliminar:`);
    const codigoNumerico = parseInt(codigo);
    if (!isNaN(codigoNumerico)) {
      eliminar(codigoNumerico);
    } else {
      alert('El código ingresado no es válido.');
    }
  });
}

agregarBotonModificacion('modificarEstudianteButton', modificarEstudiante);
agregarBotonModificacion('modificarCursoButton', modificarCurso);
agregarBotonModificacion('modificarHorarioButton', modificarHorario);

agregarBotonEliminacion('eliminarEstudianteButton', eliminarEstudiante);
agregarBotonEliminacion('eliminarCursoButton', eliminarCurso);
agregarBotonEliminacion('eliminarHorarioButton', eliminarHorario);
