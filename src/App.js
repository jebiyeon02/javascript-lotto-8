import { Console, Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import LottoResult from './LottoResult.js';
import InputManager from './InputManager.js';

class App {
  createLottosWithBoughtCount(boughtCount) {
    const lottos = [];
    for (let i = 0; i < boughtCount; i += 1) {
      const lottoNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      lottoNumbers.sort((a, b) => a - b);
      lottos.push(new Lotto(lottoNumbers));
    }

    return lottos;
  }

  removeWhiteSpaceAndSplitAnswerNumbers(answerNumbers) {
    return answerNumbers.replaceAll(' ', '').split(',');
  }

  validateAnswerNumbers(answerNumbers) {
    if (answerNumbers.length !== 6) {
      throw new Error('[ERROR] 당첨 번호는 6개여야 합니다.');
    }
    if (answerNumbers.includes('')) {
      throw new Error('[ERROR] 당첨 번호에는 빈 값이 존재할 수 없습니다.');
    }

    answerNumbers.forEach((number) => {
      if (isNaN(number)) {
        throw new Error('[ERROR] 당첨 번호에는 숫자가 와야 합니다.');
      }
    });

    answerNumbers.forEach((number) => {
      if (Number(number) < 1 || Number(number) > 45) {
        throw new Error('[ERROR] 당첨 번호는 1~45사이여야 합니다.');
      }
    });

    answerNumbers.forEach((number) => {
      if (Number(number) % 1 !== 0) {
        throw new Error('[ERROR] 당첨 번호는 정수만 가능합니다.');
      }
    });

    const setAnswerNumbers = new Set(answerNumbers);
    if (answerNumbers.length !== setAnswerNumbers.size) {
      throw new Error('[ERROR] 당첨 번호는 중복될 수 없습니다.');
    }
  }

  removeWhiteSpaceBonusNumber(bonusNumber) {
    return bonusNumber.replaceAll(' ', '');
  }
  validateBonusNumber(bonusNumber, answerNumbers) {
    if (bonusNumber.includes(' ')) {
      throw new Error('[ERROR] 보너스 번호에는 빈 값이 존재할 수 없습니다.');
    }

    if (isNaN(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호에는 숫자가 와야 합니다.');
    }

    if (Number(bonusNumber) < 1 || Number(bonusNumber) > 45) {
      throw new Error('[ERROR] 보너스 번호는 1~45사이여야 합니다.');
    }

    if (Number(bonusNumber) % 1 !== 0) {
      throw new Error('[ERROR] 보너스 번호는 정수만 가능합니다.');
    }

    if (answerNumbers.includes(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
    }
  }

  async run() {
    const purchaseAmount = await InputManager.inputPurchaseAmountUntilValid();

    const boughtLottoCount = purchaseAmount / 1000;
    Console.print(`${boughtLottoCount}개를 구매했습니다.`);

    const lottos = this.createLottosWithBoughtCount(boughtLottoCount);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
    Console.print('');

    let answerNumbers;
    while (true) {
      try {
        const inputAnswerNumbers =
          await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
        answerNumbers =
          this.removeWhiteSpaceAndSplitAnswerNumbers(inputAnswerNumbers);
        this.validateAnswerNumbers(answerNumbers);

        answerNumbers.sort();
        Console.print('');
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }

    let bonusNumber;
    while (true) {
      try {
        const inputBonusNumber =
          await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');
        bonusNumber = this.removeWhiteSpaceBonusNumber(inputBonusNumber);
        this.validateBonusNumber(bonusNumber, answerNumbers);

        Console.print('');
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }

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
