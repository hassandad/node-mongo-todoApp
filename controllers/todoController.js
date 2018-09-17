let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let todoTasksList = [{item: 'Pray Fajar'},{item: 'Breakfast'}];

let encodePass = encodeURIComponent('todoP@ss1');
mongoose.connect('mongodb://todo_user:'+encodePass+'@ds261072.mlab.com:61072/todo');

let Schema = mongoose.Schema;
let todoSchema = new Schema({
    item: String
});

// Model name should be start with Capital letter
let Todo = mongoose.model('Todo',todoSchema);
// let itemOne = Todo({item:'Wake up early'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// })


// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = function(app){

    app.get('/todo',(req,res)=>{
        // We are passing it empty object so that it can get all the records in the db
        Todo.find({},(err,data)=>{
            if(err) throw err;

            res.render('todo',{todoList:data});
        });
        
    });

    app.post('/todo',urlencodedParser,(req,res)=>{
        //todoTasksList.push(req.body);
        console.log('111');
        Todo(req.body).save((err,data)=>{
            console.log('2222');
            if(err) throw err;
            console.log(data);

            //res.redirect('/todo');
            //res.json(data);
            
        });
    });

    app.delete('/todo/:item',(req,res)=>{
        // console.log(req.params.item);
        // console.log(req.params.item.replace('-'," "));
        Todo.deleteOne({ item: req.params.item.replace('-'," ") }, function (err, obj) {
            if(err) throw err;
            console.log(obj);
            console.log('1 document deleted');
            res.json('Done');    
        });
    });
}