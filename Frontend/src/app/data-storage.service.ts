import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})

export class DataStorageService {
    constructor(private http: HttpClient) { }

    fetchRows() {
        return this.http.get('https://localhost:7258/szakdogak')
    }


}

export const URL = 'https://localhost:7258';