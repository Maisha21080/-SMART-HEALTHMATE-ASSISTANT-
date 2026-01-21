burger=document.querySelector('.burger')
navbarItems=document.querySelector('.navbar-items')
nav=document.querySelector('.nav')

burger.addEventListener('click',()=>{
   navbarItems.classList.toggle('h-class')
   nav.classList.toggle('v-class')
})

// pill.js — Dynamic Programming Based Pill Identifier

// --------------------------------------------------------------
// Levenshtein Distance (DP Algorithm)
// --------------------------------------------------------------
function dpDistance(a, b) {
    const n = a.length;
    const m = b.length;

    // Create DP table
    const dp = Array(n + 1)
        .fill()
        .map(() => Array(m + 1).fill(0));

    // Base cases
    for (let i = 0; i <= n; i++) dp[i][0] = i;
    for (let j = 0; j <= m; j++) dp[0][j] = j;

    // Fill DP table
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // deletion
                    dp[i][j - 1],     // insertion
                    dp[i - 1][j - 1]  // substitution
                );
            }
        }
    }

    return dp[n][m];
}



// Main Identifier Using Dynamic Programming

function identifyPill() {
    const shape = document.getElementById("pillShape").value;
    const color = document.getElementById("pillColor").value;
    const imprint = document.getElementById("pillImprint").value.toLowerCase();

    const resultBox = document.getElementById("pillResult");

    if (!shape || !color) {
        resultBox.innerHTML = `<p class="placeholder">⚠️ Please select pill color & shape.</p>`;
        return;
    }

    // Sample database
    const pillDatabase = [
        { shape: "round", color: "white", imprint: "asp", name: "Aspirin", use: "Pain relief" },
        { shape: "oval", color: "blue", imprint: "pfizer", name: "Viagra", use: "Erectile dysfunction" },
        { shape: "round", color: "white", imprint: "tylenol", name: "Acetaminophen", use: "Pain & fever" },
        { shape: "capsule", color: "red", imprint: "", name: "Omeprazole", use: "Acid reflux" },
        { shape: "round", color: "yellow", imprint: "", name: "Diazepam", use: "Anxiety relief" }
    ];

    // Filter by shape + color first
    const filtered = pillDatabase.filter(pill =>
        pill.shape === shape &&
        pill.color === color
    );

    if (filtered.length === 0) {
        resultBox.innerHTML = `<p class="placeholder">❌ No pill with this shape & color.</p>`;
        return;
    }

    // ---------------- DP Based Matching ------------------
   
    let scored = filtered.map(pill => {
        let score = 999; 
        if (imprint && pill.imprint) {
            score = dpDistance(imprint, pill.imprint);
        }
        return { ...pill, score };
    });

    // Sort by best DP score (lowest distance)
    scored.sort((a, b) => a.score - b.score);

    // ---------------- Display Results ------------------
    let html = "";
    scored.forEach(pill => {
        html += `
            <div class="pill-item">
                <h4>${pill.name}</h4>
                <p><strong>Use:</strong> ${pill.use}</p>
                <p><strong>Shape:</strong> ${pill.shape} |
                   <strong>Color:</strong> ${pill.color}</p>
                <p><strong>Match Score (DP):</strong> ${pill.score}</p>
            </div>`;
    });

    resultBox.innerHTML = html;
}
