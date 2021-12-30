const visual = document.querySelector("#visual");
const menu = document.querySelector("#menu");
const right = visual.querySelector(".right");
const boxs = right.querySelectorAll("article");
const clos = document.querySelectorAll("article .close");

const btnFrame = menu.querySelector(".menu_btn");
const menuBtn = btnFrame.querySelectorAll("ul li");
const menuBox = menu.querySelectorAll(".wrap article");
const slider = menu.querySelector("#slider");
const ul = slider.querySelector(".slide");
const lis = ul.querySelectorAll("li");
const prev = menu.querySelector(".prev");
const next = menu.querySelector(".next");
const speed = 500;
let num = 0;
let enableClick = true;
let timer;


boxs.forEach((box, index)=>{
    box.addEventListener("click", e=>{
        for(let el of boxs){
            el.classList.remove("on");
            el.classList.add("off");
        } 
        boxs[index].classList.remove("off");
        boxs[index].classList.add("on");
    });

});

clos.forEach((btn, index)=>{
    btn.addEventListener("click", e=>{
        let target = e.currentTarget.closest("article");
        console.log(target);
        target.classList.remove("on");
    });
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