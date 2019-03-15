$ = require('jquery')



const $page = $('.page')
const $nav = $('.nav')
const $header = $('.header') 

let scrollPrev = 0
$(window).scroll(function() {
    let  scrolled = $(window).scrollTop() // Высота скролла в px
    let firstScrollUp = false // Параметр начала сколла вверх
    let  firstScrollDown = false // Параметр начала сколла вниз
    
    // Если скроллим
    if ( scrolled > 0 ) {
        // Если текущее значение скролла > предыдущего, т.е. скроллим вниз
        if ( scrolled > scrollPrev ) {
            firstScrollUp = false // Обнуляем параметр начала скролла вверх
            // Если меню видно
            if ( scrolled < $header.height() + $header.offset().top ) {
                // Если только начали скроллить вниз
                if ( firstScrollDown === false ) {
                    let topPosition = $header.offset().top // Фиксируем текущую позицию меню
                    $header.css({
                        "top": topPosition + "px"
                    })
                    firstScrollDown = true
                }
                // Позиционируем меню абсолютно
                $header.css({
                    "position": "absolute"
                })
            // Если меню НЕ видно
            } else {
                // Позиционируем меню фиксированно вне экрана
                $header.css({
                    "position": "fixed",
                    "top": "-" + $header.height() + "px"
                })
            }
            
        // Если текущее значение скролла < предыдущего, т.е. скроллим вверх
        } else {
            firstScrollDown = false // Обнуляем параметр начала скролла вниз
            // Если меню не видно
            if ( scrolled > $header.offset().top ) {
                // Если только начали скроллить вверх
                if ( firstScrollUp === false ) {
                    let topPosition = $header.offset().top // Фиксируем текущую позицию меню
                    $header.css({
                        "top": topPosition + "px"
                    })
                    firstScrollUp = true
                }
                // Позиционируем меню абсолютно
                $header.css({
                    "position": "absolute"
                })
            } else {
                // Убираем все стили
                $header.removeAttr("style")
            }
        }
        // Присваеваем текущее значение скролла предыдущему
        scrollPrev = scrolled
    }	
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

$('.menu__link_arrow').click(function() {
    let $menu = $(this).parent()
    let $submenu = $menu.children('.menu__submenu')
    if ( $menu.hasClass('menu__item_active') ) {
        $submenu.slideUp(450)
    } else {
        $submenu.slideDown(450)        
    }
    
    $menu.toggleClass('menu__item_active')
})


$('.submenu__link_arrow').click(function() {
    let $menu = $(this).parent()
    let $submenu = $menu.children('.submenu__submenu')
    if ( $menu.hasClass('submenu__item_active') ) {
        $submenu.slideUp(450)
    } else {
        $submenu.slideDown(450)        
    }
    
    $menu.toggleClass('submenu__item_active')
})

// $items.each((index, el) => {
//     let $el = $(el)

//     $el.children('.tabs__title').click(function(event) {
//         $el.toggleClass('tabs__item_active')

//         let $progressBar = $el.children('.tabs__text').children('.progress-bar')
//         let interest = $progressBar.data('interest')

        
//         if ( $el.hasClass('tabs__item_active') ) {
//             $progressBar.children('.progress-bar__pace').children('.progress-bar__interest').text('')
//             $progressBar.children('.progress-bar__pace').width('0%')
//             $el.children('.tabs__text').slideDown(500)
//             setTimeout(() => {
//                 $progressBar.children('.progress-bar__pace').width(interest + '%')
//                 let n = 0
//                 let timerId = setInterval(() => {
//                     ++n
//                     $progressBar.children('.progress-bar__pace').children('.progress-bar__interest').text(n + '%')
//                     // $progressBar.children('.progress-bar__pace').width(n + '%')
//                 }, 1000 / interest)

//                 setTimeout(() => {
//                     clearInterval(timerId)
//                 },1000)
//             }, 500)
//         } else {
//             $el.children('.tabs__text').slideUp(500)
//             setTimeout(() => {
//                 $progressBar.children('.progress-bar__pace').width('0%')
//             }, 500)
//         }
//     })	
// })