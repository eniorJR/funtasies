document.addEventListener("DOMContentLoaded", () => {
    const members = document.querySelectorAll(".team-member");

    // Afegir una classe després d'1 segon perquè els estils es gestionin des del CSS
    setTimeout(() => {
        members.forEach(member => {
            member.classList.add("show");
        });
    }, 1000);

    // Afegir efecte de box-shadow al passar el cursor
    members.forEach(member => {
        member.addEventListener("mouseover", () => {
            member.classList.add("hover");
        });
        member.addEventListener("mouseout", () => {
            member.classList.remove("hover");
        });
    });
});
