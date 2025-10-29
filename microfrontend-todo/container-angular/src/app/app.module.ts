import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, ReactWrapperComponent, HomeComponent],
  imports: [BrowserModule, RouterModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
