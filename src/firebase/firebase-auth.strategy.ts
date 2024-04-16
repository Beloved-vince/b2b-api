import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as firebaseConfig from './firebase.config.json';
import * as firebase from 'firebase-admin';
import { PrismaClient } from '@prisma/client';

const firebaseParams = {
  type: firebaseConfig.type,
  projectId: firebaseConfig.project_id,
  privateKeyId: firebaseConfig.private_key_id,
  privateKey: firebaseConfig.private_key,
  clientEmail: firebaseConfig.client_email,
  clientId: firebaseConfig.client_id,
  authUri: firebaseConfig.auth_uri,
  tokenUri: firebaseConfig.token_uri,
  authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseConfig.client_x509_cert_url,
};

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
  private defaultApp: any;
  private prisma: PrismaClient;

  constructor() {
    super({
      jwtFromRequest: FirebaseAuthStrategy._jwtFromRequest,
    });
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebaseParams),
    });
    this.prisma = new PrismaClient();
  }

  async validate(token: string) {
    try {
      // Use the generated custom token for authentication
      const firebaseUser = await this.defaultApp.auth().verifyIdToken(token);
      
      if (!firebaseUser) {
        throw new UnauthorizedException('Invalid custom token');
      }

      let user = await this.prisma.user.findUnique({
        where: { email: firebaseUser.email },
      });

      if (!user) {
        // If user does not exist, create a new user entity
        user = await this.prisma.user.create({
          data: {
            email: firebaseUser.email,
            uid: firebaseUser.uid,
          },
        });
      }

      return user;
    } catch (error) {
      console.log("Here?")
      throw new UnauthorizedException(error);
    }
  }

  // Override the jwtFromRequest method to handle cases where the authorization header is not present
  private static _jwtFromRequest(req) {
    if (!req || !req.headers || !req.headers.authorization) {
      return null;
    }
    const authHeader = req.headers.authorization;
    const parts = authHeader.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const token = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        return token;
      }
    }
    return null;
  }
}
