import App from '../../src/App.js';
import { getLogSpy, mockQuestions, mockRandoms } from '../ApplicationTest.js';

const runExceptionInputAnswerNumbers = async (inputAnswerNumbers) => {
  // given
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
  const INPUT_NUMBERS_TO_END = ['1000', inputAnswerNumbers, '1,2,3,4,5,6', '7'];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([...INPUT_NUMBERS_TO_END]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
};

describe('당첨 번호 입력 테스트', () => {
  test.each([
    ['당첨 번호가 6개가 아니면 예외가 발생한다. (6개 초과)', '1,2,3,4,5,6,7'],
    ['당첨 번호가 6개가 아니면 예외가 발생한다. (6개 미만)', '1,2,3,4,5'],
    ['당첨 번호에 빈 값이 존재하면 예외가 발생한다.', '1,2,3,,5,6'],
    ['당첨 번호에 숫자가 아닌 값이 포함되면 예외가 발생한다.', 'a,b,c,d,=,f'],
    [
      '당첨 번호에 1~45 사이 정수가 아닌 음수,0 또는 유리수를 포함하면 예외가 발생한다.',
      '-1,0,10.9,2,3,4',
    ],
    ['당첨 번호가 중복되면 예외가 발생한다.', '1,1,2,3,4,5'],
  ])('예외 테스트 - %s', async (_, input) => {
    await runExceptionInputAnswerNumbers(input);
  });
});
