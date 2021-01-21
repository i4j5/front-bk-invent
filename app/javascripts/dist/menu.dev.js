"use strict";

//==========
// МЕНЮ
//==========
var $ = require('jquery');

$(function () {
  var $nav = $('.nav');
  var $page = $('.page');
  $('.hamburger').click(function () {
    var $this = $(this);

    if ($this.hasClass('hamburger_open')) {
      $nav.removeClass('nav_active');
      $page.removeClass('menu-open');
      $this.removeClass('hamburger_open');
    } else {
      $nav.addClass('nav_active');
      $page.addClass('menu-open');
      $this.addClass('hamburger_open');
    }
  });
  $('.mobile-menu__link_arrow').click(function () {
    var $this = $(this);
    var $arrow = $this.children('.arrow');
    var $menu = $this.parent();
    var $submenu = $menu.children('.mobile-menu__submenu');

    if ($menu.hasClass('mobile-menu__item_active')) {
      $submenu.slideUp(450);
      $arrow.removeClass('arrow_top').addClass('arrow_bottom');
    } else {
      $submenu.slideDown(450);
      $arrow.removeClass('arrow_bottom').addClass('arrow_top');
    }

    $menu.toggleClass('mobile-menu__item_active');
  });
  $('.mobile-submenu__link_arrow').click(function () {
    var $this = $(this);
    var $arrow = $this.children('.arrow');
    var $menu = $this.parent();
    var $submenu = $menu.children('.mobile-submenu__submenu');

    if ($menu.hasClass('mobile-submenu__item_active')) {
      $submenu.slideUp(450);
      $arrow.removeClass('arrow_top').addClass('arrow_bottom');
    } else {
      $submenu.slideDown(450);
      $arrow.removeClass('arrow_bottom').addClass('arrow_top');
    }

    $menu.toggleClass('mobile-submenu__item_active');
  });
  var offsetFirstItem = $('.menu__item:first-child').offset().left;
  $('.menu__submenu').each(function () {
    var $this = $(this);
    var idx = Math.round($this.width() + $this.offset().left - offsetFirstItem);

    if (idx > 1160) {
      if ($this.width() > 1100) {
        // (!) Изменить
        $(this).css('left', "-".concat($this.offset().left - offsetFirstItem, "px"));
      } else if (580 > 1160 - ($this.offset().left - offsetFirstItem)) {
        $(this).css('right', '0').css('left', 'auto');
      } else {
        $(this).css('left', "-".concat(idx - 1160, "px"));
      }
    }
  });
  var heightBigMenu = 0;
  $('.big-menu__items').each(function () {
    var $this = $(this);
    var height = $this.height();

    if (height > heightBigMenu) {
      heightBigMenu = height;
    }
  });
  var $menu__MMs = $('.big-menu__mm');
  $menu__MMs.first().addClass('big-menu__mm_active');
  $menu__MMs.first().children('.arrow').removeClass('arrow_right').addClass('arrow_left');
  $menu__MMs.hover(function () {
    $menu__MMs.removeClass('big-menu__mm_active');
    $menu__MMs.children('.arrow').removeClass('arrow_left').addClass('arrow_right');
    $(this).addClass('big-menu__mm_active').children('.arrow').removeClass('arrow_right').addClass('arrow_left');
  });
  $('.big-menu').css('min-height', heightBigMenu + 20 + 'px');
  var $main = $('.main');
  var $fixedBlur = $('.fixed_blur');
  $('.menu__item').hover(function () {
    var $this = $(this);
    var $sub = $this.children('.menu__submenu_big');

    if ($sub.is(':visible')) {
      $sub.children('.big-menu').addClass('big-menu_active');
    }

    if ($this.is(':hover')) {
      $main.addClass('main_blur');
      $fixedBlur.addClass('fixed_blur_visible');
      $this.children('.arrow_theme_light').removeClass('arrow_bottom').addClass('arrow_top');
    }
  }, function (e) {
    var $this = $(this);
    var isHover = false;
    $('.menu__item>.arrow_theme_light').removeClass('arrow_top').addClass('arrow_bottom');
    $('.menu__item').each(function () {
      if ($(this).is(':hover')) {
        isHover = true;
      }
    });

    if (!isHover) {
      $main.removeClass('main_blur');
      $fixedBlur.removeClass('fixed_blur_visible');
    }

    $this.children('.menu__submenu_big').children('.big-menu').removeClass('big-menu_active');
  });
  var $topMenuItems = $('.top-menu__items');
  var $search = $('.top-menu__search');
  $('.top-menu__search-btn').click(function () {
    $topMenuItems.removeClass('top-menu__items_visible');
    $search.addClass('top-menu__search_visible');
  });
  $('.top-menu__close').click(function () {
    $topMenuItems.addClass('top-menu__items_visible');
    $search.removeClass('top-menu__search_visible');
  });
  var $topMenuItem = $('.top-menu__item');
  $topMenuItem.hover(function () {
    $(this).children('.top-menu__link').children('.arrow').removeClass('arrow_bottom').addClass('arrow_top');
  }, function (e) {
    var $this = $(this);
    $(this).children('.top-menu__link').children('.arrow').removeClass('arrow_top').addClass('arrow_bottom');
  });
});