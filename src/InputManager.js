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
}

export default InputManager;
