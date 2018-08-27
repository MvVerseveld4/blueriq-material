import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { FlowWidgetComponent } from './flow-widget.component';

const WIDGET_CONTROL_COMPONENTS = [
  FlowWidgetComponent
];

@NgModule({
  declarations: [
    WIDGET_CONTROL_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(WIDGET_CONTROL_COMPONENTS)
  ],
  imports: [
    BlueriqCommonModule,
    CommonModule
  ],
  exports: [WIDGET_CONTROL_COMPONENTS]
})
export class WidgetModule {
}
