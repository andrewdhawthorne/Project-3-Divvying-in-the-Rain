// // Fetch JSON data from the provided URLs
// const fetchDataset1 = fetch(
//     "https://divvy-bikes-66f749958645.herokuapp.com/api/v1.0/rides_sig_prcp_yes_month"
// ).then((response) => response.json());

// const fetchDataset2 = fetch(
//     "https://divvy-bikes-66f749958645.herokuapp.com/api/v1.0/rides_sig_prcp_no_month"
// ).then((response) => response.json());

// // Wait for both dataset fetches to complete
// Promise.all([fetchDataset1, fetchDataset2])
//     .then(([dataset1, dataset2]) => {
//         // Call the function to create the chart with the fetched datasets
//         createChart(dataset1, dataset2);
//     })
//     .catch((error) => {
//         console.error("Error fetching data:", error);
//     });

// function createChart(dataset1, dataset2) {
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
//     const utils = createUtils();

//     document.addEventListener("DOMContentLoaded", function() {
//         // Define an array of short month names
//         const shortMonthNames = [
//             "Jan", "Feb", "Mar",
//             "Apr", "May", "Jun",
//             "Jul", "Aug", "Sep",
//             "Oct", "Nov", "Dec",
//         ];

//         // Initial chart creation
//         updateChartByMonths(dataset1, dataset2);

//         // Chart creation based on initial selection
//         function updateChartByMonths(dataset1, dataset2) {
//             const months = dataset1.map(
//                 (entry) => shortMonthNames[parseInt(entry.month) - 1]
//             );
//             const data = {
//                 labels: months,
//                 datasets: [{
//                         label: "Significant Precipitation (>=0.1 in)",
//                         data: dataset1.map((entry) => entry.average_rides_per_day),
//                         borderColor: utils.CHART_COLORS.red, // Corrected
//                         backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5), // Corrected
//                     },
//                     {
//                         label: "Insignificant Precipitation (<0.1 in)",
//                         data: dataset2.map((entry) => entry.average_rides_per_day),
//                         borderColor: utils.CHART_COLORS.blue, // Corrected
//                         backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5), // Corrected
//                     },
//                 ],
//             };

//             const ctx = document.getElementById("weatherChart").getContext("2d");
//             const weatherChart = new Chart(ctx, {
//                 type: "line",
//                 data: data,
//                 options: {
//                     scales: {
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: "Month",
//                             },
//                         },
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: "Average Rides per Day",
//                             },
//                         },
//                     },
//                 },
//             });
//         }
//         updateChartBySeasons(dataset1, dataset2);
//         // Perform calculations for seasons
//         function updateChartBySeasons(dataset1, dataset2) {
//             // Initialize arrays to store data by season
//             const seasons = ["Winter", "Spring", "Summer", "Autumn"];
//             const significantPrecipitation = [0, 0, 0, 0]; // Average rides for significant precipitation by season
//             const insignificantPrecipitation = [0, 0, 0, 0]; // Average rides for insignificant precipitation by season

//             // Group data by season and calculate the averages
//             dataset1.forEach((entry) => {
//                 const month = parseInt(entry.month);
//                 if (month >= 12 || month <= 2) {
//                     // Winter
//                     significantPrecipitation[0] += entry.average_rides_per_day;
//                 } else if (month >= 3 && month <= 5) {
//                     // Spring
//                     significantPrecipitation[1] += entry.average_rides_per_day;
//                 } else if (month >= 6 && month <= 8) {
//                     // Summer
//                     significantPrecipitation[2] += entry.average_rides_per_day;
//                 } else {
//                     // Autumn
//                     significantPrecipitation[3] += entry.average_rides_per_day;
//                 }
//             });

//             dataset2.forEach((entry) => {
//                 const month = parseInt(entry.month);
//                 if (month >= 12 || month <= 2) {
//                     // Winter
//                     insignificantPrecipitation[0] += entry.average_rides_per_day;
//                 } else if (month >= 3 && month <= 5) {
//                     // Spring
//                     insignificantPrecipitation[1] += entry.average_rides_per_day;
//                 } else if (month >= 6 && month <= 8) {
//                     // Summer
//                     insignificantPrecipitation[2] += entry.average_rides_per_day;
//                 } else {
//                     // Fall
//                     insignificantPrecipitation[3] += entry.average_rides_per_day;
//                 }
//             });
//             // // Adjust for actual averages of average rides per day
//             // const monthsInSeason = 3;
//             // for (let i = 0; i < 4; i++) {
//             //     significantPrecipitation[i] /= monthsInSeason;
//             //     insignificantPrecipitation[i] /= monthsInSeason;
//             // }
//             // Create a chart with the aggregated data
//             const data = {
//                 labels: seasons,
//                 datasets: [{
//                         label: "Significant Precipitation (>=0.1 in)",
//                         data: significantPrecipitation,
//                         borderColor: utils.CHART_COLORS.red,
//                         backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),
//                     },
//                     {
//                         label: "Insignificant Precipitation (<0.1 in)",
//                         data: insignificantPrecipitation,
//                         borderColor: utils.CHART_COLORS.blue,
//                         backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5),
//                     },
//                 ],
//             };

//             const ctx = document.getElementById("weatherChart").getContext("2d");
//             const weatherChart = new Chart(ctx, {
//                 type: "line",
//                 data: data,
//                 options: {
//                     scales: {
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: "Season",
//                             },
//                         },
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: "Average Rides per Day",
//                             },
//                         },
//                     },
//                 },
//             });
//         }
//         // Add the dropdown and event listener
//         const chartTypeDropdown = document.getElementById("chartType");

//         chartTypeDropdown.addEventListener("change", function() {
//             const selectedValue = chartTypeDropdown.value;
//             if (selectedValue === "months") {
//                 // Display the chart by months
//                 updateChartByMonths(dataset1, dataset2);
//             } else if (selectedValue === "seasons") {
//                 // Display the chart by seasons
//                 updateChartBySeasons(dataset1, dataset2);
//             }
//         });
//     })
// };