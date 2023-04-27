import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Szakdoga } from './interfaces';
import { DolgozatokService } from './dolgozatok.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../data-storage.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dolgozatok-form',
  templateUrl: './dolgozatok-form.component.html',
  styleUrls: ['./dolgozatok-form.component.css']
})
export class DolgozatokFormComponent implements OnInit, OnDestroy {
  constructor(private dolServ: DolgozatokService, private dsService: DataStorageService) { }

  url: String = ''
  adatok: Szakdoga[]
  dataFetchSub: Subscription
  dataChangedSub: Subscription

  cim: string = ''
  keszitok: string = ''
  elerhetoseg: string = ''
  github: string = ''
  modositas: boolean = false

  tesztadatok: Szakdoga[] = [{ id: 1, githublink: 'github1', oldallink: 'oldallink1', szakdoga_nev: 'cim1', tagokneve: 'tagok1' }, { id: 2, githublink: 'github2', oldallink: 'oldallink2', szakdoga_nev: 'cim2', tagokneve: 'tagok2' }]

  ngOnInit(): void {
    this.adatok = this.tesztadatok
    /* this.dataFetchSub = this.dsService.fetchRows().subscribe((data) => {
      console.log(data);

    }) */
    this.dsService.fetchRows()

    this.dataChangedSub = this.dolServ.dataChanged.subscribe((data: Szakdoga[]) => {
      this.adatok = data
      console.log("data:");
      console.log(data);
      console.log("adatok:");
      console.log(this.adatok);
    })
  }

  ngOnDestroy(): void {
    this.dataChangedSub.unsubscribe()
  }


  onSubmit(form: NgForm) {
    console.log(form.value);
    this.dsService.ujSzakdoga(form.value)

  }

  onModositas(sz: Szakdoga) {
    this.modositas = true
    this.cim = sz.szakdoga_nev
    this.keszitok = sz.tagokneve
    this.elerhetoseg = sz.oldallink
    this.github = sz.githublink
  }

  onMegse() {
    this.modositas = false
    this.cim = ''
    this.keszitok = ''
    this.elerhetoseg = ''
    this.github = ''
  }
}
