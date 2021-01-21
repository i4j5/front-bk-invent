"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = run;
var prefix = 'bkinvent_';
var page = {
  'url': '',
  'start': 0,
  'end': 0
};

function watcher() {
  page.end = Date.now(); //console.log('Watcher', page)
}

function save(inx, pageViewTracker) {
  var item = {
    'timeIntervals': [],
    'url': page.url
  };
  item.timeIntervals.push({
    'start': page.start,
    'end': page.end
  });

  if (inx === null) {
    pageViewTracker.push(item);
  } else {
    pageViewTracker[inx].timeIntervals.push(item.timeIntervals[0]);
  }

  var str = JSON.stringify(pageViewTracker);
  localStorage.setItem(prefix + 'pageViewTracker', str);
}

function run() {
  var pageViewTracker = localStorage.getItem(prefix + 'pageViewTracker');
  pageViewTracker = pageViewTracker ? JSON.parse(pageViewTracker) : [];
  page.url = document.location.href;
  page.start = Date.now();
  page.end = Date.now();
  var inx = null;
  pageViewTracker.forEach(function (item, index) {
    if (item.url === page.url) inx = index;
  });

  window.onbeforeunload = function () {
    save(inx, pageViewTracker);
  };

  setInterval(watcher, 500);
}