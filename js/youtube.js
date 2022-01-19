const main = document.querySelector("#playlist1");
const key = "AIzaSyCCiZuUxyRnAnWNnLdQxnZ5COuFx0Cv33A";
const playlist_Id = "PLlgbG45RVNaqmozynV0bmmtSQtFrMNNVv";
const num = 3;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet&playlistId=${playlist_Id}&maxResults=${num}`

fetch(url)
.then(data=>{
    return data.json();
})
.then(json=>{
    const items = json.items;

    let result = "";

    items.map( item=>{
        console.log(item);

        let tit = item.snippet.title;
        let desc = item.snippet.description;
        let date = item.snippet.publishedAt.split("T")[0];

        if(tit.length > 50) tit = tit.substr(0, 50)+".....";
        if(desc.length > 150) desc = desc.substr(0, 150)+".....";

        result += `
            <article>
                <a href="${item.snippet.resourceId.videoId}" class="pic">
                    <img src="${item.snippet.thumbnails.standard.url}">
                </a>
                <div class="con">
                    <h2>${tit}</h2>
                    <p>${desc}</p>
                    <span>${date}</span>
                </div>
            </article>
        `;
    })

    main.innerHTML = result;
})