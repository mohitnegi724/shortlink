const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Links = require('./Models/shortlinks')
const base64 = require('base-64');
require('./public/javascript/shortener');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/public/html/homepage.html')
})

app.post('/shorturl', (req, res)=>{
    const inputURL = req.body.url;
    const URLDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const uniqueRandomId = urlUniqeIdFunction();
    Links.findOne({originalURL : inputURL}, (err, doc)=>{
    if(doc){
        res.send("This Url has Already created at Date " + doc.createdDate).status(200);
      }
      else if (inputURL ==="") {
        res.send("Sorry, Please Paste The Link")
      }
    else {
      const newURL = {
        originalURL: inputURL,
        createdDate: URLDate,
        randomId: urlUniqeIdFunction(),
      };
      Links.create(newURL)
      .then(success=>{
        res.redirect('/shortlinks')
      })
      .catch(error=>{
        res.send("There was an error")
      })
    }
  })
})

app.get('/shortlinks',(req, res)=>{
  Links.find({}, (error, docs)=>{
    if(error){
      res.json("Sorry, There Was An Error While Finding All Users")
    }
    else {
      res.json(docs)
    }
  })
})

app.get('/deleteAllLinks',function(req, res){
  Links.remove()
  .then(success=>{
    res.redirect('/')
  })
  .catch(error=>{
    res.json("Sorry, We are Unable to delete it")
  })
})

app.get('/:randomId',(req, res)=>{
  Links.find({randomId : req.params.randomId}, (err, doc)=>{
    if (err) {
      console.log(err);
      res.json("Sorry, This Link isn't in our Database")
    }
    else{
      for(var i = 0; i<doc.length; i++){
              if (doc[i].randomId == req.params.randomId) {
                console.log(doc[i].originalURL);
                res.redirect(doc[i].originalURL)
              }
            }
    }
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
  console.log("Server is running on Port 3000")
});
