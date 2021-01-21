"use strict";

var $ = require('jquery');

$(function () {
  setTimeout(function () {
    $('#modal-main-page').openModal();
  }, 10);
});
$('.drum-run').click(function (thst) {
  var $this = $('.drum');
  var sizeSection = 36;
  var revs = Math.floor(Math.random() * sizeSection * 10);

  for (var index = 0; index <= revs; index++) {
    $this.css('transform', "rotate(".concat(sizeSection * index, "deg)"));
    $('.drum-run').hide();
    $('.drum-arrow').show();
  }
});