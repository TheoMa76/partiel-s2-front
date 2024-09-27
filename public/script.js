document.getElementById('sla-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const sla = document.getElementById('sla').value;
    const period = document.getElementById('period').value;
  
    const response = await fetch('/.netlify/functions/sla-function', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sla: Number(sla), period }),
    });
  
    const result = await response.json();
    displayResponse(result);
  });
  
  function displayResponse(data) {
    const responseDiv = document.getElementById('response');
    if (data.status === 'success') {
      responseDiv.innerHTML = `
        <p>Downtime:</p>
        <p>Hours: ${data.data.nbHours}</p>
        <p>Minutes: ${data.data.nbMinutes}</p>
        <p>Seconds: ${data.data.nbSeconds}</p>
      `;
    } else {
      responseDiv.innerHTML = `<p>Error: ${data.reason}</p>`;
    }
  }
  