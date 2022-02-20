const { response } = require("express");

async function signupFormHandler() {
  const email = document.querySelector("#email").value.trim();
  const passworword = document.querySelector("#password").value.trim();

  if (email && password) {
    document
      .querySelector("signup-form")
      .addEventListener("submit", signupFormHandler);

    const response = await fetch("/api/managers", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      herders: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
      console.log("success");
    } else {
      alert(response.statusText);
    }
  }
}
window.onload = signupFormHandler();
