const $ = require('jquery')

$(function() {
    let analytic = window.VISIT

    if (!analytic.getCookie('bannerCaugh')) {
        $('#modal-banner').openModal()
        analytic.setCookie('bannerCaugh', '1',  600000)
    }
})