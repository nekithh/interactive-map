$(document).ready(function() {
    const avatar = new Dropzone( '.avatar-image', {
        url: '/upload',
        previewTemplate: document.querySelector( '#my-template' ).innerHTML,
        autoProcessQueue: false,
        resizeHeight: 120,
        resizeWidth: 120,
        previewsContainer: '.avatar-preview',
        maxFiles: 1,
        init: function() {
            this.on("addedfile", function(file) {
                $('.old-avatar').hide();
                if (this.files.length > 1) {
                    this.removeFile(this.files[0]);
                }
            });
        }
    });

    const background = new Dropzone( '.background-image', {
        url: '/upload',
        previewTemplate: document.querySelector( '#my-template' ).innerHTML,
        autoProcessQueue: false,
        previewsContainer: '.background-preview',
        maxFiles: 1,
        init: function() {
            this.on("addedfile", function(file) {
                $('.old-background').hide();
                if (this.files.length > 1) {
                    this.removeFile(this.files[0]);
                }
            });
        }
    });

    tinymce.init({
        selector: '#aboutme',
        menubar: '',
        height: 277,
        toolbar: 'undo bold italic underline strikethrough align emoticons redo',
    });

    $('.btn-edit-aboutme').click(function(event) {
        event.preventDefault();
        $('.aboutme-edit').show();
        $('.wrapper').addClass('full-hide');
    });

    $('.aboutme-edit .edit-save').click(function(event) {
        event.preventDefault();
        $('.aboutme-edit').hide();
        $('.wrapper').removeClass('full-hide');
        $('#aboutme-content .textarea-content').html(tinymce.get('aboutme').getContent())
    });

    $('.my-events-filter-open').click(function(event) {
        event.preventDefault();
        $('.my-events-filter').show();
    });

    $('.my-events-submit').click(function(event) {
        event.preventDefault();
        $('.my-events-filter').hide();
    });

    $('.my-events-filter-clear').click(function(event) {
        event.preventDefault();
        $('select#category, select#status, select#date').val($('select#category, select#status, select#date').find('option:first-child').val()).trigger('change.select2');
    });
});