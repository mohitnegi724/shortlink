const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/public/html/homepage.html')
})

app.listen(3000, function(){
  console.log("Server is running on Port 3000")
});
