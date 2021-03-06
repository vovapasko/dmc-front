import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '@models/instances/project';
import { Orders } from '@constants/orders';
import { NewsProject } from '@models/instances/news-project';
import { TableData } from '@models/instances/tickets.model';

@Pipe({ name: 'projectStatus' })
export class ProjectStatusPipe implements PipeTransform {
  transform(data: TableData[], order: Orders) {
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
