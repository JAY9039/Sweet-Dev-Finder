import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // console.log(repos);

  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    // here we get the no. of instances of languages used in diff. repos
    // sometimes there is a null value so to avoid this we do
    if (!language) return total;
    // but if it is not null
    // this gives us the total count of languages used
    // if the language property is not an object we create a new object of language property
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    }
    // if the language is already on the object
    else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});
  // console.log(languages)

  const mostUsed = Object.values(languages)
    // this will return the highest language number
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5); // gets the first 5 popular languages

  //most starts per language

  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars; // now we sort them bases on stars
    })
    .map((item) => {
      return { ...item,
        value: item.stars 
      }; // since the chart is getting updated by values so we replace starts to values
    })
    .slice(0, 5); // gets the first 5 popular languages

  // console.log(mostPopular);
  // console.log(languages);
  // console.log(item);
  // STEP 2 - ChartData

    
  // stars, forks

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

return (
  <section className='section'>
    <Wrapper className='section-center'>
      <Pie3D data={mostUsed} />
      <Column3D data={stars} />
      <Doughnut2D data={mostPopular} />
      <Bar3D data={forks} />
    </Wrapper>
  </section>
);
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