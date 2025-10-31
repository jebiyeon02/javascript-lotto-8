import { Console } from '@woowacourse/mission-utils';
import LottoResult from './LottoResult.js';
import InputManager from './InputManager.js';
import LottoUtils from './utils/LottoUtils.js';
import LottoGame from './LottoGame.js';
import BonusNumberInputManager from './InputManager/BonusNumberInputManager.js';

class App {
  async run() {
    const purchaseAmount = await InputManager.inputPurchaseAmountUntilValid();

    const purchaseLottoCount = LottoUtils.getPurchaseLottoCount(purchaseAmount);
    Console.print(`${purchaseLottoCount}개를 구매했습니다.`);

    const lottos = LottoUtils.createLottosWithPurchaseCount(purchaseLottoCount);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
    Console.print('');

    const answerNumbers = await InputManager.inputAnswerNumbersUntilValid();

    // answerNumbers가 해당 클래스 내부에서 필요하기 때문에 이 InputManager만 인스턴스 생성
    const bonusNumberInputManager = new BonusNumberInputManager(answerNumbers);
    const bonusNumber =
      await bonusNumberInputManager.inputBonusNumberUntilValid();

    const lottoGame = new LottoGame(lottos, answerNumbers, bonusNumber);

    const gameResult = new LottoResult(
      lottos,
      answerNumbers,
      bonusNumber,
      purchaseAmount,
    );
    gameResult.calculateWinCount();
    gameResult.printResult();
  }
}

export default App;
