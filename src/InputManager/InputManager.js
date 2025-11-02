import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constants/Messages.js';
import ERROR_MESSAGES from '../constants/ErrorMessages.js';
import {
  ANSWER_NUMBER_INPUT_DELIMETER,
  ANSWER_NUMBER_LENGTH,
  INTEGER_CHECK_NUMBER,
  LOTTO_MAXIMUM_NUMBER,
  LOTTO_MINIMUM_NUMBER,
  LOTTO_UNIT_PRICE,
  PURCHASE_AMOUNT_MININUM_NUMBER,
} from '../constants/Enum.js';

class InputManager {
  static async inputPurchaseAmountUntilValid() {
    let purchaseAmount;
    while (true) {
      try {
        purchaseAmount = await InputManager.#inputPurchaseAmount();
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }

    return purchaseAmount;
  }

  static async #inputPurchaseAmount() {
    const inputPurchaseAmount = await Console.readLineAsync(
      MESSAGES.INPUT_PURCHASE_AMOUNT_MESSAGE,
    );
    InputManager.#validatePurchaseAmount(inputPurchaseAmount);

    return Number(inputPurchaseAmount);
  }

  static #validatePurchaseAmount(inputPurchaseAmount) {
    InputManager.#validatePurchaseAmountIsNumber(inputPurchaseAmount);
    InputManager.#validatePurchaseAmountBiggerThanMinimumAmount(
      inputPurchaseAmount,
    );
    InputManager.#validatePurchaseAmountCanDivideByAmountUnit(
      inputPurchaseAmount,
    );
  }

  static #validatePurchaseAmountIsNumber(inputPurchaseAmount) {
    if (isNaN(inputPurchaseAmount)) {
      throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT_NOT_NUMBER);
    }
  }

  static #validatePurchaseAmountBiggerThanMinimumAmount(inputPurchaseAmount) {
    if (Number(inputPurchaseAmount) < PURCHASE_AMOUNT_MININUM_NUMBER) {
      throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT_NOT_POSITIVE_INTEGER);
    }
  }

  static #validatePurchaseAmountCanDivideByAmountUnit(inputPurchaseAmount) {
    if (Number(inputPurchaseAmount) % LOTTO_UNIT_PRICE !== 0) {
      // A % B === 0은 수학적 정의 이므로 0은 매직 넘버가 아니라고 생각
      throw new Error(
        ERROR_MESSAGES.PURCHASE_AMOUNT_NOT_DIVISIBLE_BY_PURCHASE_AMOUNT_UNIT,
      );
    }
  }

  static async inputAnswerNumbersUntilValid() {
    let answerNumbers;
    while (true) {
      try {
        answerNumbers = await InputManager.#inputAnswerNumbers();
        Console.print('');
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
    answerNumbers.sort();
    return answerNumbers;
  }

  static async #inputAnswerNumbers() {
    const inputAnswerNumbers = await Console.readLineAsync(
      MESSAGES.INPUT_ANSWER_NUMBER_MESSAGE,
    );

    const answerNumbers =
      InputManager.#removeWhiteSpaceAndSplitAnswerNumbers(inputAnswerNumbers);
    InputManager.#validateAnswerNumbers(answerNumbers);

    return Array.from(answerNumbers, (number) => Number(number));
  }

  static #removeWhiteSpaceAndSplitAnswerNumbers(answerNumbers) {
    return answerNumbers
      .replaceAll(' ', '')
      .split(ANSWER_NUMBER_INPUT_DELIMETER);
  }

  static #validateAnswerNumbers(answerNumbers) {
    InputManager.#validateAnswerNumbersAreCorrectLength(answerNumbers);
    InputManager.#validateAnswerNumbersNotIncludeBlank(answerNumbers);
    InputManager.#validateAnswerNumbersAreNumber(answerNumbers);
    InputManager.#validateAnswerNumbersInRange(answerNumbers);
    InputManager.#validateAnswerNumbersAreInteger(answerNumbers);
    InputManager.#validateAnswerNumbersNotHaveSameNumber(answerNumbers);
  }

  static #validateAnswerNumbersAreCorrectLength(answerNumbers) {
    if (answerNumbers.length !== ANSWER_NUMBER_LENGTH) {
      throw new Error(ERROR_MESSAGES.ANSWER_NUMBER_LENGTH_NOT_CORRECT);
    }
  }

  static #validateAnswerNumbersNotIncludeBlank(answerNumbers) {
    if (answerNumbers.includes('')) {
      throw new Error(ERROR_MESSAGES.ANSWER_NUMBER_INCLUDE_BLANK);
    }
  }

  static #validateAnswerNumbersAreNumber(answerNumbers) {
    answerNumbers.forEach((number) => {
      if (isNaN(number)) {
        throw new Error(ERROR_MESSAGES.ANSWER_NUMBER_NOT_NUMBER);
      }
    });
  }

  static #validateAnswerNumbersInRange(answerNumbers) {
    answerNumbers.forEach((number) => {
      if (
        Number(number) < LOTTO_MINIMUM_NUMBER ||
        Number(number) > LOTTO_MAXIMUM_NUMBER
      ) {
        throw new Error(ERROR_MESSAGES.ANSWER_NUMBER_OVER_RANGE);
      }
    });
  }

  static #validateAnswerNumbersAreInteger(answerNumbers) {
    answerNumbers.forEach((number) => {
      if (Number(number) % INTEGER_CHECK_NUMBER !== 0) {
        throw new Error(ERROR_MESSAGES.ANSWER_NUMBER_NOT_INTEGER);
      }
    });
  }

  static #validateAnswerNumbersNotHaveSameNumber(answerNumbers) {
    const setAnswerNumbers = new Set(answerNumbers);
    if (answerNumbers.length !== setAnswerNumbers.size) {
      throw new Error(ERROR_MESSAGES.ANSWER_NUMBER_INCLUDE_SAME_NUMBER);
    }
  }
}

export default InputManager;
