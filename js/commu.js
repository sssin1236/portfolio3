const menu2 = document.querySelector("#menu2");
const menu3 = document.querySelector("#menu3");
const dts1 = menu2.querySelectorAll("dt");
console.log(dts1);

dts1.forEach((dt, index)=>{
    dt.addEventListener("click", ()=>{
        for(let el of dts1) el.classList.remove("on");
        dts1[index].classList.add("on");

    })
})


class Tab {
    constructor() {
        this.main = document.querySelector(".menu");
        this.btns = document.querySelectorAll(".menu>dt");
        this.boxs = document.querySelectorAll(".menu>dd");
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
