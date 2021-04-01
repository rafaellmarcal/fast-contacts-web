import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base-service.service";
import { LegalPerson } from "../models/legal-person.model";

@Injectable()
export class LegalPersonService extends BaseService {

    constructor(private http: HttpClient) {
        super('LegalPerson');
    }

    getAll(): Observable<LegalPerson[]> {
        return this.http
            .get<LegalPerson[]>(`${this._url}`, super.ObterHeaderJson());
    }

    getById(id: string): Observable<LegalPerson> {
        return this.http
            .get<LegalPerson>(`${this._url}/${id}`, super.ObterHeaderJson());
    }

    post(person: LegalPerson): Observable<any> {
        return this.http
            .post(`${this._url}`, person, super.ObterHeaderJson())
            .pipe(
                map(super.extractData)
            );
    }

    put(person: LegalPerson): Observable<any> {
        return this.http
            .put(`${this._url}/${person.id}`, person, super.ObterHeaderJson())
            .pipe(
                map(super.extractData)
            );
    }

    delete(id: string): Observable<any> {
        return this.http
            .delete(`${this._url}/${id}`, super.ObterHeaderJson());
    }
}