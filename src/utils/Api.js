class Api {
  constructor({ host }) {
    this._host = host;
  }
  addData(data) {
    return fetch(`${this._host}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        car_coast: data.sum,
        initail_payment: data.firstpaySum,
        initail_payment_percent: data.firstpay,
        lease_term: data.months,
        total_sum: data.totalSum,
        monthly_payment_from: data.everyMonthPay,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occurred!");
        }
        return response.json();
      })
      .catch((res) => console.log(res));
  }
}
//пришлось создать на том сервисе новый апишник, чтобы убедиться, что всё работает
const api = new Api({
  host: "https://hookb.in/1go83obXnbhdW2ndyMkK",
});
export default api;
