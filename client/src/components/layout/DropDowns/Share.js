import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { indexUsers, shareNote } from "../../../utils/api-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { toast } from "react-toastify";


const Share = ({noteId}) => {


    const [users, setUsers] = useState();
    const [error, setError] = useState(null)

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        let response;
        response = await indexUsers();

        if (response.error) {
            setError(response.error);
            return false;
        }
        setUsers(response);
    };

    const handleShare = async (user) => {



        const response = await shareNote({user: user, id:noteId });
        if (response?.error) {
            setError(response.error);
            toast.error(error);
            return false;
        }
        toast(`Note shared with ${user.name}`);


    }


    return (
    <Wrapper>
        <Hover>
            <div>
            <Title tabIndex={0} role="button">
            <FontAwesomeIcon icon={faShareSquare} />
            </Title>
            </div>
            <UlWrapper style={{ maxHeight: 500, overflow: "auto" }}>
                {users?.map((user) => (
                    <li key={user._id}>
                    <ItemButton type="button" onClick={()=> handleShare(user)}>{user.name}</ItemButton>
                    </li>
                ))}
            </UlWrapper>
        </Hover>
    </Wrapper>
    );
};

const Wrapper = styled.div`
  margin: 0;
  position: relative;
`;

const UlWrapper = styled.ul`
  background-color: white;
  border-radius: 5px;
  position: absolute;
  left: -150px;
  display: none;
  width: 200px;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Hover = styled.div`
  &:hover {
    ${UlWrapper} {
      display: block;
    }
  }
`;

const Title = styled.div`
  cursor: pointer;

  &:hover {
    color: ${themes.light.secondary};
  }
`;

const ItemButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  padding: 5px 5px 5px 10px;
  font-size: 14px;
  text-transform: uppercase;
  &:hover {
    color: ${themes.light.secondary};
  }
`;

export default Share;
