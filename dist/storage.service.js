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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const storage_file_1 = require("./storage-file");
const storage_1 = require("@google-cloud/storage");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let StorageService = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.storage = new storage_1.Storage({
            projectId: this.configService.get('projectId'),
            credentials: {
                client_email: this.configService.get('client_email'),
                private_key: this.configService.get('private_key'),
            },
        });
        this.bucket = this.configService.get('mediaBucket');
    }
    async save(path, media) {
        try {
            const bucket = this.storage.bucket(this.bucket);
            const file = bucket.file(path);
            await file.save(media, {
                contentType: 'application/pdf',
            });
            const [url] = await file.getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 15 * 60 * 1000,
            });
            return { urlFile: url };
        }
        catch (error) {
            throw error;
        }
    }
    async get(path) {
        const fileResponse = await this.storage
            .bucket(this.bucket)
            .file(path)
            .download();
        const [buffer] = fileResponse;
        const storageFile = new storage_file_1.StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map();
        return storageFile;
    }
    async getWithMetaData(path) {
        const [metadata] = await this.storage
            .bucket(this.bucket)
            .file(path)
            .getMetadata();
        const fileResponse = await this.storage
            .bucket(this.bucket)
            .file(path)
            .download();
        const [buffer] = fileResponse;
        const storageFile = new storage_file_1.StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map(Object.entries(metadata || {}));
        storageFile.contentType = storageFile.metadata.get('contentType');
        return storageFile;
    }
};
StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map