const leftBox = document.querySelector(".left");
const rightBox = document.querySelector(".right");
const dts = leftBox.querySelectorAll("dt");
const dds = leftBox.querySelectorAll("dd");
const check = leftBox.querySelectorAll("dt > i");


dts.forEach((dt, index)=>{
    dt.addEventListener("click", e=>{
        let isOn = e.currentTarget.classList.contains("on");
        if(isOn){
            dts[index].classList.remove("on");
            new Anim(dds[index], {
                prop: "opacity",
                value: 0,
                duration: 300,
                callback: ()=>{
                    dds[index].style.display = "none";
                }
            }) 
            console.log(isOn);
        }else{
            dts[index].classList.add("on");

            dds[index].style.display = "block";
            new Anim(dds[index], {
                prop: "opacity",
                value: 1,
                duration: 500
            });
        }
    })
});

check.forEach((i, index)=>{
    i.addEventListener("click", e=>{
        check[index].classList.toggle("on");
    })
})