import { Console } from '@woowacourse/mission-utils';

class App {
  validateInputMoney(inputMoney) {
    if (isNaN(inputMoney))
      throw new Error('[ERROR] 구입 금액에는 숫자가 들어와야 합니다.');
    if (Number(inputMoney) <= 0)
      throw new Error('[ERROR] 구입 금액은 양의 정수이어야 합니다.');
    if (Number(inputMoney) % 1000 !== 0)
      throw new Error('[ERROR] 구입 금액은 1000으로 나누어 떨어져야 합니다.');
  }
  async run() {
    let inputMoney;
    while (true) {
      try {
        inputMoney = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
        this.validateInputMoney(inputMoney);

        break;
      } catch (error) {
        Console.print(error);
      }
    }

    const boughtLottoNumber = Number(inputMoney) / 1000;
    Console.print(`${boughtLottoNumber}개를 구매했습니다.`);
  }
}

export default App;
