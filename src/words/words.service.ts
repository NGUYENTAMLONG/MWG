import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddWordDto } from './dtos/add-word.dto';
import { WordEntity } from './entities/word.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
  ) {}
  async getList(): Promise<WordEntity[]> {
    return await this.wordRepository.find();
  }
  async addWord(payload: AddWordDto): Promise<WordEntity> {
    try {
      const newWord = {
        ...payload,
      };
      const addedWord = await this.wordRepository.save(newWord);
      return addedWord;
    } catch (error) {
      console.log(error);
    }
  }
}
