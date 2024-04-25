// Используем динамический импорт для импорта node-fetch, чтобы модуль импортировался только при работе этого кода, а не на этапе загрузки
import('node-fetch')
.then(module => {
    const fetch = module.default; // Используем .default, так как node-fetch экспортирует fetch как дефолтный, мы получаем из всех значений которые мы импортировали именно нам нужный промис fetch
    const { createHash } = require('crypto');//импорт конкретного метода createHash из модуля crypto, который предоставляет функции для шифрования и хэширования данных.
    const AdmZip = require('adm-zip');//объект для работы с zip архивом
    // Функция для вычисления SHA3-256 хеша строки
    function calculateSHA3(input) {
        const hash = createHash('sha3-256');//создается объект хэша с помощью метода createHash
        hash.update(input);//обновляем хэш, добовляя к нему значение input
        return hash.digest('hex');// возвращает представление хэша в виде строки, где каждый байт хэша представлен двузначным шестнадцатеричным числом
    }

    // Функция для обработки архива
    async function processArchive(url) {
        try {
            // Загрузка архива
            const response = await fetch(url);
            
            // Извлечение содержимого архива
            const zip = new AdmZip(response.body);
            const zipEntries = zip.getEntries();

            // Массив для хранения хешей
            const hashes = [];

            // Вычисление SHA3-256 для каждого файла в архиве
            for (const entry of zipEntries) {
                if (!entry.isDirectory) {
                    const fileContent = entry.getData();
                    const hash = calculateSHA3(fileContent);
                    hashes.push(hash);
                }
            }

            // Сортировка хешей по возрастанию
            hashes.sort();

            // Объединение хешей в одну строку без разделителей
            const concatenatedHashes = hashes.join('');

            // Добавление e-mail
            const email = 'ivan.esin.78@mail.ru';
            const concatenatedStringWithEmail = concatenatedHashes + email.toLowerCase();

            // Вычисление и возврат SHA3-256 от полученной строки
            const finalHash = calculateSHA3(concatenatedStringWithEmail);
            return finalHash;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Вызов функции для обработки архива
    const archiveUrl = 'https://www.dropbox.com/s/oy2668zp1lsuseh/task2.zip?dl=1';
    processArchive(archiveUrl)
        .then(finalHash => console.log('Final SHA3-256 Hash:', finalHash))
        .catch(error => console.error('Error:', error));
});

