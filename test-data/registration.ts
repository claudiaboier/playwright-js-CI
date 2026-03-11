import { faker } from "@faker-js/faker";

export const registration = {
    'first-name': 'John',
    'last-name': 'Doe',
    'dob': '1990-10-08',
    'street': '123 Main St',
    'postal_code': '12345',
    'city': 'Anytown',
    'state': 'Romania',
    'country': 'Romania',
    'phone': '1234567890',
    'email': `${faker.internet.email()}`,
    'password': `Password${faker.number.int({ max: 100000 })}!@#`,
}

export const mandatoryFields = [
    'first-name',
    'last-name',
    'dob',
    'street',
    'postal_code',
    'city',
    'state',
    'country',
    'phone',
    'email',
    'password'
] as const

export const errors = {
    'first-name': 'First name is required',
    'last-name': 'Last name is required',
    'dob': 'Date of Birth is required',
    'street': 'Street is required',
    'postal_code': 'Postcode is required',
    'city': 'City is required',
    'state': 'State is required',
    'country': 'Country is required',
    'phone': 'Phone is required.',
    'email': 'Email is required',
    'password': 'Password is required',
    'password-minimum': 'Password must be minimal 6 characters long.'
}

