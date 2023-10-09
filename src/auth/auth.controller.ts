import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'register was successful' })
  @ApiBadRequestResponse({ description: 'user already exist !' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) throw new HttpException('user already exist !', HttpStatus.BAD_REQUEST);

    return await this.authService.signUp(createUserDto);
  }

  @Post('login')
  @ApiOkResponse({ description: 'login was successful' })
  @ApiUnauthorizedResponse({ description: 'data incorrect' })
  async signIn(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signIn(createUserDto);
  }
}
