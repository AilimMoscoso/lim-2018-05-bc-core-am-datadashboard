window.computeUsersStats = (users, progress, courses) => {
let listUsuarioComputerUser = [];
  users.map(usuario => {
    const UsuarioNuevo = NuevoUsuarioStats(usuario, progress[usuario.id], courses);
    listUsuarioComputerUser.push(UsuarioNuevo);
  });
  return listUsuarioComputerUser;
}

const NuevoUsuarioStats = (usuario, progress, courses) => {
  let nameUser = usuario.name;
  let usersWithStats = {}
  usersWithStats.stats = {
    percent: computerUserPercent(progress, courses),
    exercises: computerExercises(progress, courses),
    reads: computerUsersRead(progress, courses),
    quizzes: computerUserQuizz(progress, courses),
  }
  usersWithStats.name = nameUser;
  return usersWithStats;
}

const computerUserPercent = (progress, courses) => {
  try {
    return progress[courses].percent;
  } catch (error) {
    return 0;
  }
}

const computerExercises = (progress, courses) => {
  let cont = 0;
  let contComplet = 0;
  try {
    courses.map((curso) => {
      const valorUnits = Object.keys(progress[curso].units);
      valorUnits.map((nombreUnits) => {
        const valorParts = Object.keys(progress[curso].units[nombreUnits].parts);
        valorParts.map((nombreParts) => {
          const valorExcercises = progress[curso].units[nombreUnits].parts[nombreParts];
          if (valorExcercises.hasOwnProperty('exercises')) {
            const nombreExercises = valorExcercises.exercises;
            cont += Object.keys(nombreExercises).length;
            const valorCompletado = Object.keys(valorExcercises.exercises);
            valorCompletado.map((nombreExercises) => {
              const valorCompleted = progress[curso].units[nombreUnits].parts[nombreParts].exercises[nombreExercises].completed;
              if (valorCompleted == 1) {
                contComplet += valorCompleted;
              }
            });
          }
        });
      });
    });
  } catch (error) {
    let exercises = {
      total: 0,
      completed: 0,
      percent: 0,
    }
    return exercises;
  }
  let exercises = {
    total: cont,
    completed: contComplet,
    percent: (contComplet / cont) * 100,
  }
  return exercises;
};

const computerUsersRead = (progress, courses) => {
  let cont = 0;
  let contComplet = 0;
  try {
    courses.map((curso) => {
      const valorUnits = Object.keys(progress[curso].units);
      valorUnits.map((nombreUnits) => {
        const valorParts = Object.keys(progress[curso].units[nombreUnits].parts);
        valorParts.map((nombreParts) => {
          const valorType = progress[curso].units[nombreUnits].parts[nombreParts];
          if (valorType.type == "read") {
            cont++;
          }
          if (valorType.type == "read" && valorType.completed == 1) {
            contComplet++;
          }
        });
      });
    });
  } catch (error) {
    let reads = {
      total: 0,
      completed: 0,
      percent: 0,
    }
    return reads;
  }

  let reads = {
    total: cont,
    completed: contComplet,
    percent: Math.round((contComplet / cont) * 100),
  }
  return reads;
}

const computerUserQuizz = (progress, courses) => {
  let cont = 0;
  let contComplet = 0;
  let contscoreAvg = 0
  try {
    courses.map((curso) => {
      const valorUnits = Object.keys(progress[curso].units);
      valorUnits.map((nombreUnits) => {
        const valorParts = Object.keys(progress[curso].units[nombreUnits].parts);
        valorParts.map((nombreParts) => {
          const valorType = progress[curso].units[nombreUnits].parts[nombreParts];
          if (valorType.type == "quiz") {
            cont++;
          }
          if (valorType.type == "quiz" && valorType.completed == 1) {
            contComplet++;
          }
          if (valorType.type == "quiz" && valorType.completed == 1 && valorType.score) {
            contscoreAvg += valorType.score;
          }
        });
      });
    });
  } catch (error) {
    let quizzes = {
      total: 0,
      completed: 0,
      percent: 0,
      scoreSum: 0,
      scoreAvg: 0,
    }
    return quizzes;
  }
  let quizzes = {
    total: cont,
    completed: contComplet,
    percent: Math.round((contComplet / cont) * 100),
    scoreSum: contscoreAvg,
    scoreAvg: Math.round(contscoreAvg / contComplet),
  }
  return quizzes;
}

//Ordena la lista
window.sortUsers = (usersStat, orderBy, orderDirection) => {
  //console.log(usersStat);
  //console.log(orderBy);
  //console.log(orderDirection);
  function func (userStat) {
    switch (orderBy) {
      case "name":
        return userStat.name.toLowerCase();
      case "total-percent":
        return userStat.stats.percent;
      case "exercises-percent":
        return userStat.stats.exercises.percent;
      case "quizzes-percent":
        return userStat.stats.quizzes.percent;
      case "quizzes-avg":
        return userStat.stats.quizzes.scoreAvg;
      case "read-percent":
        return userStat.stats.reads.percent;
      default:
        return userStat.name;
    }
  }
  result = usersStat.sort((userStat1, userStat2) => {
    const a = func(userStat1), b = func(userStat2);
    return (a < b) ? -1 : ((a > b) ? 1 : 0);
  });
  if (orderDirection === "DESC") result.reverse();
  //console.log(result);
  // document.getElementById('data').style.display = 'block';
  return result

}
//Buscar estudiantes por nombre

window.filterUsers = (users, search) => {
  let result2 = [];
  users.forEach(user => {
    const name = user.name.toLowerCase();
    const lowerSearch = search.toLowerCase();
    if (name.includes(lowerSearch))
      result2.push(user);
  });
  //console.log(result2);
  return result2;
}

window.processCohortData = (options) => {
  //console.log(options);
  let estudiantes = computeUsersStats(options.cohortData.users, options.cohortData.progress, options.cohort);
  //console.log(estudiantes);
  estudiantes = filterUsers(estudiantes, options.search);
  //console.log(estudiantes);
  estudiantes = sortUsers(estudiantes, options.orderBy, options.orderDirection);
  //console.log(estudiantes);
  return estudiantes;
}