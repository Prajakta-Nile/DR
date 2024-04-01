document.getElementById('image-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const imageInput = document.getElementById('image-input');
    const resultContainer = document.getElementById('result-container');
    const imageFile = imageInput.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
      const response = await fetch('/predict', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      let resultText = '';
      if (result.prediction === 0) {
        resultText = 'No Diabetic Retinopathy Detected';
      } else if (result.prediction === 1) {
        resultText = 'Mild Diabetic Retinopathy Detected';
      } else if (result.prediction === 2) {
        resultText = 'Moderate Diabetic Retinopathy Detected';
      } else if (result.prediction === 3) {
        resultText = 'Severe Diabetic Retinopathy Detected';
      } else {
        resultText = 'Proliferative Diabetic Retinopathy Detected';
      }
      resultContainer.innerHTML = `
        <p id="result-text">${resultText}</p>
      `;
    } catch (error) {
      console.error(error);
      resultContainer.innerHTML = `
        <p id="result-text">Error: Please try again later.</p>
      `;
    }
  });