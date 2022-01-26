const frame = document.querySelector("section");
const main = document.querySelector("#playlist1");
const key = "AIzaSyCCiZuUxyRnAnWNnLdQxnZ5COuFx0Cv33A";
const playlist_Id = "PLlgbG45RVNaqmozynV0bmmtSQtFrMNNVv";
const num = 5;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet&playlistId=${playlist_Id}&maxResults=${num}`

fetch(url)
.then(data=>{
    return data.json();
})
.then(json=>{
    const items = json.items;

    let result = "";

    items.map( item=>{

        let tit = item.snippet.title;
        let desc = item.snippet.description;
        let chanel = item.snippet.videoOwnerChannelTitle;
        let date = item.snippet.publishedAt.split("T")[0];

        if(tit.length > 30) tit = tit.substr(0, 30)+".....";
        if(desc.length > 150) desc = desc.substr(0, 150)+".....";

        result += `
            <article>
                <a href="${item.snippet.resourceId.videoId}" class="pic">
                    <img src="${item.snippet.thumbnails.standard.url}">
                </a>
                <div class="con">
                    <span>${date}</span>
                    <h2>${tit}</h2>
                    <nav>${chanel}</nav>
                    <p>${desc}</p>
                    <a href="#" class="view">VIDEO PLAY</a>
                </div>
            </article>
        `;
    })

    main.innerHTML = result;
})

main.addEventListener("click", e=>{
    e.preventDefault();
    let vidId = '';

    if(e.target.parentElement.nodeName !=="A" && e.target.className !=="view") return;

    if(e.target.parentElement.nodeName =="A"){
        vidId = e.target.closest("a").getAttribute("href");
    }

    if(e.target.className == "view"){
        vidId = e.target.closest("div").previousElementSibling.getAttribute("href");
    } 

    let pop = document.createElement("aside");

    pop.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose"></span>
    `;

    frame.append(pop);
});

frame.addEventListener("click", e=>{
    const pop = frame.querySelector("aside");
    if(pop == null) return;

    const close = pop.querySelector("span");
    if(e.target == close) e.target.closest("aside").remove();
})