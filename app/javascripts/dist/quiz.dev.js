"use strict";

//==========
// КВИЗЫ
//==========

/**
 * TODO:
 * В отдельный билд
 */
$(function () {
  $('.quiz').each(function () {
    var $quiz = $(this);
    $quiz.slider = $quiz.find('.quiz__items').bxSlider({
      touchEnabled: false,
      controls: false,
      auto: false,
      pager: false,
      adaptiveHeight: true,
      adaptiveHeightSpeed: 400
    });
    var quantity = $quiz.slider.getSlideCount();
    var i = 1;
    var $progressBar = $quiz.find('.quiz__progress-bar');
    $progressBar._label = $progressBar.children('.quiz__progress-bar-label');
    $progressBar._field = $progressBar.children('.quiz__progress-bar-field').children('span');
    var $number = $quiz.find('.quiz__number');
    $number.html("".concat(i, "-\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 \u0438\u0437 ").concat(quantity - 1)); // Сделать Автоматическое далее !!!

    $quiz.find('.quiz__next').click(function () {
      if (quantity > i) {
        // Сделать Проверка валидации!
        var $input = $quiz.find("[name=\"comment[".concat(i, "]\"]")); // Проверка чекбоксоы 

        if (i + 1 == quantity) {
          $progressBar._field.css('transition', 'none');

          $quiz.find('.quiz__footer').css({
            visibility: 'hidden',
            display: 'none',
            opacity: '0'
          });
        }

        $quiz.slider.goToNextSlide();

        $progressBar._field.css('width', "".concat(parseInt(100 / (quantity - 1) * i), "%"));

        $progressBar._label.html("".concat(parseInt(100 / (quantity - 1) * i), "%"));

        ++i;
        $number.html("".concat(i, "-\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 \u0438\u0437 ").concat(quantity - 1));
      }
    });
    $quiz.find('.quiz__previous').click(function () {
      if (i != 1) {
        $quiz.slider.goToPrevSlide();
        --i;

        $progressBar._field.css('width', "".concat(parseInt(100 / (quantity - 1) * (i - 1)), "%"));

        $progressBar._label.html("".concat(parseInt(100 / (quantity - 1) * (i - 1)), "%"));

        $number.html("".concat(i, "-\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 \u0438\u0437 ").concat(quantity - 1));
      }
    });
    $('.run-quiz').click(function () {
      if ($(window).width() >= 700) {
        $quiz.slider.reloadSlider({
          touchEnabled: false,
          controls: false,
          auto: false,
          pager: false,
          adaptiveHeight: false
        });
      }

      $quiz.slider.goToSlide(0);

      $progressBar._field.css({
        transition: 'none',
        width: '0%'
      });

      $progressBar._label.html('0%');

      $quiz.find('.quiz__footer').css({
        visibility: 'visible',
        display: '',
        opacity: '1'
      });
      i = 1;
      $number.html("".concat(i, "-\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 \u0438\u0437 ").concat(quantity - 1));
      $("#".concat($(this).data('quiz'))).openModal();
      $quiz.slider.reloadSlider();

      $progressBar._field.css('transition', '');
    });
  });
});