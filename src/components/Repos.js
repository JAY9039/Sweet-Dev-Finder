import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';


const Repos = () => {

  const {repos} = React.useContext(GithubContext);
  // console.log(repos);

  let languages = repos.reduce((total, item) =>{
    const {language}  = item;
    // here we get the no. of instances of languages used in diff. repos
    // sometimes there is a null value so to avoid this we do
    if(!language == null){
      return total;
    }
    // but if it is not null
    // this gives us the total count of languages used
    // if the language property is not an object we create a new object of language property
    if(!total[language]){
      total[language] = {label: language, value: 1};
    }
     // if the language is already on the object
    else{
      total[language] = {...total[language], value: total[language].value + 1};
    }
    return total;
  },{})

  languages = Object.values(languages).sort((a,b) => {
    // this will return the highest language number
    return b.value - a.value;
  }).slice(0, 5); // gets the first 5 popular languages

  console.log(languages);
    
  // console.log(item);
   return(

     <section className="section">
      <Wrapper className="section-center">
      {/* <ExampleChart data = {chartData} />; */}
      <Pie3D data = {languages} />;
      </Wrapper> 
   </section>
   )
   };

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
