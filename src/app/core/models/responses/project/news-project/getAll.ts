import { NewsProject } from '@models/instances/news-project';

export interface GetAllNewsProjectsResponse {
  results: NewsProject[];
  count: number;
}
