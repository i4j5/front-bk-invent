const $ = require('jquery')

const prefix  = 'i4j5_'

let url, select

let data = {
    visit: 0,
    first_visit: 0,
    google_client_id: '',
    metrika_client_id: '',
    landing_page: '',
    referrer: '',
    trace: '',
    phone: {
        number: '',
        ttl: '',
    },
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

    data.referrer = getLocalStorage('referrer') || setLocalStorage('referrer', document.referrer)
    data.landing_page = getLocalStorage('landing_page') || setLocalStorage('landing_page', document.location.href)

    // data.trace = b24Tracker.guest.getTrace()
    // let client = JSON.parse(data.trace).client
    // data.google_client_id = client.gaId
    // data.metrika_client_id = client.yaId
    
    let search = window.location.search

    if (search.match(/utm_source=/)) {
        data.utm.utm_source= search.split('utm_source=')[1].split('&')[0]

        if (search.match(/utm_medium=/))
            data.utm.utm_medium = search.split('utm_medium=')[1].split('&')[0]
        if (search.match(/utm_campaign=/))
            data.utm.utm_campaign = search.split('utm_campaign=')[1].split('&')[0]
        if (search.match(/utm_content=/))
           data.utm.utm_content = search.split('utm_content=')[1].split('&')[0]
        if (search.match(/utm_term=/))
           data.utm.utm_term = search.split('utm_term=')[1].split('&')[0]

        setLocalStorage('utm', JSON.stringify(data.utm))

    } else {
        let utm = getLocalStorage('utm')
        if(utm) data.utm = JSON.parse(utm)
    }

    //del UTM of URL

    data.first_visit = getLocalStorage('first_visit') || 0
    data.visit = getCookie('visit') || 0

    if (data.visit) {
        send(data)
    } else {
        send(data, 'init')
    }
}

/**
 * Отправка данных на сервер
 * @param {object} data 
 * @param {string} type
 */
function send(data, type = 'update') {

    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'json', 
        processData: false,
    })
    .done(function(res) {

        res = {
            data: {
                visit: 1,
                first_visit: 1,
                phone: {
                    number: '1232123123',
                    ttl: 12321312312,
                }
            }
        }

        if (type == 'init') {
            data.visit =  res.data.visit
            data.first_visit =  res.data.first_visit
            setCookie('visit', res.data.visit)
            setLocalStorage('first_visit', res.data.first_visit)
        } 

        if (res.data.phone) substitutionNumber(res.data.phone)
        
    })
    .always(function() {
       //END
       console.log(data)
    })
}


function substitutionNumber(phone) {
    $(select).html(phone.number)
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + prefix + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

function setCookie(name, value) {
    document.cookie = prefix + name + "=" + value
    return value
}

function getLocalStorage(name) {
    return localStorage.getItem(prefix + name)
}

function setLocalStorage(name, value) {
    localStorage.setItem(prefix + name, value)
    return value
}




function intervalCheck(callback, maxTimeout) {
    if (callback()) {
        return;
    }
    var checks = 0,
        interval = 50,
        maxChecks = (maxTimeout || 2000) / interval,
        t = setInterval(function () {
            if (callback() || ++checks > maxChecks) {
                clearInterval(t);
            }
        }, interval);
}