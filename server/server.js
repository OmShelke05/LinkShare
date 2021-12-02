const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root123#",
    database: "LinkShare",
});

app.post('/create', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    db.query("INSERT INTO users(name, email, password) VALUES(?, ?, ?)", 
        [name, email, password],
        (err, result) => {
            if(err){
                console.log(err)
            } else {
                res.send("Values inserted");
            }
        })
    db.query("INSERT INTO notes(email, userNotes) VALUES(?, 'No notes yet!')",
        [email],
        (err, result) => {
            if(err){
                console.log(err);
            }
                console.log(result);

})
})

app.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT name FROM users WHERE email = ? AND password = ?",
        [email,password],
        (err, result) => {
            if(err){
                res.send({err: err});
            }
            if(result.length > 0) {
                res.send(result)
            }
            else {
                res.send({message: "Wrong username/password"});
            }
        }
    )
})

app.post('/notes', (req,res) => {
    const email = req.body.email;

    db.query("SELECT userNotes FROM notes WHERE email = ? ",
        [email],
        (err, result) => {
            if(err){
                res.send({err: err});
            }
            if(result.length > 0) {
                res.send(result)
            }
            else {
                res.send({message: "No notes yet!"});
            }
        }
    )
})

app.post('/update', (req,res) => {
    const email = req.body.email;
    const userNotes = req.body.userNotes;

    db.query("UPDATE notes SET userNotes = ? WHERE email = ? ",
        [userNotes, email],
        (err, result) => {
            if(err){
                res.send({err: err});
            }
                res.send({message: "Update Successful!"});

        }
    )
})

app.post('/delete', (req,res) => {
    const email = req.body.email;
    const userNotes = req.body.userNotes;

    db.query("DELETE FROM users WHERE email = ?",
        [email],
        (err, result) => {
            if(err){
                console.log(result);
            }
        }
    )

    db.query("DELETE FROM notes WHERE email = ?",
        [email],
        (err, result) => {
            if(err){
                res.send({err: err});
            }
                res.send({message: "Delete Successful!"});

        }
    )
})

app.listen(3001, ()=>{
    console.log("Server started on port 3001");
})