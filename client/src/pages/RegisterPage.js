import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import styled from 'styled-components';
import { register } from '../utils/api-client';


function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(false);

  const HandleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const user = await register({ name: name, email: email, password: password });
      setRedirectToLogin(true);
    } catch (error) {
      setError(true)
    }
  }

  if (redirectToLogin)
    return <Redirect to={{ pathname: "/login" }}/>


  return (
    <Wrapper>
        <ContentWrapper>
          <form onSubmit={HandleSubmit}>
            <div>
              <div>
                <Label size="small">Name:</Label>
                <div>
                  <Input
                    type="name"
                    required
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>
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
                      <a onClick={e => setRedirectToLogin(true)}>Login or</a>
                    </div>
                    <div>
                      <Button type="submit">Register</Button>
                    </div>
                  </div>
                </div>
              </div>
                {error && <div>Email or Password invalid</div>}
            </div>
          </form>
        </ContentWrapper>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  /* overflow: hidden; */
`

const ContentWrapper = styled.div`
  /* max-width: 1234px; */
  margin: 0 auto;
  padding: 200px 30px;
  display: flex;
  justify-content: center;
  align-items: center;


`
const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;

export default RegisterPage;
