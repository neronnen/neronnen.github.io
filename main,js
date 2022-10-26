const email = document.querySelector(".js-input-email");
const sign = document.querySelector(".js-input-sign");
const form = document.querySelector(".formValidation");
const secondForm = document.querySelector(".container");
const remember = document.querySelector(".round");
const formInputs = form.elements;

const modalEl = document.querySelector(".modal");
const closeBtn = document.querySelector(".closeModalWindow");

function openModal() {
  modalEl.classList.add("modal--show");
}

function closeModal() {
  modalEl.classList.remove("modal--show");
}

secondForm.addEventListener("submit", checkValidaty);
secondForm.addEventListener("click", rememberChecked);

function checkValidaty(event) {
  if (!email.value) {
    localStorage.removeItem(email);
    alert("Заполните строку Email");
  } else if (!sign.value) {
    alert("Заполните строку Password");
  } else if (email.validity.tooShort) {
    alert("Недостаточно символов");
    localStorage.clear();
  } else if (email.validity.typeMismatch) {
    alert("Введите корректный Email");
    localStorage.clear();
  } else {
    openModal();
    closeBtn.addEventListener("click", () => closeModal());
    event.preventDefault();
  }
}

function checkStorage() {
  for (let i = 0; i < formInputs.length; i++) {
    if (formInputs[i].type === "checkbox") {
      formInputs[i].checked = localStorage.getItem(formInputs[i].name);
    } else {
      formInputs[i].value = localStorage.getItem(formInputs[i].name);
    }
  }
  events();
}

function events() {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("change", changeHandler);
  }
}

function changeHandler() {
  if (this.type !== "checkbox") {
    localStorage.setItem(this.name, this.value);
  } else {
    localStorage.setItem(this.name, this.checked);
  }
}

function rememberChecked() {
  if (remember.checked) {
  } else {
    localStorage.clear();
  }
}

checkStorage();
