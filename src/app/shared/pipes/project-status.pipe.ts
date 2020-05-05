import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../../core/models/instances/project';
import { Orders } from '../../core/constants/orders';

@Pipe({ name: 'projectStatus' })
export class ProjectStatusPipe implements PipeTransform {
  transform(data: Project[], order: Orders) {
    return data && data.length ? data.filter((project) => {
      if (order === Orders.confirmed) {
        // pass only confirmed items
        return project.isConfirmed;
      } else if (order === Orders.notconfirmed) {
        // pass only not confirmed items
        return !project.isConfirmed;
      }
      // pass any items
      return true;
    }) : [];
  }
}
