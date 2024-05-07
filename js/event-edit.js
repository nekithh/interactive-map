mapboxgl.accessToken = "pk.eyJ1IjoibmVraXRoaCIsImEiOiJjbHZjajJkcjkwZ3Q2MnNta2h0bndnajBtIn0.I9tfAtq2Z7wdhHNK_sR_-Q";
$(document).ready(function() {
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

    var dropzone = new Dropzone('.images-event', {
        url: '/upload',
        uploadMultiple: true,
        previewTemplate: document.querySelector('#my-template').innerHTML,
        autoProcessQueue: false,
        previewsContainer: '.preview-container',
        init: function() {

            let myDropzone = this;
            const mockFile2 = {
                name: "Filename",
                size: 12345
            };
            let callback = null;
            let crossOrigin = null;
            let resizeThumbnail = false;
            myDropzone.displayExistingFile(mockFile2, "img/event2.png", callback, crossOrigin, resizeThumbnail);
            let fileCountOnServer = 2;
            myDropzone.options.maxFiles = myDropzone.options.maxFiles - fileCountOnServer;
        }
    });

    $('input[name="privacy"]').on('change', function() {
        if ($(this).prop('checked') == true) {
            $(this).parent().find('.switcher-text').text('Всі');
        } else {
            $(this).parent().find('.switcher-text').text('Тільки запрошені');
        }
    });

    $('.event-members-more').click(function(event) {
        event.preventDefault();
        if ($(this).hasClass('active')) {
            $('.event-invite').addClass('active').css('height', '336px');
            $(this).removeClass('active');
            $(this).find('span').text('Показати ще ' + $(this).data('count'));
        } else {
            $('.event-invite').removeClass('active').css('height', 'auto');
            $(this).addClass('active');
            $(this).find('span').text('Показати менше');
        }
    });

    $('.btn-invite-event').click(function(event) {
        event.preventDefault();
        $('.event-invite-popup').show();
    })

    const address_map = new mapboxgl.Map({
        container: 'address-map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568],
        zoom: 13
    });

    address_map.on('click', function(e) {
        var coordinates = e.lngLat;
        getAddress(coordinates);
        $('.address-map').hide();
        $('.wrapper').removeClass('full-hide');
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

    $('#geocoder input').prop('disabled', true);

    $('.i_filter').click(function(event) {
        event.preventDefault();
        $('.invite-filter-popup').show();
        $('.event-invite-popup').hide();
    });

    $('.if_submit').click(function(event) {
        event.preventDefault();
        $('.invite-filter-popup').hide();
        $('.event-invite-popup').show();
    });
});