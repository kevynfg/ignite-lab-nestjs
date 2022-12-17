import { Injectable } from '@nestjs/common/decorators';
import { Notification } from '../entities/notification';
import { Content } from '../entities/notification-content';
import { NotificationsRepository } from '../repositories/notification-repository';

type SendNotificationRequest = {
  recipientId: string;
  content: string;
  category: string;
};

type SendNotificationResponse = {
  notification: Notification;
};

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async send(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content),
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
