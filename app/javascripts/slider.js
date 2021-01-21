const $ = require('jquery')

$(function() {

    $('.slider__items').bxSlider({
        touchEnabled: false,
        nextText: '',
        prevText: '',
        // nextSelector: '.slider__next',
        // prevSelector: 'slider__prev',
        minSlides: 1,
        maxSlides: 4,
        slideWidth: 271,
        pager: false,
    })


})