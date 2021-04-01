import { HttpHeaders } from '@angular/common/http';

export abstract class BaseService {
    protected _url: string = "http://localhost:5000/api";

    constructor(urlEndpoint: string){
        this._url = `${this._url}/${urlEndpoint}`;
    }

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }
}