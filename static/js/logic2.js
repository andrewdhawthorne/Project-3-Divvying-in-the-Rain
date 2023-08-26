// Fetch JSON data from the provided URL
fetch('http://127.0.0.1:5000/api/v1.0/rides_by_month')
  .then(response => response.json())
  .then(data => {
    // Call the function with fetched JSON data
    createLineChart(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Call the function with the provided JSON data
function createLineChart(data) {
    // Extract months and total rides from the JSON data
    const months = data.map(entry => entry.month);
    const totalRides = data.map(entry => entry.total_rides);

    // Create a line chart
    // Get the canvas element
    const ctx = document.getElementById('ridesChart').getContext('2d');
    const ridesChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'Rides by Month',
            data: totalRides,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
        }],
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Rides',
                },
            },
        },
    },
    });
}