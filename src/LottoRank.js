import { LOTTO_RANK, MATCH_CORRECT_COUNT_TO_RANK } from './constants/Enum.js';

class LottoRank {
  static getLottoRank(lottoNumbers, answerNumbers, bonusNumber) {
    const answerCount = LottoRank.#getAnswerNumberCount(
      lottoNumbers,
      answerNumbers,
    );
    const hasBonusNumber = LottoRank.#hasBonusNumber(lottoNumbers, bonusNumber);
    if (LottoRank.#isSecondPrize(answerCount, hasBonusNumber)) {
      return LOTTO_RANK.SECOND.STRING;
    }

    return MATCH_CORRECT_COUNT_TO_RANK[answerCount] || LOTTO_RANK.NO_WIN;
  }

  static #getAnswerNumberCount(lottoNumbers, answerNumbers) {
    return lottoNumbers.filter((lottoNumber) =>
      answerNumbers.includes(lottoNumber),
    ).length;
  }

  static #hasBonusNumber(lottoNumbers, bonusNumber) {
    return lottoNumbers.includes(bonusNumber);
  }

  static #isSecondPrize(answerCount, hasBonusNumber) {
    if (answerCount === LOTTO_RANK.SECOND.ANSWER_COUNT && hasBonusNumber) {
      return true;
    }

    return false;
  }
}

export default LottoRank;
