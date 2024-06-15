document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll("#nav-menu li a");

    navItems.forEach(item => {
        item.addEventListener("mouseenter", function() {
            item.style.color = "#ff0000";  
        });

        item.addEventListener("mouseleave", function() {
            item.style.color = "";  
        });
    });
});
