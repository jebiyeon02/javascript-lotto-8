class AnswerCheck {
  #lotto;
  #answerNumbers;
  #bonusNumber;

  constructor(lotto, answerNumbers, bonusNumber) {
    this.#lotto = lotto;
    this.#answerNumbers = answerNumbers;
    this.#bonusNumber = bonusNumber;
  }

  checkIsWinLotto() {
    const answerCount = this.getAnswerCount();
    if (answerCount === 6) return 1;
    if (answerCount === 5) {
      if (this.#lotto.includes(Number(this.#bonusNumber))) {
        return 2;
      }
      return 3;
    }
    if (answerCount === 4) {
      return 4;
    }
    if (answerCount === 3) {
      return 5;
    }

    return 0;
  }

  getAnswerCount() {
    const newAnswerNumbers = this.#answerNumbers.slice();
    let answerCount = 0;
    while (newAnswerNumbers.length) {
      if (this.#lotto.includes(Number(newAnswerNumbers.shift()))) {
        answerCount += 1;
      }
    }
    return answerCount;
  }
}

export default AnswerCheck;
