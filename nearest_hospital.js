burger=document.querySelector('.burger')
navbarItems=document.querySelector('.navbar-items')
nav=document.querySelector('.nav')

burger.addEventListener('click',()=>{
   navbarItems.classList.toggle('h-class')
   nav.classList.toggle('v-class')
})

// -------------------------------------------
// CHITTAGONG ROAD GRAPH (Distances in KM)
// -------------------------------------------
const graph = {
    "GEC Circle": { "2 No Gate": 1.5, "Chawkbazar": 2.1, "Khulshi": 1.2 },
    "2 No Gate": { "GEC Circle": 1.5, "Muradpur": 1.6, "Wasa": 1.4 },
    "Muradpur": { "2 No Gate": 1.6, "Bahaddarhat": 2.8, "Sholoshahar": 1.9 },
    "Bahaddarhat": { "Muradpur": 2.8, "Kotwali": 4.0 },
    "Chawkbazar": { "GEC Circle": 2.1, "New Market": 1.3, "Kotwali": 2.0 },
    "New Market": { "Chawkbazar": 1.3, "Kotwali": 1.0 },
    "Kotwali": { "New Market": 1.0, "Chawkbazar": 2.0, "Chittagong Port": 3.1 },
    "Chittagong Port": { "Kotwali": 3.1, "Customs Area": 1.2 },
    "Customs Area": { "Chittagong Port": 1.2, "Agrabad": 2.0 },
    "Agrabad": { "Customs Area": 2.0, "Halishahar": 3.5 },
    "Halishahar": { "Agrabad": 3.5, "Pahartali": 3.0 },
    "Pahartali": { "Halishahar": 3.0, "Nasirabad": 2.7 },
    "Nasirabad": { "Pahartali": 2.7, "Khulshi": 1.8 },
    "Khulshi": { "Nasirabad": 1.8, "GEC Circle": 1.2 },
    "Sholoshahar": { "Muradpur": 1.9, "Oxygen": 3.0 },
    "Oxygen": { "Sholoshahar": 3.0, "Baizid": 2.2 },
    "Baizid": { "Oxygen": 2.2, "Wasa": 2.4 },
    "Wasa": { "Baizid": 2.4, "2 No Gate": 1.4 },
};

// -------------------------------------------
// HOSPITAL LIST (Chittagong Major Hospitals)
// -------------------------------------------
const hospitals = {
    "Evercare Hospital": "GEC Circle",
    "CSCR Hospital": "Khulshi",
    "Medical College Hospital": "Chawkbazar",
    "Max Hospital": "Mehedibag",
    "National Hospital": "Kazir Dewri",
    "Chevron Hospital": "Oxygen",
    "Bangladesh Eye Hospital": "Agrabad",
    "Chittagong Maa-O-Shishu Hospital": "Agrabad",
    "Parkview Hospital": "2 No Gate"
};

// -------------------------------------------
// DIJKSTRA ALGORITHM
// -------------------------------------------
function dijkstra(start) {
    const distances = {};
    const previous = {};
    const visited = new Set();

    // Initialize distances
    for (let place in graph) {
        distances[place] = Infinity;
        previous[place] = null;
    }
    distances[start] = 0;

    while (true) {
        let nearest = null;

        // Pick unvisited node with smallest distance
        for (let place in graph) {
            if (!visited.has(place) && (nearest === null || distances[place] < distances[nearest])) {
                nearest = place;
            }
        }

        if (nearest === null) break;
        visited.add(nearest);

        // Update neighbors
        for (let neighbor in graph[nearest]) {
            let newDist = distances[nearest] + graph[nearest][neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                previous[neighbor] = nearest;
            }
        }
    }

    return { distances, previous };
}

// -------------------------------------------
// FIND NEAREST HOSPITAL
// -------------------------------------------

function findNearestMedical() {
    const userLocation = document.getElementById("userLocation").value.trim();
    const resultsDiv = document.getElementById("medicalResult");

    if (!userLocation || !graph[userLocation]) {
        resultsDiv.innerHTML = `<p class="error-msg">⚠ Please select a valid location from the list.</p>`;
        return;
    }

    const { distances, previous } = dijkstra(userLocation);

    // ---- Step 1: Build array of hospitals with distances ----
    let hospitalDistances = [];

    for (let hospital in hospitals) {
        const location = hospitals[hospital];
        if (distances[location] !== Infinity) {
            hospitalDistances.push({
                hospital,
                location,
                distance: distances[location]
            });
        }
    }

    // ---- Step 2: Sort by nearest ----
    hospitalDistances.sort((a, b) => a.distance - b.distance);

    // ---- Step 3: Take first 3 ----
    const topThree = hospitalDistances.slice(0, 3);

    // ---- Step 4: Generate full HTML ----
    let html = "";

    topThree.forEach(h => {
        // Reconstruct shortest path
        let path = [];
        let current = h.location;

        while (current !== null) {
            path.push(current);
            current = previous[current];
        }
        path.reverse();

        html += `
            <div class="medical-card-light enhanced-card">
                <div class="med-info-light enhanced-info">
                    <h3 class="result-title">🏥 ${h.hospital}</h3>

                    <div class="info-row">
                        <span class="label">Distance:</span>
                        <span class="value">${h.distance.toFixed(2)} km</span>
                    </div>

                    <div class="info-row">
                        <span class="label">Route:</span>
                        <span class="value route">${path.join(" → ")}</span>
                    </div>
                </div>
            </div>
        `;
    });

    resultsDiv.innerHTML = html;



    // Show result card
   
    resultsDiv.innerHTML = `
    <div class="medical-card-light enhanced-card">
        <div class="med-info-light enhanced-info">
            <h3 class="result-title">🏥 Nearest Hospital Found</h3>

            <div class="info-row">
                <span class="label">Hospital:</span>
                <span class="value">${nearestHospital}</span>
            </div>

            <div class="info-row">
                <span class="label">Distance:</span>
                <span class="value">${nearestDistance.toFixed(2)} km</span>
            </div>

            <div class="info-row">
                <span class="label">Route:</span>
                <span class="value route">${path.join(" → ")}</span>
            </div>
        </div>
    </div>
`;

}


