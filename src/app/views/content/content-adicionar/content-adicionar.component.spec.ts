import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAdicionarComponent } from './content-adicionar.component';

describe('ContentAdicionarComponent', () => {
  let component: ContentAdicionarComponent;
  let fixture: ComponentFixture<ContentAdicionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAdicionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
