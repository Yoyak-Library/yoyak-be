import { Injectable } from '@nestjs/common';
import { HighlightRepository } from '../repositories/highlight.repository';  // Prisma 방식으로 수정된 저장소 사용
import { CreateHighlightDto } from '../dtos/highlight.dto';
import { SummaryRepository } from '../repositories/summary.repository';
import { ReviewRepository } from '../repositories/review.repository';

@Injectable()
export class HighlightService {
  constructor(
    private readonly highlightRepository: HighlightRepository,  // PrismaService로 변경된 Repository
    private readonly summaryRepository: SummaryRepository,
    private readonly reviewRepository: ReviewRepository,
  ) {}

  // 요약문 하이라이트 저장
  async highlightSummary(summary_id: number, createHighlightDto: CreateHighlightDto) {
    // 요약문이 존재하는지 확인
    const summary = await this.summaryRepository.findOne(summary_id);
    if (!summary) {
      throw new Error('요약문이 존재하지 않습니다.');
    }

    // 하이라이트 저장 (Prisma 방식으로 수정)
    const highlight = await this.highlightRepository.saveHighlight({
      ...createHighlightDto,
      summary_id,
    });

    return highlight;
  }

  // 리뷰 하이라이트 저장
  async highlightReview(review_id: number, createHighlightDto: CreateHighlightDto) {
    // 리뷰가 존재하는지 확인
    const review = await this.reviewRepository.findOne(review_id);
    if (!review) {
      throw new Error('리뷰가 존재하지 않습니다.');
    }

    // 하이라이트 저장 
    const highlight = await this.highlightRepository.saveHighlight({
      ...createHighlightDto,
      review_id,
    });

    return highlight;
  }

  // 요약문 하이라이트 취소
  async unhighlightSummary(summary_id: number) {
    // 요약문이 존재하는지 확인
    const summary = await this.summaryRepository.findOne(summary_id);
    if (!summary) {
      throw new Error('요약문이 존재하지 않습니다.');
    }

    // 요약문 하이라이트 삭제 (Prisma 방식으로 수정)
    await this.highlightRepository.deleteHighlightBySummary(summary_id);
  }

  // 리뷰 하이라이트 취소
  async unhighlightReview(review_id: number) {
    // 리뷰가 존재하는지 확인
    const review = await this.reviewRepository.findOne(review_id);
    if (!review) {
      throw new Error('리뷰가 존재하지 않습니다.');
    }

    // 리뷰 하이라이트 삭제 (Prisma 방식으로 수정)
    await this.highlightRepository.deleteHighlightByReview(review_id);
  }

  // 하이라이트 전체 조회
  async getAllHighlights() {
    return await this.highlightRepository.findAllHighlights();
  }

  // 하이라이트 작성일 순 조회
  async getHighlightsByDate() {
    return await this.highlightRepository.findHighlightsByDate();
  }
}
