"use strict";

var $ = require('jquery');

var moment = require('moment');

moment.locale('ru');
$(function () {
  $('.blog__data').each(function (index, el) {
    var $this = $(el);
    var date = moment($this.html(), "DDMMYYYY");
    $this.html(moment(date).format('LL'));
  });
  var $items = $('.blog__item');
  var n = 4;
  var i = 1;
  $items.each(function (index) {
    console.log(n, i);

    if (i === 4 && n === 4) {
      $(this).addClass('blog__item_big');
      n = 3;
      i = 1;
    } else if (i === 3 && n === 3) {
      $(this).addClass('blog__item_big');
      n = 4;
      i = 1;
    } else {
      i++;
    }
  });
});