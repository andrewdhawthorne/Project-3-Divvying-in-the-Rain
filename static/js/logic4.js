// let currentChart; // Global chart reference

// const fetchDataset1 = fetch(
//     "https://divvy-bikes-66f749958645.herokuapp.com/api/v1.0/rides_sig_prcp_yes_month"
// ).then((response) => response.json());

// const fetchDataset2 = fetch(
//     "https://divvy-bikes-66f749958645.herokuapp.com/api/v1.0/rides_sig_prcp_no_month"
// ).then((response) => response.json());

// Promise.all([fetchDataset1, fetchDataset2])
//     .then(([dataset1, dataset2]) => {
//         createChart(dataset1, dataset2);
//     })
//     .catch((error) => {
//         console.error("Error fetching data:", error);
//     });

// function createChart(dataset1, dataset2) {
//     const utils = createUtils();

//     document.addEventListener("DOMContentLoaded", function() {
//         const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         updateChartByMonths(dataset1, dataset2);
//     });

//     function createUtils() {
//         return {
//             CHART_COLORS: {
//                 red: "rgba(255, 0, 0, 1)",
//                 green: "rgba(0, 255, 0, 1)",
//                 blue: "rgba(0, 0, 255, 1)",
//                 // Define other colors as needed
//             },
//             transparentize: (color, opacity) => {
//                 const rgbaColor = color.replace("1)", `${opacity})`);
//                 return rgbaColor;
//             },
//         };
//     }

//     function destroyChart() {
//         if (currentChart) {
//             currentChart.destroy();
//         }
//     }

//     function createLineChart(ctx, labels, datasets) {
//         const options = {
//             scales: {
//                 x: {
//                     title: {
//                         display: true,
//                         text: labels.includes("Winter") ? "Season" : "Month",
//                     },
//                 },
//                 y: {
//                     title: {
//                         display: true,
//                         text: "Average Rides per Day",
//                     },
//                 },
//             },
//         };

//         currentChart = new Chart(ctx, {
//             type: "line",
//             data: {
//                 labels: labels,
//                 datasets: datasets
//             },
//             options: options
//         });
//     }

//     function updateChartByMonths(dataset1, dataset2) {
//         const months = dataset1.map(
//             (entry) => shortMonthNames[parseInt(entry.month) - 1]
//         );
//         const data = {
//             labels: months,
//             datasets: [{
//                     label: "Significant Precipitation (>=0.1 in)",
//                     data: dataset1.map((entry) => entry.average_rides_per_day),
//                     borderColor: utils.CHART_COLORS.red, // Corrected
//                     backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5), // Corrected
//                 },
//                 {
//                     label: "Insignificant Precipitation (<0.1 in)",
//                     data: dataset2.map((entry) => entry.average_rides_per_day),
//                     borderColor: utils.CHART_COLORS.blue, // Corrected
//                     backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5), // Corrected
//                 },
//             ],
//         };

//         destroyChart();
//         const ctx = document.getElementById("weatherChart").getContext("2d");
//         createLineChart(ctx, months, [{
//                 label: "Significant Precipitation (>=0.1 in)",
//                 data: dataset1.map((entry) => entry.average_rides_per_day),
//                 borderColor: utils.CHART_COLORS.red,
//                 backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
//             },
//             {
//                 label: "Insignificant Precipitation (<0.1 in)",
//                 data: dataset2.map((entry) => entry.average_rides_per_day),
//                 borderColor: utils.CHART_COLORS.blue,
//                 backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5),
//             }
//         ]);
//     }

//     function updateChartBySeasons(dataset1, dataset2) {
//         const seasons = ["Winter", "Spring", "Summer", "Autumn"];
//         const significantPrecipitation = [0, 0, 0, 0]; // Average rides for significant precipitation by season
//         const insignificantPrecipitation = [0, 0, 0, 0]; // Average rides for insignificant precipitation by season

//         function accumulateDataBySeason(dataset, targetArray) {
//             dataset.forEach((entry) => {
//                 const month = parseInt(entry.month);
//                 if (month === 12 || month <= 2) {
//                     // Winter
//                     targetArray[0] += entry.average_rides_per_day;
//                 } else if (month >= 3 && month <= 5) {
//                     // Spring
//                     targetArray[1] += entry.average_rides_per_day;
//                 } else if (month >= 6 && month <= 8) {
//                     // Summer
//                     targetArray[2] += entry.average_rides_per_day;
//                 } else {
//                     // Autumn
//                     targetArray[3] += entry.average_rides_per_day;
//                 }
//             });
//         }

//         accumulateDataBySeason(dataset1, significantPrecipitation);
//         accumulateDataBySeason(dataset2, insignificantPrecipitation);

//         // Adjust for actual averages
//         const monthsInSeason = 3;
//         for (let i = 0; i < 4; i++) {
//             significantPrecipitation[i] /= monthsInSeason;
//             insignificantPrecipitation[i] /= monthsInSeason;
//         }

//         destroyChart();
//         const ctx = document.getElementById("weatherChart").getContext("2d");
//         createLineChart(ctx, seasons, [{
//                 label: "Significant Precipitation (>=0.1 in)",
//                 data: significantPrecipitation,
//                 borderColor: utils.CHART_COLORS.red,
//                 backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
//             },
//             {
//                 label: "Insignificant Precipitation (<0.1 in)",
//                 data: insignificantPrecipitation,
//                 borderColor: utils.CHART_COLORS.blue,
//                 backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5),
//             }
//         ]);
//     }
//     const chartTypeDropdown = document.getElementById("chartType");
//     chartTypeDropdown.addEventListener("change", function() {
//         const selectedValue = chartTypeDropdown.value;
//         if (selectedValue === "months") {
//             updateChartByMonths(dataset1, dataset2);
//         } else if (selectedValue === "seasons") {
//             updateChartBySeasons(dataset1, dataset2);
//         }
//     });
// }