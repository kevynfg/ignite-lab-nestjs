import { Injectable } from '@nestjs/common/decorators';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notification-repository';

type GetRecipientNotificationsRequest = {
  recipientId: string;
};

type GetRecipientNotificationsResponse = {
  notifications: Notification[];
};

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
