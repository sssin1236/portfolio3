const main = document.querySelector("#gallery");
const frame = document.querySelector(".list");
const list = document.querySelector(".list2");
const imgLoad = document.querySelector(".pic");
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const method3 = "flickr.people.getPhotos";
const key = "d61e30a1010fe3e1dab106d3a2df0f21";
const per_page = 5;
const format = "json";
const user_id = "194134849@N06";
let tags = "restaurant";
let num = 1;

const url1 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tags}`;

callData(url1);

frame.addEventListener("click", e=>{
    e.preventDefault();

    if(e.target !==e.target.closest(".item").querySelector(".thumb")) return;

    let target = e.target.closest(".item");
    let imgSrc = target.querySelector("a").getAttribute("href");
    let pop = document.createElement("aside");
    let pops = `
                <img src="${imgSrc}">
                <span class="close">CLOSE</span>
                `;

    pop.innerHTML = pops;
    document.querySelector("#gallery").append(pop);
});

main.addEventListener("click", e=>{
    let target = e.target.closest("aside");
    
    if(target !== null){
        let close = target.querySelector(".close");
        if(e.target == close) target.remove();
    }
    
})


function callData(url){
    frame.innerHTML = "";
    imgLoad.classList.remove("off");
    frame.classList.remove("on");
    
    fetch(url)
    .then(data => {
        let result = data.json();
        return result;
    })
    .then(json => {
        let items = json.photos.photo;
        creatList(items)
        delayLoading()
    });
}


function creatList(items){
    let htmls = "";

        items.map(data => {
            console.log(data);

            let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
            let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
            htmls+=`
                <li class="item">
                    <div>
                        <a href="${imgSrcBig}">
                            <img class="thumb" src="${imgSrc}" alt="">
                        </a>
                        <span>${"0"+num++}</span>
                    </div>
                </li>
            `;
        });
        
        frame.innerHTML = htmls;
}   

function delayLoading(){
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;
    let count = 0;

    for(let el of imgs){
        el.onload = ()=>{
            count++;
            
            imgLoad.classList.add("off");
            frame.classList.add("on");
            list.classList.add("on");
        }
    }
}

function isoLayout(){
    imgLoad.classList.add("off");
    frame.classList.add("on");

    new Isotope(".list", {
        itemSelector: ".item",
        columWidth: ".item",
        trnasitionDuration: "0.5s"
    });
}