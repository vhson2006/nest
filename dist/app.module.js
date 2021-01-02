"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const services_module_1 = require("./services/services.module");
const config_1 = require("@nestjs/config");
const common_module_1 = require("./common/common.module");
const home_controller_1 = require("./home/home.controller");
const home_module_1 = require("./home/home.module");
const Joi = require("@hapi/joi");
const app_config_1 = require("./config/app.config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'admin'),
                serveRoot: '/join-us',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'client'),
                serveRoot: '/',
                exclude: ['/join-us*'],
            }),
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    DATABASE_HOST: Joi.required(),
                    DATABASE_PORT: Joi.number().default(5432),
                }),
                load: [app_config_1.default],
                isGlobal: true,
                envFilePath: ['.env'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.DATABASE_HOST,
                    port: +process.env.DATABASE_PORT,
                    username: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    database: process.env.DATABASE_NAME,
                    autoLoadEntities: true,
                }),
            }),
            services_module_1.ServicesModule,
            common_module_1.CommonModule,
            home_module_1.HomeModule,
        ],
        controllers: [app_controller_1.AppController, home_controller_1.HomeController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map