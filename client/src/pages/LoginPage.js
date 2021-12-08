import React, { Fragment, useState, useContext } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../utils/api-client';
import { UserContext } from '../context'

function LoginPage() {

  const [state, setState] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToRegister, setRedirectToRegister] = useState(false);
  const [redirectToNotes, setRedirectToNotes] = useState(false);
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

  if(redirectToRegister)
    return <Redirect to={{pathname: "/register"}}/>
  else if(redirectToNotes)
    return <Redirect to={{pathname: "/notes"}}/>

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
                      <a className="button is-white has-text-custom-purple" onClick={e => setRedirectToRegister(true)}>Register or</a>
                    </div>
                    <div>
                      <Button color="custom-purple" outlined>Login</Button>
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
