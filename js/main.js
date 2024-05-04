$(document).ready(function() {
    $('.action.focus a').click(function(event) {
        event.preventDefault();
        $(this).parent().parent().find('input').focus().trigger('click');
    });

    $('.input-row input[type="text"]').on('input', function() {
        const val = $(this).val();
        if (val.length > 0) {
            $(this).parent().find('.action.remove').show()
        } else {
            $(this).parent().find('.action.remove').hide()
        }
    });

    $('.action.remove').click(function(event) {
        event.preventDefault();
        $(this).parent().find('input').val('');
        $(this).hide();
    });
    $('.event-members-more').click(function(event) {
        event.preventDefault();
        if ($(this).hasClass('active')) {
            $('.event-members').addClass('active').css('height', '170px');
            $(this).removeClass('active');
            $(this).find('span').text('Показати ще ' + $(this).data('count'));
        } else {
            $('.event-members').removeClass('active').css('height', 'auto');
            $(this).addClass('active');
            $(this).find('span').text('Показати менше');
        }
    });
    $('.clear-cats').click(function(event) {
        event.preventDefault();
        $('.filter-cats input').prop('checked', false);
        $('.cats-count').text('0');
    })

    $('.filter-cats input').on('change', function() {
        var count = $('.cats-count').text();
        if ($(this).is(':checked')) {
            $('.cats-count').text(parseFloat(count) + 1);
        } else {
            $('.cats-count').text(parseFloat(count) - 1);
        }
    });

    $('.btn-invite').click(function(event) {
        event.preventDefault();
        var step = $(this).data('step');
        if (step == 1) {
            $(this).addClass('btn-dang');
            $(this).data('step', 2).text('Зняти заявку');
        } else if (step == 2) {
            $(this).data('step', 3).text('Скасувати участь')
        } else if (step == 3) {
            window.location = $(this).attr('href');
        }
    });
});