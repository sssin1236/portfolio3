class Validation {
	constructor(selector, arr) {
		this.form = document.querySelector(selector);
		this.btnSubmit = this.form.querySelector("input[type=submit]");

		arr.forEach((opt) => {
			this.btnSubmit.addEventListener("click", (e) => {
				if (opt.type === "text") {
					if (!this.isTxt(opt.name, opt.len)) e.preventDefault();
				}
				if (opt.type === "check") {
					if (!this.isCheck(opt.name)) e.preventDefault();
				}
				if (opt.type === "select") {
					if (!this.isSelect(opt.name)) e.preventDefault();
				}
				if (opt.type === "password") {
					if (!this.isPwd(opt.name[0], opt.name[1], opt.len))
						e.preventDefault();
				}
                if (opt.id === "pwd3") {
                    if (!this.isPoint(opt.name[0], opt.name[1], opt.len))
                        e.preventDefault();
                }
                if (opt.type === "number") {
					if (!this.isNumber(opt.name, opt.len)) e.preventDefault();
				}
			});
		});
	}

	isTxt(name, len) {
		const input = this.form.querySelector(`[name=${name}]`);
		const txt = input.value;

		if (txt.length > len) {
			const errMsgs = input.closest("td").querySelectorAll("p");
			if (errMsgs.length > 0)
                input.closest("td").querySelector("p").remove();
			return true;
		} else {
			const errMsgs = input.closest("td").querySelectorAll("p");
			if (errMsgs.length > 0)
				input.closest("td").querySelector("p").remove();

			const errMsg = document.createElement("p");
			errMsg.append(`텍스트를 ${len}글자 이상 입력하세요.`);
			input.closest("td").append(errMsg);

			return false;
		}
	}

    isNumber(name, len){
        const inputs = this.form.querySelector(`[name=${name}]`);
        const number = inputs.value;

        let num = /[0-9]/;

        if (number.length === len && num.test(number)) {
			const errMsgs = inputs.closest("td").querySelectorAll("p");
			if (errMsgs.length > 0)
				inputs.closest("td").querySelector("p").remove();
			return true;
		} else {
			const errMsgs = inputs.closest("td").querySelectorAll("p");
			if (errMsgs.length > 0)
				inputs.closest("td").querySelector("p").remove();

			const errMsg = document.createElement("p");
			errMsg.append(`텍스트를 입력하세요.`);
			inputs.closest("td").append(errMsg);

			return false;
		}
    }

	isCheck(name) {
		const inputs = this.form.querySelectorAll(`[name=${name}]`);
		let isChecked = false;

		for (let input of inputs) {
			if (input.checked) isChecked = true;
		}

		if (isChecked) {
			const errMsgs = inputs[0].closest("td").querySelectorAll("p");
			if (errMsgs.length > 0)
				inputs[0].closest("td").querySelector("p").remove();
			return true;
		} else {
			const errMsgs = inputs[0].closest("td").querySelectorAll("p");
			if (errMsgs.length > 0)
				inputs[0].closest("td").querySelector("p").remove();

			const errMsg = document.createElement("p");
			errMsg.append(`필수 입력항목을 하나이상 체크해주세요.`);
			inputs[0].closest("td").append(errMsg);

			return false;
		}
	}

	isSelect(name) {
		const sel = this.form.querySelector(`[name=${name}]`);
        const site = this.form.querySelector("[name=e-mail]");
		const sel_index = sel.options.selectedIndex;
		const val = sel.options[sel_index].value;

		if (val !== "직접입력") {
			const errMsgs = sel.closest("td").querySelectorAll("p");
            site.innerText = `${val}`;
			if (errMsgs.length > 0)
				sel.closest("td").querySelector("p").remove();
			return true;
		} else {
			const errMsgs = sel.closest("td").querySelectorAll("p");
			if (errMsgs.length > 0)
				sel.closest("td").querySelector("p").remove();

			const errMsg = document.createElement("p");
			errMsg.append(`이메일 주소를 정확하게 입력해주세요.`);
			sel.closest("td").append(errMsg);

			return false;
		}
	}

	isPwd(name1, name2, len) {
		const pwd1 = this.form.querySelector(`[name=${name1}]`);
		const pwd2 = this.form.querySelector(`[name=${name2}]`);
		const pwd1_val = pwd1.value;
		const pwd2_val = pwd2.value;

		const num = /[0-9]/;
		const eng = /[a-zA-Z]/;
		const spc = /[!@#$%^&*()_]/;

		if (
			pwd1_val === pwd2_val &&
			pwd1_val.length > len &&
			num.test(pwd1_val) &&
			eng.test(pwd1_val) &&
			spc.test(pwd1_val)
		) {
			const errMsgs = pwd1.closest("td").querySelectorAll("p");
			if (errMsgs.length > 0)
				pwd1.closest("td").querySelector("p").remove();
			return true;
		} else {
			const errMsgs = pwd1.closest("td").querySelectorAll("p");
            
			if (errMsgs.length > 0)
				pwd1.closest("td").querySelector("p").remove();

			const errMsg = document.createElement("p");
			errMsg.append(
				`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 모두 포함해서 입력하세요.`
			);
			pwd1.closest("td").append(errMsg);

			return false;
		}
	}

    isPoint(name1, name2, len){
        const pwd1 = this.form.querySelector(`[name=${name1}]`);
		const pwd2 = this.form.querySelector(`[name=${name2}]`);
		const pwd1_val = pwd1.value;
		const pwd2_val = pwd2.value;

        const num = /[0-9]/;

        if (
			pwd1_val === pwd2_val &&
			pwd1_val.length === len &&
			num.test(pwd1_val)
		) {
			const errMsgs = pwd1.closest("td").querySelectorAll("p");
			if (errMsgs.length > 0)
				pwd1.closest("td").querySelector("p").remove();
			return true;
		} else {
			const errMsgs = pwd1.closest("td").querySelectorAll("p");

			if (errMsgs.length > 0)
				pwd1.closest("td").querySelector("p").remove();

			const errMsg = document.createElement("p");
			errMsg.append(
				`비밀번호는 숫자 ${len}자리로 입력하세요.`
			);
			pwd1.closest("td").append(errMsg);
        }
    }
}