const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;



mongoose.connect("mongodb://localhost:27017/blogDB")


const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);




const homeStartContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";




// home
app.get("/", function(req, res) {

    Post.find({}, function(err, foundPosts) {
        if (!err) {
            res.render("home", {homestart: homeStartContent, posts: foundPosts})
        } else {
            console.log(err);
        }    
        
    })

});


// about
app.get("/about", function(req, res) {
    res.render("about", {aboutcont: aboutContent});
});


// contact
app.get("/contact", function(req, res) {
    res.render("contact", {contacts: contactContent});
});


// compose
app.get("/compose", function(req, res) {
    res.render("compose");
});




// action
app.post("/compose", function(req,res) {

    const post = new Post ({
        title: req.body.postTitle,
        content: req.body.postText
    });

    post.save(function(err) {
        if (!err){
            res.redirect("/")
        }
    });
  
});



// posts
app.get("/posts/:postId", function(req, res) {
    const requestedPostId = req.params.postId;

    Post.findOne({_id:requestedPostId}, function(err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        })
    })

});






app.listen(port, function() {
    console.log("Server started on port "+port);
});
