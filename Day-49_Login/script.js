const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const submitBtn = document.querySelector("#submitBtn");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

function checkValidity() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  const isEmailValid = emailRegex.test(emailValue);
  const isPasswordValid = passwordRegex.test(passwordValue);

  if (isEmailValid && isPasswordValid) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

email.addEventListener("input", () => {
  const value = email.value.trim();

  if (!emailRegex.test(value)) {
    emailError.textContent = "Invalid email";
    email.style.border = "2px solid red";
  } else {
    emailError.textContent = "";
    email.style.border = "2px solid green";
  }

  checkValidity();
});

password.addEventListener("input", () => {
  const value = password.value.trim();

  if (!passwordRegex.test(value)) {
    passwordError.textContent =
      "Password must be 8+ chars, include A-Z, a-z, number & symbol";
    password.style.border = "2px solid red";
  } else {
    passwordError.textContent = "";
    password.style.border = "2px solid green";
  }

  checkValidity();
});

form.addEventListener("submit", ()=>{
  window.alert("Form Submitted")
})