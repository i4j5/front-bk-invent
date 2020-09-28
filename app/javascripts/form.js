//==========
// Формы
//==========

const $ = require('jquery')
// require('../../node_modules/jquery.maskedinput/src/jquery.maskedinput')

$(function() {

    // $("input[name='phone']").mask('+7 (999) 999-9999', {autoclear: false})

    $('.input_type_file .input__control').each(function() {
        let $input = $(this)

        $input.change(function() {

            let $this = $(this)

            let $messag = $this.parent().parent().children('.input__message')

            let messag = '';

            for (let i = 0; i < this.files.length; i++) {
                messag = messag + this.files[i]['name'];
            }

            if (this.files && this.files.length != 0) {
                $messag.html(messag)
                $messag.parent().addClass('input_ok')
            } else {
                $messag.html('')
                $messag.parent().removeClass('input_ok')
            }
        })
    })

    $('.input').each(function() {
        let $input = $(this)
        let $box = $input.children('.input__box')
        let $control = $box.children('.input__control')
        let $topBorder = $box.children('.input__top-border')
        let $title = $box.children('.input__title')

        if ($control.val()) {
            $box.addClass('input__box_filled')
            if ($title.width()) {
                $topBorder.css('width', `calc(((100% - 20px) - ${$title.width() * 0.7777472}px) - 11px)`)
            }
        }

        let $message = $input.children('.input__message')
        if ($message.data('default')) {
            $message.text($message.data('default'))
        }
    })

    $('.input__text').click(function() {
        let $text = $(this)
        let $box = $text.parent()
        let $items = $box.children('.input__items')
        
        let $topBorder = $text.parent().children('.input__top-border')
        let $title = $text.parent().children('.input__title')

        $box.parent().addClass('input_select_open')
                
        if (!$box.hasClass('input__box_filled') && !$box.hasClass('input__box_focus')) {
            if ($title.width()) {
                $topBorder.css('width', `calc(((100% - 20px) - ${$title.width() * 0.7777472}px) - 11px)`)
            }
        }

        $box.addClass('input__box_focus')
        $text.slideUp(500)
        $items.slideDown(500)
    })

    $('.input__item').click(function() {
        let $item = $(this)
        let $box = $item.parent().parent()
        let $items = $item.parent()
        let $control = $box.children('.input__control')
        let $text = $box.children('.input__text')

        $items.slideUp(500)
        $text.slideDown(500)

        $item.data('value')
        $control.val($item.data('value'))
        $text.text($item.text())
        
        setTimeout(function() { 
            $items.children('.input__item').removeClass('input__item_active')
            $item.addClass('input__item_active')
        }, 501)
        
        $box.parent().removeClass('input_select_open')
        $box.addClass('input__box_filled')
        $box.removeClass('input__box_focus')
    })

    $('.input__control').focus(function() {
        let $control = $(this)
        let $box = $control.parent()
        $box.addClass('input__box_focus')
        let $topBorder = $control.parent().children('.input__top-border')
        let $title = $control.parent().children('.input__title')
        
        if (!$control.val()) {
            if ($title.width()) {
                $topBorder.css('width', `calc(((100% - 20px) - ${$title.width() * 0.7777472}px) - 11px)`)
            }
        }
    }).blur(function(){
        let $control = $(this)
        let $box = $control.parent()
        let $topBorder = $control.parent().children('.input__top-border')

        if ($control.val()) {
            $box.addClass('input__box_filled')
        } else {
            $box.removeClass('input__box_filled')
            $topBorder.css('width', '')
        }
        
        $box.removeClass('input__box_focus')
    })
    
})