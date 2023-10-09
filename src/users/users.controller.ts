import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOkResponse({ description: 'profile loaded' })
  @ApiUnauthorizedResponse({ description: 'you are not user' })
  async profile(@Req() request) {
    const user = await this.usersService.findByEmail(request.user.email);
    return { id: user.id, email: user.email };
  }

  @UseGuards(AuthGuard)
  @Get('all')
  @ApiOkResponse({ description: 'users loaded' })
  @ApiUnauthorizedResponse({ description: 'you are not user' })
  async allUser() {
    return await this.usersService.findAll();
  }
}
