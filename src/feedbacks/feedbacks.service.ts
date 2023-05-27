import { BadGatewayException, Injectable } from '@nestjs/common';
import { FeedbackRepository } from './feedbacks.repository';
import { Like } from 'typeorm';
import { FeedbackEntity } from './entities/feedback.entity';
import { assign } from 'lodash';

@Injectable()
export class FeedbacksService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  public async createOneFeedback(payload, feedbackImage) {
    return {payload, feedbackImage};
  }


  public async findAllFeedbacks(query): Promise<any> {
    let condition = {};
    if (query.search) {
      condition = [
        { message: Like(`%${query.search}%`) },
      ];
    }

    return this.feedbackRepository.findAllByConditions(
      condition,
      query,
      {
        question:true,
        exam:true
      },
      // {
      //   uId: true,
      //   username: true,
      //   password: false,
      //   email: true,
      //   avatar: true,
      // },
    );
  }

  public async findOneFeedback(feedbackId:number):Promise<FeedbackEntity> {
    try {
      const foundFeedback = await this.feedbackRepository.findOne({
        where:{
          id: feedbackId
        },
        relations:{
          question:true,
          exam:true
        }
      })
      return foundFeedback;
    } catch (error) {
      console.log(error);
      return error
    }
  }

  update(id: number) {
    return `This action updates a #${id} exam`;
  }

  public async softDeleteOneFeedback(feedbackId: number):Promise<any> {
    try {
      const foundFeedback = await this.feedbackRepository.findOne({
        where:{
          id:feedbackId
        }
      })      
      if (!foundFeedback) {
        throw new BadGatewayException(EX)
      }
    } catch (error) {
      console.log(error);
      return error
    }
  }
}
