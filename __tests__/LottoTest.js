import Lotto from '../src/Lotto';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  // TODO: 추가 기능 구현에 따른 테스트 코드 작성
  test('로또 번호의 개수가 6개 미만이면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호들 중 1~45 사이 정수가 아니라면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([-1, 2, 3, 4, 5, 46]);
    }).toThrow('[ERROR]');
  });

  test('올바른 로또가 생성된다.', () => {
    // given
    const RANDOM_NUMBERS = [2, 5, 6, 10, 20, 30];

    // when
    const lotto = new Lotto(RANDOM_NUMBERS);

    // then
    expect(lotto.getNumbers()).toEqual(RANDOM_NUMBERS);
  });
});
