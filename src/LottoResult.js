import { Console } from '@woowacourse/mission-utils';
import AnswerCheck from './AnswerCheck.js';

class LottoResult {
  #first;
  #second;
  #third;
  #fourth;
  #fifth;
  #lottos;
  #answerNumbers;
  #bonusNumber;
  #money;

  constructor(lottos, answerNumbers, bonusNumber, money) {
    this.#lottos = lottos;
    this.#first = 0;
    this.#second = 0;
    this.#third = 0;
    this.#fourth = 0;
    this.#fifth = 0;
    this.#answerNumbers = answerNumbers;
    this.#bonusNumber = bonusNumber;
    this.#money = money;
  }

  calculateWinCount() {
    this.#lottos.forEach((lotto) => {
      const answerCheck = new AnswerCheck(
        lotto.getNumbers(),
        this.#answerNumbers,
        this.#bonusNumber,
      );
      const lottoRank = answerCheck.checkIsWinLotto();
      if (!lottoRank) return;
      if (lottoRank === 1) {
        this.#first += 1;
        return;
      }
      if (lottoRank === 2) {
        this.#second += 1;
        return;
      }
      if (lottoRank === 3) {
        this.#third += 1;
        return;
      }
      if (lottoRank === 4) {
        this.#fourth += 1;
        return;
      }
      if (lottoRank === 5) {
        this.#fifth += 1;
        return;
      }
    });
  }

  getRateOfReturn() {
    return (
      ((5000 * this.#fifth +
        50000 * this.#fourth +
        1500000 * this.#third +
        30000000 * this.#second +
        2000000000 * this.#first) /
        this.#money) *
      100
    );
  }

  printResult() {
    Console.print('당첨 통계\n---');
    Console.print(`3개 일치 (5,000원) - ${this.#fifth}개`);
    Console.print(`4개 일치 (50,000원) - ${this.#fourth}개`);
    Console.print(`5개 일치 (1,500,000원) - ${this.#third}개`);
    Console.print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${this.#second}개`,
    );
    Console.print(`6개 일치 (2,000,000,000원) - ${this.#first}개`);
    Console.print(`총 수익률은 ${this.getRateOfReturn().toFixed(1)}%입니다.`);
  }
}

export default LottoResult;
