import { makeNotification } from '@//factories/notification-factory';
import 'reflect-metadata';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Couunt recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(makeNotification());
    await notificationsRepository.create(makeNotification());
    await notificationsRepository.create(
      makeNotification({ recipientId: 'any_recipientId2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'any_recipientId',
    });

    expect(count).toEqual(2);
  });
});
