(function () {
    chrome.storage.sync.get(null, function (items) {
        let currentDomain = document.domain;
        currentDomain = currentDomain.split('.')
        if (currentDomain.length > 2) {
            currentDomain.splice(0, 1)
        }
        currentDomain = currentDomain.join('.');
        if (!items.global && !items.domains.includes(currentDomain)) {
            console.log('content not allowed by user ')
            chrome.runtime.sendMessage({
                action: 'updateIcon',
                value: false
            });
            return;
        }
        chrome.runtime.sendMessage({
            action: 'updateIcon',
            value: true
        });
        const lessons = []
        for (const lang of items.languages) {
            for (const lesson of lang.lessons) {
                lessons.push(items[lang.name + ' - ' + lesson])
            }
        }

        let selectedLessons = []
        for (const lesson of lessons) {
            if (lesson.selected && lesson.active) {
                selectedLessons = [...selectedLessons, ...lesson.words]
            }
        }

        start(selectedLessons);
    });
}());

function start(words) {
    console.time('contentTimer');
    let dataStore = JSON.parse(localStorage.getItem('languageData')) || {}
    let sortable = [];
    for (let count in dataStore) {
        sortable.push([count, dataStore[count]]);
    }

    let filterArr = []
    if (sortable.length > 20) {
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        for (let i = 0; i < 5; i++) {
            filterArr.push(sortable[i][0])
        }
    }

    // let sheet = window.document.styleSheets[0];
    // if (sheet) {
    //     sheet.insertRule('span.showHover{display:none;}');
    //     sheet.insertRule('.languageTranslate:hover span.showInitial{display:none;}');
    //     sheet.insertRule('.languageTranslate:hover span.showHover{display:inline;}');
    // }


    let language = [], english = [], counter = 0;

    for (const word of words) {
        if (!filterArr.includes(word)) {
            english.push(word.input);
            language.push(word.output);
        }
    }

    function replaceBulk(str) {
        let i, regex = [], map = {}, map2 = {};
        for (i = 0; i < english.length; i++) {

            let englishWord = english[i].split('(')[0]
            regex.push(englishWord.replace(/([-[\]{}()*+?.\\^$|#,])/i, '\\$1'));
            map[english[i]] = language[i];
            map2[englishWord] = english[i];
        }
        regex = regex.join('|');
        str = str.replace(new RegExp(regex, 'g'), matched => {
            counter++;
            dataStore[map2[matched]] = dataStore[map2[matched]] ? dataStore[map2[matched]] + 1 : 1;
            return '<strong class="languageTranslate"><span class="showHover">' + map2[matched] + '</span><span class="showInitial">' + map[map2[matched]] + '</span></strong>'
        });
        return str;
    }

    const p = document.querySelectorAll('p');
    for (const original of p) {
        let intersection = new IntersectionObserver(
            entries => {
                if (entries[0].intersectionRatio > 0) {
                    original.innerHTML = replaceBulk(original.innerHTML);
                    intersection.unobserve(original);
                }
            },
            {}
        );
        intersection.observe(original);
    }

    localStorage.setItem('languageData', JSON.stringify(dataStore))
    console.timeEnd('contentTimer');
};

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'scrapeMemrise') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(document.all[0].outerHTML);
    }
});