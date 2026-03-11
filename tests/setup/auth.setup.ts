import { test as setup} from '@playwright/test';
import { routesAPI } from '../../routes/routes';
import user from '../../.auth/user.json';
import fs from 'fs'

const authfile = '.auth/user.json';

setup('authentication', async ({request}) => {

    const response = await request.post(`${process.env.API_BASE_URL}${routesAPI.login}`, {
        data: {
            "email": "customer2@practicesoftwaretesting.com",
            "password": "welcome01"
        }
    })

    const responseBody = await response.json();
    const token = responseBody.access_token;
    user.origins[0].localStorage[0].value = token;
    fs.writeFileSync(authfile, JSON.stringify(user));
    process.env.ACCESS_TOKEN = token;
});