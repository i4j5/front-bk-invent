"use strict";

//===================
// Модальные окна
//===================
var $ = require('jquery');

$.fn.extend({
  openModal: function openModal() {
    $(this).addClass('modal_visible');
    $('body').addClass('modal-open');
    $(this).on('click', function (event) {
      if ($(event.target).is('.modal__close') || $(event.target).is('.modal__wrapper')) {
        event.preventDefault();
        $(this).closeModal();
      }
    });
  },
  closeModal: function closeModal() {
    $(this).removeClass('modal_visible');
    $('body').removeClass('modal-open');
  },
  zoom: function zoom(html) {
    var $this = $(this);
    var $content = $('#modal__zoom .modal__html');
    $content.html('');
    $content.html(html);
    $('#modal__zoom').openModal();
  }
});