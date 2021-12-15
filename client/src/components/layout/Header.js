import React, {useContext} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { UserContext } from '../../context/UserContext'




const Header = () =>{


    const [state, setState] = useContext(UserContext);

    const logout = () => {
        window.localStorage.removeItem('auth');
        setState(null);
      };



    return (
    <Wrapper>

      <Link to="/">
        <img src="/images/logos/logo.svg" alt="Logo" />
      </Link>

        {
            state !==null ? (
                    <MenuWrapper count={2} >
                        <StyledLink to="/user/dashboard" >
                            <MenuItem title="logout">
                                <img src="/images/icons/credit.svg" alt="user dashboard" />
                                    { state && state.user && state.user.name }
                            </MenuItem>
                        </StyledLink>
                        <StyledLink to="/" onClick={logout}>
                            <MenuItem title="logout">
                                <img src="/images/icons/credit.svg" alt="logout" />
                                    logout
                            </MenuItem>
                        </StyledLink>
                    </MenuWrapper>
                            ):
                    <MenuWrapper count={2} >
                        <StyledLink to="/register">
                            <MenuItem title="register">
                                <img src="/images/icons/credit.svg" alt="register" />
                                    register
                            </MenuItem>
                        </StyledLink>
                        <StyledLink to="/login" >
                            <MenuItem title="login">
                                <img src="/images/icons/credit.svg" alt="login" />
                                    login
                            </MenuItem>
                        </StyledLink>
                    </MenuWrapper>

    }




    </Wrapper>)

}


const Wrapper = styled.div`
  position: absolute;
  top: 10px;
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

const StyledLink = styled(Link)`

`;



export default Header;
