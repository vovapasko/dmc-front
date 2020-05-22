import { LoginPayload } from './auth/login';
import { CreateContractorPayload } from './contractor/create';
import { DeleteContractorPayload } from './contractor/delete';
import { UpdateContractorPayload } from './contractor/update';
import { CreateHashtagPayload } from './news/hashtag/create';
import { CreateProjectPayload } from './news/project/create';
import { GetProjectPayload } from './news/project/get';
import { UpdateProjectPayload } from './news/project/update';
import { ConfirmResetPasswordPayload } from './user/confirm-reset-password';
import { DeleteUserPayload } from './user/delete';
import { RegisterPayload } from './user/register';
import { SignupPayload } from './user/signup';
import { UpdateProfilePayload } from './user/update-profile';
import { UpdatePayload } from './user/update';
import { CreatePostFormatPayload } from './news/format/create-post-format';
import { CreatePostsFormatPayload } from './news/format/create';

export type Payloads =
  | LoginPayload
  | CreateContractorPayload
  | DeleteContractorPayload
  | UpdateContractorPayload
  | CreatePostFormatPayload
  | CreatePostsFormatPayload
  | CreateHashtagPayload
  | CreateProjectPayload
  | GetProjectPayload
  | UpdateProjectPayload
  | ConfirmResetPasswordPayload
  | DeleteUserPayload
  | RegisterPayload
  | SignupPayload
  | UpdateProfilePayload
  | UpdatePayload;
