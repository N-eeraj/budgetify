import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import mime from 'mime-types';

if (!process.env.SUPABASE_PROJECT_URL) throw new Error('Missing env variable: SUPABASE_PROJECT_URL');
if (!process.env.SUPABASE_API_KEY) throw new Error('Missing env variable: SUPABASE_API_KEY');

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY,
);

export enum Bucket {
  PRIVATE = 'private',
};

@Injectable()
export class StorageService {
  async uploadFile(bucket: Bucket, path: string, file: Express.Multer.File): Promise<string> {
    const extension = mime.extension(file.mimetype);
    const filePath = `${path}.${extension}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw error;
    return data.path;
  }

  getPublicUrl(bucket: Bucket, path: string): string {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  async getSignedUrl(bucket: Bucket, path: string, expiry = 300): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiry);

    if (error) throw error;
    return data.signedUrl;
  }

  async deleteFile(bucket: Bucket, path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  }
}
