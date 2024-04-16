"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.ResourcesService = void 0;
var common_1 = require("@nestjs/common");
var admin = require("firebase-admin");
var ResourcesService = /** @class */ (function () {
    function ResourcesService(databaseService) {
        this.databaseService = databaseService;
    }
    ResourcesService.prototype.create = function (createUserDto) {
        return __awaiter(this, void 0, Promise, function () {
            var createdUser, firebaseUser, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.databaseService.user.create({
                                data: createUserDto
                            })];
                    case 1:
                        createdUser = _a.sent();
                        return [4 /*yield*/, admin.auth().createUser({
                                email: createdUser.email,
                                password: createUserDto.password
                            })];
                    case 2:
                        firebaseUser = _a.sent();
                        return [4 /*yield*/, admin.auth().createCustomToken(firebaseUser.uid)];
                    case 3:
                        token = _a.sent();
                        return [2 /*return*/, { user: createdUser, token: token }];
                    case 4:
                        error_1 = _a.sent();
                        // Handle any potential errors
                        console.error('Error creating user:', error_1);
                        throw new Error('Could not create user');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ResourcesService.prototype.createCompany = function (createCompanyDto, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var percentage, createdCompany, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(createCompanyDto);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        percentage = (createCompanyDto.numberOfUsers / createCompanyDto.numberOfProducts) * 100;
                        return [4 /*yield*/, this.databaseService.company.create({
                                data: {
                                    name: createCompanyDto.name,
                                    numberOfUsers: createCompanyDto.numberOfUsers,
                                    numberOfProducts: createCompanyDto.numberOfProducts,
                                    percentage: percentage,
                                    userId: userId
                                }
                            })];
                    case 2:
                        createdCompany = _a.sent();
                        return [2 /*return*/, createdCompany];
                    case 3:
                        error_2 = _a.sent();
                        // Handle any potential errors
                        console.error('Error creating company:', error_2);
                        throw new Error('Could not create company');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ResourcesService = __decorate([
        common_1.Injectable()
    ], ResourcesService);
    return ResourcesService;
}());
exports.ResourcesService = ResourcesService;
