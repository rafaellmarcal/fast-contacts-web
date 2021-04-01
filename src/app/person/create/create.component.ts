import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../models/address.model';
import { Document } from '../models/document.model';
import { LegalPerson } from '../models/legal-person.model';
import { NaturalPerson } from '../models/natural-person.model';
import { LegalPersonService } from '../services/legal-person.service';
import { NaturalPersonService } from '../services/natural-person.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-person-create',
  templateUrl: './create.component.html'
})
export class CreatePersonComponent implements OnInit {

  form: FormGroup;
  title: string;
  errors: any[] = [];

  contactId: string;
  contactType: number;
  isEditAction: boolean = false;

  newContactTitle: string = "New Contact";
  editContactTitle: string = "Edit Contact";

  emptyGuid = '00000000-0000-0000-0000-000000000000';
  minDate = '0001-01-01T00:00:00Z';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private legalPersonService: LegalPersonService,
    private naturalPersonService: NaturalPersonService) { }

  ngOnInit() {
    this.initializeForm();

    this.activatedRoute.params.subscribe(params => {
      if (!!params['id']) {
        this.contactId = params['id'];
        this.contactType = +params['type'];
        this.getContact();
        this.title = this.editContactTitle;
        this.isEditAction = true;
      }
      else {
        this.title = this.newContactTitle;
      }
    });
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
      gender: [1],
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

  save() {
    if (!this.documentTypeSelected()) {
      alert('Select a document type!');
      return;
    }

    if (this.isNaturalPerson()) {
      this.saveNaturalPerson();
    }
    else {
      this.saveLegalPerson();
    }
  }

  saveNaturalPerson() {
    let naturalPerson = this.createNaturalPersonObject();

    if (this.isEditAction) {
      this.naturalPersonService.put(naturalPerson)
        .subscribe(
          () => this.onSaveComplete(),
          fail => { this.onError(fail) });
    } else {
      this.naturalPersonService.post(naturalPerson)
        .subscribe(
          () => this.onSaveComplete(),
          fail => { this.onError(fail) });
    }
  }

  createNaturalPersonObject(): NaturalPerson {
    let naturalPerson = new NaturalPerson();
    naturalPerson.id = this.isEditAction ? this.form.get('id').value : this.emptyGuid;
    naturalPerson.name = this.form.get('name').value;
    naturalPerson.birthday = !!this.form.get('birthday').value ? new Date(this.form.get('birthday').value).toISOString() : new Date(this.minDate).toISOString();
    naturalPerson.gender = +this.form.get('gender').value;
    naturalPerson.address = this.createAddressObject();
    naturalPerson.document = this.createDocumentObject();
    return naturalPerson;
  }

  createAddressObject(): Address {
    let address = new Address();
    address.zipCode = this.form.get('zipCode').value;
    address.addressOne = this.form.get('addressOne').value;
    address.addressTwo = this.form.get('addressTwo').value;
    address.city = this.form.get('city').value;
    address.state = this.form.get('state').value;
    address.country = this.form.get('country').value;
    return address;
  }

  createDocumentObject(): Document {
    let document = new Document();
    document.type = +this.form.get('documentType').value;
    document.number = +this.form.get('documentType').value === 1 ? this.form.get('cpf').value : this.form.get('cnpj').value;
    return document;
  }

  saveLegalPerson() {
    let legalPerson = this.createLegalPersonObject();

    if (this.isEditAction) {
      this.legalPersonService.put(legalPerson)
        .subscribe(
          () => this.onSaveComplete(),
          fail => { this.onError(fail) });
    } else {
      this.legalPersonService.post(legalPerson)
        .subscribe(
          () => this.onSaveComplete(),
          fail => { this.onError(fail) });
    }
  }

  createLegalPersonObject(): LegalPerson {
    let legalPerson = new LegalPerson();
    legalPerson.id = this.isEditAction ? this.form.get('id').value : this.emptyGuid;
    legalPerson.companyName = this.form.get('companyName').value;
    legalPerson.tradeName = this.form.get('tradeName').value;
    legalPerson.address = this.createAddressObject();
    legalPerson.document = this.createDocumentObject();
    return legalPerson;
  }

  onSaveComplete() {
    this.router.navigate(['/person/list']);
  }

  onError(fail: any) {
    this.errors = fail.error.errors;
    window.scrollTo(0, 0);
  }

  clearPerson() {
    if (this.isNaturalPerson()) {
      this.form.get('cnpj').setValue('');
      this.form.get('companyName').setValue('');
      this.form.get('tradeName').setValue('');
    } else {
      this.form.get('cpf').setValue('');
      this.form.get('name').setValue('');
      this.form.get('birthday').setValue('');
      this.form.get('gender').setValue(1);
    }
  }

  documentTypeSelected = () => !!this.form.get('documentType').value;
  isNaturalPerson = () => +this.form.get('documentType').value === 1;
  isLegalPerson = () => +this.form.get('documentType').value === 2;
}