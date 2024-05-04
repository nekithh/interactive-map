mapboxgl.accessToken = "pk.eyJ1IjoibmVraXRoaCIsImEiOiJjbHZjajJkcjkwZ3Q2MnNta2h0bndnajBtIn0.I9tfAtq2Z7wdhHNK_sR_-Q";
$(document).ready(function() {

    const events = {
        event_1: {
            date: '2024-04-15',
        },
        event_2: {
            date: '2024-04-17',
        }
    };

    function render_events(el) {
        $('.vanilla-calendar-day__btn').removeClass('has-event');
        for (const key in events) {
            if (events.hasOwnProperty(key)) {
                const event = events[key];
                setTimeout(function() {
                    $('.vanilla-calendar-day__btn[data-calendar-day="' + event.date + '"]').addClass('has-event');
                }, 0);
            }
        }
    }

    const calendar = new VanillaCalendar('#calendar', {
        settings: {
            lang: 'uk',
        },
        actions: {
            clickArrow(e, self) {
                render_events();
            },
            clickYear(e, self) {
                render_events();
            },
            clickMonth(e, self) {
                render_events();
            },
            clickDay(e, self) {
                render_events(e.target);
                var dateStr = $(e.target).attr('data-calendar-day');
                var dateParts = dateStr.split("-");
                var year = parseInt(dateParts[0]);
                var month = parseInt(dateParts[1]);
                var day = parseInt(dateParts[2]);
                var date = new Date(year, month - 1, day);
                var months = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];

                var formattedDate = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
                $('.calendar-date').text(formattedDate);

                var eventExists = Object.values(events).some(event => event.date === dateStr);

                if (eventExists) {
                    $('.calendar-events-item').show()
                    $('.calendar-events p').hide()
                } else {
                    $('.calendar-events-item').hide()
                    $('.calendar-events p').show()
                }
            },
            initCalendar(self) {
                render_events();
                var currentDate = new Date();
                var months = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
                var formattedDate = currentDate.getDate() + ' ' + months[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
                console.log(formattedDate);
                $('.calendar-date').text(formattedDate);
                $('.calendar-events-item').hide()
            },
        },
    });
    calendar.init();

    const address_map = new mapboxgl.Map({
        container: 'address-map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568],
        zoom: 13
    });

    address_map.on('click', function(e) {
        var coordinates = e.lngLat;
        getAddress(coordinates);
        $('.wrapper').removeClass('full-hide');
        $('.address-map').hide();
    });

    function getAddress(coords) {
        fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + coords.lng + ',' + coords.lat + '.json?access_token=' + mapboxgl.accessToken)
        .then(response => response.json())
        .then(data => {
            var address = data.features[0].place_name;
            $('.mapboxgl-ctrl-geocoder--input').val(address);
        });
    }

    $('.show-address-map').click(function(event) {
        event.preventDefault();
        $('.address-map').show();
        $('.wrapper').addClass('full-hide');
    });

    $('.c_search-submit').click(function(event) {
        event.preventDefault();
        $('.calendar-search').hide();
        $('.calendar-search-result').show();
    });

    $('.c_search-refresh').click(function(event) {
        event.preventDefault();
        $('.calendar-search').show();
        $('.calendar-search-result').hide();
    });

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(address_map));

    $('.mapboxgl-ctrl-geocoder--input').attr('placeholder', 'Впишіть адресу');

    $('.c_search-btn').click(function(event) {
        event.preventDefault();
        $('.calendar-search').fadeIn(300);
    });

    $('select#category').select2({
        minimumResultsForSearch: Infinity
    });
})