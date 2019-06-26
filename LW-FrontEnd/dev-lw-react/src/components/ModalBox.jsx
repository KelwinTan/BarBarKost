import React, { Component } from "react";
import styled from "styled-components";
import logo from "../logo.png";

const BgModal = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 500px;
  height: 300px;
  background-color: white;
  border-radius: 5px;
  position: relative;
  text-align: center;
  padding: 20px;
`;

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 42px;
  color: #333;
  transform: rotate(45deg);
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const Content = styled.div`
  margin: 15px auto;
  display: block;
  width: 50%;
  padding: 8px;
  margin-top: 20px;
  border: 1px solid gray;
`;

class ModalBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplay: false
    };
  }

  displayFunc = () => {
    // console.log(this.state.displayModal);
    var displayModal = this.props.displayModal;

  };

  render = () => {
    console.log(this.state.displayModal);

    return (
      <BgModal>
        {/* {this.state.displayModal === true ? (
          <ModalContent>
            <Close onClick={this.displayFunc}>+</Close>
            <img src={logo} style={{ height: "200px" }} alt="logo" />
            <Content>{this.props.message}</Content>
          </ModalContent>
        ) : (
          ""
        )} */}
        <ModalContent>
            <Close onClick={this.displayFunc}>+</Close>
            <img src={logo} style={{ height: "200px" }} alt="logo" />
            <Content>{this.props.message}</Content>
          </ModalContent>
      </BgModal>
    );
  };
}

export default ModalBox;
