import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ProfileDto } from '../dtos/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: number): Promise<ProfileDto> {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
      select: {
        user_name: true,
        user_email: true,
        profile_image: true,
      },
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return user;
  }
}