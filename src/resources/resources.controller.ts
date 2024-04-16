import { Body, Controller, Get, Post, UseGuards, Req, UnauthorizedException, ExecutionContext, UseInterceptors} from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { ResourcesService } from './resources.service';
import { Prisma, PrismaClient } from '@prisma/client';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { CreateCompanyDto } from './create-company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { credential } from 'firebase-admin';


const prisma = new PrismaClient();

// @Controller('resources')
// @UseGuards(FirebaseAuthGuard)
@Controller('user')
  export class ResourcesController {
    constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  async login(@Body() credentials: { email: string, password: string }): Promise<{ message: string, token: string}> {
    try {
      // Retrieve user by email

      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;

      // Upsert user into the database
      await prisma.user.upsert({
        where: { email: user.email },
        update: { email: user.email, uid: user.uid },
        create: { email: user.email, uid: user.uid },
      });

      // Get the ID token from the user credential
      const idToken = await user.getIdToken();

      return { message: 'Login successful', token: idToken };
    } catch (error) {
      console.error('Error logging in:', error);
      throw new UnauthorizedException('Login failed');
    }
  }


  @Post('createCompany')
  @UseGuards(FirebaseAuthGuard)
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() request: any,
  ) {
    try {
      // Extract user ID from the request
      const userId = request.user.uid;
      console.log("User ID:", userId); 
  
      const percentage = (createCompanyDto.numberOfUsers / createCompanyDto.numberOfProducts) * 100;
      console.log("Create Company DTO:", createCompanyDto);
      const companyCreateInput: Prisma.CompanyCreateInput = {
        name: createCompanyDto.name,
        numberOfUsers: createCompanyDto.numberOfUsers,
        numberOfProducts: createCompanyDto.numberOfProducts,
        percentage,
        user: userId
      };
      
      // Call the service method with the mapped input
      const createdCompany = await this.resourcesService.createCompany(companyCreateInput, userId);
  
      return { company: createdCompany };
    } catch (error) {
      console.log(error)
      return { error: 'Incorrect value passed.' };
    }
  }
  @Post('image')
  @UseGuards(FirebaseAuthGuard)
  @UseInterceptors(FileInterceptor('image')) // Assuming 'image' is the form field name
  async uploadImage(@Body() credentials: {email: string, image: Buffer} ) {
    try {
      console.log('Received email:', credentials.email);

      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      });

      if (!user) {
        throw new Error('User not found for email: ' + credentials.email);
      }

      // Update user with image
      await prisma.user.update({
        where: { id: user.id },
        data: { image: credentials.image },
      });

      return { message: 'Image uploaded successfully' };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed: ' + error.message);
    }
  }
}