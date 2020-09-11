const $ = require('jquery')

const rander = function(width) {

    $('.banner').each(function() {
        let $banner = $(this)
        let data = JSON.parse($banner.data('json'))
        $banner.attr('src', data);
    })
}

$(function() {

    rander($(window).width())

    $(window).resize(function() {
        rander($(this).width())
    })
})
