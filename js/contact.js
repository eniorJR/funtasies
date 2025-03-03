document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    if (!form) {
        console.error("No se encontró ningún formulario en la página.");
        return;
    }

    // Referencias a los campos del formulario
    const nomField = form.querySelector("#nom");
    const emailField = form.querySelector("#email");
    const telefonField = form.querySelector("#telefon");
    const missatgeField = form.querySelector("#missatge");
    const submitButton = form.querySelector("button[type='submit']");

    // Habilitar validación en tiempo real
    nomField.addEventListener("input", () => validateField(nomField, validateText));
    emailField.addEventListener("input", () => validateField(emailField, validateEmail));
    telefonField.addEventListener("input", () => validateField(telefonField, validatePhone));
    missatgeField.addEventListener("input", () => validateField(missatgeField, validateMessage));

    // Limitar el campo de teléfono a 9 dígitos
    telefonField.addEventListener("input", function () {
        if (this.value.length > 9) {
            this.value = this.value.slice(0, 9); // Cortar el valor a 9 caracteres
        }
    });

    // Manejar el envío del formulario
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitar el envío por defecto

        // Validar todos los campos antes de enviar
        const isNomValid = validateField(nomField, validateText);
        const isEmailValid = validateField(emailField, validateEmail);
        const isTelefonValid = validateField(telefonField, validatePhone);
        const isMissatgeValid = validateField(missatgeField, validateMessage);

        const isFormValid = isNomValid && isEmailValid && isTelefonValid && isMissatgeValid;

        if (isFormValid) {
            // Deshabilitar el botón de envío para evitar múltiples envíos
            submitButton.disabled = true;
            submitButton.textContent = "Enviant...";

            try {
                // Simular el envío del formulario (puedes reemplazar esto con fetch)
                const response = await submitForm({
                    nom: nomField.value.trim(),
                    email: emailField.value.trim(),
                    telefon: telefonField.value.trim(),
                    missatge: missatgeField.value.trim(),
                });

                // Mostrar mensaje de éxito
                showMessage("Formulari enviat correctament!", "success");
                form.reset(); // Reiniciar el formulario
            } catch (error) {
                // Mostrar mensaje de error
                showMessage("Hi ha hagut un error en enviar el formulari. Torna-ho a provar.", "error");
            } finally {
                // Restaurar el botón de envío
                submitButton.disabled = false;
                submitButton.textContent = "Enviar";
            }
        } else {
            showMessage("Si us plau, corregeix els errors abans d'enviar el formulari.", "error");
        }
    });

    /**
     * Valida un campo del formulario.
     * @param {HTMLElement} field - Campo a validar.
     * @param {Function} validator - Función de validación.
     * @returns {boolean} - True si el campo es válido, false en caso contrario.
     */
    function validateField(field, validator) {
        const errorMessage = field.nextElementSibling;
        const value = field.value.trim();

        if (validator(value)) {
            field.classList.remove("error");
            field.classList.add("success");
            if (errorMessage) errorMessage.textContent = "";
            return true;
        } else {
            field.classList.remove("success");
            field.classList.add("error");
            if (errorMessage) errorMessage.textContent = getErrorMessage(field);
            return false;
        }
    }

    /**
     * Obtiene el mensaje de error para un campo.
     * @param {HTMLElement} field - Campo del formulario.
     * @returns {string} - Mensaje de error.
     */
    function getErrorMessage(field) {
        if (field === nomField) return "El nom és obligatori.";
        if (field === emailField) return "El correu electrònic és obligatori i ha de ser vàlid.";
        if (field === telefonField) return "El telèfon és obligatori i ha de contenir exactament 9 dígits.";
        if (field === missatgeField) return "El missatge és obligatori i ha de tenir almenys 10 caràcters.";
        return "";
    }

    /**
     * Muestra un mensaje en el formulario.
     * @param {string} message - Mensaje a mostrar.
     * @param {string} type - Tipo de mensaje (success, error).
     */
    function showMessage(message, type) {
        let messageContainer = document.querySelector(".error-messages");

        if (!messageContainer) {
            messageContainer = document.createElement("div");
            messageContainer.classList.add("error-messages");
            form.prepend(messageContainer);
        }

        messageContainer.textContent = message;
        messageContainer.className = `error-messages ${type}`;
    }

    /**
     * Simula el envío del formulario (puedes reemplazar esto con fetch).
     * @param {Object} data - Datos del formulario.
     * @returns {Promise} - Promesa que simula una respuesta del servidor.
     */
    function submitForm(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular una respuesta exitosa o un error
                const shouldFail = Math.random() < 0.2; // 20% de probabilidad de error
                if (shouldFail) {
                    reject(new Error("Error en el servidor"));
                } else {
                    resolve({ status: "success", data });
                }
            }, 1000); // Simular un retraso de 1 segundo
        });
    }

    // Funciones de validación
    function validateText(text) {
        return text.length > 0;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        return /^\d{9}$/.test(phone); // Exactamente 9 dígitos
    }

    function validateMessage(message) {
        return message.length >= 10;
    }
});