import React, { Component } from "react";

const AccordionContext = React.createContext();

class Accordion extends Component {
  state = {
    activeItem: -1,
    activeItemData: null
  };

  setActiveItem = itemKey => {
    console.log("id: " + itemKey);
    fetch(`https://api.piggy.co.in/v1/mf/?key=${itemKey}`)
      .then(res => res.json())
      .then(res =>
        this.setState(
          {
            activeItemData: res.data.mutual_fund.details,
            activeItem: itemKey
          },
          () => {
            console.log(this.state.activeItemData);
          }
        )
      );
  };

  static Tab = props => (
    <AccordionContext.Consumer>
      {({ setActiveItem }) => (
        <button
          onClick={() => {
            console.log(props);
            setActiveItem(props.itemKey);
          }}
          className="accordion-tab"
        >
          {props.children}
        </button>
      )}
    </AccordionContext.Consumer>
  );

  static Pane = props => (
    <AccordionContext.Consumer>
      {({ activeItem, activeItemData }) => (
        <div className={activeItem === props.itemKey ? "active" : "hidden"}>
          {activeItemData !== null ? (
            <div>
              <p>Name: {activeItemData.name}</p>
              <p>Riskometer: {activeItemData.riskometer}</p>
              <p>Minimum Subscription: {activeItemData.minimum_subscription}</p>
              <p>Rating: {activeItemData.rating}</p>
              <p>Category: {activeItemData.category}</p>
              <p>Asset_aum: {activeItemData.asset_aum}</p>
              <p>Return_3yr: {activeItemData.return_3yr}</p>
              <p>Benchmark_Text: {activeItemData.benchmark_text}</p>
            </div>
          ) : (
            "loading"
          )}
        </div>
      )}
    </AccordionContext.Consumer>
  );

  render() {
    return (
      <AccordionContext.Provider
        value={{
          activeItem: this.state.activeItem,
          activeItemData: this.state.activeItemData,
          setActiveItem: this.setActiveItem
        }}
      >
        {this.props.children}
      </AccordionContext.Provider>
    );
  }
}

export default Accordion;
