import LottoGameController from './LottoGameController.js';

class App {
  async run() {
    const lottoGameController = new LottoGameController();
    await lottoGameController.play();
  }
}

export default App;
