import { Notification } from '@/application/entities/notification';
import { NotificationsRepository } from '@/application/repositories/notification-repository';
import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const { category, content, createdAt, readAt, recipientId, id } =
      notification;
    await this.prismaService.notification.create({
      data: {
        id: id,
        category,
        content: content.value,
        recipientId,
        createdAt,
        readAt,
      },
    });
  }
}
