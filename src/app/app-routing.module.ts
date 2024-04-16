import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditTaskComponent } from './taskmanager/components/edit-task/edit-task.component';
import { MainPageComponent } from './taskmanager/pages/main-page.component';

const routes: Routes = [{

  path: 'taskList',
  component: MainPageComponent
}, {
  path: 'editTask/:id',
  component: EditTaskComponent
}, {
  path: '**',
  redirectTo: 'taskList'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
