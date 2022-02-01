
const skip = document.querySelectorAll("#skip a");
const visual = document.querySelector("#visual");
const menu = document.querySelector("#menu");
const right = visual.querySelector(".right");
const boxs = right.querySelectorAll("article");
const clos = right.querySelector(".close");
const sections = document.querySelectorAll("section");
const scrollBtn = document.querySelectorAll(".sideBtn li");
const scroll_arr = Array.from(scrollBtn);
const len = sections.length;

const btnFrame = menu.querySelector(".menu_btn");
const menuBtn = btnFrame.querySelectorAll("ul li");
const menuBox = menu.querySelectorAll(".wrap article");
const slider = menu.querySelector("#slider");
const ul = slider.querySelector(".slide");
const lis = ul.querySelectorAll("li");
const prev = menu.querySelector(".prev");
const next = menu.querySelector(".next");
const speed = 500;
const base = -300;
let num = 0;
let enableClick = true;
let timer;
let posArr = [];

skip.forEach((btn, index)=>{
    btn.addEventListener("focusin", e=>{
        e.currentTarget.classList.add("on");
    });

    btn.addEventListener("focusout", e=>{
        e.currentTarget.classList.remove("on")
    })
})

boxs.forEach((box, index)=>{
    box.addEventListener("click", e=>{
        for(let el of boxs){
            el.classList.remove("on");
            el.classList.add("off");
        } 
        boxs[index].classList.remove("off");
        boxs[index].classList.add("on");
        clos.classList.add("on");
    });
});

clos.addEventListener("click", e=>{
    for(let el of boxs){
        el.classList.remove("on");
        setTimeout(function(){
            el.classList.remove("off")
        }, 1000);
    } 
    e.currentTarget.classList.remove("on");
});


//scoll 이벤트

window.addEventListener("resize", e=>{
    setPos();

    let activeItem = docuement.querySelector(".sideBtn li.on");
    let activeIndex = scroll_arr.indexOf(activeItem);

    window.scroll(0, posArr[activeIndex]);
});

window.addEventListener("mousewheel", e=>{
    e.preventDefault();

    let activeItem = docuement.querySelector(".sideBtn li.on");
    let activeIndex = scroll_arr.indexOf(activeItem);
    let targetIndex;

    if(e.deltaY < 0){
        if(activeIndex == 0) return;
        targetIndex = activeIndex -1;
    }else{
        if(activeIndex == len-1) return;
        targetIndex = activeIndex +1;
    }

    new Anim(window,{
        prop: "scroll",
        value: posArr[targetIndex],
        duration: speed
    });
}, {passive : false});

window.addEventListener("scroll", e=>{
    let scroll = window.scrollY || window.pageYOffset;

    sections.forEach((el, index)=>{
        if(scroll >= posArr[index] + base){
            scrollBtn.forEach((el, i)=>{
                el.classList.remove("on");
                sections[i].classList.remove("on");
            });
            scrollBtn[index].classList.add("on");
            sections[index].classList.add("on");
        }
    })
});


//menu 이벤트

init()

menuBtn.forEach((btn, index)=>{
    btn.addEventListener("click", e=>{
        e.preventDefault();
        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;

        activeMenu(menuBtn, index);
        activeMenu(menuBox, index);
    });
});


next.addEventListener("click", e=>{
    e.preventDefault();
    // clearInterval(timer);

    if(enableClick){
        enableClick = false;
        nextMove();
    }
    
});

prev.addEventListener("click", e=>{
    e.preventDefault();
    // clearInterval(timer);

    if(enableClick){
        enableClick = false;
        prevMove();
    }
    
});



function init(){
    ul.prepend(ul.lastElementChild);
    ul.style.marginLeft = "-20%";
}


function prevMove(){
    new Anim(ul, {
        prop: "margin-left",
        value: "3%",
        duration: speed,
        callback: ()=>{
            ul.style.marginLeft = "-20%";
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }
    });
}

function nextMove(){
    new Anim(ul, {
        prop: "margin-left",
        value: "-43%",
        duration: speed,
        callback: ()=>{
            ul.style.marginLeft = "-20%";
            ul.append(ul.firstElementChild);
            enableClick = true;
        }
    });
}

function activeMenu(sel, i){
    for(el of sel) el.classList.remove("on");
        sel[i].classList.add("on");
}

function setPos(){
    posArr = [];
    
    for(let el of sections) posArr.push(el.offsetTop);
}