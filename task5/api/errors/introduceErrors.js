function introduceErrors(text, errorCount, locale) {
    const alphabets = {
        en: 'abcdefghijklmnopqrstuvwxyz', 
        ru: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя', 
        de: 'abcdefghijklmnopqrstuvwxyzäöüß', 
    };
    const alphabet = alphabets[locale] || alphabets.en;

    for (let i = 0; i < errorCount; i++) {
        const errorType = Math.floor(Math.random() * 3);
        switch (errorType) {
            case 0: 
                const deletePosition = Math.floor(Math.random() * text.length);
                text = text.slice(0, deletePosition) + text.slice(deletePosition + 1);
                break;
            case 1: 
                const addPosition = Math.floor(Math.random() * text.length);
                const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
                text = text.slice(0, addPosition) + randomChar + text.slice(addPosition);
                break;
            case 2: 
                if (text.length > 1) {
                    const swapPosition = Math.floor(Math.random() * (text.length - 1));
                    text = text.slice(0, swapPosition) +
                        text[swapPosition + 1] +
                        text[swapPosition] +
                        text.slice(swapPosition + 2);
                }
                break;
        }
    }
    return text;
}

export default introduceErrors;
