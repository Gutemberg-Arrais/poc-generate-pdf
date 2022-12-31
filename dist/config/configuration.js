"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    projectId: process.env.PROJECT_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    mediaBucket: process.env.STORAGE_MEDIA_BUCKET,
});
//# sourceMappingURL=configuration.js.map