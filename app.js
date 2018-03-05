var express=require("express"),
    mongoose=require("mongoose"),
    bodyParser=require("body-parser"),
    multer=require("multer"),
    path=require("path"),
    nodemailer = require('nodemailer'),
    app=express();
    
// mongoose.connect("mongodb://localhost/exporter");
mongoose.connect("mongodb://shadab14meb346:14meb346@ds255768.mlab.com:55768/exporter");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/",function(req,res){
    res.render("home");
});

app.get("/contact-us",function(req,res){
    res.render("contact");
});
app.get("/enquiryform",function(req,res){
    res.render("enquiryform");
});

app.get("/products",function(req, res) {
   res.render("products");
});
// uploading images to mongodb
var storage= multer.diskStorage({
  destination:"./public/uploads",
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-'+ Date.now()+ path.extname(file.originalname));
  }
});

var upload = multer({ storage : storage,limits:{fileSize:10}}).single('userPhoto');
app.get('/uploader',function(req,res){
      res.render("uploader");
});
app.post('/upload',function(req,res){
    upload(req,res,function(err){
        if(err){
            res.render("uploader",{
                msg:err
            });
        }else {
            console.log(req.file);
            res.send("Uploaded Succesfully");
        }
    });
});
app.post("/",function(req,res){
   var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'crypto14meb346@gmail.com',
    pass: '14meb346'
  }
}); 
   var mailOptions={
       from:'shadab<crypto14meb346@gmail.com>',
       to:'shadabsaharsa@gmail.com',
       subject:'Website Submission',
      html:"<p>You have a submission with the following details  Name<p>"+' '+req.body.Name+' '+'Email'+' '+req.body.email+'phone'+' '+req.body.number
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.redirect("home");
  }
});

    
});












app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The exporter Server Has Started !");
});