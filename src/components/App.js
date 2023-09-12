import '../index.css';
import React from 'react';
import api from '../utils/Api';
import ButtonSubmit from './ButtonSubmit';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 1000000,
      firstpay: 10,
      firstpaySum: 0,
      months: 12,
      totalSum: null,
      everyMonthPay: null,
      disabled: false,
      disabledClass: '',
      clickClass: '',
      isLoading: false,
    };
  }
  handleValiditySum(state) {
    let sum = Number(state.sum);
    if (sum > 60000000) {
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
  handleChange = (evt) => {
    if (evt.target.name === 'sum' && evt.target.value < 1000000) {
      this.setState({ sum: evt.target.value });
    } else if (evt.target.name === 'months' && evt.target.value < 12) {
      this.setState({ months: evt.target.value });
    } else {
      const newState = this.calculate({
        ...this.state,
        [evt.target.name]: Number(evt.target.value),
      });
      this.setState(newState);
    }
  };

  handleFirstInputChange = (evt) => {
    console.log(evt.target.value);
    const firstSum = this.state.sum / this.state.months;
    console.log(firstSum);

    if (evt.target.value < firstSum) {
      this.setState({ firstpaySum: Number(evt.target.value) });
    } else {
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
    }
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
  getFirstPayRuble(state) {
    let firstPayRuble = state.sum * (state.firstpay / 100);
    firstPayRuble = Math.round(firstPayRuble);
    if (firstPayRuble < state.sum / 10) {
      firstPayRuble = state.sum / 10;
    }
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
    if (this.state.months !== '') {
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
  handleDisabled = (data, addDisabled, addClicked) => {
    this.setState({
      disabled: data,
      isLoading: data,
      disabledClass: addDisabled,
      clickClass: addClicked,
    });
  };

  handleButtonClick = () => {
    this.handleDisabled(true, 'data__disabled', 'order__submit_click');
    api.addData(this.state);
    setTimeout(() => {
      this.handleDisabled(false, '', '');
    }, 2000);
  };

  render() {
    return (
      <div className='main'>
        <h1 className='main__title'>
          Рассчитайте стоимость автомобиля в лизинг
        </h1>
        <div className='data'>
          <div className={`data__item  ${this.state.disabledClass}`}>
            <h3 className='data__subtitle'>Стоимость автомобиля</h3>
            <input
              disabled={this.state.disabled}
              name='sum'
              type='number'
              value={this.state.sum}
              onChange={this.handleChange}
              placeholder='0'
              className='data__sum data__input'
              id='input_price'
            />
            <p className='data__attribute data__attribute_valut'>₽</p>
            <input
              disabled={this.state.disabled}
              type='range'
              min='1000000'
              max='6000000'
              name='sum'
              value={this.state.sum}
              onChange={this.handleChange}
              step='10000'
              className='data__range '
              id='range_price'
            />
          </div>
          <div className={`data__item  ${this.state.disabledClass}`}>
            <h3 className='data__subtitle'>Первоначальный взнос</h3>
            <input
              disabled={this.state.disabled}
              type='number'
              placeholder='0'
              name='procents'
              value={this.state.firstpaySum}
              onChange={this.handleFirstInputChange}
              className='data__sum data__input '
              id='input_firstPay'
            />
            <p
              className='data__attribute data__attribute_procents'
              id='procent'
              type='number'
            >
              {this.state.firstpay}%
            </p>
            <input
              disabled={this.state.disabled}
              min='10'
              max='60'
              type='range'
              step='1'
              value={this.state.firstpay}
              onChange={this.handleFirstRangeChange}
              className='data__range'
              id='range_firstPay'
            />
          </div>
          <div className={`data__item  ${this.state.disabledClass}`}>
            <h3 className='data__subtitle'>Срок лизинга</h3>
            <input
              disabled={this.state.disabled}
              type='number'
              name='months'
              value={this.state.months}
              onChange={this.handleChange}
              placeholder='0'
              className='data__sum data__input '
              id='input_months'
            />
            <p className='data__attribute data__attribute_valut'>мес.</p>
            <input
              disabled={this.state.disabled}
              type='range'
              min='12'
              max='60'
              name='months'
              value={this.state.months}
              onChange={this.handleChange}
              step='1'
              className='data__range'
              id='range_months'
            />
          </div>
        </div>
        <div className='order'>
          <div className='order__price'>
            <h3 className='data__subtitle order__subtitle order__subtitle_shadow'>
              Сумма договора лизинга
            </h3>
            <h4 className='order__sum order__sum_shadow' id='total'>
              {this.state.totalSum}
            </h4>
          </div>
          <div className='order__price'>
            <h3 className='data__subtitle order__subtitle'>
              Ежемесячный платеж от
            </h3>
            <h4 className='order__sum' id='everyMonth'>
              {this.state.everyMonthPay}
            </h4>
          </div>
          <ButtonSubmit
            isLoading={this.state.isLoading}
            state={this.state}
            onClick={this.handleButtonClick}
          />
        </div>
      </div>
      // <script src="./scripts/index.js"></script>
    );
  }
}

export default App;
