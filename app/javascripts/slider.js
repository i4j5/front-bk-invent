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
            this.find('.cut_open').removeClass('cut_open')
        }
    })

    $('.slider_type_objects .slider__items').bxSlider({
        touchEnabled: false,
        nextText: '',
        prevText: '',
        minSlides: 1,
        maxSlides: 4,
        slideWidth: 270,
        pager: true,
        stopAutoOnClick: true,
        onSlideBefore: function() {
            this.find('.cut_open').removeClass('cut_open')
        }
    })

    $('.slider_type_cases .slider__items').bxSlider({
        touchEnabled: false,
        nextText: '',
        prevText: '',
        pager: true,
        onSlideBefore: function() {
            this.find('.cut_open').removeClass('cut_open')
        }
    })


    $('.feedback__more>a').click(function() {
        let $this = $(this)
        $this.parent().parent().addClass('feedback__text_open')
    })

    $('.feedback__dide>a').click(function() {
        let $this = $(this)
        $this.parent().parent().parent().removeClass('feedback__text_open')
    })


    let Data = new Date();

    let fMonth = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
    ]

    $('.request-feedback__date').html( Data.getDate() + '.' + fMonth[Data.getMonth()]  + '.' + Data.getFullYear())


})