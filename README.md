# US COVID-19 Data Visualization

## Project Introduction

This project provides an interactive visualization of the COVID-19 impact across the United States for the year 2020, focusing on case counts and case rates per county. Leveraging Mapbox GL JS for dynamic map rendering and GeoJSON for geographical data representation, it offers an intuitive platform for users to explore detailed COVID-19 statistics through thematic maps.

### Map Visualizations

- **[Map 1: Total COVID-19 Cases per County](https://zouyang1026.github.io/geog458-lab3/map1)** - This map visualizes the total number of COVID-19 cases per county.
- **[Map 2: COVID-19 Case Rates per 100,000 People per County](https://zouyang1026.github.io/geog458-lab3/map2)** - This map displays COVID-19 case rates per 100,000 people per county.

![Map 1 Visualization](https://raw.githubusercontent.com/zouyang1026/geog458-lab3/main/img/map1.png)
![Map 2 Visualization](https://raw.githubusercontent.com/zouyang1026/geog458-lab3/main/img/map2.png)

## Data Sources and Processing

The COVID-19 case and death data utilized in this project originate from [The New York Times COVID-19 Data Repository](https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv). This dataset includes all reported COVID-19 cases and deaths in the United States for the year 2020. Population data, used for calculating the case rates, are derived from the 2018 American Community Survey (ACS) 5-year estimates. Both datasets are at the county level, allowing for detailed geographical analysis and visualization.

The U.S. county boundary shapefile, necessary for mapping the data, was downloaded from the [U.S. Census Bureau's Cartographic Boundary Files](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html). 

To tailor the data for this project, significant processing was performed. The case rate was calculated as cases per thousand residents, allowing for a standardized measure of COVID-19 impact relative to the population size of each county.

## Libraries in Use

- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) for map rendering.
- [GeoJSON](https://geojson.org/) for representing geographical features with their respective properties.

## Primary Functions

- **Dynamic Data Representation**: Offers a visual representation of COVID-19 data that allows users to comprehend the pandemic's spread and severity across different counties.
- **Interactive Hover Feature**: Users can hover over any county to see detailed statistics, including the county's name, state, total cases, and case rates, enhancing data exploration.
- **Map Layering and Styling**: Uses Mapbox GL JS's capabilities to differentiate data through color gradients, aiding in the identification of counties with higher case counts or rates.

## Credits and Acknowledgments

This project was developed for the GEOG 458 course at the University of Washington, under the guidance of instructor Bo Zhao. Special thanks to The New York Times for providing accessible COVID-19 data, and to the U.S. Census Bureau for the county boundary shapefiles.
A special acknowledgment goes to Zhanpeng Ouyang for the development and implementation of this project.

## Additional Information

For more details on the implementation of the maps or to contribute to the project, please visit the GitHub repository: [US COVID-19 Data Visualization](https://github.com/zouyang1026/geog458-lab3).
