import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureCategoriesComponent } from './feature-categories.component';

describe('FeatureCategoriesComponent', () => {
  let component: FeatureCategoriesComponent;
  let fixture: ComponentFixture<FeatureCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
