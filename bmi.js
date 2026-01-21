burger=document.querySelector('.burger')
navbarItems=document.querySelector('.navbar-items')
nav=document.querySelector('.nav')

burger.addEventListener('click',()=>{
   navbarItems.classList.toggle('h-class')
   nav.classList.toggle('v-class')
})

// BMI Calculator (Divide and Conquer Method)

function convertHeight(heightCm) {
  return heightCm / 100;
}

function square(x) {
  return x * x;
}

function computeBMI(weight, heightM) {
  return weight / square(heightM);
}

function classify(bmi) {
  if (bmi < 18.5) return "Underweight";
  else if (bmi < 25) return "Normal";
  else if (bmi < 30) return "Overweight";
  else return "Obese";
}

// CONQUER + COMBINE
function calculateBMI() {
  let height = parseFloat(document.getElementById("height").value);
  let weight = parseFloat(document.getElementById("weight").value);

  if (!height || !weight) {
    document.getElementById("result").innerHTML =
      "⚠️ Please enter both height and weight!";
    return;
  }

  let hM = convertHeight(height);
  let bmiValue = computeBMI(weight, hM);
  let bmiStatus = classify(bmiValue);

 
  document.getElementById("result").innerHTML =
    `Your BMI: <b>${bmiValue.toFixed(1)}</b> (${bmiStatus})`;
}
