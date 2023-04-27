import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap } from "rxjs";
import { DolgozatokService } from "./dolgozatok-form/dolgozatok.service";
import { Szakdoga } from "./dolgozatok-form/interfaces";
@Injectable({
    providedIn: 'root',
})

export class DataStorageService {
    constructor(private http: HttpClient, private dolServ: DolgozatokService) { }

    fetchRows() {
        this.http.get<Szakdoga[]>(URL + '/szakdogak').pipe(
            map((rows) => {
                const data = rows.map((row) => {
                    const record: Szakdoga = {
                        id: row.id,
                        szakdoga_nev: row.szakdoga_nev,
                        tagokneve: row.tagokneve,
                        githublink: row.githublink,
                        oldallink: row.oldallink
                    };
                    return { ...record };
                });
                return data;
            }),
            tap({
                next: (data) => this.dolServ.setAdatok(data.slice()),
                error: (error) => console.log(error),
            })
        ).subscribe();
    }

    ujSzakdoga(sz: Szakdoga) {
        let asd = {
            cim: sz.szakdoga_nev,
            git: sz.githublink,
            oldal: sz.oldallink,
            tagok: sz.tagokneve
          }
        console.log(asd);
        
    this.http.post<Szakdoga>(URL + '/szakdoga', {
        id: 1,
        cim: sz.szakdoga_nev,
        git: sz.githublink,
        oldal: sz.oldallink,
        tagok: sz.tagokneve
      })
      .pipe(
        tap({
          next: (res) => {
            let uj = {
              id: res[0].id,
              szakdoga_nev: res[0].cim,
              githublink: res[0].git,
              oldallink: res[0].oldal,
              tagokneve: res[0].tagok
            };
            console.log(uj);

            this.dolServ.ujSzakdoga(uj);
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe();
  }

    /* fetchRows() {
        return this.http.get('https://localhost:7258/szakdogak')
    } */


}

export const URL = 'https://localhost:7258';