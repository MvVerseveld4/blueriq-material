import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { V1BackendModule } from '@blueriq/angular/backend/v1';
import { FormattingModule } from '@blueriq/angular/formatting';
import { BlueriqFormsModule } from '@blueriq/angular/forms';
import { TextItemModule } from '@blueriq/angular/textitems';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { Configuration } from './configuration/configuration';
import { MaterialModule } from './material.module';
import { AssetComponent } from './modules/asset/asset.component';
import { ButtonComponent } from './modules/button/button.component';
import { ContainerComponent } from './modules/container/container.component';
import { ErrorComponent } from './modules/error/error.component';
import { ErrorService } from './modules/error/error.service';
import { DocumentLinkComponent } from './modules/file/document-link/document-link.component';
import { FileDownloadComponent } from './modules/file/file-download/file-download.component';
import { FileDownloadService } from './modules/file/file-download/file-download.service';
import { FileUploadComponent } from './modules/file/file-upload/file-upload.component';
import { MomentTransformer } from './modules/form-controls/date/moment-transformer';
import { FormControlModule } from './modules/form-controls/form-control.module';
import { LoadingComponent } from './modules/loading/loading.component';
import { PageComponent } from './modules/page/page.component';
import { PresentationStylesNew } from './modules/PresentationStylesNew';
import { ReadonlyComponent } from './modules/readonly/readonly.component';
import { PaginationComponent } from './modules/table/pagination/table.pagination.component';
import { TableSearchComponent } from './modules/table/search/table.search.component';
import { TableSortComponent } from './modules/table/sort/table.sort.component';
import { TableComponent } from './modules/table/table.component';
import { TextItemComponent } from './modules/textitem/textitem.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  { path: 'session/:sessionId', component: ProjectComponent },
  { path: 'shortcut/:shortcut', component: ProjectComponent },
  { path: 'flow/:project/:flow', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version/:languageCode', component: ProjectComponent },
  { path: '**', redirectTo: 'shortcut/default', pathMatch: 'full' }
];

const BQ_COMPONENTS = [
  AssetComponent,
  ButtonComponent,
  ContainerComponent,
  DocumentLinkComponent,
  FileDownloadComponent,
  FileUploadComponent,
  PageComponent,
  PaginationComponent,
  ReadonlyComponent,
  TableComponent,
  TableSearchComponent,
  TableSortComponent,
  TextItemComponent
];

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent, ErrorComponent, ProjectComponent,
    BQ_COMPONENTS
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BlueriqModule.forRoot(),
    V1BackendModule.forRoot({
      baseUrl: Configuration.BASE_URL
    }),
    BrowserAnimationsModule,
    BlueriqFormsModule.forRoot(),
    FileUploadModule,
    MaterialModule,
    SharedModule,
    FormControlModule,
    FlexLayoutModule,
    FormattingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TextItemModule,
    StoreDevtoolsModule.instrument({
      name: 'Blueriq',
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  exports: [
    LoadingComponent
  ],
  providers: [
    BlueriqComponents.register(BQ_COMPONENTS),
    MomentTransformer,
    PresentationStylesNew,
    ErrorService,
    FileDownloadService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
