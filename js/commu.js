const menu2 = document.querySelector("#menu2");
const menu3 = document.querySelector("#menu3");
const dts1 = menu2.querySelectorAll("dt");
const dds1 = menu2.querySelectorAll("dd");
const dts2 = menu3.querySelectorAll("dt");
const dds2 = menu3.querySelectorAll("dd");
const numbers = document.querySelectorAll("#pagination .numbers a");

dts1.forEach((dt, index)=>{
    dt.addEventListener("click", e=>{
        for(let el of dts1) el.classList.remove("on");
        for(let el of dds1) el.style.display = "none";
        dts1[index].classList.add("on");

        let target = e.currentTarget.nextElementSibling;
        target.style.display = "block";
    });
});

dts2.forEach((dt, index)=>{
    dt.addEventListener("click", e=>{
        for(let el of dts2) el.classList.remove("on");
        for(let el of dds2) el.style.display = "none";
        dts1[index].classList.add("on");

        let target = e.currentTarget.nextElementSibling;
        target.style.display = "block";
    })
})

numbers.forEach((num, index)=>{
    num.addEventListener("click", e=>{
        e.preventDefault();
        for(let el of numbers) el.classList.remove("on");
        numbers[index].classList.add("on");
    })
})


class Tab {
    constructor() {
        this.main = document.querySelector(".menu");
        this.btns = document.querySelectorAll(".menu>dt");
        this.boxs = document.querySelectorAll(".menu>dd");
        this.menu2 = document.querySelector("#menu2");
        this.menu3 = document.querySelector("#menu3");
        this.dts1 = this.menu2.querySelectorAll("dt");
        this.dds1 = this.menu2.querySelectorAll("dd");
        this.dts2 = this.menu3.querySelectorAll("dt");
        this.dds2 = this.menu3.querySelectorAll("dd");
        this.speed = 1000;
        this.enableClick = true;
        console.log(this.boxs);

        this.btns.forEach((btn, index) => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                let isOn = e.currentTarget.classList.contains("on");
                if (isOn) return;

                if (this.enableClick) {
                    this.enableClick = false;

                    this.activation(this.btns, index);
                    this.activation(this.boxs, index);
                    for(let el of this.dts1) el.classList.remove("on")
                    for(let el of this.dts2) el.classList.remove("on")
                    for(let el of this.dds1) el.style.display = "none";
                    for(let el of this.dds2) el.style.display = "none";

                    setTimeout(this.enableClick = true, 1000);
                }
            })
        });
    }


    activation(arr, index) {
        for (let el of arr) el.classList.remove("on");
        arr[index].classList.add("on");
    }
}
