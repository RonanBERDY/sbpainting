import { TestBed, ComponentFixture } from "@angular/core/testing";
import { AboutComponent } from "./about.component";

describe('about-component',()=>{
  let fixture:ComponentFixture<AboutComponent>;
  let Component:AboutComponent;

  beforeEach(async()=>{await TestBed.configureTestingModule({
    imports:[AboutComponent],
  }).compileComponents();
});
beforeEach(()=>{
  fixture=TestBed.createComponent(AboutComponent);
  Component=fixture.componentInstance;
  fixture.autoDetectChanges();
});
  it('should create',()=>{expect(Component).toBeTruthy();})
});
