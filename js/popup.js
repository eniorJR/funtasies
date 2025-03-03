document.addEventListener("DOMContentLoaded", function() {
    // Asigna eventos a los botones
    document.getElementById("btn1").addEventListener("click", function() {
      document.getElementById("popup1").style.display = "flex";
    });
  
    document.getElementById("btn2").addEventListener("click", function() {
      document.getElementById("popup2").style.display = "flex";
    });
  
    // Cierra los popups al hacer clic en la 'x'
    document.querySelectorAll(".close").forEach(function(closeBtn) {
      closeBtn.addEventListener("click", function() {
        this.closest(".popup").style.display = "none";
      });
    });
  
    // Cierra los popups al hacer clic fuera del contenido
    window.addEventListener("click", function(event) {
      if (event.target.classList.contains("popup")) {
        event.target.style.display = "none";
      }
    });
  });