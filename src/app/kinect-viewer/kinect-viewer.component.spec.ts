import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinectViewerComponent } from './kinect-viewer.component';

describe('KinectViewerComponent', () => {
  let component: KinectViewerComponent;
  let fixture: ComponentFixture<KinectViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KinectViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KinectViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
