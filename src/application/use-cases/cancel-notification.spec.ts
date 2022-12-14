import { makeNotification } from '@//factories/notification-factory';
import 'reflect-metadata';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel Notification', () => {
  it('should be able to send notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);
    await cancelNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications.shift()?.canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('shouldnt be able to cancel non existing notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'any_notificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
