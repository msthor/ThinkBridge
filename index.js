
const express = require('express');
const { console } = require('inspector');
// const mongoose = require('mongoose');
const app = express();
const path = require('path');
const port = 8080;

// for random id
const { v4: uuidv4 } = require('uuid');

// for update route
const  methodOveride = require("method-override");


// Start server
app.listen(port, () => {
  console.log(`Server is running on `);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOveride("_method"));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
// app.get('/', (req, res) => {
//   res.send("server working fine");
// });


//  operations perform on the server
let posts = [{
 // Call the function to generate a random UUID
    id: uuidv4(),
    username: "John Doe",
    title: "Post 1",    
    content: "This is the content of post 1.",
    },

    {
    id: uuidv4(),
    username: "Jane Smith",
    title: "Post 2",    
    content: "This is the content of post 2.",
    },

    {
    id: uuidv4(),
    username: "Alice Johnson",      
    title: "Post 3",
    content: "This is the content of post 3.",
    }];

    // get all posts
app.get('/posts', (req, res) => {
  res.render("index.ejs", { posts: posts });
});


// new post form
app.get("/posts/new", (req, res) => {
  res.render("new.ejs" );
});

// create new post

app.post("/posts", (req, res)=>{
let {username ,content}= req.body;
let id = uuidv4();
posts.push({username, content,id});
    res.redirect("/posts");
});

// show rout
app.get("/posts/:id",(req,res)=>{
   let {id} = req.params;
   let post = posts.find((p)=>id===p.id);
   res.render("show.ejs",{post} );
  //  console.log(post);
  //  res.send("request working ");
});

// for update post

// stpet 1
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content = newContent;
    res.redirect("/posts");
    res.send("Patch request working ");
});
// step 2
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post} );
});


// for delete post

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>p.id !== id);
    res.redirect("/posts");
    res.send("delete request working ");
});