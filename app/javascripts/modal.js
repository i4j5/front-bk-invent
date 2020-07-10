//===================
// Модальные окна
//===================

const $ = require('jquery')

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