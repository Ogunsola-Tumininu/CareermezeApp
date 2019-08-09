import { Routes, RouterModule } from '@angular/router';
import {TabsPage} from './tabs.page'
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
            // { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule', runGuardsAndResolvers: 'always' }, // used to refresh a page
            { path: 'edit-profile', loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule' },
            { path: 'career', loadChildren: '../career/career.module#CareerPageModule' },
            // { path: 'post/:id', loadChildren: '../post/post.module#PostPageModule' },

        ]
    }
  
]; 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TabsPageRoutingModule { }







// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { TabsPage } from './tabs.page';

// const routes: Routes = [
//   {
//     path: 'tabs',
//     component: TabsPage,
//     children: [
//       {
//         path: 'tab1',
//         children: [
//           {
//             path: '',
//             loadChildren: '../tab1/tab1.module#Tab1PageModule'
//           }
//         ]
//       },
//       {
//         path: 'home',
//         children: [
//           {
//             path: '',
//             loadChildren: '../home/home.module#HomePageModule'
//           }
//         ]
//       },
//       {
//         path: '',
//         redirectTo: '/tabs/tab1',
//         pathMatch: 'full'
//       }
//     ]
//   },
//   {
//     path: '',
//     redirectTo: '/tabs/tab1',
//     pathMatch: 'full'
//   }
// ];

// @NgModule({
//   imports: [
//     RouterModule.forChild(routes)
//   ],
//   exports: [RouterModule]
// })
// export class TabsPageRoutingModule {}
