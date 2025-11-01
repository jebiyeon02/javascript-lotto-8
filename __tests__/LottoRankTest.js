import LottoRank from '../src/LottoRank.js';

export const getLottoRankSpy = () => {
  const lottoAnswerSpy = jest.spyOn(LottoRank, 'getAnswerCount');
  logSpy.mockClear();
  return lottoAnswerSpy;
};

describe('로또 랭크 클래스 테스트', () => {
  test.each([
    [[1, 2, 3, 4, 5, 6], 'first'],
    [[1, 2, 3, 4, 5, 7], 'second'],
    [[1, 2, 3, 4, 5, 8], 'third'],
    [[1, 2, 3, 4, 8, 9], 'fourth'],
    [[1, 2, 3, 45, 44, 43], 'fifth'],
    [[45, 44, 43, 42, 41, 40], 0],
  ])('정답 개수 테스트', (lottoNumbers, rank) => {
    // given
    const answerNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // when & then
    expect(
      LottoRank.getLottoRank(lottoNumbers, answerNumber, bonusNumber),
    ).toBe(rank);
  });
});
