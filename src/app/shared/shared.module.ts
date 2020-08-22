import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { PageComponent } from './page/page.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TabulatorTotalPipe } from './pipes/tabulator-total.pipe';
import { RouterModule } from '@angular/router';
import { TabulatorNameUrlPipe } from './pipes/tabulator-name.pipe';
import { RemoveDashesPipe } from './pipes/remove-dashes.pipe';
import { FormatPriorityTypePipe } from './pipes/format-priority-type.pipe';
import { PathifyPipe } from './pipes/text-to-path.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        RouterModule
      ],
      declarations: [PageComponent, BreadcrumbComponent, TabulatorTotalPipe, TabulatorNameUrlPipe, RemoveDashesPipe, PathifyPipe, FormatPriorityTypePipe],
      exports: [
		CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        RouterModule,
        PageComponent,
        BreadcrumbComponent,
        TabulatorTotalPipe,
        TabulatorNameUrlPipe,
        RemoveDashesPipe,
        PathifyPipe,
        FormatPriorityTypePipe
    ]
})

export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return { ngModule: SharedModule };
	}
}