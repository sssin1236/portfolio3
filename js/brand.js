const member = document.querySelector("#member");
const slider = member.querySelector(".slider");
const ul = slider.querySelector(".shef");
const lis = ul.querySelectorAll("li");
const mains = document.querySelectorAll("main");
const base = -150;
const history = document.querySelector("#history");
const year = history.querySelectorAll("ul li");
let num= 0;

init();
setPos();

timer = setInterval(move, 50);

window.addEventListener("resize", e=>{
    setPos();
});

window.addEventListener("scroll", e=>{
    let scroll = window.scrollY || window.pageYOffset;
    let isOn = mains[1].classList.contains("on");

    mains.forEach((el, index)=>{
        if(scroll >= posArr[index] + base){
            for(let el of mains) el.classList.remove("on");

            mains[index].classList.add("on");
        }
    });

    if(isOn){
        posArr2 = [];
        let scroll2 = scroll - posArr[1];
        console.log(scroll2);
        for(let el of year) posArr2.push(el.offsetTop);

        year.forEach((el, index)=>{
            if(scroll2 >= posArr2[index] - base){
                year[index].classList.add("on");
            }
        })
    }else{
        for(el of year) el.classList.remove("on");
    }
});



ul.addEventListener("mouseenter", e=>{
    clearInterval(timer);
});

ul.addEventListener("mouseleave", e=>{
    timer = setInterval(move, 100);
});

function move(){
    if(num <= -220){
        num = 0;
        ul.append(ul.firstElementChild);
    }else{
        num-= 4;
    }

    ul.style.marginLeft = num + "px";
}

function init(){
    ul.prepend(ul.lastElementChild);
    ul.style.marginLeft = 220;
}

function setPos(){
    posArr = [];
    
    for(let el of mains) posArr.push(el.offsetTop);
}