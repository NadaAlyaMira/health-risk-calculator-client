function calculateRisk() {
    console.log("Button Clicked!");

    // Gather input data
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const systolic = document.getElementById("systolic").value;
    const diastolic = document.getElementById("diastolic").value;
    const familyHistory = Array.from(document.getElementById("familyHistory").selectedOptions).map(option => option.value);

    // Input Validation
    if (!age || !height || !weight || !systolic || !diastolic) {
        alert("All fields are required.");
        return;
    }

    if (parseInt(height) < 60) {
        alert("Height must be at least 60 cm.");
        return;
    }

    // Calculate BMI as part of the risk score calculation
    const bmi = calculateBMI(weight, height);
    console.log("BMI:", bmi);

    // Prepare request body
    const requestBody = {
        age: age,
        height: height,
        weight: weight,
        systolic: systolic,
        diastolic: diastolic,
        familyHistory: familyHistory,
        bmi: bmi
    };

    // Log to confirm values
    console.log("Sending Request:", requestBody);

    // Make an API request
    fetch('https://health-risk-calculator-api.azurewebsites.net/api/calculateRisk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include'  // Include credentials like cookies with the request
    })
    .then(response => response.json())
    .then(data => {
        console.log("Received Data:", data);
        displayResult(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while calculating risk. Please try again later.');
    });
}

// Calculate BMI (Body Mass Index)
function calculateBMI(weight, height) {
    const heightInMeters = height / 100; // Convert cm to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
}

// Display result
function displayResult(data) {
    const resultElement = document.getElementById("result");
    if (data && data.riskScore) {
        resultElement.textContent = `Your health risk score is: ${data.riskScore}`;
    } else {
        resultElement.textContent = "Error calculating risk. Please ensure all fields are filled correctly.";
    }
}
