import { ManageComponent } from './views/manage/manage.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { UploadComponent } from './views/upload/upload.component';
import { PaintingsComponent } from './views/paintings/paintings.component';


export const routes: Routes = [{
  path: '',
  component:HomeComponent,},
  {path:'about',component:AboutComponent,},
  {path:'manage',
    component:ManageComponent,
    data: {adminOnly : true }
  },
  {path:'upload',
    component:UploadComponent,
    data: {adminOnly : true }
  },
  {path:'paintings/:id',
    component:PaintingsComponent,

  }
];
