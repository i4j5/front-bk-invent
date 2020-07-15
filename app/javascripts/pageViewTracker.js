const prefix  = 'bkinvent_'

const page = {
    'url': '',
    'start': 0,
    'end': 0
}


function watcher() {
    page.end = Date.now()

    //console.log('Watcher', page)
}

function save(inx, pageViewTracker) {
    let item = {
        'timeIntervals': [],
        'url': page.url
    }

    item.timeIntervals.push({
        'start': page.start,
        'end': page.end
    })

    if (inx === null) {
        pageViewTracker.push(item)
    } else {
        pageViewTracker[inx].timeIntervals.push(item.timeIntervals)
    }

    let str = JSON.stringify(pageViewTracker)
    localStorage.setItem(prefix+'pageViewTracker',  str)
}

export default function run() {
    let pageViewTracker = localStorage.getItem(prefix+'pageViewTracker')
    pageViewTracker = pageViewTracker ? JSON.parse(pageViewTracker) : []

    page.url = document.location.href
    page.start = Date.now()
    page.end = Date.now()

    let inx = null
    pageViewTracker.forEach((item, index) => {
        if (item.url === page.url) inx = index
    })

    save(inx, pageViewTracker)

    window.addEventListener('onbeforeunload', function() {
        save(inx, pageViewTracker)
    })


    setInterval(watcher, 500);

}
