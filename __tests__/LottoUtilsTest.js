import Lotto from '../src/Lotto.js';
import LottoUtils from '../src/utils/LottoUtils.js';
import { mockRandoms } from './ApplicationTest.js';

describe('로또 유틸 테스트', () => {
  test('로또 구매 수량 테스트', () => {
    // given
    const purchaseAmount = 5000;

    // when & then
    expect(LottoUtils.getPurchaseLottoCount(purchaseAmount)).toBe(5);
  });

  test('로또 객체 생성 테스트', () => {
    // given
    const purchaseCount = 1;
    const RANDOM_NUMBERS_TO_END = [6, 5, 4, 3, 2, 1];
    mockRandoms([RANDOM_NUMBERS_TO_END]);

    // when & then
    expect(LottoUtils.createLottosWithPurchaseCount(purchaseCount)).toEqual([
      new Lotto([1, 2, 3, 4, 5, 6]),
    ]);
  });

  test('수익률 계산 테스트', () => {
    // given
    const winCount = {
      first: 1,
      second: 1,
      third: 1,
      fourth: 1,
      fifth: 1,
    };
    const purchaseAmount = 5000;

    // when & then
    expect(LottoUtils.getRateOfReturn(winCount, purchaseAmount)).toBe(40631100);
  });

  test('오름차순 정렬 테스트 ', () => {
    // given
    const numbers = [4, 3, 2, 1];

    // when
    LottoUtils.sortAscendingOrder(numbers);

    // then
    expect(numbers).toEqual([1, 2, 3, 4]);
  });
});
