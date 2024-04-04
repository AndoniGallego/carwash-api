import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bd',
      port: 3306,
      username: 'carwashbd',
      password: 'carwashbd',
      database: 'carwash',
      autoLoadEntities: true,
      synchronize: false
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
