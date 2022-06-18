import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from "./i18n.service";
import { I18nKey } from "./i18n.token";
import { SafeAny } from "@/types";

@Pipe({
  name: 'i18n'
})
export class I18nPipe implements PipeTransform {

  constructor(private i18n: I18nService) {
  }

  transform(value: I18nKey, ...args: SafeAny[]): unknown {
    return this.i18n.get(value, ...args);
  }

}
