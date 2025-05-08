import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rroquemefajardo17:YesiPepi28!@roqueme2003.zqehq8a.mongodb.net/?retryWrites=true&w=majority&appName=Roqueme2003'),
    AudioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
