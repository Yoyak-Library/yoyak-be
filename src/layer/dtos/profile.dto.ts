import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({ description: '사용자 이름', example: '김슈니' })
  user_name!: string;

  @ApiProperty({ description: '사용자 이메일', example: 'abcd12@naver.com' })
  user_email!: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    example: 'https://example.com/profile.png',
    nullable: true,
    required: false,
  })
  profile_image?: string | null;
}