// Chart for Average Minimum and Maximum Temperature per Month
// Fetch API for average temperature data
fetch('http://localhost:5000/api/v1.0/daily_weather')
.then(response => response.json())
.then(data => {
    // Call a function to create the temperature chart
    createTemperatureCalc(data);
})
.catch(error => {
    console.error('Error fetching data:', error);
});

// Create a function to calculate the average min/max temperatures per month
function createTemperatureCalc(data) {
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
createTemperatureChart(months, avgMinTemps, avgMaxTemps);
}

function createTemperatureChart(months, avgMinTemps, avgMaxTemps) {
const shortMonthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const ctx = document.getElementById('temperatureChart').getContext('2d');
temperatureChart = new Chart(ctx, {
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

// Chart for Average Precipitation per Month
// Fetch URL for average precipitation data
fetch('http://localhost:5000/api/v1.0/daily_weather')
.then(response => response.json())
.then(data => {
    // Call a function to create the precipitation chart
    createPrecipitationChart(data);
})
.catch(error => {
    console.error('Error fetching data:', error);
});

// Create a function to calculate the average monthly precipitation
function createPrecipitationChart(data) {
// Initialize arrays to store monthly data
const months = [];
const avgPrecipitation = [];

// Group data by month and calculate average precipitation
for (let month = 1; month <= 12; month++) {
    const monthlyData = data.filter(entry => new Date(entry.date).getMonth() + 1 === month);

    if (monthlyData.length > 0) {
        const avgPrecip = monthlyData.reduce((sum, entry) => sum + entry.precipitation, 0) / monthlyData.length;

        months.push(month);
        avgPrecipitation.push(avgPrecip);
    } else {
        // No data for this month
        months.push(month);
        // Handle missing data
        avgPrecipitation.push(null);
    }
}

// Call a function to create the line chart with the processed precipitation data
createPrecipitationLineChart(months, avgPrecipitation);
}

function createPrecipitationLineChart(months, avgPrecipitation) {
const shortMonthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const ctx = document.getElementById('precipitationChart').getContext('2d');
precipitationChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: months.map(month => shortMonthNames[month - 1]), // Map month numbers to short names
        datasets: [{
            label: 'Average Monthly Precipitation (in)',
            data: avgPrecipitation,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
        }, ],
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
                    text: 'Precipitation (in)',
                },
            },
        },
    },
});
}
 
// Create the chart and event listener for the Divvy Rides by Precipitation Level chart that allows user to choose between viewing data by month or by season
 // Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {  
    // Fetch JSON data from the provided URLs
    const fetchDataset1 = fetch('http://localhost:5000/api/v1.0/rides_sig_prcp_yes_month')
        .then(response => response.json());

    const fetchDataset2 = fetch('http://localhost:5000/api/v1.0/rides_sig_prcp_no_month')
        .then(response => response.json());

    // Wait for both dataset fetches to complete
    Promise.all([fetchDataset1, fetchDataset2])
        .then(([dataset1, dataset2]) => {
            // Call the function to create the chart with the fetched datasets
            createChart(dataset1, dataset2);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function createChart(dataset1, dataset2) {
        // Utility function to create an object with chart-related functions and constants
        function createUtils() {
            return {
                CHART_COLORS: {
                    red: 'rgba(255, 0, 0, 1)',
                    green: 'rgba(0, 255, 0, 1)',
                    blue: 'rgba(0, 0, 255, 1)',
                },
                transparentize: (color, opacity) => {
                    // Function to make a color transparent
                    const rgbaColor = color.replace('1)', `${opacity})`);
                    return rgbaColor;
                }
            };
        }

        const utils = createUtils();

        // Define an array of short month names
        const shortMonthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        // Define an array of season names
        const seasonNames = [
            'Winter', 'Spring', 'Summer', 'Autumn'
        ];
        // Function to create a chart based on the selected value (by months or by seasons)
        function updateChart(selectedValue) {

            const labels = selectedValue === 'months' ? shortMonthNames : seasonNames;
            const dataset1Data = selectedValue === 'months' ? dataset1.map(entry => entry.average_rides_per_day) : getSeasonData(dataset1);
            const dataset2Data = selectedValue === 'months' ? dataset2.map(entry => entry.average_rides_per_day) : getSeasonData(dataset2);

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Significant Precipitation (>=0.1 in)',
                        data: dataset1Data,
                        borderColor: utils.CHART_COLORS.red,
                        backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
                    },
                    {
                        label: 'Insignificant Precipitation (<0.1 in)',
                        data: dataset2Data,
                        borderColor: utils.CHART_COLORS.blue,
                        backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5),
                    }
                ]
            };

            const ctx = document.getElementById('weatherChart').getContext('2d');
            weatherChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: selectedValue === 'months' ? 'Month' : 'Season'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Average Rides per Day'
                            }
                        }
                    }
                }
            });
        }

        // Function to get season data from monthly data
        function getSeasonData(monthlyData) {
            const seasonData = [0, 0, 0, 0]; // Initialize season data

            monthlyData.forEach(entry => {
                const month = parseInt(entry.month);
                if (month >= 12 || month <= 2) {
                    // Winter
                    seasonData[0] += entry.average_rides_per_day;
                } else if (month >= 3 && month <= 5) {
                    // Spring
                    seasonData[1] += entry.average_rides_per_day;
                } else if (month >= 6 && month <= 8) {
                    // Summer
                    seasonData[2] += entry.average_rides_per_day;
                } else {
                    // Autumn
                    seasonData[3] += entry.average_rides_per_day;
                }
            });

            // Calculate average rides per day for each season
            for (let i = 0; i < 4; i++) {
                seasonData[i] /= 3; // Assuming 3 months per season
            }

            return seasonData;
        }
        
        // Initially, create the chart with the default value ('months')
        updateChart('months');
        // Get the selected value from the dropdown
        const chartTypeDropdown = document.getElementById('chartType');
        // Code assistance from TA
        chartTypeDropdown.addEventListener('change', function (e) {
            let selectedValue = e.target.value;
            console.log('The selected value is: ', selectedValue); // Log the selected value to the console
            if (weatherChart) {
                weatherChart.clear();
                weatherChart.destroy(); // Destroy the existing chart
            }
            updateChart(selectedValue);
            
        });
    }
});   