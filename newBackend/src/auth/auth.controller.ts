import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/:companyId')
  async login(
    @Param('companyId') companyId: string,
    @Body() loginDto: LoginDto,
  ) {
    const token = await this.authService.validateUser(companyId, loginDto);
    return { token };
  }
}
