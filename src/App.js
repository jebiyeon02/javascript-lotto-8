import { Console, Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

class App {
  validateInputMoney(inputMoney) {
    if (isNaN(inputMoney))
      throw new Error('[ERROR] 구입 금액에는 숫자가 들어와야 합니다.');
    if (Number(inputMoney) <= 0)
      throw new Error('[ERROR] 구입 금액은 양의 정수이어야 합니다.');
    if (Number(inputMoney) % 1000 !== 0)
      throw new Error('[ERROR] 구입 금액은 1000으로 나누어 떨어져야 합니다.');
  }

  createLottosWithBoughtCount(boughtCount) {
    const lottos = [];
    for (let i = 0; i < boughtCount; i += 1) {
      const lottoNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      lottoNumbers.sort((a, b) => a - b);
      lottos.push(new Lotto(lottoNumbers));
    }

    return lottos;
  }

  async run() {
    let inputMoney;
    while (true) {
      try {
        inputMoney = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
        this.validateInputMoney(inputMoney);

        Console.print('');
        break;
      } catch (error) {
        Console.print(error);
      }
    }

    const boughtLottoCount = Number(inputMoney) / 1000;
    Console.print(`${boughtLottoCount}개를 구매했습니다.`);

    const lottos = this.createLottosWithBoughtCount(boughtLottoCount);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
    Console.print('');
  }
}

export default App;
