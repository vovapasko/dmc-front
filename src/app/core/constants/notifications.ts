import { NotificationType } from '../models/instances/notification';
import { Timeouts } from './timeouts';

export const Warnings =  {
  NO_INVITE: {
    type: NotificationType.warning,
    title: 'Внимание',
    message: 'У вас нет приглашения, попросите приглашения у кого то из зарегистрированных пользователей',
    timeout: Timeouts.notification
  },
  NO_LEFT: {
    type: NotificationType.warning,
    title: 'Внимание',
    timeout: Timeouts.notification
  },
  NO_ELEMENTS_SELECTED: {
    type: NotificationType.warning,
    title: 'Внимание',
    message: 'Нужно выбрать элементы',
    timeout: Timeouts.notification
  }
};

export const Infos = {
  PROCESS_HAS_BEEN_STARTED: {
    type: NotificationType.info,
    title: 'Процесс начат',
    message: 'Пожалуйста дождитесь оконочания, не закрывайте вкладку',
    timeout: 3500
  },
  PROCESS_HAS_BEEN_FINISHED: {
    type: NotificationType.info,
    title: 'Процесс завершен',
    message: 'Операция завершена, обновите, пожалуйста страницу, спасибо',
    timeout: 1500
  },
  IMAGE_HAS_BEEN_LOADED: {
    type: NotificationType.info,
    title: 'Изображение было загружено',
    message: 'Нажмите сохранить чтобы увидеть изменения'
  }
}
