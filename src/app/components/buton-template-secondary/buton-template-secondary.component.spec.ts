import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ButonTemplateSecondaryComponent } from './buton-template-secondary.component';

describe('ButonTemplateSecondaryComponent', () => {
  let component: ButonTemplateSecondaryComponent;
  let fixture: ComponentFixture<ButonTemplateSecondaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ButonTemplateSecondaryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ButonTemplateSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
