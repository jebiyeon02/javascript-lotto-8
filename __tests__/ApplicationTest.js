import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const runException = async (input) => {
  // given
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
  const INPUT_NUMBERS_TO_END = ['1000', '1,2,3,4,5,6', '7'];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([input, ...INPUT_NUMBERS_TO_END]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
};

describe('로또 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('기능 테스트', async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ]);
    mockQuestions(['8000', '1,2,3,4,5,6', '7']);

    // when
    const app = new App();
    await app.run();

    // then
    const logs = [
      '8개를 구매했습니다.',
      '[8, 21, 23, 41, 42, 43]',
      '[3, 5, 11, 16, 32, 38]',
      '[7, 11, 16, 35, 36, 44]',
      '[1, 8, 11, 31, 41, 42]',
      '[13, 14, 16, 38, 42, 45]',
      '[7, 11, 30, 40, 42, 43]',
      '[2, 13, 22, 32, 38, 45]',
      '[1, 3, 5, 14, 22, 45]',
      '3개 일치 (5,000원) - 1개',
      '4개 일치 (50,000원) - 0개',
      '5개 일치 (1,500,000원) - 0개',
      '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
      '6개 일치 (2,000,000,000원) - 0개',
      '총 수익률은 62.5%입니다.',
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('예외 테스트', async () => {
    await runException('1000j');
  });

  test('예외 테스트2 - 구입 금액에 숫자가 아닌 값이 들어오면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['abcd']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트3 - 구입 금액이 0이면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['0']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트4 - 구입 금액이 음수이면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['-1000']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트5 - 구입 금액이 1000원 단위로 나누어 떨어지지 않으면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1234']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트6 - 당첨 번호가 6개를 초과하면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1000', '1,2,3,4,5,6,7']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트7 - 당첨 번호가 6개 미만이면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1000', '1,2,3,4,5']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트8 - 당첨 번호에 숫자가 아닌 값이 들어오면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1000', '1,a,@,2,3,4']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트9 - 당첨 번호에 0이 들어오면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1000', '0,3,4,5,6,7']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트10 - 당첨 번호에 음수가 들어오면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1000', '-1,3,4,5,6,7']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트11 - 당첨 번호에 유리수가 들어오면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1000', '1,2,3,4,5,20.5']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트12 - 당첨 번호에 중복된 값이 존재하면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1000', '1,1,1,2,3,4']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트13 - 보너스 번호가 숫자가 아니면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1000', '1,2,3,4,5,6', 'a']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트14 - 보너스 번호가 1~45사이 정수가 아니면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1000', '1,2,3,4,5,6', '-1']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트15 - 보너스 번호가 당첨 번호와 중복되면 예외가 발생한다.', async () => {
    // given
    mockQuestions(['1000', '1,2,3,4,5,6', '3']);

    // when
    const app = new App();
    await app.run();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
