import "../index.css";
import React from "react";
import api from "../utils/Api";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 1000000,
      firstpay: 10,
      firstpaySum: 100000,
      months: 1,
      totalSum: null,
      everyMonthPay: null,
    };
  }
  handleSumInputChange = (evt) => {
    const newState = this.calculate({
      ...this.state,
      sum: Number(evt.target.value),
    });
    this.setState(newState);
  };
  handleSumRangeChange = (evt) => {
    const newState = this.calculate({
      ...this.state,
      sum: Number(evt.target.value),
    });
    this.setState(newState);
  };
  handleFirstInputChange = (evt) => {
    const newState = this.calculate({
      ...this.state,
      firstpaySum: Number(evt.target.value),
    });
    this.setState(newState);
  };
  handleFirstRangeChange = (evt) => {
    const firstPayRuble = this.getFirstPayRuble({
      ...this.state,
      firstpay: Number(evt.target.value),
    });
    const newState = this.calculate({
      ...this.state,
      firstpaySum: firstPayRuble,
      firstpay: Number(evt.target.value),
    });
    this.setState(newState);
  };
  handleFirstProcentChange = (evt) => {
    const firstPayRuble = this.getFirstPayRuble({
      ...this.state,
      firstpay: Number(evt.target.value),
    });
    const newState = this.calculate({
      ...this.state,
      firstpaySum: firstPayRuble,
      firstpay: Number(evt.target.value),
    });
    this.setState(newState);
  };
  handleMonthsInputChange = (evt) => {
    const newState = this.calculate({
      ...this.state,
      months: Number(evt.target.value),
    });
    this.setState(newState);
  };
  handleMonthsRangeChange = (evt) => {
    const newState = this.calculate({
      ...this.state,
      months: Number(evt.target.value),
    });
    this.setState(newState);
  };
  getFirstPayRuble(state) {
    let firstPayRuble = state.sum * (state.firstpay / 100);
    firstPayRuble = Math.round(firstPayRuble);
    if (firstPayRuble < state.sum / 10) {
      firstPayRuble = state.sum / 10;
    }
    return firstPayRuble;
  }
  calculate(state) {
    let monthPay =
      (state.sum - state.firstpaySum) *
      ((0.035 * Math.pow(1 + 0.035, state.months)) /
        (Math.pow(1 + 0.035, state.months) - 1));
    monthPay = Math.round(monthPay);
    let totalResult = state.months * monthPay;
    totalResult = totalResult + state.firstpaySum;
    totalResult = Math.round(totalResult);

    return {
      ...state,
      firstpaySum: state.firstpaySum,
      everyMonthPay: monthPay,
      totalSum: totalResult,
    };
  }

  submitHandler = (evt) => {
    evt.preventDefault();
    console.log(this.state);
    api.addData(this.state).catch((error) => {
      console.log(error);
    });
  };


  // buttonSubmit.addEventListener("click", (evt) => {
  //   evt.preventDefault();
  //   buttonSubmit.classList.add("order__submit_click");
  //   elementActive(elementsToggleDisabled, true);
  //   setLoading(true);
  //   api
  //     .addData(
  //       priceCarInput.value,
  //       procents.value,
  //       monthsInput.value,
  //       calculation(priceCarInput.value, procents.value, monthsInput.value)
  //     )
  //     .catch((err) => {
  //       console.log(`Error: ${err}`);
  //     })
  //     .finally(() => {
  //       buttonSubmit.classList.remove("order__submit_click");
  //       setTimeout(() => {
  //         elementActive(elementsToggleDisabled);
  //       }, 500);
  //       setLoading(false);
  //     });
  // });
  render() {
    return (
      <div className="main">
        <h1 className="main__title">
          Рассчитайте стоимость автомобиля в лизинг
        </h1>
        <div className="data">
          <div className="data__item toggle_disabled">
            <h3 className="data__subtitle">Стоимость автомобиля</h3>
            <input
              min="1000000"
              max="6000000"
              type="number"
              value={this.state.sum}
              onChange={this.handleSumInputChange}
              placeholder="0"
              className="data__sum data__input toggle_disabled"
              id="input_price"
            />
            <p className="data__attribute data__attribute_valut">₽</p>
            <input
              type="range"
              min="1000000"
              max="6000000"
              value={this.state.sum}
              onChange={this.handleSumRangeChange}
              step="10000"
              className="data__range toggle_disabled"
              id="range_price"
            />
          </div>

          <div className="data__item toggle_disabled">
            <h3 className="data__subtitle">Первоначальный взнос</h3>
            <input
              min="5"
              max="3600000"
              type="number"
              placeholder="0"
              value={this.state.firstpaySum}
              onChange={this.handleFirstInputChange}
              className="data__sum data__input toggle_disabled"
              id="input_firstPay"
            />
            <input
              className="data__attribute data__attribute_procents data__input"
              id="procent"
              type="number"
              onChange={this.handleFirstProcentChange}
              value={this.state.firstpay}
            ></input>
            <input
              type="range"
              min="10"
              max="60"
              step="1"
              value={this.state.firstpay}
              onChange={this.handleFirstRangeChange}
              className="data__range toggle_disabled"
              id="range_firstPay"
            />
          </div>
          <div className="data__item toggle_disabled">
            <h3 className="data__subtitle">Срок лизинга</h3>
            <input
              min="1"
              max="60"
              type="number"
              value={this.state.months}
              onChange={this.handleMonthsInputChange}
              placeholder="0"
              className="data__sum data__input toggle_disabled"
              id="input_months"
            />
            <p className="data__attribute data__attribute_valut">мес.</p>
            <input
              type="range"
              min="1"
              max="60"
              value={this.state.months}
              onChange={this.handleMonthsRangeChange}
              step="1"
              className="data__range toggle_disabled"
              id="range_months"
            />
          </div>
        </div>
        <div className="order">
          <div className="order__price">
            <h3 className="data__subtitle order__subtitle order__subtitle_shadow">
              Сумма договора лизинга
            </h3>
            <h4 className="order__sum order__sum_shadow" id="total">
              {this.state.totalSum}
            </h4>
          </div>
          <div className="order__price">
            <h3 className="data__subtitle order__subtitle">
              Ежемесячный платеж от
            </h3>
            <h4 className="order__sum" id="everyMonth">
              {this.state.everyMonthPay}
            </h4>
          </div>
          <button
            type="submit"
            className="order__submit order__submit_hover toggle_disabled"
            id="submit"
            onClick={this.submitHandler}
          >
            Оставить заявку
          </button>
        </div>
      </div>
      // <script src="./scripts/index.js"></script>
    );
  }
}

export default App;
