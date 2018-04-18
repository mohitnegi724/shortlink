function getAllData(){
  fetch('/shortlinks')
  .then((res) => res.json())
  .then((data) => {
    let URLS = '';
    data.forEach(function(shortURL){
      URLS += `
      <tr>
          <td class="oneFourth" id="OriginalLink"><a href="${shortURL.originalURL}">${shortURL.originalURL}</a></td>
          <td class="oneFourth">${shortURL.createdDate}</td>
          <td class="ShortLink"><a href="/${shortURL.shortId}" target="_blank">https://shorturlbymohit.herokuapp.com/${shortURL.shortId}</a><i class="material-icons" id="preview">visibility</i></td>
          <td class="oneFourth"><i class="material-icons"><a class="delete" href="/${shortURL.shortId}/delete">delete</a></i></td>
      </tr>
      `
    });
    document.getElementById('output').innerHTML = URLS;
  })
}

getAllData()
