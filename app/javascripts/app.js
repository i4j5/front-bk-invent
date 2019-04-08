const $ = require('jquery')
require('jquery-validation')
require('../../node_modules/bxslider/dist/jquery.bxslider')

const $page = $('.page')
const $nav = $('.nav')
const $header = $('.header') 
const $offer = $('.offer') 


$(function(){ 

    if ( $(this).width() < 1160) {
        $offer.css({
            "padding-top": $header.height() + "px"
        })
        $nav.css({
            "padding-top": $header.height() + 10 + "px"
        })
    }

    $('.reviews__items').bxSlider({
        // nextSelector: 'reviews__next',
        // prevSelector:'reviews__prev',
        touchEnabled: false,
        nextText: '',
        prevText: '',
        pager: false,
    })
    

    // let scrollPrev = 0
    // $(window).scroll(function() {
    //     // if ( $(this).width() < 1160) {
    //     //     let  scrolled = $(window).scrollTop() // Высота скролла в px
    //     //     let firstScrollUp = false // Параметр начала сколла вверх
    //     //     let  firstScrollDown = false // Параметр начала сколла вниз
            
    //     //     // Если скроллим
    //     //     if ( scrolled > 0 ) {
    //     //         // Если текущее значение скролла > предыдущего, т.е. скроллим вниз
    //     //         if ( scrolled > scrollPrev ) {
    //     //             firstScrollUp = false // Обнуляем параметр начала скролла вверх
    //     //             // Если меню видно
    //     //             if ( scrolled < $header.height() + $header.offset().top ) {
    //     //                 // Если только начали скроллить вниз
    //     //                 if ( firstScrollDown === false ) {
    //     //                     let topPosition = $header.offset().top // Фиксируем текущую позицию меню
    //     //                     $header.css({
    //     //                         "top": topPosition + "px"
    //     //                     })
                            
    //     //                     firstScrollDown = true
    //     //                 }
    //     //                 // Позиционируем меню абсолютно
    //     //                 $header.css({
    //     //                     "position": "absolute"
    //     //                 })
    //     //             // Если меню НЕ видно
    //     //             } else {
    //     //                 // Позиционируем меню фиксированно вне экрана
    //     //                 $header.css({
    //     //                     "position": "fixed",
    //     //                     "top": "-" + $header.height() + "px"
    //     //                 })
    //     //             }
                    
    //     //         // Если текущее значение скролла < предыдущего, т.е. скроллим вверх
    //     //         } else {
    //     //             firstScrollDown = false // Обнуляем параметр начала скролла вниз
    //     //             // Если меню не видно
    //     //             if ( scrolled > $header.offset().top ) {
    //     //                 // Если только начали скроллить вверх
    //     //                 if ( firstScrollUp === false ) {
    //     //                     let topPosition = $header.offset().top // Фиксируем текущую позицию меню
    //     //                     $header.css({
    //     //                         "top": topPosition + "px"
    //     //                     })
    //     //                     firstScrollUp = true
    //     //                 }
    //     //                 // Позиционируем меню абсолютно
    //     //                 $header.css({
    //     //                     "position": "absolute"
    //     //                 })
    //     //             } else {
    //     //                 // Убираем все стили
    //     //                 $header.removeAttr("style")
    //     //             }
    //     //         }
    //     //         // Присваеваем текущее значение скролла предыдущему
    //     //         scrollPrev = scrolled
    //     //     }
    //     // }
        


    // })



    let scrollPos = 0
    $(window).scroll(function(){

        let st = $(this).scrollTop()

        if ( $(this).width() < 1160) {
            if (st > scrollPos){
                $header.addClass('header_hidden')
            } else {
                $header.removeClass('header_hidden')
            }
        }

        scrollPos = st

    })


    $('.hamburger').click(function() {

        let $this = $(this)
    
        if ( $this.hasClass('hamburger_open') ) {
            $nav.removeClass('nav_active')
            $page.removeClass('modal-open')
            $this.removeClass('hamburger_open')
        } else {
            $nav.addClass('nav_active')
            $page.addClass('modal-open')
            $this.addClass('hamburger_open')     
        }
        
    })

    // $('.nav .icon-close').click(e => {
    //     $('.nav').removeClass('nav_active')
    // })

    $('.mobile-menu__link_arrow').click(function() {
        let $menu = $(this).parent()
        let $submenu = $menu.children('.mobile-menu__submenu')
        if ( $menu.hasClass('mobile-menu__item_active') ) {
            $submenu.slideUp(450)
        } else {
            $submenu.slideDown(450)        
        }
        
        $menu.toggleClass('mobile-menu__item_active')
    })


    $('.mobile-submenu__link_arrow').click(function() {
        let $menu = $(this).parent()
        let $submenu = $menu.children('.mobile-submenu__submenu')
        if ( $menu.hasClass('mobile-submenu__item_active') ) {
            $submenu.slideUp(450)
        } else {
            $submenu.slideDown(450)        
        }
        
        $menu.toggleClass('mobile-submenu__item_active')
    })


    $('.input').each(function() {

        let $input = $(this)

        let $box = $input.children('.input__box')
        let $control = $box.children('.input__control')
        let $topBorder = $box.children('.input__top-border')
        let $title = $box.children('.input__title')

        if ($control.val()) {
            $box.addClass('input__box_filled')
            $topBorder.css('width', `calc(((100% - 20px) - ${$title.width()}px) - 5px)`)
        }

        let $message = $input.children('.input__message')
        if ($message.data('default')) {
            $message.text($message.data('default'))
        }

    })

    $('.input__control').focus(function() {
        let $control = $(this)
        let $box = $control.parent()
        let $topBorder = $control.parent().children('.input__top-border')
        let $title = $control.parent().children('.input__title')

        if (!$control.val()) {
            $topBorder.css('width', `calc(((100% - 20px) - ${$title.width()}px) - 5px)`)
        }
        $box.addClass('input__box_focus')
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

    $('.ajax').each(function() {


        // .trim()

        $(this).validate({
            unhighlight: function (element, errorClass) {
                let $control = $(element)
                let $input = $control.parent().parent().addClass('input_ok').removeClass('input_error')
                let $message = $input.children('.input__message')

                if ($message.data('default')) {
                    $message.text($message.data('default'))
                } else {
                    $message.text(' ')
                }
            },

            submitHandler: function(form, e) {
                e.preventDefault()

                //$('.loader_submit').addClass('loader_active')

                let $form = $(form)
                let str = $form.serialize()
                let btn = $form.children("[type='submit']")
                btn.prop('disabled', true)

                $.ajax({
                    url: '/',
                    type: 'get',
                    data: str
                })
                .done(function() {
                    //$('.modal').closeModal()
                    //$('#modal__ok').openModal()
                })
                .always(function() {
                    //$('.loader_submit').removeClass('loader_active')
                    btn.prop('disabled', false)
                })
            },

            rules: {
                'phone': {
                    required: true,
                },
                'name': {
                    required: true
                },
                'email': {
                    email: true,
                    required: true
                }
            },
            messages: {
                email: {
                    email: "Вы допустили ошибку. Это не похоже E-mail",
                    required: "Пожалуйста, введите Ваш адрес электронной почты"
                },
                name: {
                    required: "Напишите как к Вам обращаться"
                }

            },
            errorPlacement: function(error, element){
                let $control = $(element)
                let $input = $control.parent().parent().addClass('input_error').removeClass('input_ok')

                let $message = $input.children('.input__message')
                $message.text(error.html())
            }
        })
    })

    // let baseLeftOffset =  Math.round( $('.menu>.container').offset().left )
    let offsetFirstItem = $('.menu__item:first-child').offset().left
    //let offsetLastItem = $('.menu__item:last-child').offset().left

    $('.menu__submenu').each(function() {
        
        let $this= $(this)    
        let idx = Math.round( $this.width() + $this.offset().left - offsetFirstItem)
        
        console.log(1160 - $this.offset().left - offsetFirstItem)

        if ( idx > 1160 ) {
            
            if($this.width() > 1100) { // (!) Изменить
                $(this).css('left', `-${$this.offset().left - offsetFirstItem}px`)
            } else if( 580 > (1160 - ($this.offset().left - offsetFirstItem))  ) {
                $(this).css('right', '0').css('left', 'auto')
            } else {
                $(this).css('left', `-${idx - 1160}px`)
            }

        }


    })

})


$(window).resize(function() {
    // let widthWindow = $(this).width()
    // if(widthWindow <= 1160) {

    // }


    if ( $(this).width() < 1160) {
        $offer.css({
            "padding-top": $header.height() + "px"
        })
        $nav.css({
            "padding-top": $header.height() + 10 + "px"
        })
    }
})
    