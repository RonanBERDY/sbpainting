import { ManageComponent, } from './views/manage/manage.component';
import { Routes,ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { UploadComponent } from './views/upload/upload.component';
import { PaintingsComponent } from './views/paintings/paintings.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PicturesService } from './services/pictures.service';
import { inject } from '@angular/core';
import IPic from './models/pictures.models';


const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');
const clipResolver: ResolveFn<IPic | null> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(PicturesService).resolve(route.paramMap.get('id')!);
};


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
    resolve: {
      pic: clipResolver,
    },

  },
  {path:'**',
    component:NotfoundComponent,
  }
];
