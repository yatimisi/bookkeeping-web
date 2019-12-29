import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';


@Pipe({
  name: 'formErrors'
})
export class FormErrorsPipe implements PipeTransform {

  transform(value: FormControl): string[] {
    const errors = [];

    Object.keys(value.errors).forEach(key => {
      let message: string;
      const error = (value.errors[key]);

      switch (key) {
        case 'required':
          message = `這個欄位是必須填的.`;
          break;
        case 'min':
          message = `不能小於${error.min}.`;
          break;
        case 'max':
          message = `不能大於${error.max}.`;
          break;
        case 'minlength':
          message = `長度不能少於${error.requiredLength}.`;
          break;
        case 'maxlength':
          message = `長度不能大於${error.requiredLength}.`;
          break;
        case 'email':
          message = `這個欄位必須符合 email 的格式.`;
          break;
        default:
          message = `欄位錯誤: ${key}.`;
          break;
      }

      errors.push(message);
    });

    return errors;
  }
}


