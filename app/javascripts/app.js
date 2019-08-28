const $ = require('jquery')
require('jquery-validation')
require('../../node_modules/bxslider/dist/jquery.bxslider')
require('../../node_modules/jquery.maskedinput/src/jquery.maskedinput')
require('ion-rangeslider')

let url = 'https://private.bk-invent.ru/api'

const API = {
    methods: {
        order: `${url}/amo/create-lead-from-form`
    }

};

$.fn.extend({
    openModal: function() {
        $(this).addClass('modal_visible')
        $('body').addClass('modal-open')

        $(this).on('click', function(event){
        if( $(event.target).is('.modal__close') || $(event.target).is('.modal__wrapper') ) {
            event.preventDefault()
            $(this).closeModal()
        }
        })
    },

    closeModal: function() {
        $(this).removeClass('modal_visible')
        $('body').removeClass('modal-open')
    },

    zoom: function(html) {
        let $this = $(this)
        let $content = $('#modal__zoom .modal__html')

        $content.html('')
        $content.html(html)
    
        $('#modal__zoom').openModal()       
    }
})


$(function() { 

    $('.range-slider').ionRangeSlider({
        skin: 'round',
        hide_min_max: true,
        grid: true
    })

    $('.product').hover(function() {
		$(this).children('.product__img').addClass('product__img_hover')
	}, function() {
		$(this).children('.product__img').removeClass('product__img_hover')
	});
    
    $('img.zoom').click(function() {
        let $this = $(this)
        $this.zoom(`<img src="${$this.data('zoom')}">`)
    })

    const $page = $('.page')
    const $nav = $('.nav')
    const $header = $('.header') 
    const $offer = $('.offer') 

    $('.tabs').each((index, el) => {
        let $this = $(el)
        let $items = $this.children('.tabs__item')
        $items.each((index, el) => {
            let $el = $(el)
            $el.children('.tabs__title').click(function(event) {

                $el.toggleClass('tabs__item_active')

                if ($el.hasClass('tabs__item_active')) {
                    $items.find('.tabs__text').slideUp(500)
                    $items.removeClass('tabs__item_active')
                    $el.addClass('tabs__item_active')
                    $el.children('.tabs__text').slideDown(500)
                } else {
                    $el.addClass('.tabs__item_active')
                    $el.children('.tabs__text').slideUp(500)
                }
            });	
        })
    })

    //let $items = $('.tabs__item')
	// $items.each((index, el) => {
	// 	let $el = $(el)
	// 	$el.children('.tabs__title').click(function(event) {
	// 		$el.toggleClass('tabs__item_active')

	// 		let $progressBar = $el.children('.tabs__text').children('.progress-bar')
	// 		let interest = $progressBar.data('interest')

			
	// 		if ( $el.hasClass('tabs__item_active') ) {
	// 			$progressBar.children('.progress-bar__pace').children('.progress-bar__interest').text('')
	// 			$progressBar.children('.progress-bar__pace').width('0%')
	// 			$el.children('.tabs__text').slideDown(500)
	// 			setTimeout(() => {
	// 				$progressBar.children('.progress-bar__pace').width(interest + '%')
	// 				let n = 0
	// 				let timerId = setInterval(() => {
	// 					++n
	// 					$progressBar.children('.progress-bar__pace').children('.progress-bar__interest').text(n + '%')
	// 					// $progressBar.children('.progress-bar__pace').width(n + '%')
	// 				}, 1000 / interest)

	// 				setTimeout(() => {
	// 					clearInterval(timerId)
	// 				},1000)
	// 			}, 500)
	// 		} else {
	// 			$el.children('.tabs__text').slideUp(500)
	// 			setTimeout(() => {
	// 				$progressBar.children('.progress-bar__pace').width('0%')
	// 			}, 500)
	// 		}
	// 	});	
	// })

    //==========
    // SIZE
    //==========


    $('[data-modal]').click(function() {
        $(`#${$(this).data('modal')}`).openModal()
    })

    if ( $(this).width() < 1160) {
        $offer.css({
            "padding-top": $header.height() + "px"
        })
        $nav.css({
            "padding-top": $header.height() + 10 + "px"
        })
    }  

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

    $(window).resize(function() {

        if ( $(this).width() < 1160) {
            $offer.css({
                'padding-top': $header.height() + 'px'
            })
            $nav.css({
                'padding-top': $header.height() + 10 + 'px'
            })
        } else {
            $offer.css({
                'padding-top': ''
            })
            $nav.css({
                'padding-top': ''
            })
    
            $header.removeClass('header_hidden')
        }
    })
    
    $('.reviews__items').bxSlider({
        // nextSelector: 'reviews__next',
        // prevSelector:'reviews__prev',
        touchEnabled: false,
        nextText: '',
        prevText: '',
        pager: false,
    })

    $('.cases__items').bxSlider({
        // nextSelector: '.cases__next',
        // prevSelector:'.cases__prev',
        touchEnabled: false,
        nextText: '',
        prevText: '',
        // nextText: '',
        // prevText: '',
        // maxSlides: 3,
        // minSlides: 1,
       //moveSlides: 1,
        // slideWidth: '280px',
        //shrinkItems: true,
        pager: false,
    })

    $('.stock_type_slider .stock__items').bxSlider({
        touchEnabled: false,
        nextText: '',
        prevText: '',
        auto: true,
        pause: 4000,
        pager: false,
    })

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


    //==========
    // МЕНЮ
    //==========

    $('.hamburger').click(function() {
        let $this = $(this)
    
        if ( $this.hasClass('hamburger_open') ) {
            $nav.removeClass('nav_active')
            $page.removeClass('menu-open')
            $this.removeClass('hamburger_open')
        } else {
            $nav.addClass('nav_active')
            $page.addClass('menu-open')
            $this.addClass('hamburger_open')     
        } 
    })

    $('.mobile-menu__link_arrow').click(function() {
        let $this = $(this)
        let $arrow = $this.children('.arrow')
        let $menu = $this.parent()
        let $submenu = $menu.children('.mobile-menu__submenu')

        if ( $menu.hasClass('mobile-menu__item_active') ) {
            $submenu.slideUp(450)
            $arrow.removeClass('arrow_top').addClass('arrow_bottom')
            
        } else {
            $submenu.slideDown(450) 
            $arrow.removeClass('arrow_bottom').addClass('arrow_top')

        }
        
        $menu.toggleClass('mobile-menu__item_active')
    })

    $('.mobile-submenu__link_arrow').click(function() {
        let $this = $(this)
        let $arrow = $this.children('.arrow')
        let $menu = $this.parent()
        let $submenu = $menu.children('.mobile-submenu__submenu')

        if ( $menu.hasClass('mobile-submenu__item_active') ) {
            $submenu.slideUp(450)
            $arrow.removeClass('arrow_top').addClass('arrow_bottom')
        } else {
            $submenu.slideDown(450)
            $arrow.removeClass('arrow_bottom').addClass('arrow_top')        
        }
        
        $menu.toggleClass('mobile-submenu__item_active')
    })

    let offsetFirstItem = $('.menu__item:first-child').offset().left

    $('.menu__submenu').each(function() {
        
        let $this= $(this)    
        let idx = Math.round( $this.width() + $this.offset().left - offsetFirstItem)
        
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

    let heightBigMenu = 0
    $('.big-menu__items').each(function() {
        let $this = $(this)
        let height = $this.height()
        if (height > heightBigMenu) {
            heightBigMenu = height
        }
    })

    let $menu__MMs = $('.big-menu__mm')

    $menu__MMs.first().addClass('big-menu__mm_active')
    $menu__MMs.first().children('.arrow').removeClass('arrow_right').addClass('arrow_left')

    $menu__MMs.hover(function() {
        $menu__MMs.removeClass('big-menu__mm_active')
        $menu__MMs.children('.arrow').removeClass('arrow_left').addClass('arrow_right')
        $(this).addClass('big-menu__mm_active').children('.arrow').removeClass('arrow_right').addClass('arrow_left')
    })

    $('.big-menu').css('min-height', heightBigMenu + 20 +  'px')

    let $main = $('.main')
    let $fixedBlur = $('.fixed_blur')

    $('.menu__item').hover(function() {

        let $this = $(this)
        let $sub = $this.children('.menu__submenu_big')
        if ( $sub.is(':visible') ) {
            $sub.children('.big-menu').addClass('big-menu_active')
        }
        if ($this.is(':hover')){
            $main.addClass('main_blur')
            $fixedBlur.addClass('fixed_blur_visible')
            $this.children('.arrow_theme_light').removeClass('arrow_bottom').addClass('arrow_top')
        }

    }, function(e) {

        let $this = $(this)
        let isHover = false

        $('.menu__item>.arrow_theme_light').removeClass('arrow_top').addClass('arrow_bottom')

        $('.menu__item').each(function() {

            if ($(this).is(':hover')) {
                isHover = true
            }
        })

        if (!isHover) {
            $main.removeClass('main_blur')
            $fixedBlur.removeClass('fixed_blur_visible')
        }

        $this.children('.menu__submenu_big').children('.big-menu').removeClass('big-menu_active')
    })



    //==========
    // Формы
    //==========

    $("input[name='phone']").mask('+7 (999) 999-9999', {autoclear: false})

    $('.input').each(function() {
        let $input = $(this)

        // if ($input.hasClass('input_type_select')) {
        //     let items =  $input.data('items')

        //     console.log(items[0].name)
        // }

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



    //==============
    // Работа с API
    //===============

    $('.ajax').each(function() {

        $(this).validate({
            unhighlight: function (element, errorClass) {
                let $control = $(element)

                if ($control.hasClass('checkbox__control')) {
                    $control.parent().parent().removeClass('checkbox_error')

                } else if ($control.hasClass('radio__control')) {
                    $control.parent().parent().removeClass('radio_error')
                    
                } else {
                    let $input = $control.parent().parent().removeClass('input_error')
                    let $message = $input.children('.input__message')
                    
                    if ($control.val() != '') {
                        $input.addClass('input_ok')
                    }

                    if ($message.data('default')) {
                        $message.text($message.data('default'))
                    } else {
                        $message.text(' ')
                    }
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
                    url: API.methods.order,
                    type: 'post',
                    data: str
                })
                .done(function() {
                    $('.modal').closeModal()
                    $('#modal__ok').openModal()
                })
                .always(function() {
                    //$('.loader_submit').removeClass('loader_active')
                    btn.prop('disabled', false)
                })
            },

            rules: {
                'phone': {
                    required: true,
                    minlength: 10,
                    number: true,
                    normalizer: value => {
                        let phone = value
                        phone = phone.replace(/-/g, '')
                        phone = phone.replace(/_/g, '')
                        phone = phone.replace(/ /g, '')
                        phone = phone.replace('+7', '')
                        phone = phone.replace('(', '')
                        phone = phone.replace(')', '')
                        return phone
                    }
                },
                'name': {
                    required: true
                },
                'email': {
                    email: true,
                    //required: true
                },
                'privacy': {
                    required: true
                }
            },
            messages: {
                email: {
                    email: "Вы допустили ошибку. Это не похоже на эл. почту",
                    required: "Пожалуйста, введите Ваш адрес эл. почты"
                },
                name: {
                    required: "Напишите как к Вам обращаться"
                },
                phone: {
                    minlength: "Вы допустили ошибку. Номер телефона должен состоять из 10 цифр",
                    required: "Укажите номер телефона"
                }
            },
            errorPlacement: function(error, element){
                let $control = $(element)
                
                if ($control.hasClass('checkbox__control')) {
                    $control.parent().parent().addClass('checkbox_error')
                } else if ($control.hasClass('radio__control')) {
                    $control.parent().parent().addClass('radio_error')
                } else {
                    let $input = $control.parent().parent().addClass('input_error').removeClass('input_ok')
                    let $message = $input.children('.input__message')
                    $message.text(error.html())
                }
                
            }
        })
    })
    
    
    let $topMenuItems = $('.top-menu__items')
    let $search = $('.top-menu__search')
    $('.top-menu__search-btn').click(function() {
        $topMenuItems.removeClass('top-menu__items_visible')
        $search.addClass('top-menu__search_visible')
    })
    $('.top-menu__close').click(function() {
        $topMenuItems.addClass('top-menu__items_visible')
        $search.removeClass('top-menu__search_visible')
    })

    let $topMenuItem = $('.top-menu__item')

    $topMenuItem.hover(function() {

        $(this).children('.top-menu__link').children('.arrow').removeClass('arrow_bottom').addClass('arrow_top')
        console.log($(this).children('.top-menu__link').children('.arrow'))

    }, function(e) {

        let $this = $(this)
        
        // console.log($this, $this.is(':hover'))
        // if ($this.is(':hover')) {
        //     $(this).children('.top-menu__link').children('.arrow').removeClass('arrow_top').addClass('arrow_bottom')
        // }
        $(this).children('.top-menu__link').children('.arrow').removeClass('arrow_top').addClass('arrow_bottom')
    })

    ymaps.ready(init);
	var map;

	function init(){
	  map = new ymaps.Map("map", {
	      center: [47.229409, 39.678002],
	      zoom: 17,
	     controls: [
	      'zoomControl'
	     ]
	  });

	  map.behaviors.disable(['scrollZoom']);

	  var placemark = new ymaps.Placemark([47.229409, 39.678002],
	    {
	      hintContent: 'БК Инвент ул. Текучева, 23, эт. 3'
	      //balloonContent: 'html'
	    }, 
	    {
	      iconLayout: 'default#image',
	      iconImageHref: './images/ya-maps.png',
	      iconImageSize: [90, 108],
	      iconImageOffset: [-38, -110]
	    }
	  );

	  map.geoObjects.add(placemark);
	}
})


// $(window).resize(function() {
//     const $nav = $('.nav')
//     const $header = $('.header')
//     const $offer = $('.offer') 

//     if ( $(this).width() < 1160) {
//         $offer.css({
//             'padding-top': $header.height() + 'px'
//         })
//         $nav.css({
//             'padding-top': $header.height() + 10 + 'px'
//         })
//     } else {
//         $offer.css({
//             'padding-top': ''
//         })
//         $nav.css({
//             'padding-top': ''
//         })

//         $header.removeClass('header_hidden')
//     }
// })
    