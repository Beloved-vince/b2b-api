import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as admin from 'firebase-admin';


@Injectable()
export class ResourcesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<{ user: any; token: string }> {
    try {
      const createdUser = await this.databaseService.user.create({
        data: createUserDto,
      });

      // Create user in Firebase Authentication
      const firebaseUser = await admin.auth().createUser({
        email: createdUser.email,
        password: createUserDto.password, // This should be the user's chosen password
      });

      // Generate Firebase custom token
      const token = await admin.auth().createCustomToken(firebaseUser.uid);

      return { user: createdUser, token };
    } catch (error) {
      // Handle any potential errors
      console.error('Error creating user:', error);
      throw new Error('Could not create user');
    }
  }

  

  async createCompany(createCompanyDto: Prisma.CompanyCreateInput, userId: string): Promise<any> {
    console.log(createCompanyDto)
    try {
      // Calculate percentage for company
      const percentage = (createCompanyDto.numberOfUsers / createCompanyDto.numberOfProducts) * 100;

      // Create the company
      const createdCompany = await this.databaseService.company.create({
        data: {
          name: createCompanyDto.name,
          numberOfUsers: createCompanyDto.numberOfUsers,
          numberOfProducts: createCompanyDto.numberOfProducts,
          percentage,
          userId,
        }
      });

      return createdCompany;
    } catch (error) {
      // Handle any potential errors
      console.error('Error creating company:', error);
      throw new Error('Could not create company');
    }
  }
}
