import React, { Component } from "react";
import axios from "axios";
import { Container, Form, Header, Message } from "semantic-ui-react";
import PriceCard from "./PriceCard";

class App extends Component {
  state = {
    SearchString: "",
    ErrorMessage: "",
    Price: null
  };

  handleInput = e => {
    this.setState({ ErrorMessage: "" });
    this.setState({ Price: null });
    this.setState({ SearchString: e.target.value });
  };

  handleFormSubmit = () => {
    // console.log(this.state.SearchString);
    const BarcodeForSearch = this.state.SearchString;
    this.setState({ SearchString: "" });
    if (!BarcodeForSearch) {
      this.setState({ ErrorMessage: "Пустой штрих-код" });
      return;
    }

    axios
      .get("/api/prices", { params: { barcode: BarcodeForSearch } })
      .then(response => {
        console.log(response);
        this.setState({ Price: response.data.result });
      })
      .catch(error => {
        console.log(error.response.data.result);
        if (error.response.data.result) {
          this.setState({ ErrorMessage: error.response.data.result });
        }
        return;
      });
  };

  render() {
    return (
      <Container style={{ paddingTop: "4em" }}>
        <Form onSubmit={this.handleFormSubmit} style={{ paddingBottom: "2em" }}>
          <Form.Input
            autoFocus
            fluid
            size="massive"
            icon="search"
            placeholder="Считайте штрих-код"
            value={this.state.SearchString}
            onChange={e => this.handleInput(e)}
          />
        </Form>

        {this.state.ErrorMessage ? (
          <Message negative>
            <Header size="large">{this.state.ErrorMessage}</Header>
          </Message>
        ) : null}

        {this.state.Price ? <PriceCard PriceItem={this.state.Price} /> : null}
      </Container>
    );
  }
}

export default App;
