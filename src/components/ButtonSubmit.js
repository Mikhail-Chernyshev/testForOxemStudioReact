import React from "react";
import api from "../utils/Api";

class ButtonSubmit extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    api
      .addData(this.props.state)
      .then((addedData) => {
        console.log(addedData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("pipka");
      });
  }

  render() {
    return (
      <>
        <button
          type="click"
          className={`order__submit order__submit_hover toggle_disabled  ${this.props.disabledClass} ${this.props.clickClass}`}
          id="submit"
          onClick={this.handlePostData}
        >
          {this.props.isLoading ? "" : "Оставить заявку"}
          <div
            className={`order__submit_loading ${
              this.props.isLoading ? "order__submit_loading-visible" : " "
            }`}
          ></div>
        </button>
      </>
    );
  }
}

export default ButtonSubmit;
