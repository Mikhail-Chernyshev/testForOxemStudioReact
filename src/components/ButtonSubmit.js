import React from "react";

class ButtonSubmit extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onClick();
  };

  render() {
    return (
      <>
        <button
          type="click"
          className={`order__submit  ${this.props.state.disabledClass} ${this.props.state.clickClass}`}
          id="submit"
          onClick={this.handleSubmit}
        >
          {this.props.state.isLoading ? "" : "Оставить заявку"}
          <div
            className={`order__submit_loading ${
              this.props.state.isLoading ? "order__submit_loading-visible" : " "
            }`}
          ></div>
        </button>
      </>
    );
  }
}

export default ButtonSubmit;
