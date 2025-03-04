
  (function() {
    emailjs.init("Ra9UjbGvsDgxMuFGK"); // Reemplaça amb el teu User ID d'EmailJS
  })();

  document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que es recarregui la pàgina

    const emailInput = document.querySelector("input[name='email']").value;

    emailjs.send("service_8xoksxl", "template_bw0s2l4", {
      email: emailInput,
      message: "Vull més informació!"
    }).then(function(response) {
      alert("Missatge enviat! Ens posarem en contacte aviat.");
    }, function(error) {
      alert("Error en enviar el missatge. Revisa la configuració.");
    });
  });
