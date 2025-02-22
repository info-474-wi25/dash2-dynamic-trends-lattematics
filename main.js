// 1: SET GLOBAL VARIABLES
const margin = { top: 50, right: 30, bottom: 60, left: 70 };
const width = 900 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create SVG containers for both charts
const svg1_RENAME = d3.select("#lineChart1") // If you change this ID, you must change it in index.html too
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const svg2_RENAME = d3.select("#lineChart2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// (If applicable) Tooltip element for interactivity
// const tooltip = ...

// 2.a: LOAD...
d3.csv("weather.csv").then(data => {
    // 2.b: ... AND TRANSFORM DATA
    data.forEach(d => {
        d.date = new Date(d.date);
        //might consider consolodating the data and mapping by month-year instead of daily
            //d.year = new Date(d.date).getFullYear(); // get year
            //d.month = new Date(d.date).getMonth() + 1; // get month
        d.actualMax = +d.actual_max_temp;
        d.avgMax = +d.average_max_temp;
        d.recordMax = +d.record_max_temp;
    });
    console.log("Raw data:", data);


    const filteredData = data.filter(d => d.city_full === "Indianapolis, IN");
    console.log("Filtered data 1:", filteredData);


    const groupedData = d3.groups(filteredData, d => d.date)
    .map(([date, entries]) => ({
        date,
        actualMax: d3.mean(entries, e => e.actualMax),
        avgMax: d3.mean(entries, e => e.avgMax),
        recordMax: d3.mean(entries, e => e.recordMax)
    }));
    console.log("Grouped data:", groupedData);


    const pivotedData = groupedData.flatMap(({ date, actualMax, avgMax, recordMax }) => [
        { date, maxTemperature: actualMax, measurement: "Actual" },
        { date, maxTemperature: avgMax, measurement: "Average" },
        { date, maxTemperature: recordMax, measurement: "Record" }
    ]);
    console.log("Pivoted data:", pivotedData);

    // 3.a: SET SCALES FOR CHART 1


    // 4.a: PLOT DATA FOR CHART 1


    // 5.a: ADD AXES FOR CHART 1


    // 6.a: ADD LABELS FOR CHART 1


    // 7.a: ADD INTERACTIVITY FOR CHART 1
    

    // ==========================================
    //         CHART 2 (if applicable)
    // ==========================================

    // 3.b: SET SCALES FOR CHART 2


    // 4.b: PLOT DATA FOR CHART 2


    // 5.b: ADD AXES FOR CHART 


    // 6.b: ADD LABELS FOR CHART 2


    // 7.b: ADD INTERACTIVITY FOR CHART 2


});