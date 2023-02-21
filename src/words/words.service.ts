import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { AddWordDto } from './dtos/add-word.dto';
import { SendWordDto } from './dtos/send-word.dto';
import { WordEntity } from './entities/word.entity';
import { HttpService } from '@nestjs/axios';
import { ILearnWord } from './interfaces/word.interface';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
    private http: HttpService,
  ) {}

  async getList(): Promise<WordEntity[]> {
    return await this.wordRepository.find();
  }

  async addWord(payload: AddWordDto): Promise<WordEntity> {
    try {
      const newWord = {
        wId: 'wId-' + uuid(),
        ...payload,
      };
      const addedWord = await this.wordRepository.save(newWord);
      return addedWord;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async sendWord(payload: SendWordDto): Promise<any> {
    try {
      const { word } = payload;
      const url = `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;
      const studiedWord = await (await this.http.get(url).toPromise()).data;
      // return studiedWord;
      const result = await this.learnWord(payload, studiedWord);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async learnWord(wordData: SendWordDto, payload): Promise<any> {
    try {
      const condition = { where: { word: wordData.word } };
      const foundWord = await this.wordRepository.findOne(condition);
      if (!foundWord) {
        let foundNewWord = null;
        payload.some(function (el, i) {
          if (el.hasOwnProperty('text') && el.exampleUses.length !== 0) {
            return (foundNewWord = el);
          } else {
            throw new HttpException(
              'Infomation not found!',
              HttpStatus.NOT_FOUND,
            );
          }
        });
        const newWord: ILearnWord = {
          wId: 'wId-' + uuid(),
          word: foundNewWord.word,
          part_of_speech: foundNewWord.partOfSpeech,
          example: foundNewWord.exampleUses[0].text,
          meaning: foundNewWord.text,
        };
        const addedWord = await this.wordRepository.save(newWord);
        return { message: 'Added new word', addedWord };
      } else {
        return { message: 'Available word', foundWord };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
