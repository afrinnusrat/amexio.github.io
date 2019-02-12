
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DisplayFieldComponent } from './display-field/display-field.component';
import { DropDownListComponent } from './dropdownlist.component';

import { FilterPipe } from '../pipe/filter.pipe';
import { IconLoaderService } from '../services/icon/icon.service';
import { CommonIconComponent } from './components/common.icon.component';

export * from './display-field/display-field.component';
export * from './components/common.icon.component';
export * from './dropdownlist.component';
const COMMON_COMPONENTS = [
  DisplayFieldComponent,
  DropDownListComponent,
  FilterPipe,
  CommonIconComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: COMMON_COMPONENTS,
  declarations: COMMON_COMPONENTS,
  providers: [],
})
export class AmexioCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioCommonModule,
      providers: [IconLoaderService],
    };
  }
}