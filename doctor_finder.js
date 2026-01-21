burger=document.querySelector('.burger')
navbarItems=document.querySelector('.navbar-items')
nav=document.querySelector('.nav')

burger.addEventListener('click',()=>{
   navbarItems.classList.toggle('h-class')
   nav.classList.toggle('v-class')
})

/* ---------------------------------------------------
   DOCTOR FINDER – With Add/Edit + Next button support
----------------------------------------------------*/

/* State */
let selectedSymptoms = new Set();

/* Helpers */

// Create a symptom card element
function createSymptomCard(label, isAddEdit = false) {
    const card = document.createElement('div');
    card.className = 'symptom-card' + (isAddEdit ? ' add-edit' : '');
    card.innerHTML = `
        <img src="${isAddEdit ? 'img/add.png' : 'img/placeholder.png'}" alt="">
        <p>${label}</p>
    `;
    // Keep add/edit icon for add-edit card
    if (!isAddEdit) {
        card.querySelector('img').src = 'img/placeholder.png';
    } else {
        card.querySelector('img').src = 'img/add.png';
    }

    // Attach click behavior
    card.addEventListener('click', (e) => {
        // If this is the Add/Edit card, open add flow
        if (card.classList.contains('add-edit')) {
            handleAddEditCard();
            return;
        }

        toggleSymptomSelection(card);
    });

    return card;
}

// Toggle selection styles and state for a symptom card
function toggleSymptomSelection(card) {
    const symptom = card.innerText.trim();
    if (selectedSymptoms.has(symptom)) {
        selectedSymptoms.delete(symptom);
        card.style.borderColor = "transparent";
        card.style.background = "#ffffff";
    } else {
        selectedSymptoms.add(symptom);
        card.style.borderColor = "#007BFF";
        card.style.background = "#eef6ff";
    }
}

// Prompt to add a new symptom (simple flow). You can replace with a modal.
function handleAddEditCard() {
    const newSymptom = prompt('Enter new symptom name (e.g. "Headache"):');
    if (!newSymptom) return;

    // sanitize minimal whitespace
    const label = newSymptom.trim();
    if (!label) return;

    // Prevent duplicates (case-insensitive)
    const existing = Array.from(document.querySelectorAll('.symptom-card p'))
        .map(p => p.innerText.trim().toLowerCase());
    if (existing.includes(label.toLowerCase())) {
        alert('This symptom already exists.');
        return;
    }

    // Create a new card and insert before the add-edit card
    const grid = document.querySelector('.symptom-grid');
    const addEditCard = grid.querySelector('.symptom-card.add-edit');
    const newCard = createSymptomCard(label, false);

    // Provide an icon - if you have multiple icons, choose appropriately.
    // newCard.querySelector('img').src = 'img/symptom_icon.png';

    grid.insertBefore(newCard, addEditCard);

    // Optionally auto-select the newly added symptom:
    toggleSymptomSelection(newCard);
}

/* ---------------------------------------------------
   Attach behavior to all initial cards (except add-edit will be handled in its own listener)
----------------------------------------------------*/
document.querySelectorAll('.symptom-card').forEach(card => {
    if (card.classList.contains('add-edit')) {
        // ensure add-edit uses the add flow
        card.addEventListener('click', (e) => {
            handleAddEditCard();
        });
    } else {
        card.addEventListener('click', () => toggleSymptomSelection(card));
    }
});

/* ---------------------------------------------------
   Disease definitions and doctors (unchanged)
----------------------------------------------------*/
const diseases = {
    "Peripheral Neuropathy": ["Lower limbs", "Upper limbs", "Numbness", "Tingling"],
    "Gastrointestinal Disorder": ["Gastrointestinal", "Vomiting", "Abdominal pain", "Diarrhea"],
    "Cardiac Failure": ["Cardiac", "Chest pain", "Breathing difficulty", "Swelling"],
    "Sexual Dysfunction": ["Sexual"],
    "Mental Health Issue": ["Mental", "Fatigue", "Confusion"],
    "Common Cold": ["Cold", "Sneezing", "Runny nose", "Cough"],
    "Seasonal Flu": ["Fever", "Cold", "Cough", "Body pain"],
    "Viral Fever": ["Fever", "Fatigue", "Headache", "Body pain"],
    "Skin Allergy": ["Skin rash", "Itching", "Redness"],
    "Eye Infection": ["Eye redness", "Eyes watery", "Pain"],
    "Thyroid Disorder": ["Fatigue", "Weight change", "Cold intolerance"],
    "Lung Infection": ["Breathing difficulty", "Cough", "Chest pain"],
    "Kidney Disease": ["Swelling", "Frequent urination", "Back pain"],
    "Liver Disease": ["Abdominal pain", "Fatigue", "Yellow skin"],
    "Diabetes": ["Frequent urination", "Fatigue", "Weight loss"],
    "Stroke": ["Mental", "Upper limbs", "Confusion", "Weakness"]
};

const doctors = {
    "Peripheral Neuropathy": [
        { name: "Dr. Rehan Karim", specialist: "Neurologist" },
        { name: "Dr. Mahira Islam", specialist: "Neuro Medicine Specialist" },
        { name: "Dr. Tanvir Rahman", specialist: "Neurophysiologist" }
    ],
    "Gastrointestinal Disorder": [
        { name: "Dr. Sara Haque", specialist: "Gastroenterologist" },
        { name: "Dr. Ahsan Kabir", specialist: "Hepatologist" },
        { name: "Dr. Farzana Noor", specialist: "Digestive Specialist" }
    ],
    "Cardiac Failure": [
        { name: "Dr. Imran Chowdhury", specialist: "Cardiologist" },
        { name: "Dr. Fariha Nawar", specialist: "Heart & Vascular Specialist" },
        { name: "Dr. Omar Siddique", specialist: "Cardiac Surgeon" }
    ],
    "Sexual Dysfunction": [
        { name: "Dr. Laila Siddique", specialist: "Endocrinologist" },
        { name: "Dr. Sahil Ahmed", specialist: "Urologist" },
        { name: "Dr. Nafisa Yasmin", specialist: "Reproductive Health Specialist" }
    ],
    "Mental Health Issue": [
        { name: "Dr. Rafi Ahmed", specialist: "Psychiatrist" },
        { name: "Dr. Sumaiya Hasan", specialist: "Clinical Psychologist" },
        { name: "Dr. Salman Muhtadi", specialist: "Mental Health Physician" }
    ],
    "Common Cold": [
        { name: "Dr. Ruma Talukder", specialist: "General Physician" },
        { name: "Dr. Hasan Mehedi", specialist: "ENT Specialist" },
        { name: "Dr. Farha Islam", specialist: "Internal Medicine" }
    ],
    "Seasonal Flu": [
        { name: "Dr. Atiqur Rahman", specialist: "General Physician" },
        { name: "Dr. Nurjahan Sultana", specialist: "Infectious Disease Specialist" },
        { name: "Dr. Mahmud Hossain", specialist: "Internal Medicine" }
    ],
    "Viral Fever": [
        { name: "Dr. Jannat Akter", specialist: "Infectious Disease Specialist" },
        { name: "Dr. Abdullah Shahin", specialist: "General Physician" },
        { name: "Dr. Aysha Khan", specialist: "Internal Medicine" }
    ],
    "Skin Allergy": [
        { name: "Dr. Fahmida Chowdhury", specialist: "Dermatologist" },
        { name: "Dr. Noman Aziz", specialist: "Skin & Allergy Specialist" },
        { name: "Dr. Dina Yasmin", specialist: "Immunologist" }
    ],
    "Eye Infection": [
        { name: "Dr. Tareq Mahmud", specialist: "Ophthalmologist" },
        { name: "Dr. Nabila Islam", specialist: "Eye Specialist" },
        { name: "Dr. Kamrul Hasan", specialist: "Cornea Specialist" }
    ],
    "Thyroid Disorder": [
        { name: "Dr. Arif Kabir", specialist: "Endocrinologist" },
        { name: "Dr. Sara Mim", specialist: "Hormone Specialist" },
        { name: "Dr. Reaz Hossain", specialist: "Thyroid Consultant" }
    ],
    "Lung Infection": [
        { name: "Dr. Ziaul Karim", specialist: "Pulmonologist" },
        { name: "Dr. Nafiz Imtiaz", specialist: "Chest Specialist" },
        { name: "Dr. Farzana Tania", specialist: "Respiratory Medicine" }
    ],
    "Kidney Disease": [
        { name: "Dr. Maruf Hasan", specialist: "Nephrologist" },
        { name: "Dr. Sabrina Hossain", specialist: "Kidney Specialist" },
        { name: "Dr. Rayhan Alam", specialist: "Urology & Nephrology" }
    ],
    "Liver Disease": [
        { name: "Dr. Anisur Rahman", specialist: "Hepatologist" },
        { name: "Dr. Tanvir Sultana", specialist: "Gastro & Liver Specialist" },
        { name: "Dr. Farid Uddin", specialist: "Liver Surgeon" }
    ],
    "Diabetes": [
        { name: "Dr. Firoz Hossain", specialist: "Diabetologist" },
        { name: "Dr. Momena Akter", specialist: "Endocrinologist" },
        { name: "Dr. Kazi Anwar", specialist: "Metabolism Specialist" }
    ],
    "Stroke": [
        { name: "Dr. Mushfiq Hasan", specialist: "Neuro Specialist" },
        { name: "Dr. Tasneem Chowdhury", specialist: "Stroke Rehabilitation Expert" },
        { name: "Dr. Rashid Karim", specialist: "Neurologist" }
    ]
};

/* ---------------------------------------------------
   Bipartite match (symptom -> disease)
----------------------------------------------------*/
function bipartiteMatch() {
    let bestDisease = null;
    let highestScore = 0;
    const selectedList = Array.from(selectedSymptoms);

    Object.entries(diseases).forEach(([disease, symptomList]) => {
        let score = 0;
        selectedList.forEach(sym => {
            if (symptomList.includes(sym)) score++;
        });

        if (score > highestScore) {
            highestScore = score;
            bestDisease = disease;
        }
    });

    return bestDisease;
}

/* ---------------------------------------------------
   FIND (Top 3 doctors) - unchanged behaviour
----------------------------------------------------*/
document.getElementById("findBtn").addEventListener("click", () => {
    const resultDiv = document.getElementById("result");

    if (selectedSymptoms.size === 0) {
        resultDiv.classList.remove("hidden");
        resultDiv.innerHTML = `<p>Please select at least one symptom.</p>`;
        return;
    }

    const matchedDisease = bipartiteMatch();

    if (!matchedDisease) {
        resultDiv.classList.remove("hidden");
        resultDiv.innerHTML = `<p>No matching doctor found.</p>`;
        return;
    }

    const top3 = (doctors[matchedDisease] || []).slice(0, 3);

    let html = `<h3>Best Doctor Suggestions</h3>`;
    top3.forEach(d => {
        html += `
            <div class="doctor-card">
                <div>
                    <h3>${d.name}</h3>
                    <p class="badge">${d.specialist}</p>
                    <p><strong>Diagnosis Match:</strong> ${matchedDisease}</p>
                </div>
            </div>
        `;
    });

    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = html;
});

/* ---------------------------------------------------
   CLEAR behaviour
----------------------------------------------------*/
document.getElementById("clearBtn").addEventListener("click", () => {
    selectedSymptoms.clear();
    document.querySelectorAll(".symptom-card").forEach(card => {
        card.style.background = "#ffffff";
        card.style.borderColor = "transparent";
    });
    const result = document.getElementById("result");
    result.classList.add("hidden");
    result.innerHTML = "";
});

/* ---------------------------------------------------
   NEXT button behaviour
   - If no selection: alert
   - If selection: scroll & focus extra notes (can be changed to jump to results)
----------------------------------------------------*/
document.querySelector('.next-btn').addEventListener('click', () => {
    if (selectedSymptoms.size === 0) {
        alert('Please select at least one symptom before proceeding.');
        return;
    }

    // scroll to extra notes and focus
    const extra = document.getElementById('extraNotes');
    if (extra) {
        extra.scrollIntoView({ behavior: 'smooth', block: 'center' });
        extra.focus();
    } else {
        // fallback: trigger find
        document.getElementById('findBtn').click();
    }
});
