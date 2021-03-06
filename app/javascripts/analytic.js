const $ = require('jquery')

const prefix  = 'bkinvent_'

let url, select

let data = {
    visit: 0,
    first_visit: 0,
    google_client_id: '',
    metrika_client_id: '',
    landing_page: '',
    referrer: '',
    trace: '',
    roistat: '',
    phone: {
        number: '',
        ttl: '',
    },
    
    page_view_tracker: [],

    utm: {
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_content: '',
        utm_term: '',
    },
}

/**
 *  Init Analytic
 * @param {object} options 
 */
export default function init(options) {

    url = options.url
    select = options.select

    // let page = []
    // page.push(document.location.href)
    // page.push(Date.now())
    // page.push(document.title)

    // let pages = getLocalStorage('pages') ? JSON.parse(getLocalStorage('pages')) : []   

    // pages.forEach((item, index) => {
    //     if (item[0] === page[0]) pages.splice(index, 1)
    // })

    // pages.push(page)
    // setLocalStorage('pages', JSON.stringify(pages))

    let search = window.location.search

    data.first_visit = getLocalStorage('first_visit') || 0
    data.visit = getCookie('visit') || 0

    if (data.visit == 0) {
        setLocalStorage('referrer', '')
        setLocalStorage('landing_page', '')
        setLocalStorage('utm', '')
    }

    if (document.referrer && (document.referrer.split('/')[2] != window.location.hostname)) {
        data.referrer = setLocalStorage('referrer', document.referrer)
        setLocalStorage('utm', '')
        data.landing_page = setLocalStorage('landing_page', document.location.hostname + document.location.pathname)
        data.visit = 0
    } else {
        data.referrer = getLocalStorage('referrer')
        data.landing_page = getLocalStorage('landing_page') || setLocalStorage('landing_page', document.location.hostname + document.location.pathname)
    }
    
    let google_client_id = getCookie('_ga', false)
    let metrika_client_id = getCookie('_ym_uid', false)

    // data.roistat = getCookie('roistat_visit', false)

    if (google_client_id) data.google_client_id = google_client_id.split('.').slice(-2).join('.')
    if (metrika_client_id) data.metrika_client_id = metrika_client_id

    if (search.match(/utm_source=/)) {

        let old_utm = getLocalStorage('utm') ? JSON.parse(getLocalStorage('utm')) : {}

        data.utm.utm_source = search.split('utm_source=')[1].split('&')[0]

        if (data.visit && (data.utm.utm_source != old_utm.utm_source) ) data.visit = 0 // ???

        // TODO Проверка всех значений 

        if (search.match(/utm_medium=/))
            data.utm.utm_medium = search.split('utm_medium=')[1].split('&')[0]
        if (search.match(/utm_campaign=/))
            data.utm.utm_campaign = search.split('utm_campaign=')[1].split('&')[0]
        if (search.match(/utm_content=/))
           data.utm.utm_content = search.split('utm_content=')[1].split('&')[0]
        if (search.match(/utm_term=/))
           data.utm.utm_term = decodeURI(search.split('utm_term=')[1].split('&')[0])

        setLocalStorage('utm', JSON.stringify(data.utm))
    } else {
        let utm = getLocalStorage('utm')
        if (utm) data.utm = JSON.parse(utm)
    }

    if (data.visit) {
        //send(data)
        intervalCheck()
    } else {
        send(data, 'create')
    }

    // intervalCheck() 

    return {
        send, 
        substitutionNumber,
        getCookie,
        setCookie,
        getLocalStorage,
        setLocalStorage,
        getData,
    }
}

/**
 * Отправка данных на сервер
 * @param {object} data 
 * @param {string} type
 */
function send(data, type = 'update') {

    $.ajax({
        url: url + '/' + type + '-visit',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'json', 
        processData: false,
    })
    .done(function(res) {

        if (res.error == undefined) {
            if (type == 'create') {
                data.visit =  res.data.visit
                data.first_visit =  res.data.first_visit
                setCookie('visit', res.data.visit, 86400e3)
                setLocalStorage('first_visit', res.data.first_visit)

                intervalCheck() 
            }

            if (data.phone != false) data.phone = res.data.phone

            if (data.phone) substitutionNumber()
        } else {
            send(data, 'create')
        }
        
    })
    .always(function(res) {
       //END
    //    console.info('INFO', data, res)
    })
}

/**
 * Замена телефона
 * @param {string} phone 
 */
function substitutionNumber() {

    let number = data.phone.number
                    .replace(/\s{2,}/g, '')
                    .substring(0).replace(/(\d)(\d\d\d)(\d\d\d)(\d\d)(\d\d)/, '8 ($2) $3-$4-$5')

    $(select).each(function () {
        let $this = $(this)

        $this.html(number)

        if ($this.get(0).tagName === 'A') {
            $this.attr('href', 'tel:+' + data.phone.number)
        }
    })
    
}

function getCookie(name, _private = true) {
    let _prefix = _private ? prefix : ''

    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + _prefix + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

function setCookie(name, value, date) {
    let str = prefix + name + '=' + value

    if (data) {
        str = str + '; expires=' + (new Date(Date.now() + date).toUTCString())
    }

    document.cookie = str
    return value
}

function getLocalStorage(name) {
    return localStorage.getItem(prefix + name)
}

function setLocalStorage(name, value) {
    localStorage.setItem(prefix + name, value)
    return value
}

function getData() {
    return data
}

function getAsynсData() {

    if (data.metrika_client_id && data.google_client_id && data.roistat) {
        return true
    }

    if (!data.roistat) {
        data.roistat = getCookie('roistat_visit', false)
    }

    if (!data.google_client_id) {
        let google_client_id = getCookie('_ga', false)
        if (google_client_id) data.google_client_id = google_client_id.split('.').slice(-2).join('.')
    }

    if (!data.metrika_client_id) {
        let metrika_client_id = getCookie('_ym_uid', false)
        if (metrika_client_id) data.metrika_client_id = metrika_client_id
    }

	return false
}

function intervalCheck() {
    let checks = 0
    let interval = 50
    let maxTimeout = 3000
    
    data.page_view_tracker = getLocalStorage('pageViewTracker')

    let maxChecks = maxTimeout / interval, 

    t = setInterval(function () {

        if (getAsynсData() || ++checks > maxChecks) {
            send(data)

            // let searchArr = window.location.search.substr(1).split('&')

            // if (searchArr[0]) {
            //     let newSearch = '?'
            //     $.each( searchArr, function( key, value ) {
            //         if(!value.match(/utm_/)) {
            //             newSearch = newSearch + value + '&'
            //         } 
            //     })
                
            //     newSearch = newSearch.substring(0, newSearch.length - 1)
            //     window.history.replaceState(null, null, document.location.pathname + newSearch)
            // }

            clearInterval(t)
        } 
    }, interval)
}