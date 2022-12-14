import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import Followers from './Followers';
const User = () => {
  return <section className="section">
    <Wrapper classname="section-center">
    
     {/*cards and followers are the local files hence we are just using them inside the user component. So no need to export them globally */}
      <Card> </Card>
      <Followers> </Followers>
   
    </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;
 