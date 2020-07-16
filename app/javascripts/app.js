const $ = require('jquery')
require('jquery-validation')
require('../../node_modules/bxslider/dist/jquery.bxslider')
require('./modal')
require('./resize')
require('./menu')
// require('./share') // Акция
import Analytic from './analytic';
import PageViewTracker from './pageViewTracker';
const moment = require('moment')
moment.locale('ru')

const API = {
    methods: {
        order: 'https://private.bk-invent.ru/api/site/create-lead-from-form',
        review: 'https://private.bk-invent.ru/api/site/create-review',
        question: 'https://private.bk-invent.ru/api/site/create-question',
        //analytic: 'http://localhost/api/analytic',
        analytic: 'https://private.bk-invent.ru/api/analytic',
    }
}

PageViewTracker()

$(function() {

    let analytic = Analytic({
        url: API.methods.analytic,
        select: '.dynamic-phone'
    })

    $('[name="name"]').val(analytic.getLocalStorage('name'))
    $('[name="email"]').val(analytic.getLocalStorage('email'))
    $('[name="phone"]').val(analytic.getLocalStorage('phone'))

    require('./form')

    $('body').on('DOMSubtreeModified', '.dynamic-phone', function() {
       let $this =  $(this)

       let phone =  $this.html().replace(/\s{2,}/g, '')

       if (phone[0] == '+' && phone.length == 12)  {

            if ($this.get(0).tagName === 'A') {
                $this.attr('href', 'tel:' + phone);
            }

            $this.html( phone.substring(1).replace(/(\d)(\d\d\d)(\d\d\d)(\d\d)(\d\d)/, '8 ($2) $3-$4-$5') )
       }
    })

    // function getPosition(e){
        
    //     let x = 0
    //     let y = 0
     
    //     if (!e) {
    //         var e = window.event;
    //     }
     
    //     if (e.pageX || e.pageY){
    //         x = e.pageX;
    //         y = e.pageY;
    //     } else if (e.clientX || e.clientY){
    //         x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    //         y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    //     }
     
    //     return {x: x, y: y}
    // }

    // $('body').mousemove(function(e){
    //     var coord = getPosition(e);
    //     console.log(coord.x + "," + coord.y)
    // });



    let $leadHunter = $('#lead-hunter')

    setTimeout(function() {
        $('.page').mouseleave(function(e){

            let x = 0
            let y = 0

            if (e.pageX || e.pageY){
                x = e.pageX;
                y = e.pageY;
            } else if (e.clientX || e.clientY){
                x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            // console.log(analytic.getCookie('leadHunterCaugh'), x, y - window.pageYOffset)
            
            if (!analytic.getCookie('leadHunterCaugh') && ((y - window.pageYOffset) < 0)) {
                $leadHunter.openModal()
                analytic.setCookie('leadHunterCaugh', '1',  600000)
            }
        })

        // console.log('mouseleave')
    }, 10000)

    setTimeout(function() {
        if (!analytic.getCookie('leadHunterCaugh')) {
            $leadHunter.openModal()
            analytic.setCookie('leadHunterCaugh', '1',  1800000)
        }
    }, 60000)



    $('img[data-src]').each((index, img) => {
        img.setAttribute('src', img.getAttribute('data-src'))
        img.onload = function() {
            img.removeAttribute('data-src')
        }
    })

    $('.articles__date').each((index, el) => {
        let $this = $(el)
        let date = moment($this.html(), "DDMMYYYY")
        $this.html(moment(date).format('LL'))
    })

    $('.product').hover(function() {
		$(this).children('.product__img').addClass('product__img_hover')
	}, function() {
		$(this).children('.product__img').removeClass('product__img_hover')
	})
    
    $('.zoom-img').click(function() {
        let $this = $(this)
        $this.zoom(`<img src="${$this.data('zoom')}">`)
    })
    
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
            })	
        })
    })

    $('[data-modal]').click(function() {
        $(`#${$(this).data('modal')}`).openModal()
    })

    $('.reviews__items').bxSlider({
        touchEnabled: false,
        nextText: '',
        prevText: '',
        pager: false,
    })

    $('.cases__items').bxSlider({
        touchEnabled: false,
        nextText: '',
        prevText: '',
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
                // let str = $form.serialize()
                
                // str = str + '&url=' + document.location.host + document.location.pathname
                // str = str + '&utm=' + document.location.search.slice(1).replace(/&/g, '|')
                // str = str + localStorage.getItem('utm')

                // let roistat = window.roistat ? window.roistat.visit : null
                // str = str + '&roistat=' + roistat

                // let arrUTM = document.location.search.slice(1).split('&')
                // console.log(arrUTM) 
                // for (let i = 0; i < arrUTM.length; i++) {
                //     let str = arrUTM[i]
                //     let utm = str.split('=')
                //     console.log(utm) 
                //     str = `${str}&${utm[0]}=${utm[1]}`
                // }
                
                let btn = $form.children("[type='submit']")
                btn.prop('disabled', true)

                let formData = new FormData($form.get(0))
                formData.append('url', document.location.host + document.location.pathname)

                let dataAnalytic = analytic.getData()

                formData.append('visit', dataAnalytic.visit)
                formData.append('metrika_client_id', dataAnalytic.metrika_client_id)
                formData.append('google_client_id', dataAnalytic.google_client_id)
                formData.append('referrer', dataAnalytic.referrer)
                formData.append('page_view_tracker', analytic.getLocalStorage('pageViewTracker'))
                //formData.append('roistat', roistat.getVisit())

                $.each( dataAnalytic.utm, function( key, value ) {
                    formData.append(key, value)
                })

                let method =  'order'

                if (formData.has('method')) {
                    method =  formData.get('method')
                }

                if (formData.get('name')) analytic.setLocalStorage('name', formData.get('name'));
                if (formData.get('phone')) analytic.setLocalStorage('phone', formData.get('phone'));
                if (formData.get('email')) analytic.setLocalStorage('email', formData.get('email'));

                $.ajax({
                    url: API.methods[method],
                    type: 'post',
                    data: formData,
                    contentType: false, 
                    processData: false,
                })
                .done(function() {
                    
                    $('.modal').closeModal()

                    // analytic.setLocalStorage('name', formData.get('name'))
                    // analytic.setLocalStorage('email', formData.get('email'))
                    // analytic.setLocalStorage('phone', formData.get('phone'))

                    if (formData.has('modal')) {
                        $( '#modal__' + formData.get('modal') ).openModal()
                    } else {
                        $('#modal__ok').openModal()
                        yaCounter53737453.reachGoal('site')

                        gtag('event', 'Заявка с сайта', { 
                            'event_category': 'site', 
                            'event_action': 'form', 
                        })

                        analytic.setCookie('leadHunterCaugh', '1',  1800000)
                    }
                })
                .always(function() {
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
                'fio': {
                    required: true
                },
                'text': {
                    required: true
                },
                'email': {
                    email: true
                },
                'privacy': {
                    required: true
                },
                'specialist': {
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
                fio: {
                    required: "Представьтесь, пожалуйста"
                },
                text: {
                    required: "Напишите отзыв"
                },
                specialist: {
                    required: "Выберите специалиста"
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
    

})