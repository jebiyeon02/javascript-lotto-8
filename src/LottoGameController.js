import InputManager from './InputManager.js';
import BonusNumberInputManager from './InputManager/BonusNumberInputManager.js';
import LottoGame from './LottoGame.js';
import LottoRank from './LottoRank.js';
import LottoUtils from './utils/LottoUtils.js';
import LottoOutputView from './View/LottoOutputView.js';

class LottoGameController {
  #lottoGame;

  async play() {
    await this.#initializeGame();
    this.#calculateAllLottoWinCount(this.#lottoGame.getLottos());
    const purchaseAmount = this.#lottoGame.getLottos().length * 1000;
    const winCount = this.#lottoGame.getWinCount();
    const rateOfReturn = LottoUtils.getRateOfReturn(winCount, purchaseAmount);
    LottoOutputView.printLottoResult(
      this.#lottoGame.getWinCount(),
      rateOfReturn,
    );
  }

  async #initializeGame() {
    const purchaseAmount = await InputManager.inputPurchaseAmountUntilValid();
    const purchaseLottoCount = LottoUtils.getPurchaseLottoCount(purchaseAmount);
    LottoOutputView.printPurchaseLottoCount(purchaseLottoCount);
    const lottos = LottoUtils.createLottosWithPurchaseCount(purchaseLottoCount);
    LottoOutputView.printLottoNumbers(lottos);
    const answerNumbers = await InputManager.inputAnswerNumbersUntilValid();

    // answerNumbers가 해당 클래스 내부에서 필요하기 때문에 이 InputManager만 인스턴스 생성
    const bonusNumberInputManager = new BonusNumberInputManager(answerNumbers);
    const bonusNumber =
      await bonusNumberInputManager.inputBonusNumberUntilValid();

    this.#lottoGame = new LottoGame(lottos, answerNumbers, bonusNumber);
  }

  #calculateAllLottoWinCount(lottos) {
    lottos.forEach((lotto) => this.#calculateOneLottoWinCount(lotto));
  }

  #calculateOneLottoWinCount(lotto) {
    const lottoNumbers = lotto.getNumbers();
    const answerNumbers = this.#lottoGame.getAnswerNumbers();
    const bonusNumber = this.#lottoGame.getBonusNumber();

    const lottoRank = LottoRank.getLottoRank(
      lottoNumbers,
      answerNumbers,
      bonusNumber,
    );
    if (!lottoRank) return;
    this.#lottoGame.addWinCount(lottoRank);
  }
}

export default LottoGameController;
