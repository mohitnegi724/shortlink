const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const keys = require('./config/keys');
const Links = require('./Models/shortlinks');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(keys.mongoURI);
app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/public/html/index.html')
})

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
        res.send("This Url has Already at  " + doc.createdDate);
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

app.post('/shortlinks',(req, res)=>{
  Links.find({}, (error, docs)=>{
    if(error){
      res.json("Sorry, There Was An Error While Finding All Users")
    }
    else {
      res.json(docs)
    }
  })
})

app.get('/:shortId',(req, res)=>{
  Links.find({shortId : req.params.shortId}, (err, doc)=>{
    if (err) {
      console.log(err);
      res.status(404).sendFile(__dirname + '/public/html/404.html');
    }
    else if(doc){
      for(var i = 0; i<doc.length; i++){
              if (doc[i].shortId == req.params.shortId) {
                console.log("Opening " + doc[i].originalURL);
                res.redirect(doc[i].originalURL).status(301);
              }
            }
    }
     res.status(400).sendFile(__dirname + '/public/html/404.html');
  })
})


app.get('/:shortId/delete',(req, res)=>{
  Links.findOneAndRemove({shortId : req.params.shortId}, (err)=>{
    if (err) {
      console.log(err);
      res.json("Sorry, This Link Coudn't Deleted")
    }
    else{
      console.log("Deleting the short link");
      res.redirect('/');
    }
  })
})

app.post('/deleteall/deleteAllLinks',function(req, res){
  Links.remove(()=>{
    console.log("Delete All Links")
  })
  .then(success=>{
    res.redirect('/')
  })
  .catch(error=>{
    res.json("Sorry, We are Unable to delete it")
  })
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log("Server is running on Port " + PORT)
});