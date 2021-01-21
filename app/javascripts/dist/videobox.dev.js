"use strict";

var $ = require('jquery');

$(function () {
  var $videobox = 1.779;
  var $youtube = $('.youtube');
  $youtube.css({
    "height": $youtube.width() / $videobox + "px"
  });
  $(window).resize(function () {
    $youtube.css({
      "height": $youtube.width() / $videobox + "px"
    });
  });
  $('.videobox__play').click(function () {
    $('#modal__videobox').openModal();
  });
});