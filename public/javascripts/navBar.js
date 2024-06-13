document.addEventListener("DOMContentLoaded", function () {
    // Get all nav links
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    // Function to add active class based on current URL
    function setActiveLink() {
        const currentPath = window.location.pathname;

        // Remove active class from all links
        navLinks.forEach(function (navLink) {
            navLink.classList.remove("active");

            // Check if the current link matches the current path
            if (navLink.getAttribute("href") === currentPath) {
                navLink.classList.add("active");
            }
        });
    }

    // Add event listener to each nav link
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            // Remove active class from all links
            navLinks.forEach(function (navLink) {
                navLink.classList.remove("active");
            });

            // Add active class to the clicked link
            link.classList.add("active");
        });
    });

    // Call setActiveLink function when DOM is loaded
    setActiveLink();
});
