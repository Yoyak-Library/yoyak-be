import { IsString, IsEmail, IsBoolean, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly user_name!: string;

  @IsString()
  @IsNotEmpty()
  readonly user_nick!: string;

  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty()
  readonly user_email!: string;

  @IsBoolean()
  readonly email_verified?: boolean = false;

  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  readonly user_pwd!: string;

  @IsString()
  @IsNotEmpty()
  readonly confirmPassword!: string;
}

export class SendVerificationCodeDto {
  @IsEmail({}, { message: '인증코드 전송에 실패하였습니다.' })
  @IsNotEmpty()
  readonly user_email!: string;
}

export class VerifyEmailDto {
  @IsEmail({}, { message: '인증코드가 일치하지 않습니다.' })
  @IsNotEmpty()
  readonly user_email!: string;

  @IsString()
  @IsNotEmpty({ message: '인증 코드는 필수입니다.' })
  readonly verification_code!: string;
}
