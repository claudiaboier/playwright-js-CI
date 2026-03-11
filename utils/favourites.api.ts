import { APIRequestContext } from "@playwright/test";
import { routesAPI } from "../routes/routes";

type FavouriteItems = string[];
const MAX_ATTEMPTS = 3

export async function getFavourites(request: APIRequestContext) {

    for (let i = 1; i <= MAX_ATTEMPTS; i++) {
        const response = await request.get(`${process.env.API_BASE_URL}${routesAPI.getFavourites}`);
        const responseBody = await response.json()

        const favouriteItems: FavouriteItems = []

        for (const item of responseBody) {
            favouriteItems.push(item.id)
        }

        if (favouriteItems.length > 0) {
            return favouriteItems;
        }

        await new Promise(res => setTimeout(res, 500));
    }

    return [];
}

export async function deleteFavourite(favouriteItems: string[], request: APIRequestContext) {

    if (favouriteItems.length > 0) {
        for (const id of favouriteItems) {
            const response = await request.delete(`${process.env.API_BASE_URL}${routesAPI.deleteFavourite(id)}`);
            console.log((`${process.env.API_BASE_URL}${routesAPI.deleteFavourite(id)}`))
            console.log(response.status())
        }
    }
}

