document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseover', () => {
        member.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.2)';
    });
    member.addEventListener('mouseout', () => {
        member.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const members = document.querySelectorAll(".team-member");
    setTimeout(() => {
        members.forEach(member => {
            member.style.opacity = "1";
            member.style.transform = "translateY(0)";
        });
    }, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
    const title = document.querySelector(".team-title");
    const description = document.querySelector(".team-description");
    const members = document.querySelectorAll(".team-member");

    // Apareix el títol i la descripció primer
    title.classList.add("show");
    description.classList.add("show");

    // Espera que apareguin el títol i la descripció abans de les imatges
    setTimeout(() => {
        members.forEach((member, index) => {
            setTimeout(() => {
                member.classList.add("show");
            }, index * 200); // Retard progressiu per cada membre
        });
    }, 1000); // Espera 1 segon després del títol
});
