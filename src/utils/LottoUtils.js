import { Random } from '@woowacourse/mission-utils';
import Lotto from '../Lotto.js';

class LottoUtils {
  static getPurchaseLottoCount(purchaseAmount) {
    return purchaseAmount / 1000;
  }

  static createLottosWithPurchaseCount(purchaseCount) {
    const lottos = [];
    for (let i = 0; i < purchaseCount; i += 1) {
      const lottoNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      lottoNumbers.sort((a, b) => a - b);
      lottos.push(new Lotto(lottoNumbers));
    }

    return lottos;
  }

  static getRateOfReturn(winCount, purchaseAmount) {
    return (
      ((5000 * winCount.fifth +
        50000 * winCount.fourth +
        1500000 * winCount.third +
        30000000 * winCount.second +
        2000000000 * winCount.first) /
        purchaseAmount) *
      100
    );
  }
}

export default LottoUtils;
