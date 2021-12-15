const visual = document.querySelector("#visual");
const right = visual.querySelector(".right");
const boxs = right.querySelectorAll("article");
const clos = document.querySelectorAll("article .close");

console.log(clos);

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
