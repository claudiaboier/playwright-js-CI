import { getFavourites } from "../utils/favourites.api"

export const routesUI = {
    registration: '/auth/register',
    login: '/auth/login',
    myAccount: '/account',
}

export const routesAPI = {
    login: '/users/login',
    getFavourites: '/favorites',
    deleteFavourite: (id: string) => `/favorites/${id}`,
}