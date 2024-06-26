mapboxgl.accessToken = "pk.eyJ1IjoibmVraXRoaCIsImEiOiJjbHZjajJkcjkwZ3Q2MnNta2h0bndnajBtIn0.I9tfAtq2Z7wdhHNK_sR_-Q";
$(document).ready(function() {
    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [30.502653679023126, 50.449490513077905]
            },
            properties: {
                title: 'Літературний парк',
                description: 'Велотур дивовижною Західною Київщиною, яку можна сміливо вважати раєм для усіх велосипедистів  дово поєднується розви...',
                date: '01.01.2024',
                time: '11:00',
                type: 'running',
                loc: 'м. Київ, вул. М. Грушевського, 26/1',
                url: 'event.html',
            }
            },
            {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [30.50451812208607, 50.449013951105]
            },
            properties: {
                title: 'Парк ім. О. Гончара',
                description: 'Велотур дивовижною Західною Київщиною, яку можна сміливо вважати раєм для усіх велосипедистів  дово поєднується розви...',
                date: '03.05.2024',
                time: '14:00',
                type: 'running',
                loc: 'м. Київ, вул. В. Липинського, 15',
                url: 'event.html',
            }
            }
        ]
    };
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [30.502653679023126, 50.449490513077905],
        zoom: 15
    });

    for (const feature of geojson.features) {

        const el = document.createElement('div');
        el.className = 'pin';
        $(el).attr('lng', feature.geometry.coordinates[0]);
        $(el).attr('lat', feature.geometry.coordinates[1]);
        $(el).html(
            '<img src="img/'+ feature.properties.type +'.svg" alt=""><div class="content"><div class="label-md">'+ feature.properties.title +'</div><div class="date body-sm">'+ feature.properties.date +'&nbsp;<span>'+ feature.properties.time +'</span></div></div>'
        )

        new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
                '<div class="popup-headline"><div class="popup-date label-lg"><img src="img/calendar.svg" alt="">'+ feature.properties.date +'</div><div class="popup-time label-lg">'+ feature.properties.time +'</div></div><div class="popup-desc"><div class="popup-name label-lg"><img src="img/'+ feature.properties.type +'-p.svg" alt="">'+ feature.properties.title +'</div><p class="body-md">'+ feature.properties.description +'</p></div><div class="popup-place body-md"><img src="img/search.svg" alt="Search">'+ feature.properties.loc +'</div><div class="popup-members"><div class="members-images"><img src="img/person.png" alt="Person"><img src="img/person.png" alt="Person"><img src="img/person.png" alt="Person"><img src="img/person.png" alt="Person"><img src="img/person.png" alt="Person"></div><div class="members-count label-lg">+12</div></div><a href="'+ feature.properties.url +'" class="btn-lg label-lg popup-btn">Докладніше</a>'
            )
        )
        .addTo(map)
        .getPopup()
        .on('open', () => {
            $('.wrapper').addClass('primary-hide')
        })
        .on('close', () => {
            $('.wrapper').removeClass('primary-hide')
        });
    }
    map.on('zoom', function() {
        var zoom = map.getZoom();
        if(zoom >= 15.5) {
            $('.pin').addClass('active');
        } else {
            $('.pin').removeClass('active');
        }
    });
    $('.wrapper').mousedown(function(e) {
        if($(this).hasClass('primary-hide')) {
            if($('.mapboxgl-popup').has(e.target).length === 0) {
                $('.mapboxgl-popup').fadeOut(300);
                $('.wrapper').removeClass('primary-hide');
            }
        }
    });
    $('.search-btn').click(function(event) {
        event.preventDefault();
        $('.map-search').show();
    });
    $('.settings-btn').click(function(event) {
        event.preventDefault();
        $('.map-filter').show();
    });
    $('#close-popups').click(function(event) {
        event.preventDefault();
        $('.map-search, .map-filter').fadeOut(300);
    });
    $('.map-search input').on('input', function() {
        if($(this).val() != '') {
            $('.map-search .search-results').show();
        } else {
            $('.map-search .search-results').hide();
        }
    });
    $('.map-filter .filter-submit').click(function(e) {
        e.preventDefault();
        $('.settings-btn').addClass('active');
        $('.map-filter').hide();
    });
});