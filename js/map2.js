mapboxgl.accessToken =
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/dark-v10',
            zoom: 2, // starting zoom
            minZoom: 4, // minimum zoom level of the map
            center: [-98.5795, 39.8283] // starting center
        });
        const grades = [0, 1000, 5000],
              radii = [5, 10, 15],
              colors = ['rgba(255, 255, 0, 0.5)', 'rgba(255, 165, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'];
        //load data to the map as new layers.
        //map.on('load', function loadingData() {
        map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function
            // when loading a geojson, there are two steps
            // add a source of the data and then add the layer out of the source
            map.addSource('covid-counts', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/zouyang1026/COVIDMapperUS/main/assets/us-covid-2020-counts.json'
            });
            map.addLayer({
                'id': 'covid-counts-point',
                'type': 'circle',
                'source': 'covid-counts',
                'minzoom': 2,
                'paint': {
                    // increase the radii of the circle as mag value increases
                    'circle-radius': {
                        'property': 'cases',
                        'stops': [
                            [0, 5], 
                            [1000, 10],
                            [5000, 15], 
                        ]
                    },
                    // change the color of the circle as mag value increases
                    'circle-color': {
                        'property': 'cases',
                        'stops': [
                            [0, 'rgba(255, 255, 0, 0.5)'],
                            [1000, 'rgba(255, 165, 0, 0.5)'],
                            [5000, 'rgba(255, 0, 0, 0.5)'],
                        ]
                    },
                    'circle-stroke-color': 'white',
                    'circle-stroke-width': 1,
                    'circle-opacity': 0.6
                }
            });
            // click on tree to view magnitude in a popup
            map.on('click', 'covid-counts-point', (event) => {
                new mapboxgl.Popup()
                    .setLngLat(event.features[0].geometry.coordinates)
                    .setHTML(`<strong>Cases:</strong> ${event.features[0].properties.cases}`)
                    .addTo(map);
            });
        });
        // create legend
        const legend = document.getElementById('legend');
        //set up legend grades and labels
        var labels = ['<strong>Number of cases</strong>'],
            vbreak;
        //iterate through grades and create a scaled circle and label for each
        for (var i = 0; i < grades.length; i++) {
            vbreak = grades[i];
            // you need to manually adjust the radius of each dot on the legend 
            // in order to make sure the legend can be properly referred to the dot on the map.
            dot_radii = 2 * radii[i];
            labels.push(
                '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
                'px; height: ' +
                dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
                '</span></p>');
        }
        // add the data source
        const source =
            '<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv/">The New York Times</a></p>';
        // combine all the html codes.
        legend.innerHTML = labels.join('') + source;