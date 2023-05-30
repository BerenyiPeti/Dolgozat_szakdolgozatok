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

  id: number = -1
  cim: string = ''
  keszitok: string = ''
  elerhetoseg: string = ''
  github: string = ''
  modositas: boolean = false

  tesztadatok: Szakdoga[] = [{ id: 1, githublink: 'github1', oldallink: 'oldallink1', szakdoga_nev: 'cim1', tagokneve: 'tagok1' }, { id: 2, githublink: 'github2', oldallink: 'oldallink2', szakdoga_nev: 'cim2', tagokneve: 'tagok2' }]

  ngOnInit(): void {
    //this.adatok = this.tesztadatok
    /* this.dataFetchSub = this.dsService.fetchRows().subscribe((data) => {
      console.log(data);

    }) */
    //console.log(this.dolServ.getIndex(12));


    this.dsService.fetchRows()

    this.dataChangedSub = this.dolServ.dataChanged.subscribe((data: Szakdoga[]) => {
      this.adatok = data
      /* console.log("data:");
      console.log(data);
      console.log("adatok:");
      console.log(this.adatok); */
    })
  }

  ngOnDestroy(): void {
    this.dataChangedSub.unsubscribe()
  }


  onSubmit(form: NgForm) {
    console.log("submit");
    
    //console.log(form.value);
    let nev = form.value.cimInput
    let git = form.value.githubInput
    let oldal = form.value.elerhetosegInput
    let tagok = form.value.keszitokInput

    if (!this.modositas) {
      console.log(this.modositas);
      
      this.dsService.ujSzakdoga({
        id: 0,
        githublink: git,
        oldallink: oldal,
        szakdoga_nev: nev,
        tagokneve: tagok
      })
    }

    if (this.modositas) {
      console.log(this.id);
      this.dsService.updateSzakdogak({id: this.id, szakdoga_nev: nev, githublink: git, oldallink: oldal, tagokneve: tagok})
      this.modositas = false
      this.id = -1
    }

    form.resetForm()
    console.log(this.adatok);
    
  }

  onModositas(sz: Szakdoga) {
    this.modositas = true
    this.id = sz.id
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

  onTorles(id: number) {
    //console.log(id);
    
    this.dsService.deleteSzakdoga(id)
  }

  /* teszt() {
    console.log("getAdatok:");
    console.log(this.dolServ.getAdatok());
    console.log("adatok:");
    console.log(this.adatok);
    
    
    
  } */

}
