import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base-service.service";
import { NaturalPerson } from "../models/natural-person.model";

@Injectable()
export class NaturalPersonService extends BaseService {
    constructor(private http: HttpClient) {
        super('NaturalPerson');
    }

    getAll(): Observable<NaturalPerson[]> {
        return this.http
            .get<NaturalPerson[]>(`${this._url}`, super.ObterHeaderJson());
    }

    getById(id: string): Observable<NaturalPerson> {
        return this.http
            .get<NaturalPerson>(`${this._url}/${id}`, super.ObterHeaderJson());
    }

    post(person: NaturalPerson): Observable<any> {
        return this.http
            .post(`${this._url}`, person, super.ObterHeaderJson())
            .pipe(
                map(super.extractData)
            );
    }

    put(person: NaturalPerson): Observable<any> {
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