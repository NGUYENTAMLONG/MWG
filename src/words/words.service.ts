import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { AddWordDto } from './dtos/add-word.dto';
import { SendWordDto } from './dtos/send-word.dto';
import { WordEntity } from './entities/word.entity';
import { HttpService } from '@nestjs/axios';
import { ILearnWord } from './interfaces/word.interface';
import { WORD_SWAGGER_RESPONSE } from './words.constant';
import * as lodash from 'lodash';
@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
    private http: HttpService,
  ) {}

  private readonly usedWordsOfUser = [];
  private readonly usedWordsOfServer = [];
  getList(): Promise<WordEntity[]> {
    return this.wordRepository.find();
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
      // const result =
      await this.learnWord(payload, studiedWord);
      //handle match word
      const result = await this.handleMatchWord(payload);
      return result;
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        throw new NotFoundException(WORD_SWAGGER_RESPONSE.NOT_FOUND_EXCEPTION);
      }
      return error;
    }
  }

  async learnWord(wordData: SendWordDto, payload): Promise<void> {
    try {
      const condition = { where: { word: wordData.word } };
      const foundWord = await this.wordRepository.findOne(condition);
      if (!foundWord) {
        let foundNewWord = null;
        payload.some(function (el, i) {
          if (el.hasOwnProperty('text') && el.exampleUses.length !== 0) {
            return (foundNewWord = el);
          }
        });
        let newWord: ILearnWord;
        if (!foundNewWord && payload.length !== 0) {
          const priorityWord = payload.find(
            (elm, i) => elm.hasOwnProperty('text') && elm.text !== '',
          );
          newWord = {
            wId: 'wId-' + uuid(),
            word: wordData.word,
            part_of_speech: priorityWord.partOfSpeech,
            example:
              priorityWord.exampleUses.length !== 0
                ? priorityWord.exampleUses[0].text
                : '',
            meaning: priorityWord.text,
          };
        } else {
          newWord = {
            wId: 'wId-' + uuid(),
            word: foundNewWord.word,
            part_of_speech: foundNewWord.partOfSpeech,
            example: foundNewWord.exampleUses[0].text,
            meaning: foundNewWord.text,
          };
        }

        const addedWord = await this.wordRepository.save(newWord);
        // return { message: 'Added new word', addedWord };
        // break;
      }
      //  else {
      // return { message: 'Available word', foundWord };
      //   continue;
      // }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async handleMatchWord(payload: SendWordDto): Promise<any> {
    //check used word
    await this.checkWordHasBeenUsed(payload.word);

    //check last character
    const lastCharactor = payload.word.at(-1);
    await this.checkLastCharacter(payload.word, lastCharactor);

    try {
      //store array of user
      this.usedWordsOfUser.push(payload.word);
      const foundMathWords = await this.wordRepository.find({
        where: {
          word: Like(`${lastCharactor}%`),
        },
      });
      const simpleWordArr = foundMathWords.map((elm) => elm.word);
      const difWords = lodash.differenceWith(
        simpleWordArr,
        this.usedWordsOfServer,
        lodash.isEqual,
      );
      if (difWords.length !== 0) {
        const foundMatchWord =
          difWords[Math.floor(Math.random() * difWords.length)]; //random word
        console.log({
          usedWordOfUser: this.usedWordsOfUser,
          usedWordsOfServer: this.usedWordsOfServer,
        });
        this.usedWordsOfServer.push(foundMatchWord);
        return foundMatchWord;
      } else {
        throw new NotFoundException(WORD_SWAGGER_RESPONSE.SERVER_LOSE);
      }
    } catch (error) {
      return error;
    }
  }
  async checkWordHasBeenUsed(word: string): Promise<any> {
    if (this.usedWordsOfUser.includes(word)) {
      throw new BadRequestException(WORD_SWAGGER_RESPONSE.BAD_REQUEST_WAS_USE);
    }
  }
  async checkLastCharacter(
    word: string,
    lastCharacterWordOfUser: string,
  ): Promise<any> {
    const prevWordOfServer = this.usedWordsOfServer.pop();
    if (prevWordOfServer) {
      const lastCharactorWordOfServer = prevWordOfServer.at(-1);
      if (lastCharacterWordOfUser !== lastCharactorWordOfServer) {
        throw new BadRequestException(
          WORD_SWAGGER_RESPONSE.BAD_REQUEST_NOT_MATCHING,
        );
      }
    }
  }
}
