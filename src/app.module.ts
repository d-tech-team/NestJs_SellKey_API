import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories } from './categories/categories.model';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.model';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/posts.model';
import { ImagesModule } from './images/images.module';
const path = require('path');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || 'dev',
      models: [Categories,Users,Posts],
    }),
    // I18nModule.forRoot({
    //   fallbackLanguage: 'en',
    //   loaderOptions: {
    //     path: path.join(__dirname.replace('\\dist', ''), 'src/i18n/'),
    //     watch: true,
    //   },
    // }),
    CategoriesModule,
    AuthModule,
    UsersModule,
    PostsModule,
    ImagesModule,
  ],
  controllers: [AppController, CategoriesController, PostsController],
  providers: [AppService, CategoriesService, PostsService,],
})
export class AppModule {}
