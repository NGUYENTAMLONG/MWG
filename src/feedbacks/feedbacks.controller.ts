import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedbacksService } from './feedbacks.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { imageFileFilter } from 'src/common/utils/file.util';
import { FeedbackTypes } from './constants/feedback.constant';

@ApiTags('feedbacks')
@Controller({ version: ['1'], path: 'feedbacks' })
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}


  @Post('')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'User Creates feedback ( exam / question )' })
  @ApiConsumes('multipart/form-data')
  // @UseInterceptors(
  //   FilesInterceptor('feedbackImages', 10, {
  //      fileFilter: imageFileFilter,
  //   })
  // )
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       message: { type: 'string'},
  //       type: { 
  //               type: 'enum', 
  //               enum: [...Object.values(FeedbackTypes)],
  //               default:Object.values(FeedbackTypes)[0]
  //             },
  //       questionId: { type: 'number', nullable: true },
  //       answerId: { type: 'number', nullable: true},
  //       feedbackImages: {
  //         type: 'array',
  //         maxLength:2,
  //         items: { type: 'string', format: 'binary' },
  //       },
  //     },
  //   },
  // }
  // )
  // @ApiBody({
  //   type:CreateFeedbackDto
  // })
  @UseInterceptors(FilesInterceptor('feedbackImages'))
  createOne(
    @Body() payload:CreateFeedbackDto,
    @UploadedFiles() feedbackImages: Array<Express.Multer.File>,
  )
  // : Promise<any>
   {
    return {payload,feedbackImages};
    return this.feedbacksService.createOneFeedback(payload,feedbackImages);
  }
 // https://stackoverflow.com/questions/66605192/file-uploading-along-with-other-data-in-swagger-nestjs
  @Get()
  findAll() {
    return this.feedbacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.feedbacksService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(+id);
  }
}
