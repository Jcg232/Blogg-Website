import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";

const port = 3000;
const app = express();
var arr = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res)=>{
    res.render("index.ejs")
});
app.get("/about", (req, res)=>{
    res.render("about.ejs")
});
app.get("/blogs", (req, res)=>{
    res.render("bloggs.ejs", {
        posts: arr,
    })
    
});
app.post("/submit", (req, res) => {
    const titleOfBlog = req.body.title;
    const postContent = req.body.post; 
    var id = "id" + Math.random().toString(16).slice(2)
  
    if (titleOfBlog && postContent) {
      const newPost = {
        titleOfBlog: titleOfBlog,
        post: postContent,
        id: id,
      };
      arr.push(newPost); 
    }
  
    res.redirect("/blogs"); 
  });

app.post("/delete-post", (req, res) =>{
  const postId = req.body.id;
  arr = arr.filter(post => post.id !== postId);
  res.redirect("/blogs")
});

app.post("/update-post", (req, res) => {
  const postId = req.body.id;
  const updatedTitle = req.body.title;
  const updatedPost = req.body.post;

  // Find the post with the given id and update its content
  arr.forEach(post => {
    if (post.id === postId) {
      post.titleOfBlog = updatedTitle;
      post.post = updatedPost;
    }
  });

  res.redirect("/blogs");
});

app.listen(port, () =>{
    console.log("Server Running!")
});