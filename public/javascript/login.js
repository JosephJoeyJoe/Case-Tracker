async function loginFormHandler(event) {
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (email && password) {
    document
      .querySelector(".login")
      .addEventListener("submit", loginFormHandler);

    const response = await fetch("api/managers/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

window.onload = loginFormHandler();
