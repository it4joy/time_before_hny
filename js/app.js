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