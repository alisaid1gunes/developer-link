import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { FileUpload } from 'graphql-upload';
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: FileUpload,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise(async (resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      const { createReadStream } = await file;

      createReadStream()
        .pipe(upload)
        .on('error', (err) => reject(err));
    });
  }
}
