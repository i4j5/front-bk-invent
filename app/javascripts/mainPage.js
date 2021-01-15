const $ = require('jquery')

$(function() {
    setTimeout(function() {
        $('#modal-main-page').openModal()
    }, 10)
})


$('.drum-run').click(function(thst) {
    let $this = $('.drum');
    let sizeSection = 36

    let revs = Math.floor(Math.random() * sizeSection * 10)


    for (let index = 0; index <= revs; index++) {
        
        $this.css('transform', `rotate(${sizeSection*index}deg)`)

        $('.drum-run').hide()

        $('.drum-arrow').show()
        
    }

});