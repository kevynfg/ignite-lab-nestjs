import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { Content } from '../entities/notification-content';
import { CancelNotification } from './cancel-notification';

describe('Cancel Notification', () => {
  it('should be able to send notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      content: new Content('Teste para cancelar notificação'),
      recipientId: 'any_recipientId',
      category: 'social',
    });

    await notificationsRepository.create(notification);
    await cancelNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications.shift()?.canceledAt).toEqual(
      expect.any(Date),
    );
  });
});
