"use strict";

var $ = require('jquery');

var rander = function rander(width) {
  $('.banner').each(function () {
    var $banner = $(this);
    var data = JSON.parse($banner.data('json'));
    $banner.attr('src', data);
  });
};

$(function () {
  rander($(window).width());
  $(window).resize(function () {
    rander($(this).width());
  });
});