"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.FirebaseAuthStrategy = void 0;
var passport_1 = require("@nestjs/passport");
var common_1 = require("@nestjs/common");
var passport_firebase_jwt_1 = require("passport-firebase-jwt");
var firebaseConfig = require("./firebase.config.json");
var firebase = require("firebase-admin");
var client_1 = require("@prisma/client");
var firebaseParams = {
    type: firebaseConfig.type,
    projectId: firebaseConfig.project_id,
    privateKeyId: firebaseConfig.private_key_id,
    privateKey: firebaseConfig.private_key,
    clientEmail: firebaseConfig.client_email,
    clientId: firebaseConfig.client_id,
    authUri: firebaseConfig.auth_uri,
    tokenUri: firebaseConfig.token_uri,
    authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
    clientC509CertUrl: firebaseConfig.client_x509_cert_url
};
var FirebaseAuthStrategy = /** @class */ (function (_super) {
    __extends(FirebaseAuthStrategy, _super);
    function FirebaseAuthStrategy() {
        var _this = _super.call(this, {
            jwtFromRequest: FirebaseAuthStrategy_1._jwtFromRequest
        }) || this;
        _this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebaseParams)
        });
        _this.prisma = new client_1.PrismaClient();
        return _this;
    }
    FirebaseAuthStrategy_1 = FirebaseAuthStrategy;
    FirebaseAuthStrategy.prototype.validate = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var firebaseUser, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.defaultApp.auth().verifyIdToken(token)];
                    case 1:
                        firebaseUser = _a.sent();
                        if (!firebaseUser) {
                            throw new common_1.UnauthorizedException('Invalid custom token');
                        }
                        return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { email: firebaseUser.email }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.prisma.user.create({
                                data: {
                                    email: firebaseUser.email,
                                    uid: firebaseUser.uid
                                }
                            })];
                    case 3:
                        // If user does not exist, create a new user entity
                        user = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, user];
                    case 5:
                        error_1 = _a.sent();
                        console.log("Here?");
                        throw new common_1.UnauthorizedException(error_1);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Override the jwtFromRequest method to handle cases where the authorization header is not present
    FirebaseAuthStrategy._jwtFromRequest = function (req) {
        if (!req || !req.headers || !req.headers.authorization) {
            return null;
        }
        var authHeader = req.headers.authorization;
        var parts = authHeader.split(' ');
        if (parts.length === 2) {
            var scheme = parts[0];
            var token = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                return token;
            }
        }
        return null;
    };
    var FirebaseAuthStrategy_1;
    FirebaseAuthStrategy = FirebaseAuthStrategy_1 = __decorate([
        common_1.Injectable()
    ], FirebaseAuthStrategy);
    return FirebaseAuthStrategy;
}(passport_1.PassportStrategy(passport_firebase_jwt_1.Strategy, 'firebase-auth')));
exports.FirebaseAuthStrategy = FirebaseAuthStrategy;
