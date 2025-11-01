class LottoRank {
  static getLottoRank(lottoNumbers, answerNumbers, bonusNumber) {
    const answerCount = LottoRank.#getAnswerCount(
      lottoNumbers,
      answerNumbers,
      bonusNumber,
    );
    if (answerCount.answerNumberCount === 6) {
      return 'first';
    }
    if (answerCount.answerNumberCount === 5) {
      return LottoRank.#classificationSecondAndThridPrize(
        answerCount.bonusNumberCount,
      );
    }
    if (answerCount.answerNumberCount === 4) {
      return 'fourth';
    }
    if (answerCount.answerNumberCount === 3) {
      return 'fifth';
    }
    return 0;
  }

  static #classificationSecondAndThridPrize(bonusNumberCount) {
    if (bonusNumberCount === 1) return 'second';
    return 'third';
  }

  static #getAnswerCount(lottoNumbers, answerNumbers, bonusNumber) {
    const answerNumberCount = lottoNumbers.filter((lottoNumber) =>
      answerNumbers.includes(lottoNumber),
    ).length;

    const bonusNumberCount = lottoNumbers.filter(
      (lottoNumber) => lottoNumber === bonusNumber,
    ).length;

    return { answerNumberCount, bonusNumberCount };
  }
}

export default LottoRank;
