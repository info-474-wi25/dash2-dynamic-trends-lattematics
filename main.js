// 1: SET GLOBAL VARIABLES
const margin = { top: 50, right: 30, bottom: 60, left: 70 };
const width = 900 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create SVG containers for both charts
const svg1_max = d3.select("#lineChart1") // If you change this ID, you must change it in index.html too
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
        //console.log("Raw data:", data);


    const filteredData = data.filter(d => d.city_full === "Indianapolis, IN");
        //console.log("Filtered data 1:", filteredData);


    const groupedData = d3.groups(filteredData, d => d.date)
    .map(([date, entries]) => ({
        date,
        actualMax: d3.mean(entries, e => e.actualMax),
        avgMax: d3.mean(entries, e => e.avgMax),
        recordMax: d3.mean(entries, e => e.recordMax)
    }));
        //console.log("Grouped data:", groupedData);


    const pivotedData = groupedData.flatMap(({ date, actualMax, avgMax, recordMax }) => [
        { date, maxTemperature: actualMax, measurement: "Actual" },
        { date, maxTemperature: avgMax, measurement: "Average" },
        { date, maxTemperature: recordMax, measurement: "Record" }
    ]);
        //console.log("Pivoted data:", pivotedData);

    // 3.a: SET SCALES FOR CHART 1
    const xScale = d3.scaleLinear()
        .domain(d3.extent(pivotedData, d => d.date))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(pivotedData, d => d.maxTemperature)])
        .range([height, 0]);

    
        /*    const tempCategories = ["actualMax", "avgMax", "recordMax"];


                const categories = d3.rollup(tempCategories,
                    v => d3.rollup(v,
                        values => values.length,
                        d => d.date
                    ),
                    d => d.categoryGroup
                );


                const colorScale = d3.scaleOrdinal()
                    .domain(Array.from(categories.keys()))
                    .range(d3.schemeCategory10); */

    // 4.a: PLOT DATA FOR CHART 1
    const grouped = d3.group(pivotedData, d => d.measurement);
        console.log(grouped)

     const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.maxTemperature)); 

    const lineData = Array.from(grouped.entries());

    svg1_max.selectAll("path")
        .data(lineData)
        .enter()
        .append("path")
        .attr("class", "data-line")
        .attr("d", d => {
            const category = d[0];
            const map = d[1];
            const values = Array.from(map.entries())
                .map(([date, maxTemperature]) => ({ date, maxTemperature }));
            return line(values);
        })
        .style("stroke", "steelblue")
        .style("fill", "none")
        .style("stroke-width", 2);

    
    /*    svg1_max.selectAll("path")
            .data(grouped)
            .enter()
            .append("path")
            .attr("class", "data-line")
            .attr("d", d3.line()
                .x(d => xScale(d.date))
                .y(d => yScale(d.maxTemperature))
            ) */

    // 5.a: ADD AXES FOR CHART 1
    svg1_max.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale)
        .tickFormat(d3.format("d")));

    svg1_max.append("g")
        .call(d3.axisLeft(yScale));

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