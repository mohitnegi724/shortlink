const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const keys = require('./config/keys');
const Links = require('./Models/shortlinks');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connecting to Mongoose
mongoose.connect(keys.mongoURI);

//Go to Homepage
app.get('/',(req, res)=>{
  console.log("nmvmb v,             ndsbkj      dbvfds");
  res.sendFile(__dirname + '/public/html/index.html')
})

//Create ShortURL
app.post('/shorturl', (req, res)=>{
    function urlUniqueIdFunction(){
      let text = "";
      possible="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for(var i =0; i<3; i++)
        text += possible.charAt(Math.floor(Math.random()* possible.length));
        return text;
    };

    // input URL
    const inputURL = req.body.url;
    
    //Link Creation Date
    var currentdate = new Date(); 
    var datetime =    currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + "~ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes();

    const URLDate = datetime;
    
    //Short Link Id
    const uniqueRandomId =  urlUniqueIdFunction();
    Links.findOne({originalURL : inputURL}, (err, doc)=>{
    if(doc){
        console.log("The URL Was Alreay created");
        return res.send("This Url has Already created at Date " + doc.createdDate).end();
      }
      else if (inputURL ==="") {
        console.log("The Input was Empty");
        res.send("Sorry, Please Paste The Link")
      }
    else {
      const newURL = {
        originalURL: inputURL,
        createdDate: URLDate,
        shortId: uniqueRandomId
      };
      Links.create(newURL)
      .then(success=>{
        console.log("The URL Was created");
        res.redirect('/')
      })
      .catch(error=>{
        console.log("The URL Was not created");
        res.send(error);
      })
    }
  })
});

//Check All The Short Links
app.get('/shortlinks',(req, res)=>{
  Links.find({}, (error, docs)=>{
    if(error){
      return res.json("Sorry, There Was An Error While Finding All Users")
    }
    else {
      res.json(docs)
    }
  })
})

//Redirect ShortURL to Their Original Links
app.get('/:shortId',(req, res)=>{
  Links.find({shortId : req.params.shortId}, (err, doc)=>{
    if (err) {
      console.log(err);
      return res.json(err)
    }
    else if(doc){
      for(var i = 0; i<doc.length; i++){
              if (doc[i].shortId == req.params.shortId) {
                console.log(doc[i].originalURL);
                res.redirect(doc[i].originalURL)
              }
              else{
                console.log(doc[i].originalURL);
              }
            }
    }
    return res.sendFile(__dirname + '/public/html/404.html');
  })
})

//Delete ShortURL
app.get('/:shortId/delete',(req, res)=>{
  Links.findOneAndRemove({shortId : req.params.shortId}, (err)=>{
    if (err) {
      console.log(err);
      return res.json("Sorry, This Link Coudn't Deleted")
    }
    else{
      res.redirect('/')
    }
  })
})

//Delete All Links
app.get('/deleteall/deleteAllLinks',function(req, res){
  Links.remove(()=>{
    console.log("Lets Delete")
  })
  .then(success=>{
    res.redirect('/')
  })
  .catch(error=>{
    res.json("Sorry, We are Unable to delete it")
  })
})

//Schedule link to delete
app.get('/:shortId/expirelink',(req, res)=>{
})

//PORT
const PORT = process.env.PORT || 3000;

//PORT RUN
app.listen(PORT, function(){
  console.log("Server is running on Port 3000")
});
