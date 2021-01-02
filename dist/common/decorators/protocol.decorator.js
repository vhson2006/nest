"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Protocol = void 0;
const common_1 = require("@nestjs/common");
exports.Protocol = common_1.createParamDecorator((defaultValue, ctx) => {
    console.log(defaultValue);
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
});
//# sourceMappingURL=protocol.decorator.js.map