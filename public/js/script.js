/* Show/hide password toggle */

const eyeToggle = document.querySelector("#eye-toggle");
eyeToggle.addEventListener("click", function() {
    const passInput = document.getElementById("register-password--input");
    if (!passInput) return;

    const type = passInput.getAttribute("type");
    if (type == "password") {
        passInput.setAttribute("type", "text");
        eyeToggle.innerHTML = '<img src="/images/icons/password-show.png" alt="Hide password" width="24" height="24">';
    } else {
        passInput.setAttribute("type", "password");
        eyeToggle.innerHTML = '<img src="/images/icons/password-hide.png" alt="Show password" width="24" height="24">';
    }
});