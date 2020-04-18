import {Pipe, PipeTransform} from '@angular/core';
import {Project} from '../../core/models/instances/project';


@Pipe({name: 'projectStatus'})
export class ProjectStatusPipe implements PipeTransform {
    transform(data: Project[], order) {
        return data.filter(project => {
            if (order === 'confirmed') {
                return project.isConfirmed;
            } else if (order === 'notconfirmed') {
                return !project.isConfirmed;
            }
            return true;
        });
    }
}
