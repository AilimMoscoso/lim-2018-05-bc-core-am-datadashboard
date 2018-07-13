const urlUser = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlCohorts = '../data/cohorts.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const select = document.getElementById('select');
const listUsers = document.getElementById('users');
const search = document.getElementById('search');
const orderBy = document.getElementById('orderBy');
const button = document.getElementById('orderDirection');

//Objeto Option
const option = {
  cohort : null,
  cohortData: {
    users : [],
    progress : {},
  },
  orderBy:'name',
  orderDirection : 'ASC',
  search: '',
}

const getJSON = (url, callback) => {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.onerror = handleError;
  request.send();
}

const handleError = () => {
  console.log('Se ha presentado un error');
}

const addUserProgress = () => {
  const courses = ["intro"]
  const users = JSON.parse(event.target.responseText);
  option.cohortData.users = users;
  option.cohort = courses;
  const addCohorts = (event) => {
    const cohorts = JSON.parse(event.target.responseText);
    cohorts.map((dataCohorts) => {
      const listCor = document.createElement('option');
      listCor.value = dataCohorts.id;
      listCor.innerHTML = dataCohorts.id;
      select.appendChild(listCor);
    });
  }
  getJSON(urlCohorts, addCohorts);
  const progress = () => {
    const progress = JSON.parse(event.target.responseText);
    option.cohortData.progress = progress;
    //let usersStats = processCohortData(option);
  }
  getJSON(urlProgress, progress);
  getJSON(urlCohorts, courses);
}

getJSON(urlUser, addUserProgress);

const addUsers = (usuario) => {
  listUsers.innerHTML = '';
  usuario.map((valorusuario) => {
    let listUser = document.createElement('li');
    listUser.innerHTML = valorusuario.name.toUpperCase().bold() + '<p>' +
      '% Completitud total: '.italics() + (valorusuario.stats.percent + '%' + '<p>').bold() +
      'Ejercicios totales: '.italics() + (valorusuario.stats.exercises.total + '<p>').bold() +
      'Ejercicios completados: '.italics() + (valorusuario.stats.exercises.completed + '<p>').bold() +
      '% Ejercicios completados: '.italics() + (valorusuario.stats.exercises.percent + '%' + '<p>').bold() +
      'Lecturas totales: '.italics() + (valorusuario.stats.reads.total + '<p>').bold() +
      'Lecturas completadas: '.italics() + (valorusuario.stats.reads.completed + '<p>').bold() +
      '% Lecturas completadas: '.italics() + (valorusuario.stats.reads.percent + '%' + '<p>').bold() +
      'Quizzes totales: '.italics() + (valorusuario.stats.quizzes.total + '<p>').bold() +
      'Quizzes completadas: '.italics() + (valorusuario.stats.quizzes.completed + '<p>').bold() +
      '% Quizzes completadas: '.italics() + (valorusuario.stats.quizzes.percent + '%' + '<p>').bold();
    listUsers.appendChild(listUser);
  });
}

// Selección de Cohort
select.addEventListener('change', () => {
  if (select.value === 'lim-2018-03-pre-core-pw') {
    const resultadoDeEstudiantes = processCohortData(option);;
    addUsers(resultadoDeEstudiantes);
  } else {
    alert('Sin datos para mostrar');
  }
});

//Buscar en input
document.getElementById('Buscar').addEventListener('click', (e) => {
  e.preventDefault();
  listUsers.innerHTML = '';
  let search = document.getElementById('search').value;
  option.search = search;
  const resultadoFinal = processCohortData(option);
  addUsers(resultadoFinal);
  //return estudiantesFiltradas;
});

//Buscar en el select de ordenamiento
orderBy.addEventListener('change', () => {
  option.orderBy = event.target.value;
  option.orderDirection = document.getElementById("orderDirection").value;
  const resultadoFinal = processCohortData(option);
  addUsers(resultadoFinal);
});

//Evento del select ASC/DESC
orderDirection.addEventListener('change', () => {
  option.orderDirection = document.getElementById("orderDirection").value;
  const resultadoFinal = processCohortData(option);
  addUsers(resultadoFinal);
});