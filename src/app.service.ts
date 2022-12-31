import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import pdf from 'convert-html-to-pdf';

import { StorageService } from './storage.service';

@Injectable()
export class AppService {
  constructor(private readonly storageService: StorageService) {}
  public async saveReport(file: Express.Multer.File) {
    try {
      this.validateFileType(file.mimetype);

      const htmlToPdf = new pdf(file.buffer.toString());

      const pdfConverted = await htmlToPdf.convert();
      return await this.storageService.save(file.originalname, pdfConverted);
    } catch (error) {
      console.log(error);
      throw new HttpException(error?.name, HttpStatus.BAD_REQUEST);
    }
  }

  private validateFileType(mimetype: string) {
    if (!mimetype.match(/html/)) {
      throw 'Type file is invalid';
    }
  }
}
