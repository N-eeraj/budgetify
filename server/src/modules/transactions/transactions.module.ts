import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    CategoriesModule,
  ],
  controllers: [
    TransactionsController,
  ],
  providers: [
    TransactionsService,
  ],
})
export class TransactionsModule {}
