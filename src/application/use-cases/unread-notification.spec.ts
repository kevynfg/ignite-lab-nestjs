import { makeNotification } from '@//factories/notification-factory';
import 'reflect-metadata';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be able unread notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);
    await unreadNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications.shift()?.readAt).toBeNull();
  });

  it('shouldnt be able to unread a non existing notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);
    expect(() => {
      return readNotification.execute({
        notificationId: 'any_notificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
