async function calculateRisk() {
    console.log("Button Clicked!"); // Debugging check

    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const systolic = document.getElementById('systolic').value;
    const diastolic = document.getElementById('diastolic').value;
    const familyHistory = Array.from(document.getElementById('familyHistory').selectedOptions).map(option => option.value);

    // Check if input values exist
    if (!age || !height || !weight || !systolic || !diastolic) {
        alert("Please fill all fields.");
        return;
    }

    // Validate minimum height
    if (parseInt(height) < 60) {
        alert("Height must be at least 60 cm.");
        return;
    }

    // Calculate BMI
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    console.log(`BMI: ${bmi}`); // Debugging check

    const requestBody = {
        age: parseInt(age),
        bmi: parseFloat(bmi),
        systolic: parseInt(systolic),
        diastolic: parseInt(diastolic),
        familyHistory
    };

    console.log("Sending Request:", requestBody); // Debugging check

    try {
        const response = await fetch('https://health-risk-calculator-api.azurewebsites.net/api/calculateRisk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-functions-key': 'f_5cKzdysLr8BWE0EcnJhd0F-ji9ouhdMLBwh9GXB_L2AzFuXk7Wzw=='  // Add your function key here
            },
            body: JSON.stringify(requestBody)
        });

        console.log("Response Status:", response.status); // Debugging check

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response Data:", data); // Debugging check

        document.getElementById('result').innerText = `Risk Score: ${data.riskScore}, Category: ${data.riskCategory}`;
    } catch (error) {
        console.error("Error:", error);
        alert("There was an error processing your request. Check console for details.");
    }
}
