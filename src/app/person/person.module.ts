import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CreatePersonComponent } from "./create/create.component";
import { ListPersonComponent } from "./list/list.component";
import { LegalPersonService } from "./services/legal-person.service";
import { NaturalPersonService } from "./services/natural-person.service";
import { ManagePersonComponent } from "./manage/manage.component";

@NgModule({
    declarations: [
        CreatePersonComponent,
        ListPersonComponent,
        ManagePersonComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule
    ],
    providers: [
        LegalPersonService,
        NaturalPersonService
    ]
})
export class PersonModule { }