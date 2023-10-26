// // // Fetch JSON data from the provided URL
// // fetch('https://divvy-bikes-66f749958645.herokuapp.com/api/v1.0/rides_by_month')
// //     .then(response => response.json())
// //     .then(data => {
// //         // Call the function with fetched JSON data
// //         createLineChart(data);
// //     })
// //     .catch(error => {
// //         console.error('Error fetching data:', error);
// //     });

// // // Call the function with the provided JSON data
// // function createLineChart(data) {
// //     console.log(data);
// //     // Define an array of short month names
// //     const shortMonthNames = [
// //         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
// //         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
// //     ];

// //     const months = data.map(entry => shortMonthNames[parseInt(entry.month) - 1]);
// //     const totalRides = data.map(entry => entry.total_rides);

// //     // Create a line chart
// //     // Get the canvas element
// //     const ctx = document.getElementById('ridesChart').getContext('2d');
// //     const ridesChart = new Chart(ctx, {
// //         type: 'line',
// //         data: {
// //             labels: months,
// //             datasets: [{
// //                 label: 'Rides by Month',
// //                 data: totalRides,
// //                 borderColor: 'blue',
// //                 backgroundColor: 'rgba(0, 0, 255, 0.1)',
// //             }],
// //         },
// //         options: {
// //             scales: {
// //                 x: {
// //                     title: {
// //                         display: true,
// //                         text: 'Month',
// //                     },
// //                 },
// //                 y: {
// //                     title: {
// //                         display: true,
// //                         text: 'Total Rides',
// //                     },
// //                 },
// //             },
// //         },
// //     });
// // }

// // // Fetch JSON data from the provided URL
// // fetch('https://divvy-bikes-66f749958645.herokuapp.com/api/v1.0/rides_by_season')
// //     .then(response => response.json())
// //     .then(data => {
// //         // Call the function with fetched JSON data
// //         createPieChart(data);
// //     })
// //     .catch(error => {
// //         console.error('Error fetching data:', error);
// //     });

// // // Call the function with the provided JSON data
// // function createPieChart(data) {
// //     console.log(data);
// //     // Extract seasons and total rides from the JSON data
// //     const labels = data.map(entry => entry._id.season);
// //     console.log(labels);
// //     const counts = data.map(entry => entry.total_rides);
// //     console.log(counts);

// //     const ctx = document.getElementById('pieChart').getContext('2d');
// //     const pieChart = new Chart(ctx, {
// //         type: 'pie',
// //         data: {
// //             labels: labels,
// //             datasets: [{
// //                 data: counts,
// //                 backgroundColor: ['red', 'green', 'blue', 'orange', 'purple'], // Define colors
// //             }],
// //         },
// //         options: {
// //             responsive: true,
// //             maintainAspectRatio: false,
// //             title: {
// //                 display: true,
// //                 text: 'Rides by Type',
// //             },
// //             plugins: {
// //                 tooltip: {
// //                     callbacks: {
// //                         label: (context) => {
// //                             const label = context.label || '';
// //                             const value = context.parsed || 0;
// //                             const total = counts.reduce((acc, curr) => acc + curr, 0);
// //                             const percentage = ((value / total) * 100).toFixed(2);
// //                             return `${label}: ${percentage}%`;
// //                         },
// //                     },
// //                 },
// //             },
// //         },
// //     });
// // }

// // function createUtils() {
// //     return {
// //         CHART_COLORS: {
// //             red: 'rgba(255, 0, 0, 1)',
// //             green: 'rgba(0, 255, 0, 1)',
// //             blue: 'rgba(0, 0, 255, 1)',
// //             // Define other colors as needed
// //         },
// //         transparentize: (color, opacity) => {
// //             const rgbaColor = color.replace('1)', `${opacity})`);
// //             return rgbaColor;
// //         }
// //     };
// // }

// // const utils = createUtils();
// // // Fetch JSON data from the provided URLs
// // // const fetchDataset1 = fetch('https://divvy-bikes-66f749958645.herokuapp.com/api/v1.0/rides_sig_prcp_yes_month')
// // //     .then(response => response.json());

// // // const fetchDataset2 = fetch('https://divvy-bikes-66f749958645.herokuapp.com/api/v1.0/rides_sig_prcp_no_month')
// // //     .then(response => response.json());

// // // // Wait for both dataset fetches to complete
// // // Promise.all([fetchDataset1, fetchDataset2])
// // //     .then(([dataset1, dataset2]) => {
// // //         // Call the function to create the chart with the fetched datasets
// // //         createChart(dataset1, dataset2);
// // //     })
// // //     .catch(error => {
// // //         console.error('Error fetching data:', error);
// // //     });

// // // function createChart(dataset1, dataset2) {

// // //     function createUtils() {
// // //         return {
// // //             CHART_COLORS: {
// // //                 red: 'rgba(255, 0, 0, 1)',
// // //                 green: 'rgba(0, 255, 0, 1)',
// // //                 blue: 'rgba(0, 0, 255, 1)',
// // //                 // Define other colors as needed
// // //             },
// // //             transparentize: (color, opacity) => {
// // //                 const rgbaColor = color.replace('1)', `${opacity})`);
// // //                 return rgbaColor;
// // //             }
// // //         };
// // //     }

// // //     const utils = createUtils();

// // //     // Define an array of short month names
// // //     const shortMonthNames = [
// // //         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
// // //         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
// // //     ];

// // //     // Initial chart creation
// // //     updateChartByMonths(dataset1, dataset2);

// // //     // Chart creation based on initial selection
// // //     function updateChartByMonths(dataset1, dataset2) {
// // //         const months = dataset1.map(entry => shortMonthNames[parseInt(entry.month) - 1]);
// // //         const data = {
// // //             labels: months,
// // //             datasets: [{
// // //                     label: 'Significant Precipitation (>=0.1 in)',
// // //                     data: dataset1.map(entry => entry.average_rides_per_day),
// // //                     borderColor: utils.CHART_COLORS.red, // Corrected
// // //                     backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5), // Corrected
// // //                 },
// // //                 {
// // //                     label: 'Insignificant Precipitation (<0.1 in)',
// // //                     data: dataset2.map(entry => entry.average_rides_per_day),
// // //                     borderColor: utils.CHART_COLORS.blue, // Corrected
// // //                     backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5), // Corrected
// // //                 }
// // //             ]
// // //         };

// // //         const ctx = document.getElementById('weatherChart').getContext('2d');
// // //         const weatherChart = new Chart(ctx, {
// // //             type: 'line',
// // //             data: data,
// // //             options: {
// // //                 scales: {
// // //                     x: {
// // //                         title: {
// // //                             display: true,
// // //                             text: 'Month'
// // //                         }
// // //                     },
// // //                     y: {
// // //                         title: {
// // //                             display: true,
// // //                             text: 'Average Rides per Day'
// // //                         }
// // //                     }
// // //                 }
// // //             }
// // //         });
// // //     }
// // //     const months = dataset1.map(entry => shortMonthNames[parseInt(entry.month) - 1]);
// // //     const data = {
// // //         labels: months,
// // //         datasets: [{
// // //                 label: 'Significant Precipitation (>=0.1 in)',
// // //                 data: dataset1.map(entry => entry.average_rides_per_day),
// // //                 borderColor: utils.CHART_COLORS.red, // Corrected
// // //                 backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5), // Corrected
// // //             },
// // //             {
// // //                 label: 'Insignificant Precipitation (<0.1 in)',
// // //                 data: dataset2.map(entry => entry.average_rides_per_day),
// // //                 borderColor: utils.CHART_COLORS.blue, // Corrected
// // //                 backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5), // Corrected
// // //             }
// // //         ]
// // //     };

// // //     const ctx = document.getElementById('weatherChart').getContext('2d');
// // //     const weatherChart = new Chart(ctx, {
// // //         type: 'line',
// // //         data: data,
// // //         options: {
// // //             scales: {
// // //                 x: {
// // //                     title: {
// // //                         display: true,
// // //                         text: 'Month'
// // //                     }
// // //                 },
// // //                 y: {
// // //                     title: {
// // //                         display: true,
// // //                         text: 'Average Rides per Day'
// // //                     }
// // //                 }
// // //             }
// // //         }
// // //     });
// // //     // Add the dropdown and event listener
// // //     const chartTypeDropdown = document.getElementById('chartType');

// // //     chartTypeDropdown.addEventListener('change', function() {
// // //         const selectedValue = chartTypeDropdown.value;

// // //         if (selectedValue === 'months') {
// // //             // Display the chart by months
// // //             updateChartByMonths(dataset1, dataset2);
// // //         } else if (selectedValue === 'seasons') {
// // //             // Display the chart by seasons
// // //             updateChartBySeasons(dataset1, dataset2);
// // //         }
// // //     });
// // // }
// Fetch API for average temperature data
fetch('/api/v1.0/daily_weather')
    .then(response => response.json())
    .then(data => {
        // Call a function to create the temperature chart
        createTemperatureChart(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Create a function to calculate the average min/max temperatures per month
function createTemperatureChart(data) {
    // Initialize arrays to store monthly data
    const months = [];
    const avgMinTemps = [];
    const avgMaxTemps = [];

    // Group data by month and calculate average min and max temps
    for (let month = 1; month <= 12; month++) {
        const monthlyData = data.filter(entry => new Date(entry.date).getMonth() + 1 === month);

        if (monthlyData.length > 0) {
            const avgMinTemp = monthlyData.reduce((sum, entry) => sum + entry.min_temp, 0) / monthlyData.length;
            const avgMaxTemp = monthlyData.reduce((sum, entry) => sum + entry.max_temp, 0) / monthlyData.length;

            months.push(month);
            avgMinTemps.push(avgMinTemp);
            avgMaxTemps.push(avgMaxTemp);
        } else {
            // No data for this month
            months.push(month);
            avgMinTemps.push(null); // Handle missing data
            avgMaxTemps.push(null); // Handle missing data
        }
    }

    // Call a function to create the line chart with the processed data
    createTempChart(months, avgMinTemps, avgMaxTemps);
}

function createTempChart(months, avgMinTemps, avgMaxTemps) {
    const shortMonthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const ctx = document.getElementById('temperatureChart').getContext('2d');
    const temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            // Map month numbers to short names
            labels: months.map(month => shortMonthNames[month - 1]),
            datasets: [{
                    label: 'Average Min Temperature (°F)',
                    data: avgMinTemps,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                },
                {
                    label: 'Average Max Temperature (°F)',
                    data: avgMaxTemps,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                },
            ],
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
                        text: 'Temperature (°F)',
                    },
                },
            },
        },
    });
}
// // // Fetch URL for average precipitation data
// // fetch('https://divvy-bikes-66f749958645.herokuapp.com/api/v1.0/daily_weather')
// //     .then(response => response.json())
// //     .then(data => {
// //         // Call a function to create the precipitation chart
// //         createPrecipitationChart(data);
// //     })
// //     .catch(error => {
// //         console.error('Error fetching data:', error);
// //     });

// // // Create a function to calculate the average monthly precipitation
// // function createPrecipitationChart(data) {
// //     // Initialize arrays to store monthly data
// //     const months = [];
// //     const avgPrecipitation = [];

// //     // Group data by month and calculate average precipitation
// //     for (let month = 1; month <= 12; month++) {
// //         const monthlyData = data.filter(entry => new Date(entry.date).getMonth() + 1 === month);

// //         if (monthlyData.length > 0) {
// //             const avgPrecip = monthlyData.reduce((sum, entry) => sum + entry.precipitation, 0) / monthlyData.length;

// //             months.push(month);
// //             avgPrecipitation.push(avgPrecip);
// //         } else {
// //             // No data for this month
// //             months.push(month);
// //             // Handle missing data
// //             avgPrecipitation.push(null);
// //         }
// //     }

// //     // Call a function to create the line chart with the processed precipitation data
// //     createPrecipitationLineChart(months, avgPrecipitation);
// // }

// // function createPrecipitationLineChart(months, avgPrecipitation) {
// //     const shortMonthNames = [
// //         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
// //         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
// //     ];

// //     const ctx = document.getElementById('precipitationChart').getContext('2d');
// //     const precipitationChart = new Chart(ctx, {
// //         type: 'line',
// //         data: {
// //             labels: months.map(month => shortMonthNames[month - 1]), // Map month numbers to short names
// //             datasets: [{
// //                 label: 'Average Monthly Precipitation (mm)',
// //                 data: avgPrecipitation,
// //                 borderColor: 'blue',
// //                 backgroundColor: 'rgba(0, 0, 255, 0.1)',
// //             }, ],
// //         },
// //         options: {
// //             scales: {
// //                 x: {
// //                     title: {
// //                         display: true,
// //                         text: 'Month',
// //                     },
// //                 },
// //                 y: {
// //                     title: {
// //                         display: true,
// //                         text: 'Precipitation (mm)',
// //                     },
// //                 },
// //             },
// //         },
// //     });
// // }
// // const borderColor1 = utils.CHART_COLORS.red;
// // const transparentColor1 = utils.transparentize(utils.CHART_COLORS.red, 0.5);