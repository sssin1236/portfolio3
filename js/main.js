const visual = document.querySelector("#visual");
const menu = document.querySelector("#menu");
const right = visual.querySelector(".right");
const boxs = right.querySelectorAll("article");
const clos = document.querySelectorAll("article .close");

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

const btnFrame = menu.querySelector(".menu_btn");
const menuBtn = btnFrame.querySelectorAll("ul li");
const menuBox = menu.querySelectorAll(".wrap article");

menuBtn.forEach((btn, index)=>{
    btn.addEventListener("click", e=>{
        e.preventDefault();
        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;

        activeMenu(menuBtn, index);
        activeMenu(menuBox, index);
    });
});


timer = setInterval(move, 100);

next.addEventListener("click", e=>{
    e.preventDefault();
    clearInterval(timer);

    if(enableClick){
        enableClick = false;
        nextMove();
    }
    
});

prev.addEventListener("click", e=>{
    e.preventDefault();
    clearInterval(timer);

    if(enableClick){
        enableClick = false;
        prevMove();
    }
    
});

ul.addEventListener("mouseenter", e=>{
    clearInterval(timer);
});

ul.addEventListener("mouseleave", e=>{
    timer = setInterval(move, 100);
});


function move(){
    if(num <= -24){
        num = 0;
        ul.append(ul.firstElementChild);
    }else{
        num-= 1;
    }

    ul.style.marginLeft = num + "%";
}

function prevMove(){
    new Anim(ul, {
        prop: "margin-left",
        value: "0%",
        duration: speed,
        callback: ()=>{
            ul.style.marginLeft = "-25%";
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }
    });
}

function nextMove(){
    new Anim(ul, {
        prop: "margin-left",
        value: "-50%",
        duration: speed,
        callback: ()=>{
            ul.style.marginLeft = "-25%";
            ul.append(ul.firstElementChild);
            enableClick = true;
        }
    });
}

function activeMenu(sel, i){
    for(el of sel) el.classList.remove("on");
        sel[i].classList.add("on");
}