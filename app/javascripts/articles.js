const $ = require('jquery')
const moment = require('moment')

moment.locale('ru')

$(function() {

    $('.articles__date').each((index, el) => {
        let $this = $(el)
        let date = moment($this.html(), "DDMMYYYY")
        $this.html(moment(date).format('LL'))
    })

})