const $ = require('jquery')

// Массив призов
const data = [
  {
    num: 1,
    title: '1000 руб в подарок',
    code: 'B5TLRJEM'
  },
  {
    num: 2,
    title: 'Набор сувениров для встречи нового года (елка, календарь, кружка)',
    code: '6IRLQ189'
  },
  {
    num: 3,
    title: '700 руб в подарок',
    code: 'KX5LX7F2'
  },
  {
    num: 4,
    title: 'Набор для подготовки к новому году (блокнот, ручка, рецепт оливье)',
    code: 'YE83ZAKY'
  },
  {
    num: 5,
    title: '-10% на все услуги (* сумма скидки не более 5000 руб)',
    code: 'QN0P6FE7'
  },
  {
    num: 6,
    title: 'Консультация деда мороза или снегурочки',
    code: 'PRISSDK2'
  },
  {
    num: 7,
    title: '500 руб в подарок',
    code: '853U87AA'
  },
  {
    num: 8,
    title: 'Чудо - послание от БК инвент',
    code: '1K2DGH4U'
  }
]

$(function() {

  // Логика клопки с подарком!
  // Логика Автогапуска 
  // localStorage.getItem('test')

    let $modalGameRoulette = $('#modal__game-roulette')
    let $modalGameRouletteCode = $('#modal__game-roulette-code')
    let $modalGameRouletteRun = $('.game-roulette-run')
    let $gameRouletteForm = $('#gameRouletteForm')
    
    let $gameRouletteLogo = $('#game-roulette-logo')
    let $gameRouletteBtn = $('#game-roulette-btn')

    $modalGameRouletteRun.click(function() {

        let gameRouletteNum = localStorage.getItem('gameRouletteNum')

        let element = null
    
        if (gameRouletteNum) {
    
            data.forEach(el => {
                if (el.num == gameRouletteNum) {
                    element = el
                }
            })
    
            if(element) {
                let html = `<h3 style=" color: #4274d6; margin-bottom: 13px; ">Ваш приз</h3><b>${element.title}</b> <br><br><br> Ваш промокод: 
                <b><spsn style="
                    border: 2px dashed #f2c37f;
                    padding: 5px 8px;
                    margin-left: 4px;
                ">${element.code}</span></b>`
                $('#game-roulette-code-html').html(html);
                $modalGameRouletteCode.openModal()
            } else {
                $modalGameRoulette.openModal()
            }
        } else {
            $modalGameRoulette.openModal()
        }    

    })

    function timer(a) {
        return {
          play: function(c) {
            var d = performance.now();
            c = c || a.to;
            requestAnimationFrame(function e(b) {
              b = (b - d) / a.duration;
              1 <= b && (b = 1);
              a.elem.style.transform = "rotate(" + (a.from + (c - a.from) * b | 0) % 360 + "deg)";
              1 == b && a.callback && a.callback();
              1 > b && requestAnimationFrame(e)
            })
          }
        }
    };
    
    let div = document.querySelector('.game-roulette__logo')
    let num = 0;

    let l = (360 / 8)

    let anim = timer({
        from: 0,
        to: 360 * 3 + l * 5,
        // to: 360,
        duration: 2 * 1000,
        elem: div,
        callback: function() {
            // console.log(num)
            localStorage.setItem('gameRouletteNum', num);
            
            let element = null 
            
            data.forEach(el => {
                if (el.num == num) {
                  element = el
                }
            })
            // $('#game-roulette-code').html(
            //   `Ваш промокод: 
            //   <b><span style="
            //       border: 2px dashed #f2c37f;
            //       padding: 5px 8px;
            //       margin-left: 4px;;
            //     ">${code}</span></b><br><br>`
            // )


            // let element
            // data.forEach(el => {
            //     if (el.num == gameRouletteNum) {
            //         element = el
            //     }
            // })
    
            let html = `<h3 style=" color: #4274d6; margin-bottom: 13px; ">Ваш приз</h3><b>${element.title}</b> <br><br> Ваш промокод: 
            <b><spsn style="
                border: 2px dashed #f2c37f;
                padding: 5px 8px;
                margin-left: 4px;
            ">${element.code}</span></b><br><br>`
            
            $('#game-roulette-code').html(html);

            $('#modal__game-roulette-form').openModal()
            // $modalGameRoulette.closeModal()
            // $modalGameRoulette.closeModal()
        }
    })

    $gameRouletteBtn.click(function() {
      $gameRouletteLogo.css('display', 'block')
      $gameRouletteBtn.css('display', 'none')

      let n = (8 * Math.random() | 0);
      num = [1, 2, 3, 4, 5, 6, 7, 8][n];
      // num = 8
      anim.play(360 * 3 + num * l)
      // run = false
      // $gameRouletteForm.css('display', 'none')

      let element
      data.forEach(el => {
        if (el.num == num) {
          element = el
        }
      })

      $('#gameRouletteOrder').val(`Акция: ${element.title} Промокод: ${element.code} `)
      
    })

    // let $gameRouletteBtnRun  = $('#gameRouletteBtnRun')

    // let run = true;
    // $gameRouletteBtnRun.click(function() {


    //   $gameRouletteForm.submit(function( event ){ 
    //     event.preventDefault()
    //     let $phone = $('#gameRouletteForm [name="phone"]')

    //     if ($phone.val().length >= 10) {

    //         if (run) {
    //         let n = (8 * Math.random() | 0);
    //         num = [1, 2, 3, 4, 5, 6, 7, 8][n];
    //         // num = 7
    //         anim.play(360 * 3 + num * l)
    //         run = false
    //         $gameRouletteForm.css('display', 'none')

    //         let element
    //         data.forEach(el => {
    //           if (el.num == num) {
    //               element = el
    //           }
    //         })

    //         $('#gameRouletteOrder').val(`Акция: ${element.title} Промокод: ${element.code} `)

    //         $gameRouletteForm.submit();
    //       }

    //     }

    //   })

    //   $gameRouletteForm.submit();
      
      
      // if (run) {
      //   let n = (8 * Math.random() | 0);
      //   num = [1, 2, 3, 4, 5, 6, 7, 8][n];
      //   // num = 7
      //   anim.play(360 * 3 + num * l)
      //   run = false
      //   $gameRouletteForm.css('display', 'none')

      //   let element
      //   data.forEach(el => {
      //       if (el.num == num) {
      //           element = el
      //       }
      //   })

      //   $('#gameRouletteOrder').val(`Акция: ${element.title} Промокод: ${element.code} `)

      //   $gameRouletteForm.submit();
      // }

    })
// });