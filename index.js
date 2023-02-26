const puppeteer = require('puppeteer'); 
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const URL_TEST = 'https://yandex.ru/maps/';

async function searchstr(){
    console.log('Запуск браузера');sleep
    const browser = await puppeteer.launch({
        headless: false, // безголовый режим
        slowMo: 100,
        args: [`--window-size=1920,1080`],
        defaultViewport: {
            width:1920,
            height:1080
          }
    });

    console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();

    console.log('Переход по ссылке');
    await page.goto(URL_TEST);

    console.log('Ввода запроса в строке поиска');
    const hoursInput = await page.$('.input__control._bold');
    await hoursInput.type('улица Академика Сахарова, 2А');
    
    console.log('Скриншот');
    await page.screenshot({path: 'searchstr1.png'});

    console.log('Переход по запросу');
    await page.keyboard.press('Enter');
    await sleep(200);

    console.log('Ожидание элемента с результатом');
    await page.waitForSelector('.search-placemark-title__title');

    console.log('Получение строки с результатом');
    const text = await page.$eval('.search-placemark-title__title', element => element.textContent);

    console.log('Проверка условия тест-кейса');
    if (text.startsWith('улица Академика')) {
    console.log('Успех. Текст содержит: ' + text);
} else {
      console.log(`Ошибка. Текст не начинается со слова 'улица Академика'`)
}

    console.log('Скриншот2');
    await page.screenshot({path: 'searchstr2.png'});

    console.log('Закрытие браузера');
    await browser.close();

}

searchstr(); 