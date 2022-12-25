import { Injectable } from '@nestjs/common/decorators';
import { NotificationsRepository } from '../repositories/notification-repository';

type CountRecipientNotificationsRequest = {
  recipientId: string;
};

type CountRecipientNotificationsResponse = {
  count: number;
};

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
