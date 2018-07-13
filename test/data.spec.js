describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreAvg: 29,
          scoreSum: 57,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  const name1 =  { 
    name: "Zarela Zanabria",
    stats: { 
      reads:{
        total: 5,
        completed: 5,
        percent: 50
      },
     quizzes: {
      total: 10,
      completed: 5,
      percent: 50,
      scoreSum: 50,
      scoreAvg: 10
    },
     percent: 50,
     exercises:  {
      total: 10,
      completed: 5,
      percent: 50
    }, } }
const name2 = {
  name: "Ailim",
 stats:{ 
  reads: {
    total: 10,
    completed: 10,
    percent: 100
  },
  quizzes: {
    total: 10,
    completed: 10,
    percent: 100,
    scoreSum: 1000,
    scoreAvg: 100
  },
  percent: 100,
  exercises:{
    total: 10,
    completed: 10,
    percent: 100
  }, } }  

  let estudiantes = [name2, name1];

  describe('sortUsers(users, orderBy, orderDirection)', () => {

    it('debería retornar arreglo de usuarios ordenado por nombre ASC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "name", "ASC"), [name2, name1])
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "name", "DESC"), [name1, name2])
    });  
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "percent", "ASC"), [name2, name1])
    });  
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "percent", "DESC"), [name1, name2])
    });  
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "exercises.completed", "ASC"), [name2, name1])
    });  
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "exercises.completed", "DESC"), [name1, name2])
    }); 
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "quizzes.completed", "ASC"), [name2, name1])
    }); 
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "quizzes.completed", "DESC"), [name1, name2])
    }); 
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "quizzes.scoreAvg", "ASC"), [name2, name1])
    }); 
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "quizzes.scoreAvg", "DESC"), [name1, name2])
    }); 
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "reads.completed", "ASC"), [name2, name1])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC',()=>{
      assert.deepEqual(window.sortUsers(estudiantes, "reads.completed", "DESC"), [name1, name2])
    });

  });

  describe('filterUsers(users, filterBy)', () => {
    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)');
      assert.deepEqual(window.filterUsers(estudiantes, "ailim"), [name2])
  });

  describe('processCohortData(options)', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const options = {
      cohort : courses,
      cohortData: {
        users : users,
        progress : progress,
      },
      orderBy:'name',
      orderDirection : 'DESC',
      search: 'ailim',
    }
    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter');
      //assert.deepEqual(window.processCohortData(options), [name2])
  });

});