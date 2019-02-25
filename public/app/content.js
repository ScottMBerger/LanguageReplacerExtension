(function () {
    chrome.storage.sync.get('lessons', function (items) {
        console.log('WORDS: Settings retrieved', items);
        const words = Object.assign(...Object.values(items.lessons));
        start(words);
    });
}());
function start(words) {
    console.time('contentTimer')
    let dataStore = JSON.parse(localStorage.getItem('koreanData')) || {}
    var sortable = [];
    for (var count in dataStore) {
        sortable.push([count, dataStore[count]]);
    }

    var filterArr = []
    if (sortable.length > 20) {
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        for (let i = 0; i < 5; i++) {
            filterArr.push(sortable[i][0])
        }
    }

    var sheet = window.document.styleSheets[0];
    if (sheet) {
        sheet.insertRule('span.showHover{display:none;}', sheet.cssRules.length);
        sheet.insertRule('.koreanTranslate:hover span.showInitial{display:none;}', sheet.cssRules.length);
        sheet.insertRule('.koreanTranslate:hover span.showHover{display:inline;}', sheet.cssRules.length);
    }


    // Read it using the storage API

    console.log('words', words)
    var korean = [], english = [], counter = 0;

    for (word in words) {
        if (!filterArr.includes(word)) {
            english.push(word);
            korean.push(words[word]);
        }
    }

    function replaceBulk(str) {
        let i, regex = [], map = {}, map2 = {};
        for (i = 0; i < english.length; i++) {

            let englishWord = english[i].split('(')[0]
            regex.push(englishWord.replace(/([-[\]{}()*+?.\\^$|#,])/i, '\\$1'));
            map[english[i]] = korean[i];
            map2[englishWord] = english[i];
        }
        regex = regex.join('|');
        str = str.replace(new RegExp(regex, 'g'), matched => {
            counter++;
            dataStore[map2[matched]] = dataStore[map2[matched]] ? dataStore[map2[matched]] + 1 : 1;
            return '<strong class="koreanTranslate"><span class="showHover">' + map2[matched] + '</span><span class="showInitial">' + map[map2[matched]] + '</span></strong>'
        });
        return str;
    }

    const p = document.querySelectorAll('p');
    for (const original of p) {
        let intersection = new IntersectionObserver(
            entries => {
                if (entries[0].intersectionRatio > 0) {
                    original.innerHTML = replaceBulk(original.innerHTML);
                    console.log('replaced this one');
                    intersection.unobserve(original);
                }
            },
            {}
        );
        intersection.observe(original);
    }

    localStorage.setItem('koreanData', JSON.stringify(dataStore))
    console.timeEnd('contentTimer');
};
