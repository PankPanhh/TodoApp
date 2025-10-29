import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'react-todo',
    component: ReactWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
