let express = require('express');
let todoController = require('./controllers/todoController.js');

// Fire express
let app = express();

// Setup up handlebars template engine
let hbs = require('express-handlebars');
app.engine('handlebars', hbs({}));
app.set('view engine', 'handlebars');

// Setup middleware to server all the static files
// So for example path to localhost:3000/assets/style.css will be 
// mapped to folder public/assets/css
app.use(express.static('public'));

// Fire controller
todoController(app);

app.listen(3000,function(){
    console.log('listening on port ')
});