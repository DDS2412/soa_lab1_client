import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {NewPageComponent} from "./components/new-page/new-page.component";
import {TablePageComponent} from "./components/table-page/table-page.component";
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import {UpdatePageComponent} from "./components/update-page/update-page.component";

const routes: Routes = [
  { path: '', component: TablePageComponent },
  { path: 'new', component: NewPageComponent },
  { path: 'update/:id', component: UpdatePageComponent},
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
