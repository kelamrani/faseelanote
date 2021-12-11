import React, { useState, useContext } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../utils/api-client';
import { UserContext } from '../context/UserContext'

function LoginPage() {
    const location = useLocation();

  const [state, setState] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const HandleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await login({ email: email, password: password });
      setState({
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem('auth', JSON.stringify(response.data));

      history.push("/notes");
    } catch (error) {
        console.log(error);
      setError(true);
    }
  }

//   if (state && state.token) {

//       return (<Redirect to='/notes' key={location.key}/>);
//   }


  return (
    <Wrapper>
        <ContentWrapper>
          <form onSubmit={HandleSubmit}>
            <div>
              <div>
                <Label size="small">Email:</Label>
                <div>
                  <Input
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label size="small">Password:</Label>
                <div>
                  <Input
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <div>
                      <a href="/register">Register or</a>
                    </div>
                    <div>
                      <Button>Login</Button>
                    </div>
                  </div>
                </div>
                {error && <div>Email or Password invalid</div>}
              </div>
            </div>
          </form>
        </ContentWrapper>
    </Wrapper>
  )
}


const ContentWrapper = styled.div`
  /* max-width: 1234px; */
  margin: 0 auto;
  padding: 200px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;
export default LoginPage;
