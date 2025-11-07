/* Show/hide password toggle in login view */

const eyeToggleLogin = document.querySelector("#login__eye-toggle");
if (eyeToggleLogin) {
    eyeToggleLogin.addEventListener("click", function() {
    const passInput = document.getElementById("login-password--input");
    if (!passInput) return;

    const type = passInput.getAttribute("type");
    if (type == "password") {
        passInput.setAttribute("type", "text");
        eyeToggleLogin.innerHTML = '<img src="/images/icons/password-show.png" alt="Hide password" width="24" height="24">';
    } else {
        passInput.setAttribute("type", "password");
        eyeToggleLogin.innerHTML = '<img src="/images/icons/password-hide.png" alt="Show password" width="24" height="24">';
    }  
    });
}


/* Show/hide password toggle in register view */

const eyeToggleRegister = document.querySelector("#register__eye-toggle");
if (eyeToggleRegister) {
    eyeToggleRegister.addEventListener("click", function() {
    const passInput = document.getElementById("register-password--input");
    if (!passInput) return;

    const type = passInput.getAttribute("type");
    if (type == "password") {
        passInput.setAttribute("type", "text");
        eyeToggleRegister.innerHTML = '<img src="/images/icons/password-show.png" alt="Hide password" width="24" height="24">';
    } else {
        passInput.setAttribute("type", "password");
        eyeToggleRegister.innerHTML = '<img src="/images/icons/password-hide.png" alt="Show password" width="24" height="24">';
    }  
    });
}
