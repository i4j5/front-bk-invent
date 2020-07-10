const $ = require('jquery')
const moment = require('moment')
moment.locale('ru')

$(function() {

    let url = document.location.pathname
    let visits = localStorage.getItem('visits')

    let obj = JSON.parse(visits)

    if(obj === null || obj === '') {
        obj = {}
    }

    let $share = $('.share:first')

    if($share.data('duration')) {
        let arr = $share.data('duration').split(' ')
        
        let now = moment()
        let time = now.toDate().getTime()
        if(obj[url]) {
            if(time <= obj[url]) {
                obj[url] = time
                localStorage.setItem('visits', JSON.stringify(obj))
            } else {
                let thenTime = moment(time).add(arr[0], arr[1]).toDate().getTime()
                if(thenTime > obj[url]) {
                    time = obj[url]
                }
            }
        } else {
            obj[url] = time
            localStorage.setItem('visits', JSON.stringify(obj))
        }

        let then = moment(time).add(arr[0], arr[1]) 
        
        $share.find('.share__duration:first').html(moment(then).format('LL'))
        $share.find('.share__difference:first').html('Акция закончится ' + now.to(then))
    }

})