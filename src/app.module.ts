import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
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
import { Images } from './images/images.model';
import { ServersModule } from './servers/servers.module';
import { Servers } from './servers/servers.model';
import { FeaturesModule } from './features/features.module';
import { Features } from './features/features.model';
import { PurchaseHistoriesModule } from './purchase-histories/purchase-histories.module';
import { RechargeHistoriesModule } from './recharge_histories/recharge_histories.module';
import { RechargeHistories } from './recharge_histories/recharge_histories.model';
import { ChangelogsModule } from './changelogs/changelogs.module';
import { ChangeLogs } from './changelogs/changelogs.model';
import { SystemModule } from './system/system.module';
import { System } from './system/system.model';
import { PurchaseHistories } from './purchase-histories/purchase-histories.model';
import { DiscountModule } from './discount/discount.module';
import { Discount } from './discount/discount.model';
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
      models: [Categories, Users, Posts, Images, Servers, Features, RechargeHistories, ChangeLogs, System,PurchaseHistories,Discount],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/apps/api/i18n/'),
        watch: true,
      },
      resolvers: [
        AcceptLanguageResolver,
      ]
    }),
    CategoriesModule,
    AuthModule,
    UsersModule,
    PostsModule,
    ImagesModule,
    ServersModule,
    FeaturesModule,
    PurchaseHistoriesModule,
    RechargeHistoriesModule,
    ChangelogsModule,
    SystemModule,
    DiscountModule,
  ],
  controllers: [AppController, CategoriesController, PostsController],
  providers: [AppService, CategoriesService, PostsService],
})
export class AppModule { }
