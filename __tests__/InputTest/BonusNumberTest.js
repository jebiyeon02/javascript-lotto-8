import App from '../../src/App.js';
import { getLogSpy, mockQuestions, mockRandoms } from '../ApplicationTest.js';

const runExceptionInputBonusNumber = async (inputBonusNumber) => {
  // given
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
  const INPUT_NUMBERS_TO_END = ['1000', '1,2,3,4,5,6', inputBonusNumber, '7'];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([...INPUT_NUMBERS_TO_END]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
};

describe('보너스 번호 입력 테스트', () => {
  test.each([
    ['보너스 번호에 빈 값이 존재하면 예외가 발생한다.', ' '],
    ['보너스 번호가 숫자가 아닌 경우 예외가 발생한다.', 'a'],
    [
      '보너스 번호가 1~45사이 정수가 아닌 경우 예외가 발생한다. (범위 초과)',
      '100',
    ],
    [
      '보너스 번호가 1~45사이 정수가 아닌 경우 예외가 발생한다. (정수 X)',
      '3.14',
    ],
    ['보너스 번호가 당첨 번호와 중복되는 경우 예외가 발생한다.', '2'],
  ])('예외 테스트 - %s', async (_, input) => {
    await runExceptionInputBonusNumber(input);
  });
});
