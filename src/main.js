const urlUser = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlCohorts = '../data/cohorts.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const select = document.getElementById('select');
const listUsers = document.getElementById('users');
const search = document.getElementById('search');
const  orderBy = document.getElementById('orderBy');
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
    let usersStats = processCohortData(option);
  }
  getJSON(urlProgress, progress);
  getJSON(urlCohorts, courses);
}

getJSON(urlUser, addUserProgress);

const addUsers = (usuario) => {
  usuario.map((valorusuario) => {
    let listUser = document.createElement('li');
    listUser.innerHTML = valorusuario.name + '<p>' +
      'Percent : ' + valorusuario.stats.percent + '%' + '<p>' +
      'Total exercises : ' + valorusuario.stats.exercises.total + '<p>' +
      'Total complete exercises: ' + valorusuario.stats.exercises.completed + '<p>' +
      'Percent exercises  : ' + valorusuario.stats.exercises.percent + '%' + '<p>' +
      'Total readings : ' + valorusuario.stats.reads.total + '<p>' +
      'Total full readings: ' + valorusuario.stats.reads.completed + '<p>' +
      'Percent readings  : ' + valorusuario.stats.reads.percent + '%' + '<p>' +
      'Total quizzes : ' + valorusuario.stats.quizzes.total + '<p>' +
      'Total complete quizzes: ' + valorusuario.stats.quizzes.completed + '<p>' +
      'Percent quizzes : ' + valorusuario.stats.quizzes.percent + '%' + '<p>';
    listUsers.appendChild(listUser);
  });
}

// Selección de Cohort
select.addEventListener('change', () => {
  listUsers.innerHTML = '';
  if (select.value === 'lim-2018-03-pre-core-pw') {
    console.log(option)
    const resultadoDeEstudiantes = processCohortData(option);
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
  console.log(resultadoFinal);
  //console.log(resultadoFinal)
  //addUsers(resultadoFinal);
  //return estudiantesFiltradas;
});

//Buscar en el select de ordenamiento
orderBy.addEventListener('change', () => { 
  listUsers.innerHTML = '';
  option.orderBy = event.target.value;
  //processCohortData(option);

});

//Evento del botón ASC/DESC
orderDirection.addEventListener('toggle', () => {
  if (option.orderDirection === 'ASC') {
    option.orderDirection = 'DESC';
  } else {
    option.orderDirection = 'ASC';
  }
}
)