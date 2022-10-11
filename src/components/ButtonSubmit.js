import React from "react";
import api from "../utils/Api";

class ButtonSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.handleSetLoading(true);
    this.props.onClick();

  }

  render() {
    return (
      <>
        <button
          type="click"
          className={`order__submit order__submit_hover toggle_disabled  ${this.props.disabledClass} ${this.props.clickClass}`}
          id="submit"
          onClick={this.handleSubmit}
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
