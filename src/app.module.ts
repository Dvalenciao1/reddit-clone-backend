import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { InteractionModule } from './interaction/interaction.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PostModule, InteractionModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
