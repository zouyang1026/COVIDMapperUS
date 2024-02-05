// Initialize the map
mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/light-v10', // style URL
zoom: 3, // starting zoom
center: [-95.7129, 37.0902] // starting center (center of the US)
});

// Load data and add as a layer
async function geojsonFetch() {
let response = await fetch('https://raw.githubusercontent.com/zouyang1026/geog458-lab3/main/assets/us-covid-2020-rates.json');
let county_data = await response.json();

map.on('load', function loadingData() {
    map.addSource('county_data', {
        type: 'geojson',
        data: county_data
    });
    map.addLayer({
        'id': 'county_data_layer',
        'type': 'fill',
        'source': 'county_data',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'cases'],
                '#FFEDA0',  // Color for the first interval
                1000,       // First breakpoint
                '#FED976',  // Color for the second interval
                5000,       // Second breakpoint
                '#FEB24C',  // Color for the third interval
                10000,      // Third breakpoint
                '#FD8D3C',  // Color for the fourth interval
                20000,      // Fourth breakpoint
                '#FC4E2A',  // Color for the fifth interval
                30000,      // Fifth breakpoint
                '#E31A1C',  // Color for the sixth interval
                40000,      // Sixth breakpoint
                '#BD0026',  // Color for the seventh interval
                50000,      // Seventh breakpoint
                '#800026'   // Color for the eighth interval
            ],
            'fill-outline-color': '#BBBBBB',
            'fill-opacity': 0.7,
        }
    });

    // Setup the legend
    const layers = [
        '0-999',
        '1000-4999',
        '5000-9999',
        '10000-19999',
        '20000-29999',
        '30000-39999',
        '40000-49999',
        '50000 and more'
    ];
    const colors = [
        '#FFEDA0',
        '#FED976',
        '#FEB24C',
        '#FD8D3C',
        '#FC4E2A',
        '#E31A1C',
        '#BD0026',
        '#800026'
    ];

    // Create legend
    const legend = document.getElementById('legend');
    legend.innerHTML = "<b>Cases per 100k</b><br><br>";

    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        const key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        const value = document.createElement('span');
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    });

    map.on('mousemove', 'county_data_layer', (e) => {
if (e.features.length > 0) {
const county = e.features[0];
const countyName = county.properties.county; 
const stateName = county.properties.state; 
const cases = county.properties.cases; 

let infoDisplay = `${countyName}, ${stateName}`;
if (cases !== undefined && !isNaN(cases)) {
infoDisplay += `<br><strong>${cases.toLocaleString()} total cases</strong>`; 
} else {
infoDisplay += `<br>Data unavailable`; 
}

document.getElementById('county-info').innerHTML = infoDisplay;
}
}).on('mouseleave', 'county_data_layer', () => {
document.getElementById('county-info').innerHTML = 'Hover over a county!';
});





    // Change the cursor to a pointer when the mouse is over the counties layer.
    map.on('mouseenter', 'county_data_layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Reset the cursor when it leaves.
    map.on('mouseleave', 'county_data_layer', () => {
        map.getCanvas().style.cursor = '';
    });
});
}

geojsonFetch(); // Call the function to fetch the GeoJSON data and load the map