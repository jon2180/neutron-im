import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzResultModule } from "ng-zorro-antd/result";
import { Provider } from "@angular/core";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { getLocaleInfo, LOCALE_CONF_TOKEN } from "@/components/i18n";
import { NzListModule } from "ng-zorro-antd/list";

export const I18N_CONFIG: Provider = {
  provide: LOCALE_CONF_TOKEN,
  useValue: getLocaleInfo()
};

export const USING_ZORRO_MODULES = [
  NzAvatarModule,
  NzDropDownModule,
  NzButtonModule,
  NzIconModule,
  NzLayoutModule,
  NzMenuModule,
  NzFormModule,
  NzInputModule,
  NzMessageModule,
  NzResultModule,
  NzSpaceModule,
  NzListModule
];
