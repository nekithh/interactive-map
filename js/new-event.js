mapboxgl.accessToken = "pk.eyJ1IjoibmVraXRoaCIsImEiOiJjbHZjajJkcjkwZ3Q2MnNta2h0bndnajBtIn0.I9tfAtq2Z7wdhHNK_sR_-Q";
$(document).ready(function() {
    $('#desc_event').on('input', function() {
        console.log(this.scrollHeight);
        if(this.scrollHeight > 112) {
            $(this).height(this.scrollHeight - 30);
        }
    });

    const calendar_input = new VanillaCalendar('#event_date', {
        input: true,
        actions: {
            changeToInput(e, self) {
            if (!self.HTMLInputElement) return;
            if (self.selectedDates[0]) {
                self.HTMLInputElement.value = self.selectedDates[0];
                self.hide();
            } else {
                self.HTMLInputElement.value = '';
            }
            },
        },
        settings: {
            lang: 'uk',
            visibility: {
                positionToInput: 'center',
            },
        },
    });
    calendar_input.init();

    const address_map = new mapboxgl.Map({
        container: 'address-map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568],
        zoom: 13
    });

    address_map.on('click', function(e) {
        var coordinates = e.lngLat;
        getAddress(coordinates);
        $('#address-map').hide();
        $('.wrapper').removeClass('full-hide');
    });
    tinymce.init({
        selector: '#evdesc',
        menubar: '',
        height: 277,
        toolbar: 'undo bold italic underline strikethrough align emoticons redo',
    });
    $('.btn-edit-evdesc').click(function(event) {
        event.preventDefault();
        $('.evdesc-edit').show();
        $('.wrapper').addClass('full-hide');
    });

    $('.evdesc-edit .evdesc-save').click(function(event) {
        event.preventDefault();
        $('.evdesc-edit').hide();
        $('.wrapper').removeClass('full-hide');
        $('#evdesc-content .textarea-content').html(tinymce.get('evdesc').getContent())
    });
    address_map.on('load', function() {
        var fixButton = $('.show-address-map');

        fixButton.click(function(event) {
            event.preventDefault();
            $('.address-map').show();
            $('.wrapper').addClass('full-hide');
            event.stopPropagation();
            address_map.resize();
        })

    });

    function getAddress(coords) {
        fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + coords.lng + ',' + coords.lat + '.json?access_token=' + mapboxgl.accessToken)
        .then(response => response.json())
        .then(data => {
            var address = data.features[0].place_name;
            $('.mapboxgl-ctrl-geocoder--input').val(address);
        });
    }

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(address_map));

    $('.mapboxgl-ctrl-geocoder--input').attr('placeholder', 'Впишіть адресу');

    const dropzone = new Dropzone( '.images-event', {
        url: '/upload',
        uploadMultiple: true,
        previewTemplate: document.querySelector( '#my-template' ).innerHTML,
        autoProcessQueue: false,
        previewsContainer: '.preview-container',
        init: function() {

            this.on("addedfile", function(file) {
                var removeButton = file.previewElement.querySelector('.dz-delete');
                removeButton.addEventListener("click", function() {
                    dropzone.removeFile(file);
                });
            });
        }
    });

    $('input[name="privacy"]').on('change', function() {
        if($(this).prop('checked') == true) {
            $(this).parent().find('.switcher-text').text('Всі');
        } else {
            $(this).parent().find('.switcher-text').text('Тільки запрошені');
        }
    });
});