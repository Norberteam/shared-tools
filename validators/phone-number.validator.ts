import { AbstractControl, ValidatorFn } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

/**
 * Validate a phone number using the `libphonenumber-js` library.
 * https://dzone.com/articles/how-to-create-custom-validators-in-angular
 * @param country the country code to compare the number (usually the same as app.locale)
 */
export function ValidatePhoneNumber(country: any): ValidatorFn{
    return (control: AbstractControl) => {
        let phone = control.value && country ? parsePhoneNumberFromString(control.value.toString(), country) : null; //Making sure the phone number is in string before parsing.
        return !phone || phone && !phone.isValid() ? { invalidPhoneNumber: true } : null; //Sending `invalidPhoneNumber` error type if invalid
    }
}