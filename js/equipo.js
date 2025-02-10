document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseover', () => {
        member.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.2)';
    });
    member.addEventListener('mouseout', () => {
        member.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

