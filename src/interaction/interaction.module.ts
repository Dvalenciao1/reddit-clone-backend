import { Module } from '@nestjs/common';
import { InteractionService } from '@/interaction/interaction.service';
import { InteractionController } from '@/interaction/interaction.controller';

@Module({
  controllers: [InteractionController],
  providers: [InteractionService],
})
export class InteractionModule {}
