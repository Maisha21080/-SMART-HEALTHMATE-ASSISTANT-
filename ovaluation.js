burger=document.querySelector('.burger')
navbarItems=document.querySelector('.navbar-items')
nav=document.querySelector('.nav')

burger.addEventListener('click',()=>{
   navbarItems.classList.toggle('h-class')
   nav.classList.toggle('v-class')
})


// Ovulation Calculator (Dynamic Programming)

let periodDP = {};
let ovulationDP = {};

// --- DP Subproblem: Predict Period Date ---
function getPeriod(i, lastPeriod, cycleLength) {
    if (periodDP[i]) return periodDP[i];  

    if (i === 0) {
        periodDP[0] = new Date(lastPeriod);
        return periodDP[0];
    }

    let prev = getPeriod(i - 1, lastPeriod, cycleLength); 
    let next = new Date(prev);
    next.setDate(next.getDate() + cycleLength);

    periodDP[i] = next;  
    return next;
}

// --- DP Subproblem: Predict Ovulation Date ---
function getOvulation(i, lastPeriod, cycleLength) {
    if (ovulationDP[i]) return ovulationDP[i];

    let periodDate = getPeriod(i, lastPeriod, cycleLength);
    let ovulationDate = new Date(periodDate);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    ovulationDP[i] = ovulationDate; 
    return ovulationDate;
}

// --- MAIN FUNCTION ---
function calculateOvulation() {
    const lastPeriodVal = document.getElementById('lastPeriod').value;
    const cycleLength = parseInt(document.getElementById('cycleLength').value);

    if (!lastPeriodVal || !cycleLength) {
        alert("Please enter all information");
        return;
    }

    // Clear DP tables for fresh calculation
    periodDP = {};
    ovulationDP = {};

    const lastPeriod = new Date(lastPeriodVal);

    // We use i = 1 → Next cycle
    const period1 = getPeriod(1, lastPeriod, cycleLength);
    const ovulation1 = getOvulation(1, lastPeriod, cycleLength);

    const fertileStart = new Date(ovulation1);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulation1);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    document.getElementById("ovulationResult").style.display = "block";
    document.getElementById("ovulationResult").innerHTML = `
        <div class="result">
            <h3>Your Fertility Window </h3>
            <p><strong>Next Period:</strong> ${period1.toDateString()}</p>
            <p><strong>Ovulation Day:</strong> ${ovulation1.toDateString()}</p>
            <p><strong>Fertile Window:</strong> ${fertileStart.toDateString()} → ${fertileEnd.toDateString()}</p>

            
        </div>
    `;
}
