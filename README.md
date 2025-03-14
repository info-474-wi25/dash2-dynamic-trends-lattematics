# dash2-dynamic-trends
## 1. Data Exploration
### DATA TOPIC & SOURCE
[Weather](https://drive.google.com/file/d/1akt4PRpmfoST-ENeh6wVwtk5zXFt4Goj/view?usp=drive_link)\
Source: [Weather History & Data Archive | Weather Underground](https://www.wunderground.com/history)\
Documentation: [Weather Documentation - Google Docs](https://docs.google.com/document/d/15HiHTsKK8wbD6lOnJ1OmwlQJWHq4I1HsKmQBMVJanOc/edit?tab=t.0)\
**Brief Explanation**: Weather Underground collects and compiles real-time weather information from major cities, as available through web sources.\
**Row**: The weather and temperature information for a city for the day.\
**Data types & Units**: 
- Date as a date (M/D/YYYY)
- Year as integer 
- Temperatures (°F) as integer
- Precipitation (in) as double/float
- Location information as string/characters

**Unfamiliar words & Meaning**: 
Precipitation is a bit unfamiliar but it’s pretty much just rain (or things that fall from the sky)

**Additional Questions**: 
1. Is the CSV only for the United States?
From the looks of it, yes, they are cities in the United States.
2. Why does the year for record max/min temperature change? 
The year is whichever one that showed contain the highest or lowest the temperature 
3. What is the difference between actual precipitation vs actual precipitation?
Actual is the amount of precipitation for that day and average is the mean as calculated using total precipitation in the area. 


### SKETCH 
**Max temperatures (record max, actual max, average max) for a city**
![Sketch of Max temperatures (record max, actual max, average max) for a city](/img/1.png)\
**X-axis**: date \
**Data type**: date \
**Unit**: day (increments of 1 day)\
**Y-axis**: temperature \
**Data type**: numeric\
**Range/Max value**: 100s\
**Unit**: °F\
**Interactive element**: dropdown menu to change city \
**Transformation of data**: none expected \
**Visualization type**: line graph because I’m visualizing in relation to time.

**Total changes in temperature (max minus min temp) for a city**
![Sketch of Total changes in temperature (max minus min temp) for a city](/img/2.png)\
**X-axis**: date \
**Data type**: date \
**Unit**: day (increments of 1 day)\
**Y-axis**: temperature (actual max temp minus actual min temp for the day)\
**Data type**: numeric\
**Range/Max value**: 100s\
**Unit**: °F\
**Interactive element**: dropdown menu to change city \
**Transformation of data**: need to calculate the difference in temperature to get the actual max temp minus actual min temp for each day.\
**Visualization type**: line graph because I’m visualizing in relation to time. 

## 2. Draft Dashboard
### NO-CODE DRAFT 
![Google Sheets viz](/img/3.png)\
**Insights & Story**: 
The max temperatures of Charlotte of 2014 to 2015 doesn’t go beyond the historical average max temperature of the city. There are a lot of differences in the daily actual max temperature but the average and record max temperatures show similar temperature lines. The changes in the average temperature also changes a lot less than the daily actual max temperature. There is a dip in max temperature around January (winter) and highs around July (Summer).
	
**Possible Interactive Elements**: 
- Single-select dropdown to select different cities or color palette 
- On/off trendline toggle to replace the “average max temp”

## 3. Critique and Revision 
**Starting Progress**: 
![Starting viz before revision](/img/4.png)
### CRITIQUE
**Self**
- The current design where the city name gets updated when city dropdown is changed is good
- The current design where the legend has colors corresponding to the type of max visualized is good
- The x-axis is pretty crowded, I should increase the distance between the dates
- Reconsider the color for “Record Max” which is yellow while other two is green
- Maybe remove “Record Max” if viewers thinks it’s distracting 
- If there’s more time, I would like to be able to add/remove the lines on the graph with a checkbox 
- I would also want to try adding tooltip to the line charts so the exact temperatures can be seen\

**Peer**
- Font size for the y and x axis would be better if it’s bigger
- If possible rotate the x axis so that the dates are easier to read
- Have the title/header be on one line 
- Why these city/states? (if possible to get more data, have the chart to give more options)\

**Instructor**
- Have the header and the city (that changes with interactivity) on the same line, as one title 
- Change the color of the line so it’s 3 distinct colors (light green and yellow is fine, can change the dark green to be like black or something)
	
### REVISION & REASONING 
![Revised viz using feedback](/img/5.png)
The feedback I got was mostly on the header layout (title spanning 2 lines) and my axis layout being hard to read. According to this feedback, I made the header into a single line which ended up overlapping the legend so I moved the legend to an empty area on my chart. For the axis, I made the font size bigger but did not rotate the dates on my x-axis because I decided to lessen the number of ticks and include the full date. This design decision was made so the x-axis label makes more sense with “date” showing some complete date. I also changed the line color of “Average Max” to black instead of dark green because the 3 types of “Max” are supposed to be distinct from one another. 

## 4. Final Design
### LINKS 
**GitHub Repository**: [https://github.com/info-474-wi25/dash2-dynamic-trends-lattematics](https://github.com/info-474-wi25/dash2-dynamic-trends-lattematics)  
**GitHub Page**: [https://info-474-wi25.github.io/dash2-dynamic-trends-lattematics/](https://info-474-wi25.github.io/dash2-dynamic-trends-lattematics/) 

### USER INTERFACE 
![User interface of dashboard 2](/img/6.png)
![Annotation of interactivity for the viz](/img/7.png)

### ABOUT THE DESIGN
This chart shows the 3 different types (Actual, Average, and Record) of max temperatures that are recorded on Weather Underground for the 6 cities listed in the dropdown menu above. The only interaction in this visualization is the ability to select different cities using the dropdown menu. \
The chart shows how each type of max temperature changes from day to day, which can be seen from the ups and downs of the lines. Selecting the different cities shows which cities have max temperatures that are generally higher, no matter which type of max temperature is being looked at, or have less changes from day to day. The opposite can also be seen with temperatures that change greatly throughout the year with large spikes. The overall yearly trend in temperature changes can also be seen in the upwards concave of the chart. The Record Max is generally highest on the visualization, suggesting that the max temperatures in some past date was higher than it is today. The Average Max is helpful to determine a general max temperature for the city while the Actual Max shows the true highest temperature for that day. 

## 5. Reflection 
I learned how to create static charts which became my draft for my final deliverable. I also learned how to pivot data so D3 can use the data to create the lines I wanted in my final deliverable. The most important thing is reflecting on the feedback and critique I receive and making design decisions on whether I accept or reject certain feedback for my final deliverable. It is important to get feedback because otherwise I wouldn’t know how others see my work, like in this dashboard. However, the feedback may not help me tell my story and choices also need to be made in the case of conflicting suggestions. 