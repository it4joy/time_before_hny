const daysWrapper = document.querySelector('.days__wrapper');
const phraseWrapper = document.querySelector('.phrase__wrapper');

// make a request to the API via AJAX
let xhr = new XMLHttpRequest();

xhr.open('GET', 'http://t-b-hny/api/?action_1=getTime&action_2=getRandomPhrase');

xhr.send();

xhr.onload = () => {
    if (xhr.status != 200) {
        alert(`Error: ${xhr.status}: ${xhr.statusText}.`);
    } else {
        let json = xhr.response;
        let jsonParsed = JSON.parse(json);

        daysWrapper.textContent = String(jsonParsed[0]);
        phraseWrapper.textContent = jsonParsed[1];
    }
};

xhr.onerror = () => {
    alert('The request is failed...');
};

const body = document.body;
const themeSwitcherWrapper = document.querySelector('.theme-switcher__wrapper');

themeSwitcherWrapper.onclick = () => {
    body.classList.toggle('dark');
};

const animPhraseWrapper = document.querySelector('.animated-phrase__wrapper');
const animPhraseArr = new Array('O', 'h', ',', ' ', 'T', 'i', 'm', 'e', '.', '.', '.');

let counter = 0;

setInterval(
    () => {
        if (counter < animPhraseArr.length) {
            const tmpCharWrapper = document.createElement('span');
            tmpCharWrapper.textContent = animPhraseArr[counter];
            animPhraseWrapper.insertAdjacentElement('beforeend', tmpCharWrapper);
        }

        counter++;
    },
    1000
);

// Q: is it necessary: counter to zero?
//counter = 0;

// outputs current date & time (hh.mm) in the footer
// N: use west date & time notation for ENG locale
const timeWrapper = document.querySelector('.current-time__wrapper');

const curTime = new Date();
const curYear = curTime.getFullYear();
const curMonth = curTime.getMonth() + 1; // from 0 to 11, so: '+ 1';
const curDayOfMonth = curTime.getDate();
const curHour = curTime.getHours();
const curMin = curTime.getMinutes();

const timeForOutput = curDayOfMonth + '-' + curMonth + '-' + curYear + ', ' + curHour + ':' + curMin + '.';
timeWrapper.textContent = timeForOutput;

// update the phrase
const btnUpdPhrase = document.querySelector('.btn-upd-phrase');

btnUpdPhrase.onclick = () => {
    xhr.open('GET', 'http://t-b-hny/api/?action_2=getRandomPhrase');

    xhr.send();

    xhr.onload = () => {
        if (xhr.status != 200) {
            alert(`Error: ${xhr.status}: ${xhr.statusText}.`);
        } else {
            let json = xhr.response;
            let jsonParsed = JSON.parse(json);

            // N: it's an uncertainty: we use index 0 in this case because there is only one param in the AJAX request though
            // 'phrase' initially has an index 1.
            phraseWrapper.textContent = jsonParsed[0];
        }
    };

    xhr.onerror = () => {
        alert('The request is failed...');
    };
};

// call the features guide
const tooltip = document.querySelector('.tooltip__wrapper');
const tooltipText = tooltip.querySelector('.tooltip-text');
const btnFeatureGuide = document.querySelector('.btn-feature-guide');
const btnFeatureGuideNext = document.querySelector('.btn-feature-guide-next');
const btnFeatureGuideClose = document.querySelector('.btn-feature-guide-close');

const themeSwitcherCoords = themeSwitcherWrapper.getBoundingClientRect();
const btnUpdPhraseCoords = btnUpdPhrase.getBoundingClientRect();

// test => OK
console.log('height: ' + btnUpdPhraseCoords.height);
console.log('top: ' + btnUpdPhraseCoords.top);

let isGuideActive = false;
let stepCounter = 0;

const tooltipConfig = {
    coordsChanging: [themeSwitcherCoords, ],
    stepFirst: {
        el: themeSwitcherWrapper,
        right: parseInt(themeSwitcherCoords.right, 10) - 250, // `parseInt()` perhaps redundant, see fn signature
        top: parseInt(themeSwitcherCoords.bottom, 10) + 15,
        text: 'You can toggle the color mode'
    },
    stepSecond: {
        el: btnUpdPhrase,
        right: parseInt(btnUpdPhraseCoords.right, 10) - 250,
        top: btnUpdPhraseCoords.top,
        text: 'Update the phrase about time'
    },
};

const setTooltipLocation = (step) => {
    if (step === 1) {
        tooltipText.textContent = tooltipConfig.stepFirst.text;

        tooltip.style.left = tooltipConfig.stepFirst.right + 'px';
        tooltip.style.top = tooltipConfig.stepFirst.top + 'px';
    } else if (step === 2) {
        tooltipText.textContent = tooltipConfig.stepSecond.text;
        const tooltipTop = tooltipConfig.stepSecond.top - tooltip.offsetHeight - 15;

        tooltip.style.left = tooltipConfig.stepSecond.right + 'px';
        tooltip.style.top = tooltipTop + 'px';
    }
};

btnFeatureGuide.onclick = () => {
    tooltip.classList.toggle('d-none');
    tooltip.classList.toggle('d-flex-col');
    
    if (isGuideActive === false) {
        isGuideActive = true;
        stepCounter++;
        // test
        console.log(stepCounter);

        setTooltipLocation(stepCounter);
    }

    //tooltip.classList.toggle('d-none');
    //tooltip.classList.toggle('d-flex-col');
};

btnFeatureGuideNext.onclick = () => {
    stepCounter++;
    // test
    console.log(stepCounter);

    setTooltipLocation(stepCounter);
};

btnFeatureGuideClose.onclick = () => {
    stepCounter = 0;
    // set init location
    setTooltipLocation(1);

    isGuideActive = false;
    
    tooltip.classList.toggle('d-none');
    tooltip.classList.toggle('d-flex-col');
};