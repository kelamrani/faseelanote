import React, { useContext, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components';
import { register } from '../utils/api-client';
import { UserContext } from '../context/UserContext';
import { themes } from "../components/styles/ColorStyles";
import Modal from "react-modal";
import { toast } from "react-toastify";



function RegisterPage() {

    const [loading, setLoading] = useState(false);
    const [state]=useContext(UserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ok, setOk] = useState(false);
    const history = useHistory();

const HandleSubmit = async (evt) => {
    evt.preventDefault();

    try {
        setLoading(true);
        const { data } = await register({ name: name, email: email, password: password });
        setName("");
        setEmail("");
        setPassword("");
        setOk(data.ok);
        setLoading(false);
    } catch (err) {
        toast.error(err.response.data);
        setLoading(false);
    }
}

if (state && state.token) history.push("/notes");



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
                <Label size="small">Name:</Label>
                <div>
                <Input
                    type="text"
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
                    onChange={e => setPassword(e.target.value)}/>
                </div>
            </div>
            <div>
                <div>
                <BtnWrapper>
                    <div>
                        <Button type="submit" disabled={loading}>Register</Button>
                    </div>
                    <div>
                        <a href="/login">Or login</a>
                    </div>
                </BtnWrapper>
                </div>
            </div>
            <Modal
                title="Congratulations!"
                isOpen={ok}
                onRequestClose={() => setOk(false)}
                style={{

                    content:{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: "flex",
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '600px',
                        height: '600px'}

                }}
                        >
                <p>You have successfully registered.</p>
                <Link to="/login" >
                    Login
                </Link>
            </Modal>
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
//   margin: 0 auto;
  padding: 200px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
cursor: pointer;
height: 40px;
background-color: ${themes.light.secondary};
border-radius: 5px;


`;

export default RegisterPage;
