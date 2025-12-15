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
        eyeToggleLogin.setAttribute("title", "Hide password");
    } else {
        passInput.setAttribute("type", "password");
        eyeToggleLogin.innerHTML = '<img src="/images/icons/password-hide.png" alt="Show password" width="24" height="24">';
        eyeToggleLogin.setAttribute("title", "Show password");
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
        eyeToggleRegister.setAttribute("title", "Hide password");
    } else {
        passInput.setAttribute("type", "password");
        eyeToggleRegister.innerHTML = '<img src="/images/icons/password-hide.png" alt="Show password" width="24" height="24">';
         eyeToggleRegister.setAttribute("title", "Show password");
    }  
    });
}

/* Show/hide password toggle in edit account view */

const eyeToggleUpdate = document.querySelector("#update__eye-toggle");
if (eyeToggleUpdate) {
    eyeToggleUpdate.addEventListener("click", function() {
    const passInput = document.getElementById("update-password--input");
    if (!passInput) return;

    const type = passInput.getAttribute("type");
    if (type == "password") {
        passInput.setAttribute("type", "text");
        eyeToggleUpdate.innerHTML = '<img src="/images/icons/password-show.png" alt="Hide password" width="24" height="24">';
        eyeToggleUpdate.setAttribute("title", "Hide password");
    } else {
        passInput.setAttribute("type", "password");
        eyeToggleUpdate.innerHTML = '<img src="/images/icons/password-hide.png" alt="Show password" width="24" height="24">';
         eyeToggleUpdate.setAttribute("title", "Show password");
    }  
    });
}
