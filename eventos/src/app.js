const passport = require('passport')  
const session = require('express-session')  
const MongoStore = require('connect-mongo')(session)
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

global.authenticationMiddleware = () => {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login?fail=true')
  }
};
const eventosRouter = require('./routes/eventos');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const salasdRouter = require('./routes/salas');
const graficosRouter = require('./routes/graficos'); 
const eventosUsuarioRouter = require('./routes/eventosUsuario');
const blogRouter = require('./routes/blog');
const postRouter = require('./routes/post');


const app = express();

//autenticação
require('./auth')(passport);
app.use(session({  
  store: new MongoStore({
    db: global.db,
    ttl: 30 * 60 // = 30 minutos de sessão
  }),
  secret: process.env.MONGO_STORE_SECRET,//configure um segredo seu aqui
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/eventos', eventosRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/salas', salasdRouter);
app.use('/graficos', graficosRouter);
app.use('/eventosUsuario', eventosUsuarioRouter);
app.use('/blog', blogRouter);
app.use('/post', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
