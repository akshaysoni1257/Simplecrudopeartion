const express = require('express');

const path=require('path');

const port=7000;

const app=express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

// const db= require('../config/mongoose');

let data=[
    {
        name:"Akshay",
        email:"Akshay@gmail.com",
        phone:9510368120
    },
    {
        name:"Rajan",
        email:"Rajan@gmail.com",
        phone:7572813968
    },
    {
        name:"Rahul",
        email:"Akshay@gmail.com",
        phone:8139688512
    }
];

app.get('/',(req,res)=>{
    return res.render('index',{

            record:data
    });
});
// Data Insert Mate Use Thay
app.post('/insertdata',(req,res)=>{

        let username = req.body.name;
        let useremail = req.body.email;
        let userphone = req.body.phone;

        let obj={
            name:username,
            email:useremail,
            phone:userphone
        }

        data.push(obj);
        return res.redirect('/');
});
// Data Ne Delete Karva Mate Use Thay
    app.get('/deletedata/',(req,res)=>{
        
        let deletedata=req.query.id;
        console.log(deletedata);

        for(let i=0; i<data.length; i++ )
        {
            if(data[i].phone==deletedata)
            {
                data.splice(i,1);
            }
        }

        return res.redirect('/');

    });
// Editdata Mate Use Thay
app.get('/editData/:id',(req,res)=>{
    let editId = req.params.id;
    for(let i in data){
        if(data[i].phone == editId)
        {
            let obj = {
                id : data[i].phone,
                name : data[i].name,
                email : data[i].email,
                phone : data[i].phone
            } 
            return res.render('edit',{
                editRecord : obj
            });
        }
    }
});
// Update data Mate
app.post('/updatedata',(req,res)=>{
    
    let editId = req.body.editid;
    let username = req.body.name;
    let useremail = req.body.email;
    let userphone = req.body.phone;

    for(i in data)
    {
        if(data[i].phone == editId)
        {
             data[i].name = username;
             data[i].email = useremail;
             data[i].phone = userphone
        }
    }
    return res.redirect('/');
});

// Server Ne Sambhalva Mate Use Thay
app.listen(port,(error)=>{
    if(error)
    {
        console.log("Server Not Start");
        return false;
    }
    console.log("Server Start");
});