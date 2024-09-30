import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductIteamComponent } from './product-iteam.component';

describe('ProductIteamComponent', () => {
  let component: ProductIteamComponent;
  let fixture: ComponentFixture<ProductIteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductIteamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductIteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
