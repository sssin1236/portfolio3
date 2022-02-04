const member = document.querySelector("#member");
const slider = member.querySelector(".slider");
const ul = slider.querySelector(".shef");
const lis = ul.querySelectorAll("li");
const mains = document.querySelectorAll("main");
const base = -300;
let num= 0;

init();
setPos();

timer = setInterval(move, 50);

// window.addEventListener("mousewheel", e=>{

//     let activeIndex = scroll_arr.indexOf(activeItem);
//     let targetIndex;
//     let isOn = sections[1].classList.contains("on");

//     if(e.deltaY < 0){
//         if(activeIndex == 0) return;
//         targetIndex = activeIndex -1;
//     }else{
//         if(activeIndex == len-1) return;
//         targetIndex = activeIndex +1;
//     }

//     if(isOn){
//         for(let el of boxs){
//             el.classList.add("off")
//         } 
//     }else{
//         for(let el of boxs){
//             setTimeout(function(){
//                 el.classList.remove("off")
//             }, 1000);
//         } 
//     }

//     new Anim(window,{
//         prop: "scroll",
//         value: posArr[targetIndex],
//         duration: speed
//     });
// }, {passive : false});

window.addEventListener("scroll", e=>{
    let scroll = window.scrollY || window.pageYOffset;

    mains.forEach((el, index)=>{
        if(scroll >= posArr[index] + base){
            for(let el of mains) el.classList.remove("on");

            mains[index].classList.add("on");
        }
    });
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