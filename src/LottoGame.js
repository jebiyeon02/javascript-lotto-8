class LottoGame {
  #lottos; // 로또 번호 배열이 아닌 로또 객체들
  #answerNumbers;
  #bonusNumber;
  #winCount;

  constructor(lottos, answerNumbers, bonusNumbers) {
    this.#lottos = lottos;
    this.#answerNumbers = answerNumbers;
    this.#bonusNumber = bonusNumbers;
    this.#winCount = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
  }
}

export default LottoGame;
