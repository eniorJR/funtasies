document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const errorMessage = document.getElementById("error-message");

  // Function to save user data to XML file
  const saveUserToXML = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      errorMessage.textContent = "Les contrasenyes no coincideixen";
      errorMessage.classList.add("visible");
      return;
    }

    if (password.length < 6) {
      errorMessage.textContent =
        "La contrasenya ha de tenir almenys 6 caràcters";
      errorMessage.classList.add("visible");
      //return;
    }

    try {
      // Save user data
      saveUserToXML({ name, email, password }).then((x) => {
        window.location.href = "login.html";
      });
    } catch (error) {
      console.log(error);
      errorMessage.textContent =
        "Hi ha hagut un error en el registre. Si us plau, torna-ho a provar.";
      errorMessage.classList.add("visible");
    }
  });

  form.addEventListener("input", () => {
    errorMessage.classList.remove("visible");
  });
});
