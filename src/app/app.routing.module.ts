import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatePersonComponent } from './person/create/create.component';
import { ListPersonComponent } from './person/list/list.component';
import { ManagePersonComponent } from './person/manage/manage.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'person',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'list' },
            { path: 'list', component: ListPersonComponent },
            { path: 'new', component: CreatePersonComponent },
            { path: 'edit/:type/:id', component: CreatePersonComponent },
            {
                path: 'detail/:type/:id', component: ManagePersonComponent,
                data: {
                    detailAction: true
                }
            },
            {
                path: 'delete/:type/:id', component: ManagePersonComponent,
                data: {
                    deleteAction: true
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }