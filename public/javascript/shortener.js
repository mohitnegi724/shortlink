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
<<<<<<< HEAD
          <td class="ShortLink"><a href="/${shortURL.shortId}" target="_blank" id="mainLink">https://shorturlbymohit.herokuapp.com/${shortURL.shortId}</a><i class="material-icons" id="previewLink">visibility</i></td>
          <iframe id="previewLink" src="https://shorturlbymohit.herokuapp.com/${shortURL.shortId}"></iframe>
=======
<<<<<<< HEAD
          <td class="ShortLink"><a href="/${shortURL.shortId}" target="_blank" id="mainLink">https://shorturlbymohit.herokuapp.com/${shortURL.shortId}</a><i class="material-icons" id="previewLink">visibility</i></td>
=======
          <td class="ShortLink"><a href="/${shortURL.shortId}" target="_blank">https://shorturlbymohit.herokuapp.com/${shortURL.shortId}</a><i class="material-icons" id="preview">visibility</i></td>
>>>>>>> 8ce9ea1d2e56895a60a491214f0edfbcca0d4480
>>>>>>> 4f7756a98081bdd8298f7b5f5752f2d948ef21a2
          <td class="oneFourth"><i class="material-icons"><a class="delete" href="/${shortURL.shortId}/delete">delete</a></i></td>
      </tr>
      `
    });
    document.getElementById('output').innerHTML = URLS;
  })
}

<<<<<<< HEAD
getAllData()
=======
<<<<<<< HEAD
getAllData()
=======
getAllData()
>>>>>>> 8ce9ea1d2e56895a60a491214f0edfbcca0d4480
>>>>>>> 4f7756a98081bdd8298f7b5f5752f2d948ef21a2
