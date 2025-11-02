import { Random } from '@woowacourse/mission-utils';
import Lotto from '../Lotto.js';
import {
  LOTTO_MAXIMUM_NUMBER,
  LOTTO_MINIMUM_NUMBER,
  LOTTO_NUMBER_LENGTH,
  LOTTO_RANK,
  LOTTO_UNIT_PRICE,
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
      ((LOTTO_RANK.FIFTH.PRIZE_AMOUNT * winCount.fifth +
        LOTTO_RANK.FOURTH.PRIZE_AMOUNT * winCount.fourth +
        LOTTO_RANK.THIRD.PRIZE_AMOUNT * winCount.third +
        LOTTO_RANK.SECOND.PRIZE_AMOUNT * winCount.second +
        LOTTO_RANK.FIRST.PRIZE_AMOUNT * winCount.first) /
        purchaseAmount) *
      100
    );
  }
}

export default LottoUtils;
