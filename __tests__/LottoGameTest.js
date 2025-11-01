import Lotto from '../src/Lotto.js';
import LottoGame from '../src/LottoGame.js';

describe('LottoGame 클래스 테스트', () => {
  test('생성자는 초기 상태를 올바르게 설정해야 한다.', () => {
    // given
    const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
    const answerNumbers = [1, 2, 3, 4, 5, 7];
    const bonusNumber = 8;
    const expectedInitialWinCount = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };

    // when
    const lottoGame = new LottoGame(lottos, answerNumbers, bonusNumber);

    // then
    expect(lottoGame.getLottos()).toBe(lottos);
    expect(lottoGame.getAnswerNumbers()).toBe(answerNumbers);
    expect(lottoGame.getBonusNumber()).toBe(bonusNumber);
    expect(lottoGame.getWinCount()).toEqual(expectedInitialWinCount);
  });

  const ranks = [
    {
      rank: 'first',
      expected: { first: 1, second: 0, third: 0, fourth: 0, fifth: 0 },
    },
    {
      rank: 'second',
      expected: { first: 0, second: 1, third: 0, fourth: 0, fifth: 0 },
    },
    {
      rank: 'third',
      expected: { first: 0, second: 0, third: 1, fourth: 0, fifth: 0 },
    },
    {
      rank: 'fourth',
      expected: { first: 0, second: 0, third: 0, fourth: 1, fifth: 0 },
    },
    {
      rank: 'fifth',
      expected: { first: 0, second: 0, third: 0, fourth: 0, fifth: 1 },
    },
  ];

  ranks.forEach(({ rank, expected }) => {
    test(`addWinCount는 ${rank} 등 당첨 횟수를 올바르게 증가시켜야 한다.`, () => {
      // given
      const lottoGame = new LottoGame([], [], 0);

      // when
      lottoGame.addWinCount(rank);

      // then
      expect(lottoGame.getWinCount()).toEqual(expected);
    });
  });

  test('addWinCount는 여러 번 호출되어도 횟수를 올바르게 누적해야 한다.', () => {
    // given
    const lottoGame = new LottoGame([], [], 0);
    const expectedWinCount = {
      first: 1,
      second: 0,
      third: 2,
      fourth: 0,
      fifth: 3,
    };

    // when
    lottoGame.addWinCount('first');
    lottoGame.addWinCount('third');
    lottoGame.addWinCount('fifth');
    lottoGame.addWinCount('third');
    lottoGame.addWinCount('fifth');
    lottoGame.addWinCount('fifth');

    // then
    expect(lottoGame.getWinCount()).toEqual(expectedWinCount);
  });
});
