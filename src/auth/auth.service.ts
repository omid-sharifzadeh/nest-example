import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { status: 'success', access_token: token };
  }

  async signIn(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (!user) throw new UnauthorizedException();

    const result = await bcrypt.compare(createUserDto.password, user.password);
    if (!result) throw new UnauthorizedException();

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { status: 'success', access_token: token };
  }

  async verify() {}
}
