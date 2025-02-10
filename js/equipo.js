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

document.addEventListener("DOMContentLoaded", () => {
    const teamSection = document.querySelector(".team-section");
    const teamElements = document.querySelectorAll(".team-title, .team-description, .team-member");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = "running";
            }
        });
    }, { threshold: 0.2 });

    teamElements.forEach(el => {
        el.style.animationPlayState = "paused";
        observer.observe(el);
    });
});
