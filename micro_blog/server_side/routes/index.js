
const express = require('express')
const ensureLogin = require('connect-ensure-login')
const db = require('../db')

const ensureLoggedIn = ensureLogin()

const fetchTodos = (req,res,next) => {
  db.all('SELECT * FROM todos WHERE owner_id = ?', [
    req.user.id
  ], (err,rows) => {
    if (err) {
      return next(err)
    }

    const todos = rows.map((row) => {
      return {
        id:row.id,
        title:row.title,
        completed: row.completed === 1 ? true : false,
        url: '/' + row.id
      }
    })
    res.locals.todos = todos;
    res.locals.activeCount = todos.filter((todo) => { return !todo.completed; }).length;
    res.locals.completedCount = todos.length - res.locals.activeCount;
    next();
  })
}

const router = express.Router

// Get home page
router.get('/',(req,res,next) => {
  if(!req.user){
    return res.render('home')
  }
  next()
},  
  fetchTodos,(req,res,next) => {
    res.locals.filter = null
    res.sender('index',{user:req.user})
  }
)

router.get('/active', ensureLoggedIn, fetchTodos, (req, res, next) => {
  res.locals.todos = res.locals.todos.filter((todo) => { return !todo.completed; });
  res.locals.filter = 'active';
  res.render('index', { user: req.user });
});

router.get('/completed', ensureLoggedIn, fetchTodos,(req, res, next) => {
  res.locals.todos = res.locals.todos.filter((todo) => { return todo.completed; });
  res.locals.filter = 'completed';
  res.render('index', { user: req.user });
});

router.post('/', ensureLoggedIn, (req, res, next) => {
  req.body.title = req.body.title.trim();
  next();
}, (req, res, next) => {
  if (req.body.title !== '') { return next(); }
  return res.redirect('/' + (req.body.filter || ''));
}, (req, res, next) => {
  db.run('INSERT INTO todos (owner_id, title, completed) VALUES (?, ?, ?)', [
    req.user.id,
    req.body.title,
    req.body.completed == true ? 1 : null
  ], (err) => {
    if (err) { return next(err); }
    return res.redirect('/' + (req.body.filter || ''));
  });
});

router.post('/:id(\\d+)', ensureLoggedIn, (req, res, next) => {
  req.body.title = req.body.title.trim();
  next();
}, (req, res, next) => {
  if (req.body.title !== '') { return next(); }
  db.run('DELETE FROM todos WHERE id = ? AND owner_id = ?', [
    req.params.id,
    req.user.id
  ], (err) => {
    if (err) { return next(err); }
    return res.redirect('/' + (req.body.filter || ''));
  });
}, (req, res, next) => {
  db.run('UPDATE todos SET title = ?, completed = ? WHERE id = ? AND owner_id = ?', [
    req.body.title,
    req.body.completed !== undefined ? 1 : null,
    req.params.id,
    req.user.id
  ], (err) => {
    if (err) { return next(err); }
    return res.redirect('/' + (req.body.filter || ''));
  });
});

router.post('/:id(\\d+)/delete', ensureLoggedIn, (req, res, next) => {
  db.run('DELETE FROM todos WHERE id = ? AND owner_id = ?', [
    req.params.id,
    req.user.id
  ], (err) => {
    if (err) { return next(err); }
    return res.redirect('/' + (req.body.filter || ''));
  });
});

router.post('/toggle-all', ensureLoggedIn, (req, res, next) => {
  db.run('UPDATE todos SET completed = ? WHERE owner_id = ?', [
    req.body.completed !== undefined ? 1 : null,
    req.user.id
  ], (err) => {
    if (err) { return next(err); }
    return res.redirect('/' + (req.body.filter || ''));
  });
});

router.post('/clear-completed', ensureLoggedIn, (req, res, next) => {
  db.run('DELETE FROM todos WHERE owner_id = ? AND completed = ?', [
    req.user.id,
    1
  ], (err) => {
    if (err) { return next(err); }
    return res.redirect('/' + (req.body.filter || ''));
  });
});

module.exports = router;