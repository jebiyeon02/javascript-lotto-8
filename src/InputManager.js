import { Console } from '@woowacourse/mission-utils';

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
    const inputPurchaseAmount =
      await Console.readLineAsync('구입금액을 입력해 주세요.\n');
    InputManager.#validatePurchaseAmount(inputPurchaseAmount);

    return Number(inputPurchaseAmount);
  }

  static #validatePurchaseAmount(inputPurchaseAmount) {
    if (isNaN(inputPurchaseAmount))
      throw new Error('[ERROR] 구입 금액에는 숫자가 들어와야 합니다.');
    if (Number(inputPurchaseAmount) <= 0)
      throw new Error('[ERROR] 구입 금액은 양의 정수이어야 합니다.');
    if (Number(inputPurchaseAmount) % 1000 !== 0)
      throw new Error('[ERROR] 구입 금액은 1000으로 나누어 떨어져야 합니다.');
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
    const inputAnswerNumbers =
      await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');

    const answerNumbers =
      InputManager.#removeWhiteSpaceAndSplitAnswerNumbers(inputAnswerNumbers);
    InputManager.#validateAnswerNumbers(answerNumbers);

    return Array.from(answerNumbers, (number) => Number(number));
  }

  static #removeWhiteSpaceAndSplitAnswerNumbers(answerNumbers) {
    return answerNumbers.replaceAll(' ', '').split(',');
  }

  static #validateAnswerNumbers(answerNumbers) {
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
}

export default InputManager;
