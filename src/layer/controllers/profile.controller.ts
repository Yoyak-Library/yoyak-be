import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from '../services/profile.service';
import { ProfileDto } from '../dtos/profile.dto';
import { ResponseDto } from '../dtos/response.dto';

@ApiTags('profile')
@Controller('users')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: '내 프로필 조회', description: '현재 로그인한 사용자의 프로필을 조회합니다.' })
  @ApiResponse({ status: 200, description: '프로필 조회 성공', type: ProfileDto })
  async getMe(@Req() req) {
    try {
      const userId = req.user.user_id;
      const profile = await this.profileService.getProfile(userId);
      return new ResponseDto(200, '프로필 조회 성공', profile);
    } catch (err) {
      throw err;
    }
  }
}