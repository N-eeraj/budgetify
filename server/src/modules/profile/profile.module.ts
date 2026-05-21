import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { StorageModule } from 'src/infra/storage/storage.module';

@Module({
  imports: [
    StorageModule,
  ],
  controllers: [
    ProfileController,
  ],
  providers: [
    ProfileService,
  ],
})
export class ProfileModule {}
