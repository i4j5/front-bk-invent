"use strict";

var $ = require('jquery');

var moment = require('moment');

moment.locale('ru');
$(function () {
  var url = document.location.pathname;
  var visits = localStorage.getItem('visits');
  var obj = JSON.parse(visits);

  if (obj === null || obj === '') {
    obj = {};
  }

  var $share = $('.share:first');

  if ($share.data('duration')) {
    var arr = $share.data('duration').split(' ');
    var now = moment();
    var time = now.toDate().getTime();

    if (obj[url]) {
      if (time <= obj[url]) {
        obj[url] = time;
        localStorage.setItem('visits', JSON.stringify(obj));
      } else {
        var thenTime = moment(time).add(arr[0], arr[1]).toDate().getTime();

        if (thenTime > obj[url]) {
          time = obj[url];
        }
      }
    } else {
      obj[url] = time;
      localStorage.setItem('visits', JSON.stringify(obj));
    }

    var then = moment(time).add(arr[0], arr[1]);
    $share.find('.share__duration:first').html(moment(then).format('LL'));
    $share.find('.share__difference:first').html('Акция закончится ' + now.to(then));
  }
});