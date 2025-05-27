import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersionSettingsPage } from './version-settings.page';

const routes: Routes = [
  {
    path: '',
    component: VersionSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VersionSettingsPageRoutingModule {}
