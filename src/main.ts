import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('App');
  app.useStaticAssets(join(__dirname, '..', 'public'));
//   app.setBaseViewsDir(join(__dirname, '..', 'views'));
//   hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'main' });
  await app.listen(3000);
  logger.log('Application started on port 3000');
}

bootstrap();


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDillDODE8ryEW0xLQMPz_4_LSnvx3I7q0",
  authDomain: "basic-ecommerce-647b5.firebaseapp.com",
  projectId: "basic-ecommerce-647b5",
  storageBucket: "basic-ecommerce-647b5.appspot.com",
  messagingSenderId: "528712988913",
  appId: "1:528712988913:web:4278fd39d1d4632063d150",
  measurementId: "G-E8WSZF7X96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
