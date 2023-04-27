import { Injectable } from "@angular/core";
import { Szakdoga } from "./interfaces";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class DolgozatokService {
    dataChanged = new Subject<Szakdoga[]>();

    private adatok: Szakdoga[]

    setAdatok(szakdogak: Szakdoga[]) {
        this.adatok = szakdogak
        this.dataChanged.next(this.adatok.slice())
    }

    getAdatok() {
        return this.adatok.slice()
    }

    ujSzakdoga(sz: Szakdoga) {
        this.adatok.push(sz);
        this.dataChanged.next(this.adatok.slice());
    }
}