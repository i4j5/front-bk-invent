const $ = require('jquery')

// Массив призов
const data = [
  {
    num: 1,
    title: '1',
    code: '111'
  },
  {
    num: 2,
    title: '2',
    code: '222'
  },
  {
    num: 3,
    title: '3',
    code: '333'
  },
  {
    num: 4,
    title: '4',
    code: '444'
  },
  {
    num: 5,
    title: '5',
    code: '555'
  },
  {
    num: 6,
    title: '6',
    code: '666'
  },
  {
    num: 7,
    title: '7',
    code: '777'
  },
  {
    num: 8,
    title: '8',
    code: '888'
  }
]

$(function() {

  // Логика клопки с подарком!
  // Логика Автогапуска 
  // localStorage.getItem('test')

    let $modalGameRoulette = $('#modal__game-roulette')
    let $modalGameRouletteRun = $('.game-roulette-run')
    let $modalGameRouletteCode = $('#game-roulette-code')

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
                alert("Ваш промокод: " + element.title)
                // $modalGameRoulette.openModal() // Убрать
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
            console.log(num)
            localStorage.setItem('gameRouletteNum', num);
            let code = null 
            data.forEach(el => {
                if (el.num == num) {
                    code = el.code
                }
            })
            $modalGameRouletteCode.html('Ваш промокод: ' + code)
            // $modalGameRoulette.closeModal()
            // $modalGameRoulette.closeModal()
        }
    })

    let $gameRouletteBtnRun  = $('#gameRouletteBtnRun')

    let run = true;
    $gameRouletteBtnRun.click(function() {
      
      if (run) {
        let n = (8 * Math.random() | 0);
        num = [1, 2, 3, 4, 5, 6, 7, 8][n];
        // num = 7
        anim.play(360 * 3 + num * l)
        run = false
        $gameRouletteBtnRun.css('display', 'none')
      }
    })
})