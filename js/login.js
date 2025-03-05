document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const errorMessage = document.getElementById("error-message");

  // Function to verify user credentials
  const verifyCredentials = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/verify-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify credentials");
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Error verifying credentials:", error);
      return false;
    }
  };

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const isValid = await verifyCredentials(email, password);
    if (isValid) {
      errorMessage.classList.remove("visible");
      window.location.href = "correctlogin.html";
    } else {
      errorMessage.classList.add("visible");
    }
  });
});
