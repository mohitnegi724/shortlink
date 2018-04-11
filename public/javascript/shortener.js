function getAllData(){
  fetch('/shortlinks')
  .then((res) => res.json())
  .then((data) => {
    let URLS = '';
    data.forEach(function(shortURL){
      URLS += `
      <tr>
          <td class="oneFourth"><a href="${shortURL.originalURL}">${shortURL.originalURL}</a></td>
          <td class="oneFourth">${shortURL.createdDate}</td>
          <td class="oneFourth"><a href="http://localhost:3000/${shortURL.shortId}" target="_blank">http://localhost:3000/${shortURL.shortId}</a></td>
          <td class="oneFourth"><i class="material-icons"><a class="delete" href="http://localhost:3000/${shortURL.shortId}/delete">delete</a></i></td>
      </tr>
      `;
    });
    document.getElementById('output').innerHTML = URLS;
  })
}

getAllData()

