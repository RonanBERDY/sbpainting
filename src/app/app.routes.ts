import { ManageComponent } from './views/manage/manage.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { UploadComponent } from './views/upload/upload.component';
import { PaintingsComponent } from './views/paintings/paintings.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');

export const routes: Routes = [{
  path: '',
  component:HomeComponent,},
  {path:'about',component:AboutComponent,},
  {path:'manage',
    component:ManageComponent,
    data: {adminOnly : true,
      authGuardPipe: redirectUnauthorizedToHome,
     },
    canActivate:[AuthGuard],
  },
  {path:'upload',
    component:UploadComponent,
    data: {adminOnly : true,
      authGuardPipe: redirectUnauthorizedToHome,
     },
    canActivate:[AuthGuard],
  },
  {path:'paintings/:id',
    component:PaintingsComponent,

  },
  {path:'**',
    component:NotfoundComponent,
  }
];
