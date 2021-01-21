"use strict";

//==========
// SIZE
//==========
var $ = require('jquery');

$(function () {
  var $offer = $('.offer');
  var $header = $('.header');
  var $nav = $('.nav');

  if ($(this).width() < 1160) {
    $offer.css({
      "padding-top": $header.height() + "px"
    });
    $nav.css({
      "padding-top": $header.height() + 10 + "px"
    });
  }

  var scrollPos = 0;
  $(window).scroll(function () {
    var st = $(this).scrollTop();

    if ($(this).width() < 1160) {
      if (st > scrollPos) {
        $header.addClass('header_hidden');
      } else {
        $header.removeClass('header_hidden');
      }
    }

    scrollPos = st;
  });
  $(window).resize(function () {
    if ($(this).width() < 1160) {
      $offer.css({
        'padding-top': $header.height() + 'px'
      });
      $nav.css({
        'padding-top': $header.height() + 10 + 'px'
      });
    } else {
      $offer.css({
        'padding-top': ''
      });
      $nav.css({
        'padding-top': ''
      });
      $header.removeClass('header_hidden');
    }
  });
});