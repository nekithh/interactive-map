$(document).ready(function() {
    $('.chats-nav a').click(function(event) {
        event.preventDefault();
        const id = $(this).attr('id');
        $('.chats-nav a').toggleClass('active');
        $('.chats-tab').hide();
        $('.chats-tab_' + id).show();
    });

    $(document).click(function(e, target) {
        const popover = $('.popover');
        const popup = $('.invite-popup');
        if (!popover.is(e.target) && popover.has(e.target).length === 0) {
            popover.hide();
            $('.ch_popover').removeClass('active')
            $('.wrapper').removeClass('secondary-hide')
        } 
        if(!popup.is(e.target) && popup.has(e.target).length === 0) {
            popup.hide();
            $('.wrapper').removeClass('full-hide')
        }
    });

    $('.ch_popover').click(function(event) {
        event.preventDefault();
        var $this = $(this);
        if($this.hasClass('active')) {
            $('.wrapper').removeClass('secondary-hide')
            $this.removeClass('active');
            return
        }
        setTimeout(function() {
            $this.parent().find('.popover').show();
            $('.wrapper').addClass('secondary-hide')
            $this.addClass('active');
        }, 0);
    });

    $('.invite-btn').click(function(event) {
        event.preventDefault();
        setTimeout(function() {
            $('.invite-popup').show();
            $('.wrapper').addClass('full-hide');
        }, 0);
    });

    $('.ch_search').click(function(e) {
        e.preventDefault();
        $('.chats-search').show();
    });
});