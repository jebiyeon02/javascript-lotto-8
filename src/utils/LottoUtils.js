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
}

export default LottoUtils;
