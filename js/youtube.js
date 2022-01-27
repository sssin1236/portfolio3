
class Youtube{
    constructor(){
        this.frame = document.querySelector("section");
        this.main = document.querySelector("#playlist1");
        this.key = "AIzaSyCCiZuUxyRnAnWNnLdQxnZ5COuFx0Cv33A";
        this.playlist_Id = "PLlgbG45RVNaqmozynV0bmmtSQtFrMNNVv";
        this.num = 5;
        this.url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${this.key}&part=snippet&playlistId=${this.playlist_Id}&maxResults=${this.num}`

        this.createList(this.url);
        this.main.addEventListener("click", e=>this.createPop(e));
        this.frame.addEventListener("click", e=>this.removePop(e));
    }

    createList(url){
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
    
            this.main.innerHTML = result;
    })
    
    }

    createPop(e){
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
            <span class="btnClose">CLOSE</span>
        `;
    
        this.frame.append(pop);
    }

    removePop(e){
        const pop = this.frame.querySelector("aside");
        if(pop == null) return;
    
        const close = pop.querySelector("span");
        if(e.target == close) e.target.closest("aside").remove();
    }
}







