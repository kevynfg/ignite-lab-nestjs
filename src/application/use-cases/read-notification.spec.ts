import { makeNotification } from '@//factories/notification-factory';
import 'reflect-metadata';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able read notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);
    await readNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications.shift()?.readAt).toEqual(
      expect.any(Date),
    );
  });

  it('shouldnt be able to read a non existing notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);
    expect(() => {
      return readNotification.execute({
        notificationId: 'any_notificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
