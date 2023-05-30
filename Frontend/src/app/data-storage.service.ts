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
    this.http.get<Szakdoga[]>(URL + '/list').pipe(
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
    /* let asd = {
      cim: sz.szakdoga_nev,
      git: sz.githublink,
      oldal: sz.oldallink,
      tagok: sz.tagokneve
    } */
    //console.log(asd);

    /* return this.http.post<Szakdoga>(URL + '/new', {
      id: sz.id,
      szakdoga_nev: sz.szakdoga_nev,
      githublink: sz.githublink,
      oldallink: sz.oldallink,
      tagokneve: sz.tagokneve
    })
      .pipe(
        tap({
          next: (res) => {
            let uj = {
              szakdoga_nev: res.szakdoga_nev,
              githublink: res.githublink,
              oldallink: res.oldallink,
              tagokneve: res.tagokneve
            };
            this.dolServ.ujSzakdoga(uj);
          },
          error: (error) => console.log(error),
        })
      )
      .subscribe(); */
      return this.http.post<Szakdoga>(URL + '/new', {
        id: sz.id,
        szakdoga_nev: sz.szakdoga_nev,
        githublink: sz.githublink,
        oldallink: sz.oldallink,
        tagokneve: sz.tagokneve
      }).subscribe((res: Szakdoga) => {
        this.dolServ.ujSzakdoga(res)
      })
  }

  updateSzakdogak(sz: Szakdoga) {
    console.log("asd");
    let updatedSzakdoga = {
      id: sz.id,
      szakdoga_nev: sz.szakdoga_nev,
      githublink: sz.githublink,
      oldallink: sz.oldallink,
      tagokneve: sz.tagokneve
    }

    this.dolServ.updateSzakdoga(sz)
    return this.http.put(URL + '/update', updatedSzakdoga).subscribe();
    
  }

  deleteSzakdoga(id: number) {
    /*this.http.delete(URL + '/delete/' + id)
    .pipe(
      tap({
        next: (res: number) => {
          console.log(res);
          
          if (res == 1) {
            console.log("bazdmeg");
            
            this.dolServ.deleteSzakdoga(id)
          } 
        }
      })
    ).subscribe()*/

    return this.http.delete(URL + '/delete/' + id).subscribe((res: Szakdoga[]) => {
      /* console.log("res:");
      console.log(res); */
      this.dolServ.deleteSzakdoga(id)
    })
  }

  /* fetchRows() {
      return this.http.get('https://localhost:7258/szakdogak')
  } */


}

export const URL = 'https://localhost:7258/szakdogak';