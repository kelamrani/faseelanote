import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link  } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../utils/api-client';
import { UserContext } from '../context/UserContext';
import { themes } from "../components/styles/ColorStyles";
import { toast } from "react-toastify";


function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(()=>{
        if (state && state.token)  history.push("/notes");
    })




    const HandleSubmit = async (evt) => {
        evt.preventDefault();

        try {
        setLoading(true);

        const response = await login({ email: email, password: password });
        setState({
            user: response.data.user,
            token: response.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(response.data));
        setLoading(false);
        history.push("/notes");
        } catch (err) {
        toast.error(err.response.data);
        setLoading(false);

        }
    }




    return (
        <Wrapper>
            <LogoWrapper style={{ position: 'relative', top: "20px" , left: "20px"}}>
             <Link to="/" >
                <img src="/images/logos/logo.svg" alt="Logo" />
            </Link>
            </LogoWrapper>
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
                    <BtnWrapper>
                        <div>
                        <Button disabled={loading}>Login</Button>
                        </div>
                        <div>
                        <a href="/register">Or register</a>
                        </div>
                    </BtnWrapper>
                    </div>
                </div>
                </div>
            </form>
            </ContentWrapper>
        </Wrapper>
    )
}


const ContentWrapper = styled.div`
    padding: 200px 30px;
    display: flex;
    justify-content: center;
`
const Wrapper = styled.div``;
const LogoWrapper = styled.div``;

const Label = styled.label``;

const Input = styled.input`

font-size: 14px;
width: 500px;
height: 40px;
border-radius: 5px;

&:focus {
  outline-color: ${themes.light.secondary};
}


`;

const BtnWrapper = styled.div`
    padding: 50px 0;
    display: flex;
    justify-content: space-between;
`;


const Button = styled.button`
padding: -40px;
width: 200px;
height: 40px;
cursor: pointer;

background-color: ${themes.light.secondary};
border-radius: 5px;

`;
export default LoginPage;
