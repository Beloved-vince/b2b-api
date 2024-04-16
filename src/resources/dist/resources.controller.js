"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ResourcesController = void 0;
var common_1 = require("@nestjs/common");
var firebase_auth_guard_1 = require("src/firebase/firebase-auth.guard");
var client_1 = require("@prisma/client");
var auth_1 = require("firebase/auth");
var platform_express_1 = require("@nestjs/platform-express");
var prisma = new client_1.PrismaClient();
// @Controller('resources')
// @UseGuards(FirebaseAuthGuard)
var ResourcesController = /** @class */ (function () {
    function ResourcesController(resourcesService) {
        this.resourcesService = resourcesService;
    }
    ResourcesController.prototype.login = function (credentials) {
        return __awaiter(this, void 0, Promise, function () {
            var auth, userCredential, user, idToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        auth = auth_1.getAuth();
                        return [4 /*yield*/, auth_1.signInWithEmailAndPassword(auth, credentials.email, credentials.password)];
                    case 1:
                        userCredential = _a.sent();
                        user = userCredential.user;
                        // Upsert user into the database
                        return [4 /*yield*/, prisma.user.upsert({
                                where: { email: user.email },
                                update: { email: user.email, uid: user.uid },
                                create: { email: user.email, uid: user.uid }
                            })];
                    case 2:
                        // Upsert user into the database
                        _a.sent();
                        return [4 /*yield*/, user.getIdToken()];
                    case 3:
                        idToken = _a.sent();
                        return [2 /*return*/, { message: 'Login successful', token: idToken }];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error logging in:', error_1);
                        throw new common_1.UnauthorizedException('Login failed');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ResourcesController.prototype.createCompany = function (createCompanyDto, request) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, percentage, companyCreateInput, createdCompany, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = request.user.uid;
                        console.log("User ID:", userId);
                        percentage = (createCompanyDto.numberOfUsers / createCompanyDto.numberOfProducts) * 100;
                        console.log("Create Company DTO:", createCompanyDto);
                        companyCreateInput = {
                            name: createCompanyDto.name,
                            numberOfUsers: createCompanyDto.numberOfUsers,
                            numberOfProducts: createCompanyDto.numberOfProducts,
                            percentage: percentage,
                            user: userId
                        };
                        return [4 /*yield*/, this.resourcesService.createCompany(companyCreateInput, userId)];
                    case 1:
                        createdCompany = _a.sent();
                        return [2 /*return*/, { company: createdCompany }];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, { error: 'Incorrect value passed.' }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ResourcesController.prototype.uploadImage = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log('Received email:', credentials.email);
                        return [4 /*yield*/, prisma.user.findUnique({
                                where: { email: credentials.email }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('User not found for email: ' + credentials.email);
                        }
                        // Update user with image
                        return [4 /*yield*/, prisma.user.update({
                                where: { id: user.id },
                                data: { image: credentials.image }
                            })];
                    case 2:
                        // Update user with image
                        _a.sent();
                        return [2 /*return*/, { message: 'Image uploaded successfully' }];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error uploading image:', error_3);
                        throw new Error('Image upload failed: ' + error_3.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], ResourcesController.prototype, "login");
    __decorate([
        common_1.Post('createCompany'),
        common_1.UseGuards(firebase_auth_guard_1.FirebaseAuthGuard),
        __param(0, common_1.Body()),
        __param(1, common_1.Req())
    ], ResourcesController.prototype, "createCompany");
    __decorate([
        common_1.Post('image'),
        common_1.UseGuards(firebase_auth_guard_1.FirebaseAuthGuard),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('image')) // Assuming 'image' is the form field name
        ,
        __param(0, common_1.Body())
    ], ResourcesController.prototype, "uploadImage");
    ResourcesController = __decorate([
        common_1.Controller('user')
    ], ResourcesController);
    return ResourcesController;
}());
exports.ResourcesController = ResourcesController;
