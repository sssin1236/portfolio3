const member = document.querySelector("#member");
const slider = member.querySelector(".slider");
const ul = slider.querySelector(".shef");
const lis = ul.querySelectorAll("li");
let num= 0;

init()

timer = setInterval(move, 50);

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
