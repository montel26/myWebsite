import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SkillsComponent } from './skills/skills.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { ServiceService } from './services/service.service'; 

import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { VideoComponent } from './video/video.component';
import { KinectViewerComponent } from './kinect-viewer/kinect-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    SkillsComponent,
    SidebarComponent,
    HomeComponent,
    // VideoComponent,
    KinectViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule, 
    FormsModule, 
    ButtonModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
