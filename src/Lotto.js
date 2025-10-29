class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }

    numbers.forEach((number) => {
      if (Number(number) < 1 || Number(number) > 45) {
        throw new Error('[ERROR] 로또 번호는 1~45사이여야 합니다.');
      }
    });

    const setNumbers = new Set(numbers);
    if (numbers.length !== setNumbers.size) {
      throw new Error('[ERROR] 로또 번호는 중복될 수 없습니다.');
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
