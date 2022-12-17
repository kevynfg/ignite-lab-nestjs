import { Notification } from './notification';
import { Content } from './notification-content';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('nova solicitação de amizade enviada!'),
      category: 'social',
      recipientId: 'any_recipientId',
    });

    expect(notification).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('test')).toThrow();
  });

  it('should not be able to create a notification content with less than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
