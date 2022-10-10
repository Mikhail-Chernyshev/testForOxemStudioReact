function App() {
  return (
    <html lang="ru">
      <head>
        <title>Test for Oxem Studio</title>
        <description>Credit calculate</description>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./pages/index.css" />
      </head>

      <body className="body">
        <div className="main">
          <h1 className="main__title">
            Рассчитайте стоимость автомобиля в лизинг
          </h1>
          <div className="data">
            <div className="data__item">
              <h3 className="data__subtitle">Стоимость автомобиля</h3>
              <div clclassNameass="data__background"></div>
              <input
                min="1000000"
                max="6000000"
                type="number"
                name="input_price"
                value=""
                placeholder="0"
                className="data__sum data__input"
                id="input_price"
              />
              <p className="data__attribute data__attribute_valut">₽</p>
              <input
                type="range"
                min="1000000"
                max="6000000"
                value="0"
                step="10000"
                className="data__range"
                id="range_price"
              />
            </div>

            <div className="data__item">
              <h3 className="data__subtitle">Первоначальный взнос</h3>
              <div className="data__background"></div>
              <input
                min="5"
                max="3600000"
                type="number"
                placeholder=""
                value=""
                className="data__sum data__input"
                id="input_firstPay"
              />
              <input
                className="data__attribute data__attribute_procents data__input"
                id="procent"
                value="0"
              />

              <input
                type="range"
                min="10"
                max="60"
                step="1"
                value="0"
                className="data__range"
                id="range_firstPay"
              />
            </div>
            <div className="data__item">
              <h3 className="data__subtitle">Срок лизинга</h3>
              <div className="data__background"></div>
              <input
                min="1"
                max="60"
                type="number"
                value=""
                placeholder="0"
                className="data__sum data__input"
                id="input_months"
              />
              <p className="data__attribute data__attribute_valut">мес.</p>
              <input
                type="range"
                min="1"
                max="60"
                value="0"
                step="1"
                className="data__range"
                id="range_months"
              />
            </div>
          </div>
          <div className="order">
            <div className="order__price">
              <h3 className="data__subtitle order__subtitle order__subtitle_shadow">
                Сумма договора лизинга
              </h3>
              <h4 className="order__sum order__sum_shadow" id="total"></h4>
            </div>
            <div className="order__price">
              <h3 className="data__subtitle order__subtitle">
                Ежемесячный платеж от
              </h3>
              <h4 className="order__sum" id="everyMonth"></h4>
            </div>
            <button type="submit" className="order__submit" id="submit">
              Оставить заявку
            </button>
          </div>
        </div>
        {/* <script src="./scripts/index.js"></script> */}
      </body>
    </html>
  );
}

export default App;
