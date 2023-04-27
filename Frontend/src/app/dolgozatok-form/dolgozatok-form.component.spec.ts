import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DolgozatokFormComponent } from './dolgozatok-form.component';

describe('DolgozatokFormComponent', () => {
  let component: DolgozatokFormComponent;
  let fixture: ComponentFixture<DolgozatokFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DolgozatokFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DolgozatokFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
