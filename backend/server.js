const   express    = require("express");
        bodyParser = require("body-parser"),
        mongoose   = require("mongoose"),
        app        = express(),
        router     = express.Router()
        Post       = require("./post");

const API_PORT = 3005;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// TODO Hide MongoLab
const dbRoute = "mongodb://leandy25:reddit123@ds243084.mlab.com:43084/reddit-clone";
mongoose.connect(dbRoute, {useNewUrlParser: true});
// get mongoose to use global promise
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.once("open", () => console.log("connected to database"));
// Check for any errors 
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// Get POSTS
router.get("/getData", (req, res) => {
    Post.find((err, data) => {
        if(err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    });
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
    post.save(err => {
        if(err) return res.json({success: false, error: err});
        return res.json({success: true});
    })
});

// Update Post (upvote/downvote)
router.post("/updateData", (req,res) => {
    const mID = req.body.id;
    // console.log(mID);
    const update = req.body.update;
    Post.findOneAndUpdate({"_id": mID},  update, err => {
        if(err) return res.json({success: false, error: err});
        return res.json({success: true})
    });
});

// append /api for http request
app.use("/api", router);

// launch backend into port
app.listen(API_PORT, () => console.log(`Now Listening on PORT ${API_PORT}`));




