import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../models/address.model';
import { LegalPerson } from '../models/legal-person.model';
import { NaturalPerson } from '../models/natural-person.model';
import { LegalPersonService } from '../services/legal-person.service';
import { NaturalPersonService } from '../services/natural-person.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-person-manage',
  templateUrl: './manage.component.html'
})
export class ManagePersonComponent implements OnInit {

  form: FormGroup;
  title: string;
  detailContactTitle: string = "Detail Contact";
  deleteContactTitle: string = "Delete Contact";

  contactId: string;
  contactType: number;

  isDeleteAction: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private legalPersonService: LegalPersonService,
    private naturalPersonService: NaturalPersonService) { }

  ngOnInit() {
    this.initializeForm();

    this.activatedRoute.params.subscribe(params => {
      this.contactId = params['id'];
      this.contactType = +params['type'];
      this.getContact();
    });

    if (this.activatedRoute.snapshot.data['deleteAction']) {
      this.isDeleteAction = true;
      this.title = this.deleteContactTitle;
    }
    else {
      this.title = this.detailContactTitle;
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      id: [''],
      documentType: [''],
      cnpj: [''],
      companyName: [''],
      tradeName: [''],
      cpf: [''],
      name: [''],
      birthday: [''],
      gender: [''],
      zipCode: [''],
      addressOne: [''],
      addressTwo: [''],
      city: [''],
      state: [''],
      country: ['']
    });
  }

  getContact() {
    if (this.contactType === 1) {
      this.fillFormNaturalPerson();
    } else {
      this.fillFormLegalPerson();
    }
    this.form.disable();
  }

  fillFormNaturalPerson() {
    this.naturalPersonService.getById(this.contactId)
      .subscribe((result: NaturalPerson) => {
        this.form.get('id').setValue(result.id);
        this.form.get('documentType').setValue(result.document.type);
        this.form.get('cpf').setValue(result.document.number);
        this.form.get('name').setValue(result.name);
        this.form.get('birthday').setValue(formatDate(result.birthday, 'yyyy-MM-dd', 'en'));
        this.form.get('gender').setValue(result.gender);
        this.fillAddress(result.address);
      })
  }

  fillFormLegalPerson() {
    this.legalPersonService.getById(this.contactId)
      .subscribe((result: LegalPerson) => {
        this.form.get('id').setValue(result.id);
        this.form.get('documentType').setValue(result.document.type);
        this.form.get('cnpj').setValue(result.document.number);
        this.form.get('companyName').setValue(result.companyName);
        this.form.get('tradeName').setValue(result.tradeName);
        this.fillAddress(result.address);
      })
  }

  fillAddress(address: Address) {
    this.form.get('zipCode').setValue(address.zipCode);
    this.form.get('addressOne').setValue(address.addressOne);
    this.form.get('addressTwo').setValue(address.addressTwo);
    this.form.get('city').setValue(address.city);
    this.form.get('state').setValue(address.state);
    this.form.get('country').setValue(address.country);
  }

  delete() {
    if (this.isNaturalPerson()) {
      this.deleteNaturalPerson();
    }
    else {
      this.deleteLegalPerson();
    }
  }

  deleteNaturalPerson() {
    let naturalPersonId = this.getId();
    this.naturalPersonService.delete(naturalPersonId)
      .subscribe(result => {
        if (result.success) {
          this.onDeleteComplete();
        }
      });
  }

  deleteLegalPerson() {
    let legalPersonId = this.getId();
    this.legalPersonService.delete(legalPersonId)
      .subscribe(result => {
        if (result.success) {
          this.onDeleteComplete();
        }
      });
  }

  onDeleteComplete() {
    this.router.navigate(['/person/list']);
  }

  getId = () => this.form.get('id').value;
  isNaturalPerson = () => +this.form.get('documentType').value === 1;
  isLegalPerson = () => +this.form.get('documentType').value === 2;
}