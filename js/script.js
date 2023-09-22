const fromCurrency = document.querySelector('.from select');
const toCurrency = document.querySelector('.to select');
const dropList = document.querySelectorAll('.drop-list select');
const getButton = document.querySelector('form button');
const exchangeIcon = document.querySelector('.drop-list .icon');

// Loop over the country_list to append options.
const defaultCurrencies = ['USD', 'RON'];
for (currency_code in country_list) {
    fromCurrency.insertAdjacentHTML('beforeend', `<option value="${currency_code}" ${currency_code === defaultCurrencies[0] ? 'selected' : ''}>${currency_code}</option>`);
    toCurrency.insertAdjacentHTML('beforeend', `<option value="${currency_code}" ${currency_code === defaultCurrencies[1] ? 'selected' : ''}>${currency_code}</option>`);
}

// Event listeners to update flags on select change.
dropList.forEach((select) => {
    select.addEventListener('change', e => {
        loadFlag(e.target);
    });
});

function loadFlag(element) {
    for (code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector('img');
            imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`
        }
    }
}

window.addEventListener('load', () => {
    getExchangeRate();
});

getButton.addEventListener('click', e => {
    e.preventDefault();
    getExchangeRate();
});

exchangeIcon.addEventListener('click', () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector('.amount input');
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    let url = `https://v6.exchangerate-api.com/v6/6d5b1548d6371063cc0a1c97/latest/${fromCurrency.value}`;
    fetch(url)
        .then(response => response.json())
        .then(result => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
            const exchangeRateText = document.querySelector('#rateDisplay');
            exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        });
}

