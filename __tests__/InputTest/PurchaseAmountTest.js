import App from '../../src/App.js';
import { getLogSpy, mockQuestions, mockRandoms } from '../ApplicationTest.js';

const runExceptionInputPurchaseAmount = async (inputPurchaseAmount) => {
  // given
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
  const INPUT_NUMBERS_TO_END = ['1000', '1,2,3,4,5,6', '7'];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([inputPurchaseAmount, ...INPUT_NUMBERS_TO_END]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
};

describe('로또 구입 금액 입력 테스트', () => {
  test.each([
    ['빈 값을 입력하면 예외가 발생한다.', ' '],
    ['숫자가 아닌 값이 존재하는 경우 예외가 발생한다. ', '1000a'],
    ['금액이 0이하이면 예외가 발생한다.', '-1'],
    ['금액이 1,000원 단위로 나누어 떨어지지 않으면 예외가 발생한다.', '1234'],
  ])('예외 테스트 - %s', async (_, input) => {
    await runExceptionInputPurchaseAmount(input);
  });
});
