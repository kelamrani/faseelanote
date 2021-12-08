import React from "react"
import styled from "styled-components";

function NotesPage() {
  return (
    <Wrapper>
        <ContentWrapper>
        Notes Page
        </ContentWrapper>
    </Wrapper>
  )
}

export default NotesPage;

const ContentWrapper = styled.div`
  /* max-width: 1234px; */
  margin: 0 auto;
  padding: 200px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div``;
