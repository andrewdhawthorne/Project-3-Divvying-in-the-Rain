let weatherChart;
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
   
    // Get the selected value from the dropdown
    const chartTypeDropdown = document.getElementById('chartType');
    chartTypeDropdown.addEventListener('change', function () {
        const selectedValue = chartTypeDropdown.value;
        console.log('The selected value is: ', selectedValue); // Log the selected value to the console
        updateChart(selectedValue);
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

        // Function to create a chart based on the selected view (by months or by seasons)
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
            const weatherChart = new Chart(ctx, {
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
    }
});   