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
        { date, maxTemperature: actualMax, measurement: "Actual Max" },
        { date, maxTemperature: avgMax, measurement: "Average Max" },
        { date, maxTemperature: recordMax, measurement: "Record Max" }
    ]);
        //console.log("Pivoted data:", pivotedData);

    // 3.a: SET SCALES FOR CHART 1
    const xScale = d3.scaleLinear()
        .domain(d3.extent(pivotedData, d => d.date))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(pivotedData, d => d.maxTemperature)])
        .range([height, 0]);

    
    const maxType = Array.from(new Set(pivotedData.map(d => d.measurement)))
    
    const colorScale = d3.scaleOrdinal()
        .domain(maxType)
        .range(["#11b400", "#0a6900", "#f1c800"]);

    // 4.a: PLOT DATA FOR CHART 1
    const lineData = d3.groups(pivotedData, d => d.measurement);

    const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.maxTemperature)); 

    svg1_max.selectAll("path")
        .data(lineData)
        .enter()
        .append("path")
        .attr("class", "data-line")
        .attr("d", ([measurement, values]) => line(values))
        .style("stroke", colorScale)
        .style("fill", "none")
        .style("stroke-width", 2);

    // 5.a: ADD AXES FOR CHART 1
    svg1_max.append("g")
        .attr("class", "axis-ticks")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat("%b %Y")));

    svg1_max.append("g")
        .attr("class", "axis-ticks")
        .call(d3.axisLeft(yScale));

    // 6.a: ADD LABELS FOR CHART 1
    svg1_max.append("text")
        .attr("class", "city-text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .text("Indianapolis, IN")
        .style("font-size", "24px")
        .style("font-weight", "bold");

    svg1_max.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("Date");

    svg1_max.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .text("Temperature (°F)");

    const legend = svg1_max.selectAll(".legend")
        .data(lineData)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${width - 150}, ${i * 20 - 30})`);

    legend.append("rect")
        .attr("x", -50)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", colorScale);

    legend.append("text")
        .attr("x", -30)
        .attr("y", 5)
        .attr("text-anchor", "start")
        .style("alignment-baseline", "middle")
        .text((d, i) => maxType[i]);
        
    // 7.a: ADD INTERACTIVITY FOR CHART 1
    function updateChart(selectedCategory) {
        svg1_max.selectAll("path").remove();
        svg1_max.selectAll(".city-text").remove();
        svg1_max.selectAll(".axis-ticks").remove();

        const filteredData = data.filter(d => d.city_full === selectedCategory);

            // -- COPIED MOST POF THE CODES ABOVE SO THAT THE FILTERS ARE RE-PIVOTED AND RE-DRAWN FOR ALL 3 LINES
        const groupedData = d3.groups(filteredData, d => d.date)
        .map(([date, entries]) => ({
            date,
            actualMax: d3.mean(entries, e => e.actualMax),
            avgMax: d3.mean(entries, e => e.avgMax),
            recordMax: d3.mean(entries, e => e.recordMax)
        }));

        const pivotedData = groupedData.flatMap(({ date, actualMax, avgMax, recordMax }) => [
            { date, maxTemperature: actualMax, measurement: "Actual Max" },
            { date, maxTemperature: avgMax, measurement: "Average Max" },
            { date, maxTemperature: recordMax, measurement: "Record Max" }
        ]);

        const xScale = d3.scaleLinear()
            .domain(d3.extent(pivotedData, d => d.date))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(pivotedData, d => d.maxTemperature)])
            .range([height, 0]);

        const maxType = Array.from(new Set(pivotedData.map(d => d.measurement)))
        
        const colorScale = d3.scaleOrdinal()
            .domain(maxType)
            .range(["#11b400", "#0a6900", "#f1c800"]);

        const lineData = d3.groups(pivotedData, d => d.measurement);

        const line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.maxTemperature)); 

        svg1_max.selectAll("path")
            .data(lineData)
            .enter()
            .append("path")
            .attr("class", "data-line")
            .attr("d", ([measurement, values]) => line(values))
            .style("stroke", colorScale)
            .style("fill", "none")
            .style("stroke-width", 2);

        svg1_max.append("g")
            .attr("class", "axis-ticks")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat("%b %Y")));

        svg1_max.append("g")
            .attr("class", "axis-ticks")
            .call(d3.axisLeft(yScale));

        svg1_max.append("text")
            .attr("class", "city-text")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .attr("text-anchor", "middle")
            .text(selectedCategory)
            .style("font-size", "24px")
            .style("font-weight", "bold");
    }

    d3.select("#categorySelect").on("change", function() {
        var selectedCategory = d3.select(this).property("value");
        updateChart(selectedCategory);
    });
});