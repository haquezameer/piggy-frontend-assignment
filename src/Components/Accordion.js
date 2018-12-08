import React, { Component } from "react";

const AccordionContext = React.createContext();

class Accordion extends Component {
  state = {
    activeItem: -1
  };

  setActiveItem = i => {
    console.log("id: " + i);
    this.setState({ activeItem: i }, () => {
      console.log(this.state.activeItem);
    });
  };

  static Tab = props => (
    <AccordionContext.Consumer>
      {({ setActiveItem }) => (
        <button
          onClick={() => {
            console.log(props);
            setActiveItem(props.itemId);
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
      {({ activeItem }) => (
        <p className={activeItem === props.itemId ? "active" : "hidden"}>
          {props.children}
        </p>
      )}
    </AccordionContext.Consumer>
  );

  render() {
    return (
      <AccordionContext.Provider
        value={{
          activeItem: this.state.activeItem,
          setActiveItem: this.setActiveItem
        }}
      >
        {this.props.children}
      </AccordionContext.Provider>
    );
  }
}

export default Accordion;
