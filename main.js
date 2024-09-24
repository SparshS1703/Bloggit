import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import pg from "pg";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import session from 'express-session';

// Middleware to initialize sessions


dotenv.config();



const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const saltRounds = 2;
var logged=false;
let blog=[];
let index=-1;
let cnt=0;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




const db=new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
db.connect();


app.use(session({
  secret: '123456sparsh', // Replace with a random string
  resave: false,
  saveUninitialized: false,
  cookie: {  secure: process.env.NODE_ENV === 'production' } // Set to true if using HTTPS
}));


//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//get requests

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home/index.html");
  });
app.get("/login",(req,res)=>{
  res.sendFile(__dirname + "/public/login/signin.html");
});

app.get("/sign-up",(req,res)=>{
  res.render("sign-up.ejs");
});


//getting started


app.get("/start",(req,res)=>{
  if (!req.session.logged) {
    res.redirect("/login");
  } else {
    res.render("home.ejs", {
      blog: blog,
      index: index,
    });
  }
});
  

  

//creating account

app.post("/Create", async (req,res)=>{
  const name=req.body.username;
  const email=req.body.email;
  const password=req.body.password;
  console.log("name="+name+" password="+password);
  
  try {
    const checkResult = await db.query("SELECT * FROM userss WHERE username = $1", [
      name,
    ]);
    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
      const result = await db.query(
        "INSERT INTO userss (username, email, password) VALUES ($1, $2, $3)",
        [name,email, hash]
      );
      req.session.logged = true; // Set session
      req.session.username = name;
      res.redirect("/start");
    }
    });
  } }
  catch (err) {
    console.log(err);
  }
});


//logging in account

app.post("/login", async (req, res) => {
  const name = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM userss WHERE username = $1", [
      name,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;

      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            req.session.logged = true;
            req.session.username = name;
            res.redirect("/start");
          } else {
            res.send("Incorrect Password");
          }
        }
      });

     
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});










app.get("/homee",(req,res)=>{
 
  res.render("home.ejs",{
    blog: blog,
    index:index,
    cnt:cnt
  });
})

app.post("/homee",(req,res)=>{
  console.log(req.body.index)
  index=req.body.index;
  cnt=1;
  res.redirect("/homee")
})




app.post("/newblog",(req,res)=>{
  blog.push({name:req.body.blogname,
    post:[]
  });
  index++;
  res.redirect("/homee")
})
app.post("/deleteblog",(req,res)=>{
    blog.splice(req.body.value,1);
  res.redirect("/homee")
});



app.get("/newpost",(req,res)=>{
  const title = req.query.title;
  const content = req.query.content;
  const bindex=req.query.bindex;
  const pindex=req.query.pindex;

  // Render the post.ejs file, passing the title and content from the query parameters
  res.render("post.ejs", {
    title: title,
    content: content,
    bindex:bindex,
    pindex:pindex
  });
 
});


app.post("/savepost",(req,res)=>{
  console.log(req.body);
  blog[req.body.bindex].post[req.body.pindex].title=req.body.title;
  blog[req.body.bindex].post[req.body.pindex].content=req.body.content;
  console.log(blog[req.body.bindex].post[req.body.pindex]);
  res.redirect("/homee");
})


app.post("/createpost",(req,res)=>{
  console.log(req.body);
  console.log(blog);
  console.log("index=",index);
  console.log(blog[index].post);
  blog[index].post.push(req.body);
  console.log(blog[index].post);
  console.log("blog=",blog);
  res.redirect("/homee");
})



app.post("/deletepost",(req,res)=>{
  console.log("hello");
  const pindex=req.body.pindex;
  const bindex=req.body.bindex;
  blog[bindex].post.splice(pindex,1);
  console.log(blog[bindex].post);
  res.redirect("/homee");
})

app.post("/searchpost",(req,res)=>{
  const p=req.body.post;
 const searched= blog[index].post.find(p);
})




