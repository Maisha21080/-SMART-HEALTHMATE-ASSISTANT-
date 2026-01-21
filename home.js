burger=document.querySelector('.burger')
navbarItems=document.querySelector('.navbar-items')
nav=document.querySelector('.nav')

burger.addEventListener('click',()=>{
   navbarItems.classList.toggle('h-class')
   nav.classList.toggle('v-class')
})


document.getElementById("openAppointment").addEventListener("click", function(e) {
    e.preventDefault();

    const form = document.getElementById("appointmentForm");

    // toggle show/hide
    form.classList.toggle("hidden");

    // scroll only when visible
    if (!form.classList.contains("hidden")) {
        form.scrollIntoView({ behavior: "smooth" });
    }
});


// check login when home page loads
window.onload = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Please login first!");
        window.location.href = "login.html";
    }
};

function bookAppointment() {
    const name = document.getElementById("app-name").value;
    const doctor = document.getElementById("app-doctor").value;
    const email = document.getElementById("app-email").value;
    const number = document.getElementById("app-number").value;

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (!name || !doctor || !email || !number) {
        alert("Please fill all fields!");
        return;
    }

    const appointment = {
        patientName: name,
        doctorName: doctor,
        email: email,
        phone: number,
        userEmail: loggedUser.email,
        createdAt: new Date().toLocaleString()
    };

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment booked successfully!");

    document.getElementById("app-name").value = "";
    document.getElementById("app-doctor").value = "";
    document.getElementById("app-email").value = "";
    document.getElementById("app-number").value = "";
}

// //////////////////////

window.onload = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const accountName = document.getElementById("accountName");
    const logoutMenu = document.getElementById("logoutMenu");

    if (user) {
        // Logged in → show name + hover logout
        accountName.innerText = user.name;
        accountName.href = "#";
        logoutMenu.style.display = "";
    } else {
        // Logged out → show ACCOUNT, no logout
        accountName.innerText = "ACCOUNT";
        accountName.href = "login.html";
        logoutMenu.style.display = "none";
    }
};

function logout() {
    localStorage.removeItem("user");

    const accountName = document.getElementById("accountName");
    const logoutMenu = document.getElementById("logoutMenu");

    accountName.innerText = "ACCOUNT";
    accountName.href = "login.html";
    logoutMenu.style.display = "none";
}

// ////////////////////////

// Contact form submission
document.getElementById("contactSubmit").addEventListener("click", (e) => {
    e.preventDefault(); // prevent form reload

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const phone = document.getElementById("contactPhone").value;
    const message = document.getElementById("contactMessage").value;
    const alertMsg = document.getElementById("contactMessageAlert");

    if (!name || !email || !phone || !message) {
        alertMsg.innerText = "❌ Please fill all fields!";
        alertMsg.style.color = "red";
        return;
    }

    // contact object
    const contact = {
        name,
        email,
        phone,
        message,
        submittedAt: new Date().toLocaleString()
    };

    // get existing contacts
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // show success
    alertMsg.innerText = "✅ Your message has been sent successfully!";
    alertMsg.style.color = "green";

    // clear form
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactPhone").value = "";
    document.getElementById("contactMessage").value = "";

    // remove message after 3 seconds
    setTimeout(() => {
        alertMsg.innerText = "";
    }, 3000);
});
