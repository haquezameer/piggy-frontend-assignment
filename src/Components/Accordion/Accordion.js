import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

import "./Accordion.css";

const AccordionContext = React.createContext();

class Accordion extends Component {
  state = {
    activeItem: -1,
    activeItemData: null
  };

  toggleActiveItem = itemKey => {
    fetch(`https://api.piggy.co.in/v1/mf/?key=${itemKey}`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          activeItemData: res.data.mutual_fund.details,
          activeItem: this.state.activeItem === itemKey ? -1 : itemKey
        })
      );
  };

  static Tab = props => (
    <AccordionContext.Consumer>
      {({ toggleActiveItem, activeItem }) => (
        <div
          onClick={() => {
            toggleActiveItem(props.itemKey);
          }}
          className={
            props.itemKey === activeItem
              ? "accordion-tab accordion-tab-active"
              : "accordion-tab"
          }
        >
          <div style={{ width: "80%", textAlign: "left" }}>
            {props.children}
          </div>
          <div style={{ width: "15%", textAlign: "right" }}>
            {props.itemKey === activeItem ? (
              <FontAwesome name="chevron-up" />
            ) : (
              <FontAwesome name="chevron-down" />
            )}
          </div>
        </div>
      )}
    </AccordionContext.Consumer>
  );

  static Pane = props => (
    <AccordionContext.Consumer>
      {({ activeItem, activeItemData }) => (
        <div
          className={activeItem === props.itemKey ? "active-panel" : "hidden"}
        >
          {activeItemData !== null ? (
            <div>
              <p>
                <span className="light-text">Name:</span>{" "}
                <span className="heavy-text">{activeItemData.name}</span>
              </p>
              <p>
                <span className="light-text">Riskometer:</span>{" "}
                <span className="heavy-text">{activeItemData.riskometer}</span>
              </p>
              <p>
                <span className="light-text">Minimum Subscription:</span>{" "}
                <span className="heavy-text">
                  {activeItemData.minimum_subscription}
                </span>
              </p>
              <p>
                <span className="light-text">Rating:</span>{" "}
                <span className="heavy-text">{activeItemData.rating}</span>
              </p>
              <p>
                <span className="light-text">Category:</span>{" "}
                <span className="heavy-text">{activeItemData.category}</span>
              </p>
              <p>
                <span className="light-text">Asset_aum:</span>{" "}
                <span className="heavy-text">{activeItemData.asset_aum}</span>
              </p>
              <p>
                <span className="light-text">Return_3yr: </span>
                <span className="heavy-text">{activeItemData.return_3yr}</span>
              </p>
              <p>
                <span className="light-text">Benchmark_Text: </span>
                <span className="heavy-text">
                  {activeItemData.benchmark_text}
                </span>
              </p>
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
          toggleActiveItem: this.toggleActiveItem
        }}
      >
        <div className="accordian">{this.props.children}</div>
      </AccordionContext.Provider>
    );
  }
}

export default Accordion;
