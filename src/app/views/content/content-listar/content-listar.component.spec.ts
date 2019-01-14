import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListarComponent } from './content-listar.component';

describe('ContentListarComponent', () => {
  let component: ContentListarComponent;
  let fixture: ComponentFixture<ContentListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
