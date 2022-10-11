import "../index.css";
import React from "react";
import api from "../utils/Api";
import ButtonSubmit from "./ButtonSubmit";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 1000000,
      firstpay: 10,
      firstpaySum: 0,
      months: 1,
      totalSum: null,
      everyMonthPay: null,
      disabled: 0,
      disabledClass: "",
      clickClass: "",
      isLoading: "",
    };
    // this.handleSetLoading = this.handleSetLoading.bind(this)
  }
  handleValiditySum(state) {
    let sum = Number(state.sum);
    if (sum > 6000000) {
      state.sum = 6000000;
    } else if (sum < 1000000) {
      state.sum = 1000000;
    }
  }
  handleValidityFirstpay(state) {
    let sum = Number(state.firstpay);
    if (sum > 60) {
      state.firstpay = 60;
    } else if (sum < 10) {
      state.firstpay = 10;
    }
  }
  handleValidityFirstpaySum(state) {
    let sum = Number(state.firstpaySum);
    if (sum > state.sum * 0.6) {
      state.firstpaySum = state.sum * 0.6;
    } else if (sum < state.sum * 0.1) {
      state.firstpaySum = state.sum * 0.1;
    }
  }
  handleValidityMonths(state) {
    let sum = Number(state.months);
    if (sum > 60) {
      state.months = 60;
    } else if (sum < 1) state.months = 1;
  }
  handleSumInputChange = (evt) => {
    const newState = this.calculate({
      ...this.state,
      sum: evt.target.value,
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
    const firstPayProcent = this.getFirstPayProcent({
      ...this.state,
      firstpaySum: Number(evt.target.value),
    });
    const newState = this.calculate({
      ...this.state,
      firstpaySum: Number(evt.target.value),
      firstpay: firstPayProcent,
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
  // handleFirstProcentChange = (evt) => {
  //   const firstPayRuble = this.getFirstPayRuble({
  //     ...this.state,
  //     firstpay: evt.target.value,
  //   });
  //   const newState = this.calculate({
  //     ...this.state,
  //     firstpaySum: firstPayRuble,
  //     firstpay: evt.target.value,
  //   });
  //   this.setState(newState);
  // };
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
    console.log(firstPayRuble);
    return firstPayRuble;
  }
  getFirstPayProcent(state) {
    let firstPayProcent = state.sum / 100;
    let secondSum = state.sum - state.firstpaySum;
    secondSum = secondSum / firstPayProcent;
    let result = 100 - Number(secondSum);
    return result;
  }
  calculate(state) {
    this.handleValiditySum(state);
    this.handleValidityFirstpay(state);
    this.handleValidityMonths(state);
    this.handleValidityFirstpaySum(state);
    if (this.state.months !== "") {
    }
    let monthPay =
      (state.sum - Number(state.firstpaySum)) *
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
  handleDisabled(data) {
    const newState = this.calculate({
      ...this.state,
      disabled: data,
    });
    this.setState(newState);
  }
  
  handleAddClassDisabled(visibiletyClass, clickClass) {
    const newState = this.calculate({
      ...this.state,
      disabledClass: visibiletyClass,
      clickClass: clickClass,
    });
    this.setState(newState);
  }
  handleSetLoading(data) {
    // const newState = this.calculate({
    //   ...this.state,
    //   isLoading: data,
    // });
    // this.setState(newState);
    this.setState({
      isLoading: data,
    });
  }

  handleAddPlaceSubmit(place) {
    // this.handleSetLoading();
    api
      .addData(place)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.handleSetLoading(false);
      });
  }
  render() {
    return (
      <div className="main">
        <h1 className="main__title" onClick={this.submitsubmit}>
          Рассчитайте стоимость автомобиля в лизинг
        </h1>
        <div className="data">
          <div
            className={`data__item toggle_disabled ${this.state.disabledClass}`}
          >
            <h3 className="data__subtitle">Стоимость автомобиля</h3>
            <input
              disabled={this.state.disabled}
              min="1000000"
              max="6000000"
              name="sum"
              type="number"
              value={this.state.sum}
              onChange={this.handleSumInputChange}
              placeholder="0"
              className="data__sum data__input toggle_disabled"
              id="input_price"
            />
            <p className="data__attribute data__attribute_valut">₽</p>
            <input
              disabled={this.state.disabled}
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

          <div
            className={`data__item toggle_disabled ${this.state.disabledClass}`}
          >
            <h3 className="data__subtitle">Первоначальный взнос</h3>
            <input
              disabled={this.state.disabled}
              min="5"
              max="3600000"
              type="number"
              placeholder="0"
              value={this.state.firstpaySum}
              onChange={this.handleFirstInputChange}
              className="data__sum data__input toggle_disabled"
              id="input_firstPay"
            />
            <textarea
              readOnly
              disabled={this.state.disabled}
              className="data__attribute data__attribute_procents"
              id="procent"
              type="number"
              // onChange={this.handleFirstProcentChange}
              value={`${this.state.firstpay}%`}
            ></textarea>
            <input
              disabled={this.state.disabled}
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
          <div
            className={`data__item toggle_disabled ${this.state.disabledClass}`}
          >
            <h3 className="data__subtitle">Срок лизинга</h3>
            <input
              disabled={this.state.disabled}
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
              disabled={this.state.disabled}
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

          <ButtonSubmit
            state={this.state}
            handleSetLoading={this.handleSetLoading}
            // onLoading={this.handleSetLoading}
            isLoading={this.state.isLoading}
            onClick={this.handleAddPlaceSubmit}
            disabledClass={this.state.disabledClass}
            clickClass={this.state.clickClass}
          />
        </div>
      </div>
      // <script src="./scripts/index.js"></script>
    );
  }
}

export default App;
