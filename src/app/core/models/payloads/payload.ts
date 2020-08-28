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
import { CreateEmailPayload } from './project/email/create';
import { UpdateEmailPayload } from './project/email/update';
import { DeleteEmailPayload } from './project/email/delete';
import { CreateNewsWavesPayload } from './news/news-waves/create';
import { UploadNewsFilePayload } from '@models/payloads/news/news-waves/upload-file';
import { CreateClientPayload } from '@models/payloads/client/create';
import { DeleteClientPayload } from '@models/payloads/client/delete';
import { UpdateClientPayload } from '@models/payloads/client/update';
import { CreatePublishPayload } from '@models/payloads/publication/publish/create';
import { CreateNotPublishPayload } from '@models/payloads/publication/notPublish/create';
import { UpdatePublishPayload } from '@models/payloads/publication/publish/update';
import { UpdateNotPublishPayload } from '@models/payloads/publication/notPublish/update';

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
  | UpdatePayload
  | CreateEmailPayload
  | UpdateEmailPayload
  | DeleteEmailPayload
  | CreateNewsWavesPayload
  | UploadNewsFilePayload
  | CreateClientPayload
  | UpdateClientPayload
  | DeleteClientPayload
  | CreatePublishPayload
  | CreateNotPublishPayload
  | UpdatePublishPayload
  | UpdateNotPublishPayload

