import { INITIAL_WIN_COUNT, WIN_UNIT_INCREASE } from './constants/Enum';

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
      first: INITIAL_WIN_COUNT.FIRST,
      second: INITIAL_WIN_COUNT.SECOND,
      third: INITIAL_WIN_COUNT.THIRD,
      fourth: INITIAL_WIN_COUNT.FOURTH,
      fifth: INITIAL_WIN_COUNT.FIFTH,
    };
  }

  addWinCount(lottoRank) {
    this.#winCount[lottoRank] += WIN_UNIT_INCREASE;
  }

  getLottos() {
    return this.#lottos;
  }

  getAnswerNumbers() {
    return this.#answerNumbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  getWinCount() {
    return this.#winCount;
  }
}

export default LottoGame;
