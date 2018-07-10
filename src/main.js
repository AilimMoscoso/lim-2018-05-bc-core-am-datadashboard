const urlUser = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlCohorts = '../data/cohorts.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const select = document.getElementById('select-cohorts');
const listUsers = document.getElementById('container-user');

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
        let usersStats = computeUsersStats(users, progress, courses);
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
select.addEventListener('change', e => {
    e.preventDefault();
    if (select.value === 'lim-2018-03-pre-core-pw') {
        addUsers(listUsuarioComputerUser)
    }
    else {
        alert('Sin datos para mostrar');
    }
});
