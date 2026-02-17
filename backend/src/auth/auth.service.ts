import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validateEmail, validatePassword } from './validation.util';
import { RefreshToken } from './refresh-token.entity';
import { generateAccessToken } from './token.util';
import { generateRefreshToken, hashToken } from './refresh.util';
import { verifyPassword, hashPassword } from './crypto.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(RefreshToken)
    private refreshRepo: Repository<RefreshToken>,
  ) {}

  async signup(email: string, password: string) {
    if (!validateEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }
    if (!validatePassword(password)) {
      throw new BadRequestException(
        'Password must be at least 8 chars include upper, lower, number, and symbol,',
      );
    }
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const passwordHash = hashPassword(password);

    const user = await this.usersService.create({
      email,
      passwordHash,
    });

    return { id: user.id, email: user.email };
  }

  async signin(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password required');
    }

    if (!validateEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const valid = verifyPassword(password, user.passwordHash);

    if (!valid) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = generateAccessToken(user.id);

    const refreshToken = generateRefreshToken();
    const tokenHash = hashToken(refreshToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshRepo.save({
      tokenHash,
      user,
      expiresAt,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async refresh(token: string) {
    const tokenHash = hashToken(token);

    const record = await this.refreshRepo.findOne({
      where: { tokenHash },
      relations: ['user'],
    });

    if (!record) return null;
    if (record.expiresAt < new Date()) return null;

    await this.refreshRepo.delete({ tokenHash });

    const newRefreshToken = generateRefreshToken();
    const newHash = hashToken(newRefreshToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshRepo.save({
      tokenHash: newHash,
      user: record.user,
      expiresAt,
    });

    const accessToken = generateAccessToken(record.user.id);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
  async logout(token: string) {
    const tokenHash = hashToken(token);
    await this.refreshRepo.delete({ tokenHash });
  }
}
