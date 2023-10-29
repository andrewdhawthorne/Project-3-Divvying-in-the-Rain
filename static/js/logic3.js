// Function to create and manage a chart displaying ride data
function createChart(dataset1, dataset2) {
    // Initializes utility functions and chart color settings
    const utils = createUtils();

    // Wait until the DOM is fully loaded before creating the chart
    document.addEventListener("DOMContentLoaded", function() {
        // Set initial chart display to monthly data
        updateChartByMonths(dataset1, dataset2);
    });

    // Utility functions for chart color and opacity management
    function createUtils() {
        return {
            CHART_COLORS: {
                red: "rgba(255, 0, 0, 1)",
                green: "rgba(0, 255, 0, 1)",
                blue: "rgba(0, 0, 255, 1)",
                // Define other colors as needed
            },
            // Function to adjust color opacity
            transparentize: (color, opacity) => {
                const rgbaColor = color.replace("1)", `${opacity})`);
                return rgbaColor;
            },
        };
    }

    // Function to safely remove the existing chart to prevent memory leaks
    function destroyChart() {
        if (currentChart) {
            currentChart.destroy();
        }
    }

    // Function to create a line chart with given context, labels, and datasets
    function createLineChart(ctx, labels, datasets) {
        const options = {
            // Configuration for chart axes
            scales: {
                x: {
                    title: {
                        display: true,
                        text: labels.includes("Winter") ? "Season" : "Month",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Average Rides per Day",
                    },
                },
            },
        };

        // Creates a new chart with the specified context, data, and options
        currentChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: datasets
            },
            options: options
        });
    }

    // Function to update the chart data for monthly view
    function updateChartByMonths(dataset1, dataset2) {
        // Map the dataset month values to short month names
        const months = dataset1.map(
            (entry) => shortMonthNames[parseInt(entry.month) - 1]
        );
        // Prepare chart data using the datasets provided
        const data = {
            labels: months,
            datasets: [{
                    label: "Significant Precipitation (>=0.1 in)",
                    data: dataset1.map((entry) => entry.average_rides_per_day),
                    borderColor: utils.CHART_COLORS.red, // Corrected
                    backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5), // Corrected
                },
                {
                    label: "Insignificant Precipitation (<0.1 in)",
                    data: dataset2.map((entry) => entry.average_rides_per_day),
                    borderColor: utils.CHART_COLORS.blue, // Corrected
                    backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5), // Corrected
                },
            ],
        };

        // Remove any existing chart and create a new one with month data
        destroyChart();
        const ctx = document.getElementById("weatherChart").getContext("2d");
        createLineChart(ctx, months, [{
                label: "Significant Precipitation (>=0.1 in)",
                data: dataset1.map((entry) => entry.average_rides_per_day),
                borderColor: utils.CHART_COLORS.red,
                backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
            },
            {
                label: "Insignificant Precipitation (<0.1 in)",
                data: dataset2.map((entry) => entry.average_rides_per_day),
                borderColor: utils.CHART_COLORS.blue,
                backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5),
            }
        ]);
    }

    // Function to update the chart data for seasonal view
    function updateChartBySeasons(dataset1, dataset2) {
        // Define the labels for the seasons
        const seasons = ["Winter", "Spring", "Summer", "Autumn"];
        const significantPrecipitation = [0, 0, 0, 0]; // Average rides for significant precipitation by season
        const insignificantPrecipitation = [0, 0, 0, 0]; // Average rides for insignificant precipitation by season

        // Function to distribute dataset entries into respective seasons
        function accumulateDataBySeason(dataset, targetArray) {
            dataset.forEach((entry) => {
                // Determine the season based on month and aggregate data
                // Calculate the indices for seasons and add ride averages
                // Winter: Dec-Feb, Spring: Mar-May, Summer: Jun-Aug, Autumn: Sep-Nov
                const month = parseInt(entry.month);
                if (month === 12 || month <= 2) {
                    // Winter
                    targetArray[0] += entry.average_rides_per_day;
                } else if (month >= 3 && month <= 5) {
                    // Spring
                    targetArray[1] += entry.average_rides_per_day;
                } else if (month >= 6 && month <= 8) {
                    // Summer
                    targetArray[2] += entry.average_rides_per_day;
                } else {
                    // Autumn
                    targetArray[3] += entry.average_rides_per_day;
                }
            });
        }

        // Accumulate seasonal data for both significant and insignificant precipitation
        accumulateDataBySeason(dataset1, significantPrecipitation);
        accumulateDataBySeason(dataset2, insignificantPrecipitation);

        // Adjust for actual averages
        const monthsInSeason = 3;
        for (let i = 0; i < 4; i++) {
            significantPrecipitation[i] /= monthsInSeason;
            insignificantPrecipitation[i] /= monthsInSeason;
        }

        // Remove any existing chart and create a new one with season data
        destroyChart();
        const ctx = document.getElementById("weatherChart").getContext("2d");
        createLineChart(ctx, seasons, [{
                label: "Significant Precipitation (>=0.1 in)",
                data: significantPrecipitation,
                borderColor: utils.CHART_COLORS.red,
                backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
            },
            {
                label: "Insignificant Precipitation (<0.1 in)",
                data: insignificantPrecipitation,
                borderColor: utils.CHART_COLORS.blue,
                backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5),
            }
        ]);
    }

    // Dropdown element to choose between month and season view
    const chartTypeDropdown = document.getElementById("chartType");

    // Event listener to update chart when the dropdown selection changes
    chartTypeDropdown.addEventListener("change", function() {
        // Get the selected value and update the chart accordingly
        const selectedValue = chartTypeDropdown.value;
        if (selectedValue === "months") {
            updateChartByMonths(dataset1, dataset2);
        } else if (selectedValue === "seasons") {
            updateChartBySeasons(dataset1, dataset2);
        }
    });
}