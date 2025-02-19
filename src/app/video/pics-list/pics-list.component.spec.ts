import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicsListComponent } from './pics-list.component';

describe('PicsListComponent', () => {
  let component: PicsListComponent;
  let fixture: ComponentFixture<PicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
