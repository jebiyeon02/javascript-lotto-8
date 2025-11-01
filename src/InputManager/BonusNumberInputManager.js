import { Console } from '@woowacourse/mission-utils';
class BonusNumberInputManager {
  #answerNumbers;

  constructor(answerNumbers) {
    this.#answerNumbers = answerNumbers;
  }

  async inputBonusNumberUntilValid() {
    let bonusNumber;
    while (true) {
      try {
        bonusNumber = await this.#inputBonusNumber();

        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
    return bonusNumber;
  }

  async #inputBonusNumber() {
    const inputBonusNumber =
      await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');

    const bonusNumber = this.#removeWhiteSpaceBonusNumber(inputBonusNumber);
    this.#validateBonusNumber(bonusNumber, this.#answerNumbers);

    return Number(bonusNumber);
  }

  #removeWhiteSpaceBonusNumber(bonusNumber) {
    return bonusNumber.replaceAll(' ', '');
  }

  #validateBonusNumber(bonusNumber, answerNumbers) {
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

    if (answerNumbers.includes(Number(bonusNumber))) {
      throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
    }
  }
}

export default BonusNumberInputManager;
