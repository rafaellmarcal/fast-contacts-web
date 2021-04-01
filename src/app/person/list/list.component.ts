import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Person } from '../models/person.model';
import { LegalPersonService } from '../services/legal-person.service';
import { NaturalPersonService } from '../services/natural-person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './list.component.html'
})

export class ListPersonComponent implements OnInit {

  contacts: Person[] = [];
  legalPersonTypeDescription = "Legal Person";
  naturalPersonTypeDescription = "Natural Person";

  constructor(
    private legalPersonService: LegalPersonService,
    private naturalPersonService: NaturalPersonService) { }

  ngOnInit() {
    this.getAllContacts();
    window.scrollTo(0, 0);
  }

  getAllContacts() {
    forkJoin([
      this.legalPersonService.getAll(),
      this.naturalPersonService.getAll(),
    ]).subscribe(
      ([legalPersons, naturalPersons]) => {
        this.contacts = this.contacts.concat(legalPersons.map(c => new Person(c.id, c.companyName, c.document.type, this.legalPersonTypeDescription)));
        this.contacts = this.contacts.concat(naturalPersons.map(c => new Person(c.id, c.name, c.document.type, this.naturalPersonTypeDescription)));
      },
      err => console.error(err),
    );
  }
}