$(document).ready(function() {
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
    $('.clear-filter').click(function(event) {
        event.preventDefault();
        $('input').val('');
        $('select').val('Всі').trigger('change');
    });
    $('.action.focus a').click(function(event) {
        event.preventDefault();
        $(this).parent().parent().find('input').focus().trigger('click');
    });
    $('.clear-tags').click(function(event) {
        event.preventDefault();
        $('.tags-wrapper input').prop('checked', false);
        $('.tags-count').text('0');
    })
    $('.tags-wrapper input').on('change', function() {
        var count = $('.tags-count').text();
        if ($(this).is(':checked')) {
            $('.tags-count').text(parseFloat(count) + 1);
        } else {
            $('.tags-count').text(parseFloat(count) - 1);
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
    $('.input-row.edit-field .btn-edit-field').click(function(event) {
        event.preventDefault();
        if ($(this).hasClass('btn-lg')) {
            const parent = $(this).parent();
            if (parent.hasClass('editing')) {
                parent.removeClass('editing');
                parent.find('input').prop('disabled', true);
                parent.find('select').prop('disabled', true);
                parent.addClass('untouch');
                $(this).text('Змінити статус');
            } else {
                parent.addClass('editing');
                parent.find('input').prop('disabled', false);
                parent.find('select').prop('disabled', false);
                parent.removeClass('untouch');
                $(this).text('Зберегти');
            }
        }
        if ($(this).hasClass('btn-sm')) {
            const parent = $(this).parent().parent();

            if (parent.hasClass('editing')) {
                parent.removeClass('editing');
                parent.find('input').prop('disabled', true);
                parent.find('select').prop('disabled', true);
                parent.addClass('untouch');
                $(this).find('img').attr('src', 'img/edit-w.svg');
            } else {
                parent.addClass('editing');
                parent.find('input').prop('disabled', false);
                parent.find('select').prop('disabled', false);
                parent.removeClass('untouch');
                $(this).find('img').attr('src', 'img/done.svg');
            }
        }
    });

    if($(document).find('select')) {
        $('select').select2({
            minimumResultsForSearch: Infinity,
        });
    }

    $('.my-events-filter-open').click(function(e) {
        e.preventDefault();
        $('.my-events-filter').show();
    });
    $('.my-events-filter-clear').click(function(e) {
        e.preventDefault();
        $('.my-events-filter select').val('Всі').trigger('change');
    });
    $('.my-events-filter-submit').click(function(e) {
        e.preventDefault();
        $('.my-events-filter').hide();
    });
});