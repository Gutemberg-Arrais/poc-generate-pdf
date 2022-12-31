"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const convert_html_to_pdf_1 = require("convert-html-to-pdf");
const storage_service_1 = require("./storage.service");
let AppService = class AppService {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async saveReport(file) {
        try {
            this.validateFileType(file.mimetype);
            const htmlToPdf = new convert_html_to_pdf_1.default(file.buffer.toString());
            const pdfConverted = await htmlToPdf.convert();
            return await this.storageService.save(file.originalname, pdfConverted);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error === null || error === void 0 ? void 0 : error.name, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    validateFileType(mimetype) {
        if (!mimetype.match(/html/)) {
            throw 'Type file is invalid';
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map