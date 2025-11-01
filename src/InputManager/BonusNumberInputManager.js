import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constants/Messages.js';
import ERROR_MESSAGES from '../constants/ErrorMessages.js';
import {
  INTEGER_CHECK_NUMBER,
  LOTTO_MAXIMUM_NUMBER,
  LOTTO_MINIMUM_NUMBER,
} from '../constants/Enum.js';
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
    const inputBonusNumber = await Console.readLineAsync(
      MESSAGES.INPUT_BONUS_NUMBER_MESSAGE,
    );

    const bonusNumber = this.#removeWhiteSpaceBonusNumber(inputBonusNumber);
    this.#validateBonusNumber(bonusNumber, this.#answerNumbers);

    return Number(bonusNumber);
  }

  #removeWhiteSpaceBonusNumber(bonusNumber) {
    return bonusNumber.replaceAll(' ', '');
  }

  #validateBonusNumber(bonusNumber, answerNumbers) {
    this.#validateBonusNumberNotIncludeBlank(bonusNumber);
    this.#validateBonusNumberIsNumber(bonusNumber);
    this.#validateBonusNumberInRange(bonusNumber);
    this.#validateBonusNumberIsInteger(bonusNumber);
    this.#validateBonusNumberNotEqualToAnswerNumber(bonusNumber, answerNumbers);
  }

  #validateBonusNumberNotIncludeBlank(bonusNumber) {
    if (bonusNumber.includes(' ')) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_INCLUDE_BLANK);
    }
  }

  #validateBonusNumberIsNumber(bonusNumber) {
    if (isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_NOT_NUMBER);
    }
  }

  #validateBonusNumberInRange(bonusNumber) {
    if (
      Number(bonusNumber) < LOTTO_MINIMUM_NUMBER ||
      Number(bonusNumber) > LOTTO_MAXIMUM_NUMBER
    ) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_OVER_RANGE);
    }
  }

  #validateBonusNumberIsInteger(bonusNumber) {
    if (Number(bonusNumber) % INTEGER_CHECK_NUMBER !== 0) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_NOT_INTEGER);
    }
  }

  #validateBonusNumberNotEqualToAnswerNumber(bonusNumber, answerNumbers) {
    if (answerNumbers.includes(Number(bonusNumber))) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_EQUAL_ANSWER_NUMBER);
    }
  }
}

export default BonusNumberInputManager;
