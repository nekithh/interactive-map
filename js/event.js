$(document).ready(function() {
    $('.event-members-more').click(function(event) {
        event.preventDefault();
        if($(this).hasClass('active')) {
            $('.event-members').addClass('active').css('height', '170px');
            $(this).removeClass('active');
            $(this).find('span').text('Показати ще ' + $(this).data('count'));
        } else {
            $('.event-members').removeClass('active').css('height', 'auto');
            $(this).addClass('active');
            $(this).find('span').text('Показати менше');
        }
    });
});