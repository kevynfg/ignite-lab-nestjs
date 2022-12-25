import { makeNotification } from '@//factories/notification-factory';
import 'reflect-metadata';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(makeNotification());
    await notificationsRepository.create(makeNotification());
    await notificationsRepository.create(
      makeNotification({ recipientId: 'any_recipientId2' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'any_recipientId',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'any_recipientId' }),
        expect.objectContaining({ recipientId: 'any_recipientId' }),
      ]),
    );
  });
});
