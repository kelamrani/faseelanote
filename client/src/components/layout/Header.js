import React from "react";
import {Link, useHistory } from "react-router-dom";
import styled from "styled-components";




const Header = () =>{

    const history = useHistory();
    const handleClick = () => {

history.push("/");

    }
    return (
    <Wrapper>

      <Link to="/">
        <img src="/images/logos/logo.svg" alt="Logo" />
      </Link>

      <MenuWrapper count={1} >
        <Link to="/register" onClick={handleClick}>
            <MenuItem title="register">
                <img src="/images/icons/credit.svg" alt="register" />
                    register
            </MenuItem>
        </Link>
      </MenuWrapper>

    </Wrapper>)

}


const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  display: grid;
  grid-template-columns: 44px auto;
  width: 100%;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;

`

const MenuWrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(${props => props.count}, auto);


`
const MenuItem = styled.div`

/* color: rgba(255, 255, 255, 0.7); */
  display: grid;
  grid-template-columns: 24px auto;
  gap: ${props => (props.title ? "10px" : "0px")};
  align-items: center;
  padding: 10px;
  transition: 0.5s ease-out;
  border-radius: 10px;

  :hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  }
`;




export default Header;
