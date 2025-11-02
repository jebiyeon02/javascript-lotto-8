import { Console } from '@woowacourse/mission-utils';
class LottoOutputView {
  static printPurchaseLottoCount(purchaseLottoCount) {
    Console.print(`\n${purchaseLottoCount}개를 구매했습니다.`);
  }

  static printLottoNumbers(lottos) {
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
  }

  static printLottoResult(winCount, rateOfReturn) {
    Console.print('\n당첨 통계\n---');
    Console.print(`3개 일치 (5,000원) - ${winCount.fifth}개`);
    Console.print(`4개 일치 (50,000원) - ${winCount.fourth}개`);
    Console.print(`5개 일치 (1,500,000원) - ${winCount.third}개`);
    Console.print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winCount.second}개`,
    );
    Console.print(`6개 일치 (2,000,000,000원) - ${winCount.first}개`);
    Console.print(`총 수익률은 ${rateOfReturn.toFixed(1)}%입니다.`);
  }
}

export default LottoOutputView;
