import type { TMes } from '@/models/TMes';

export class Helper {
    static base64Encode(str: string | object) {
        return btoa(JSON.stringify(str));
    }

    static base64Decode(str: string) {
        return JSON.parse(atob(str));
    }

    static handleCreateOrSaveMessage(message: TMes) {
        const data = sessionStorage.getItem('messages-admin');

        if (data) {
            const values = JSON.parse(data) as TMes[];
            sessionStorage.setItem('messages-admin', JSON.stringify([...values, message]));
        } else {
            sessionStorage.setItem('messages-admin', JSON.stringify([message]));
        }
    }

    static formatVND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    static isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }
}
