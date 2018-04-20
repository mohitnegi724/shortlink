//Getting Data From MongoDb and Sending Them to Client Browser

function getAllData(){
  $.ajax({
    type: "POST",
    url : "/ShortLinks",
    data: $('form').serialize(), 
  })
  .done((data)=>{
    let URLS = '';
        data.forEach(function(shortURL){
          URLS += `
          <tr>
              <td class="oneFourth" id="OriginalLink"><a href="${shortURL.originalURL}">${shortURL.originalURL}</a></td>
              <td class="oneFourth">${shortURL.createdDate}</td>
              <td class="ShortLink"><a href="/${shortURL.shortId}" target="_blank" id="mainLink">https://shorturlbymohit.herokuapp.com/${shortURL.shortId}</a><i class="material-icons" id="previewLink">visibility</i></td>
              <td class="deleteLink"><i class="material-icons"><a class="delete" href="/${shortURL.shortId}/delete">delete</a></i></td>
          </tr>
          `
        });
        document.getElementById('output').innerHTML = URLS;
  })
  .fail((err)=>{alert(err)})
}
getAllData();


//Saving Input in Backend and Frontend without REloading the Browser
$(function () {
        $('form').on('submit', function (e) {
          e.preventDefault();
          $.ajax({
            type: 'post',
            url: '/shortURL',
            data: $('form').serialize(),
            success: function () {
              return getAllData()
            }
          });
          document.getElementById("mainForm").reset();
        });
});

function DeleteAllData(){
  $.ajax({
    url: '/deleteall/deleteAllLinks',
    type: "POST",
    success: function(){
      return getAllData()
    }
  })
}