document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get field values
        const nomField = form.querySelector("input[type='text']");
        const emailField = form.querySelector("input[type='email']");
        const telefonField = form.querySelectorAll("input[type='text']")[1];
        const missatgeField = form.querySelector("textarea");

        const nom = nomField.value.trim();
        const email = emailField.value.trim();
        const telefon = telefonField.value.trim();
        const missatge = missatgeField.value.trim();

        let errors = [];

        // Validations
        if (nom === "") {
            errors.push("El nom és obligatori.");
            nomField.classList.add("error");
        } else {
            nomField.classList.remove("error");
        }
        if (email === "" || !validateEmail(email)) {
            errors.push("El correu electrònic és obligatori i ha de ser vàlid.");
            emailField.classList.add("error");
        } else {
            emailField.classList.remove("error");
        }
        if (telefon === "" || !validatePhone(telefon)) {
            errors.push("El número de telèfon és obligatori i ha de contenir entre 9 i 15 dígits.");
            telefonField.classList.add("error");
        } else {
            telefonField.classList.remove("error");
        }
        if (missatge === "" || missatge.length < 10) {
            errors.push("El missatge és obligatori i ha de tenir almenys 10 caràcters.");
            missatgeField.classList.add("error");
        } else {
            missatgeField.classList.remove("error");
        }

        // Display errors or submit form
        let errorContainer = document.querySelector(".error-messages");
        if (!errorContainer) {
            errorContainer = document.createElement("div");
            errorContainer.classList.add("error-messages");
            form.prepend(errorContainer);
        }
        errorContainer.innerHTML = errors.join("<br>");

        if (errors.length === 0) {
            alert("Formulari enviat correctament!");
            form.reset();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        return /^\d{9,15}$/.test(phone); // Allows numbers between 9 and 15 digits
    }
});
