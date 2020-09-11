//==========
// КВИЗЫ
//==========

/**
 * TODO:
 * В отдельный билд
 */

$(function() {
    $('.quiz').each(function() {
        let $quiz = $(this)
        $quiz.slider = $quiz.find('.quiz__items').bxSlider({
            touchEnabled: false,
            controls: false,
            auto: false,
            pager: false,
            adaptiveHeight: true,
            adaptiveHeightSpeed: 400
        })

        let quantity =$quiz.slider.getSlideCount()
        let i = 1

        let $progressBar = $quiz.find('.quiz__progress-bar')
        $progressBar._label = $progressBar.children('.quiz__progress-bar-label')
        $progressBar._field = $progressBar.children('.quiz__progress-bar-field').children('span')
        let $number = $quiz.find('.quiz__number')
        $number.html(`${i}-й вопрос из ${quantity-1}`)

        // Сделать Автоматическое далее !!!
        $quiz.find('.quiz__next').click(function() {
            
            if(quantity > i) {
                // Сделать Проверка валидации!

                let $input = $quiz.find(`[name="comment[${i}]"]`)
                // Проверка чекбоксоы 

                if(i+1 == quantity ) {
                    $progressBar._field.css('transition', 'none')
                    $quiz.find('.quiz__footer').css({
                        visibility: 'hidden',
                        display: 'none',
                        opacity: '0'
                    })
                }
                $quiz.slider.goToNextSlide() 
                $progressBar._field.css('width', `${parseInt(100/(quantity-1)*i)}%`)
                $progressBar._label.html(`${parseInt(100/(quantity-1)*i)}%`)
                ++i
                $number.html(`${i}-й вопрос из ${quantity-1}`)
                
            } 
        })

        $quiz.find('.quiz__previous').click(function() {
            if(i != 1) {
                $quiz.slider.goToPrevSlide()
                --i
                $progressBar._field.css('width', `${parseInt(100/(quantity-1)*(i-1))}%`)
                $progressBar._label.html(`${parseInt(100/(quantity-1)*(i-1))}%`)
                $number.html(`${i}-й вопрос из ${quantity-1}`)
            }  
        })

        $('.run-quiz').click(function() {
            if($(window).width() >= 700) {
                $quiz.slider.reloadSlider({
                    touchEnabled: false,
                    controls: false,
                    auto: false,
                    pager: false,
                    adaptiveHeight: false
                })
            }

            $quiz.slider.goToSlide(0)
            $progressBar._field.css({
                transition: 'none',
                width: '0%'
            })
            $progressBar._label.html('0%')
            $quiz.find('.quiz__footer').css({
                visibility: 'visible',
                display: '',
                opacity: '1'
            })
            i = 1
            $number.html(`${i}-й вопрос из ${quantity-1}`)
            $(`#${$(this).data('quiz')}`).openModal()
            $quiz.slider.reloadSlider()
            $progressBar._field.css('transition', '')
            
        })
    })
})