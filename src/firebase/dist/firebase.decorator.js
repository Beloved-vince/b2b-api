// // firebase.decorator.ts
// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import * as admin from 'firebase-admin';
// export const FirebaseUser = createParamDecorator(
//   async (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const authToken = request.headers.authorization; // Assuming token is passed in the Authorization header
//     if (!authToken) {
//       return null; // No token provided
//     }
//     try {
//       // Verify the token with Firebase Admin SDK
//       const decodedToken = await admin.auth().verifyIdToken(authToken);
//       return decodedToken; // Return the decoded token
//     } catch (error) {
//       console.error('Error verifying Firebase token:', error);
//       return null; // Invalid token
//     }
//   },
// );
