import { forwardRef, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/*
    Following this tutorials to create custom form components
    that can be used within reactive forms and with ngModel:

    http://anasfirdousi.com/how-to-make-custom-angular-components-form-enabled-ngModel-enabled.html
    http://anasfirdousi.com/share-controlvalueaccessor-provider-creation-with-abstract-controlvalueaccessor-across-custom-form-enabled-angular-components.html
*/

export abstract class AbstractValueAcessor<T> implements ControlValueAccessor {
    _value: T = null;
    get value(): T { return this._value };
    set value(v: T){
        if(v !== this.value){
            this._value = v;
            this.onChange(v);
        }
    }

    writeValue(value: T){
        this._value = value;
        this.onChange(value);
    }

    onChange = (_) => {};
    onTouched = () => {};
    registerOnChange(fn: (_: T) => void): void { this.onChange = fn };
    registerOnTouched(fn: () => void): void { this.onTouched = fn };
}

export function MakeProvider(type: any){
    return{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    }
}