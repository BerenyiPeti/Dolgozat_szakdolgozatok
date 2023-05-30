import { Injectable } from "@angular/core";
import { Szakdoga } from "./interfaces";
import { Subject, findIndex } from "rxjs";

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

    getIndex(szakdogaId: number) {
        let index = this.adatok.findIndex(id => id.id === szakdogaId);

        return index;
    }

    getAdatok() {
        return this.adatok.slice()
    }

    ujSzakdoga(sz: Szakdoga) {
        this.adatok.push(sz);
        this.dataChanged.next(this.adatok.slice());
    }

    updateSzakdoga(sz: Szakdoga) {
        let index = this.getIndex(sz.id)
        this.adatok[index] = sz
        this.dataChanged.next(this.adatok.slice())
    }

    deleteSzakdoga(id: number) {
        let index = this.getIndex(id)
        this.adatok.splice(index, 1)
        this.dataChanged.next(this.adatok)
    }

    
}