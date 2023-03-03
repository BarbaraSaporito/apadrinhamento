import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadrinhoCardComponent } from './padrinho-card.component';

describe('PadrinhoCardComponent', () => {
  let component: PadrinhoCardComponent;
  let fixture: ComponentFixture<PadrinhoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PadrinhoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadrinhoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
