burger=document.querySelector('.burger')
navbarItems=document.querySelector('.navbar-items')
nav=document.querySelector('.nav')

burger.addEventListener('click',()=>{
   navbarItems.classList.toggle('h-class')
   nav.classList.toggle('v-class')
})

// Symptom data (sample)
const symptoms = [
    { name: "Cough", value: 8 },
    { name: "Sore Throat", value: 6 },
    { name: "Nasal Congestion", value: 9 },
    { name: "Runny Nose", value: 7 },
    { name: "Sneezing", value: 5 },
    { name: "Fever", value: 10 }
];

// Areas of Chittagong with (value = severity, weight = population density)
const chittagongAreas = [
    { name: "City Center", value: 10, weight: 4, top: "38%", left: "48%" },
    { name: "University Area", value: 9, weight: 3, top: "28%", left: "42%" },
    { name: "Market District", value: 8, weight: 4, top: "55%", left: "52%" },
    { name: "Suburban Area", value: 5, weight: 2, top: "70%", left: "40%" },
    { name: "Residential Zone", value: 4, weight: 3, top: "60%", left: "30%" }
];

// Greedy Knapsack Algorithm (value/weight sorting)
function calculateRisk(limit = 10) {
    let items = [...chittagongAreas];

    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

    let totalValue = 0;
    let usedWeight = 0;
    let selected = [];

    for (let item of items) {
        if (usedWeight + item.weight <= limit) {
            selected.push(item);
            usedWeight += item.weight;
            totalValue += item.value;
        }
    }

    return { selected, totalValue };
}

// Display symptom list
function renderSymptoms() {
    const ul = document.getElementById("symptomList");
    symptoms.forEach(s => {
        ul.innerHTML += `<li>${s.name} – <strong>${s.value >= 8 ? "High" : s.value >= 6 ? "Moderate" : "Low"}</strong></li>`;
    });
}

// Display high-risk areas
function renderHighRiskAreas(selected) {
    const ul = document.getElementById("highRiskList");
    selected.forEach(a => {
        ul.innerHTML += `<li>🔴 ${a.name}</li>`;
    });
}

// Display overall risk level
function renderOverallRisk(score) {
    const box = document.getElementById("overallRisk");

    if (score >= 22) {
        box.innerText = "VERY HIGH";
        box.classList.add("high-risk");
    } else if (score >= 15) {
        box.innerText = "MODERATE";
        box.classList.add("moderate-risk");
    } else {
        box.innerText = "LOW";
        box.classList.add("low-risk");
    }
}

// ⭐ Add Interactive Hotspot Map
function renderHotspots(selected) {
    const container = document.getElementById("hotspotContainer");

    selected.forEach(area => {
        const dot = document.createElement("div");
        dot.className = "hotspot";
        dot.style.top = area.top;
        dot.style.left = area.left;
        container.appendChild(dot);
    });
}

// Initialize everything
(function initFluMap() {
    const result = calculateRisk(10);
    renderSymptoms();
    renderHighRiskAreas(result.selected);
    renderOverallRisk(result.totalValue);
    renderHotspots(result.selected);  // ← ⭐ added
})();
