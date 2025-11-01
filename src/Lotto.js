import {
  LOTTO_MAXIMUM_NUMBER,
  LOTTO_MINIMUM_NUMBER,
  LOTTO_NUMBER_LENGTH,
} from './constants/Enum';
import ERROR_MESSAGES from './constants/ErrorMessages';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO_NUMBER_LENGTH) {
      throw new Error(ERROR_MESSAGES.LOTTO_NUMBER_LENGTH_NOT_CORRECT);
    }

    numbers.forEach((number) => {
      if (
        Number(number) < LOTTO_MINIMUM_NUMBER ||
        Number(number) > LOTTO_MAXIMUM_NUMBER
      ) {
        throw new Error(ERROR_MESSAGES.LOTTO_NUMBER_OVER_RANGE);
      }
    });

    const setNumbers = new Set(numbers);
    if (numbers.length !== setNumbers.size) {
      throw new Error(ERROR_MESSAGES.LOTTO_NUMBER_INCLUDE_SAME_NUMBER);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
