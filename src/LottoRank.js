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
    // 보너스 번호가 나중에 2개 3개가 될 수도 있으니 아래처럼 구현
    const bonusNumberCount = lottoNumbers.filter((lottoNumber) =>
      new Array(bonusNumber).includes(lottoNumber),
    );

    return { answerNumberCount, bonusNumberCount };
  }
}

export default LottoRank;
