const $ = require('jquery')

$(function() {

    $('.slider_type_cases .slider__items').bxSlider({
        touchEnabled: false,
        nextText: '',
        prevText: '',
        // preventDefaultSwipeX: false,
        // preventDefaultSwipeY: false,
        minSlides: 1,
        maxSlides: 4,
        slideWidth: 271,
        pager: true,
        stopAutoOnClick: true,
    })

    $('.slider_type_objects .slider__items').bxSlider({
        touchEnabled: false,
        
        nextText: '',
        prevText: '',
        pager: true,
    })


})