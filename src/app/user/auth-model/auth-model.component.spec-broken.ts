import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModelComponent } from './auth-model.component';

describe('AuthModelComponent', () => {
  let component: AuthModelComponent;
  let fixture: ComponentFixture<AuthModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
