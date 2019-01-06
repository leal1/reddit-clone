const   express    = require("express");
        bodyParser = require("body-parser"),
        mongoose   = require("mongoose"),
        app        = express(),
        path       = require("path"),
        router     = express.Router(),
        Post       = require("./post");

// Configures process env variables
require('dotenv').config();

const API_PORT = process.env.PORT || 3005;

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Hides Mongolab variables in process var
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const dbRoute = "mongodb://" + DB_USER + ":" + DB_PASS +"@ds243084.mlab.com:43084/reddit-clone";
mongoose.connect(dbRoute, {useNewUrlParser: true});
// get mongoose to use global promise
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.once("open", () => console.log("connected to database"));
// Check for any errors 
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// Get POSTS
router.get("/getData", (req, res) => {
    Post.find({}).exec()
    .then((data) => { return res.json({success: true, data: data}); })
    .catch((err) =>{ return res.json({success: false, error: err}); });
});
// Create Post
router.post("/putData", (req,res) => {
    let post = new Post();
    // console.log("request: ",  req.body.title);
    const title = req.body.title;
    // Checks if Title is Empty
    if(!title){
        return res.json({
            success: false,
            error: "Empty Title"
        });
    }
    // Set title of post and save into DB
    post.title = title;
    post.save()
    .then(()=> { return res.json({success: true}); })
    .catch(err => { return res.json({success: false, error: err}); });
});

// Update Post (upvote/downvote)
router.post("/updateData", (req,res) => {
    const mID = req.body.id;
    // console.log(mID);
    const update = req.body.update;
    Post.findOneAndUpdate({"_id": mID}, update).exec()
    .then(() => { return res.json({success: true}); })
    .catch((err) => { return res.json({success: false, error: err}); });

});

// append /api for http request
app.use("/api", router);

// Catch All Route Handler
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// launch backend into port
app.listen(API_PORT, () => console.log(`Now Listening on PORT ${API_PORT}`));




