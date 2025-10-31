import LottoUtils from '../src/utils/LottoUtils.js';

describe('로또 개수 테스트', () => {
  test('기능 테스트', () => {
    // given
    const purchaseAmount = 5000;

    // when & then
    expect(LottoUtils.getPurchaseLottoCount(purchaseAmount)).toBe(5);
  });
});
