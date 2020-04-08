export class Notification {

    constructor(
        public id: number,
        public type: NotificationType,
        public title: string,
        public message: string,
        public timeout: number,
    ) {
    }

}

export enum NotificationType {
    success,
    warning,
    error,
    info
}
