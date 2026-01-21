
// UI animation
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// SIGN UP - Save to localStorage
function signupUser() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!name || !email || !password) {
        alert("Please fill all fields!");
        return;
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");
    container.classList.remove("active"); // go to login page
}

// SIGN IN - Check from localStorage
function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No user found! Please sign up first.");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        alert("Login Successful!");
        window.location.href = "home.html";  // redirect
    } else {
        alert("Incorrect email or password!");
    }
}
