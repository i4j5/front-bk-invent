const $ = require('jquery')

$(function() {

    // $('.slider_type_objects .slider__items').bxSlider({
    //     touchEnabled: false,
    //     nextText: '',
    //     prevText: '',
    //     minSlides: 1,
    //     maxSlides: 4,
    //     slideWidth: 271,
    //     pager: true,
    //     stopAutoOnClick: true,
    // })

    $('.slider_type_feedbacks .slider__items').bxSlider({
        touchEnabled: false,
        nextText: '',
        prevText: '',
        minSlides: 1,
        maxSlides: 4,
        slideWidth: 270,
        pager: true,
        stopAutoOnClick: true,
        onSlideBefore: function() {
            $('.feedback__text_open').removeClass('feedback__text_open')
        }
    })

    $('.slider_type_cases .slider__items').bxSlider({
        touchEnabled: false,
        nextText: '',
        prevText: '',
        pager: true,
    })

    $('.feedback__more>a').click(function() {
        let $this = $(this)
        $this.parent().parent().addClass('feedback__text_open')
    })

    $('.feedback__dide>a').click(function() {
        let $this = $(this)
        $this.parent().parent().parent().removeClass('feedback__text_open')
    })


})