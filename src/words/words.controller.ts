import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AddWordDto } from './dtos/add-word.dto';
import { SendWordDto } from './dtos/send-word.dto';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordService: WordsService) {}

  @Get('get-list')
  getList(): Promise<any> {
    return this.wordService.getList();
  }

  @Post('add')
  create(@Body() word: AddWordDto): Promise<any> {
    return this.wordService.addWord(word);
  }

  @Post('learn')
  learn(@Body() word: SendWordDto): Promise<any> {
    return this.wordService.sendWord(word);
  }
}
