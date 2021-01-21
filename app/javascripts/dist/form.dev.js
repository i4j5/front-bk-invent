"use strict";

//==========
// Формы
//==========
var $ = require('jquery'); // require('../../node_modules/jquery.maskedinput/src/jquery.maskedinput')


$(function () {
  // $("input[name='phone']").mask('+7 (999) 999-9999', {autoclear: false})
  $('.input_type_file .input__control').each(function () {
    var $input = $(this);
    $input.change(function () {
      var $this = $(this);
      var $messag = $this.parent().parent().children('.input__message');
      var messag = '';

      for (var i = 0; i < this.files.length; i++) {
        messag = messag + this.files[i]['name'];
      }

      if (this.files && this.files.length != 0) {
        $messag.html(messag);
        $messag.parent().addClass('input_ok');
      } else {
        $messag.html('');
        $messag.parent().removeClass('input_ok');
      }
    });
  });
  $('.input').each(function () {
    var $input = $(this);
    var $box = $input.children('.input__box');
    var $control = $box.children('.input__control');
    var $topBorder = $box.children('.input__top-border');
    var $title = $box.children('.input__title');

    if ($control.val()) {
      $box.addClass('input__box_filled');

      if ($title.width()) {
        $topBorder.css('width', "calc(((100% - 20px) - ".concat($title.width() * 0.7777472, "px) - 11px)"));
      }
    }

    var $message = $input.children('.input__message');

    if ($message.data('default')) {
      $message.text($message.data('default'));
    }
  });
  $('.input__text').click(function () {
    var $text = $(this);
    var $box = $text.parent();
    var $items = $box.children('.input__items');
    var $topBorder = $text.parent().children('.input__top-border');
    var $title = $text.parent().children('.input__title');
    $box.parent().addClass('input_select_open');

    if (!$box.hasClass('input__box_filled') && !$box.hasClass('input__box_focus')) {
      if ($title.width()) {
        $topBorder.css('width', "calc(((100% - 20px) - ".concat($title.width() * 0.7777472, "px) - 11px)"));
      }
    }

    $box.addClass('input__box_focus');
    $text.slideUp(500);
    $items.slideDown(500);
  });
  $('.input__item').click(function () {
    var $item = $(this);
    var $box = $item.parent().parent();
    var $items = $item.parent();
    var $control = $box.children('.input__control');
    var $text = $box.children('.input__text');
    $items.slideUp(500);
    $text.slideDown(500);
    $item.data('value');
    $control.val($item.data('value'));
    $text.text($item.text());
    setTimeout(function () {
      $items.children('.input__item').removeClass('input__item_active');
      $item.addClass('input__item_active');
    }, 501);
    $box.parent().removeClass('input_select_open');
    $box.addClass('input__box_filled');
    $box.removeClass('input__box_focus');
  });
  $('.input__control').focus(function () {
    var $control = $(this);
    var $box = $control.parent();
    $box.addClass('input__box_focus');
    var $topBorder = $control.parent().children('.input__top-border');
    var $title = $control.parent().children('.input__title');

    if (!$control.val()) {
      if ($title.width()) {
        $topBorder.css('width', "calc(((100% - 20px) - ".concat($title.width() * 0.7777472, "px) - 11px)"));
      }
    }
  }).blur(function () {
    var $control = $(this);
    var $box = $control.parent();
    var $topBorder = $control.parent().children('.input__top-border');

    if ($control.val()) {
      $box.addClass('input__box_filled');
    } else {
      $box.removeClass('input__box_filled');
      $topBorder.css('width', '');
    }

    $box.removeClass('input__box_focus');
  });
});