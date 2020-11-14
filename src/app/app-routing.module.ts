import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {NewPageComponent} from "./components/new-page/new-page.component";
import {TablePageComponent} from "./components/table-page/table-page.component";
import {ErrorPageComponent} from "./components/error-page/error-page.component";

const routes: Routes = [
  { path: '', component: TablePageComponent },
  { path: 'table', component: TablePageComponent },
  { path: 'new', component: NewPageComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
