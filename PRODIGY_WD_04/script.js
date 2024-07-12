document.addEventListener("DOMContentLoaded", function () {
    // Highlight current section's navigation link on scroll
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll("nav ul li a");

    window.onscroll = () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute("id");
            }
        });

        navLi.forEach(a => {
            a.classList.remove("active");
            if (a.getAttribute("href").substring(1) === current) {
                a.classList.add("active");
            }
        });

    // Back-to-top button
    const backToTopButton = document.createElement("button");
    backToTopButton.textContent = "↑";
    backToTopButton.classList.add("back-to-top");
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Collapsible sections
    const collapsibleHeaders = document.querySelectorAll("section h2");

    collapsibleHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const sectionContent = header.nextElementSibling;
            sectionContent.classList.toggle("collapsed");
        });
    });
});
