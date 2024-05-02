import express from 'express';
import { faker as fakerDE } from '@faker-js/faker/locale/de'; 
import { faker as fakerRU } from '@faker-js/faker/locale/ru'; 
import { faker as fakerEN_US } from '@faker-js/faker/locale/en_US'; 
import introduceErrors from '../errors/introduceErrors.js';

const router = express.Router();

router.post('/generate-data', (req, res) => {
    const { seed, region, errors, pageNumber } = req.body;

    let fakerInstance, locale;
    switch (region) {
        case 'Germany':
            fakerInstance = fakerDE;
            locale = 'de';
            break;
        case 'USA':
            fakerInstance = fakerEN_US;
            locale = 'en';
            break;
        case 'Russia':
            fakerInstance = fakerRU;
            locale = 'ru';
            break;
        default:
            fakerInstance = fakerEN_US; 
            locale = 'en';
            break;
    }

    fakerInstance.seed(parseInt(seed) + pageNumber);

    const data = [];
    const startId = (pageNumber - 1) * 20 + 1;
    for (let i = 0; i < 20; i++) {
        let name = fakerInstance.person.fullName();
        let address = fakerInstance.location.streetAddress(true);
        let phone = fakerInstance.phone.number(); 
    
        if (errors > 0) {
            name = introduceErrors(name, Math.min(errors, name.length), locale);
            address = introduceErrors(address, Math.min(errors, address.length), locale);
            phone = introduceErrors(phone, Math.min(errors, phone.length), locale);
        }
    
        const element = {
            id: startId + i, 
            identifier: fakerInstance.datatype.uuid(),
            name: name,
            address: address,
            phone: phone
        };
        data.push(element);
    }

    res.json(data);
});

export default router;
