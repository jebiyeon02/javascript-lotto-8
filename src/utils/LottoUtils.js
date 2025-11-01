import { Random } from '@woowacourse/mission-utils';
import Lotto from '../Lotto.js';
import {
  LOTTO_MAXIMUM_NUMBER,
  LOTTO_MINIMUM_NUMBER,
  LOTTO_NUMBER_LENGTH,
  LOTTO_UNIT_PRICE,
  PRIZE_AMOUNT,
} from '../constants/Enum.js';

class LottoUtils {
  static getPurchaseLottoCount(purchaseAmount) {
    return purchaseAmount / LOTTO_UNIT_PRICE;
  }

  static createLottosWithPurchaseCount(purchaseCount) {
    const lottos = [];
    for (let i = 0; i < purchaseCount; i += 1) {
      const lottoNumbers = Random.pickUniqueNumbersInRange(
        LOTTO_MINIMUM_NUMBER,
        LOTTO_MAXIMUM_NUMBER,
        LOTTO_NUMBER_LENGTH,
      );
      LottoUtils.sortAscendingOrder(lottoNumbers);
      lottos.push(new Lotto(lottoNumbers));
    }

    return lottos;
  }

  static sortAscendingOrder(numbers) {
    numbers.sort((a, b) => a - b);
  }

  static getRateOfReturn(winCount, purchaseAmount) {
    return (
      ((PRIZE_AMOUNT.FIFTH * winCount.fifth +
        PRIZE_AMOUNT.FOURTH * winCount.fourth +
        PRIZE_AMOUNT.THIRD * winCount.third +
        PRIZE_AMOUNT.SECOND * winCount.second +
        PRIZE_AMOUNT.FIRST * winCount.first) /
        purchaseAmount) *
      100
    );
  }
}

export default LottoUtils;
