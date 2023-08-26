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
    console.log(data);
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

// Fetch JSON data from the provided URL
fetch('http://127.0.0.1:5000/api/v1.0/rides_by_season')
  .then(response => response.json())
  .then(data => {
    // Call the function with fetched JSON data
    createPieChart(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Call the function with the provided JSON data
function createPieChart(data) {
    console.log(data);
    // Extract seasons and total rides from the JSON data
    const labels = data.map(entry => entry._id.season);
        console.log(labels);
    const counts = data.map(entry => entry.total_rides);
        console.log(counts);
  
    const ctx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: ['red', 'green', 'blue', 'orange', 'purple'], // Define colors
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Rides by Type',
        },
      },
    });
}