import { Text, View, Image } from "react-native";
import React, { Component, useEffect, useState } from "react";
import AnimalCard from "../Components/AnimalCard";

export default function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    setAnimals([
      { name: "fox", fun_fact: "rocks are harder than foxes" },
      { name: "owl", fun_fact: "owls are cooler than jeff" },
    ]);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Text>Animals</Text>
      <View>
        {animals.map((animal) => {
          return <AnimalCard key={animal.name} animal={animal} />;
        })}
      </View>
    </View>
  );
}

{
  /* <div>
           {articles.map((article)=> {
              return (           
               <section className="article-card-style" key={article.article_id} onClick={() => navigate(`${article.article_id}`)}> 
               {article.article_id}
                  <p>{article.topic}</p> 
                  <p>{article.author}</p>
                  <p>{article.title}</p>
                  <CreatedAt date={article.created_at} />
                  <p>{article.votes}</p>
                </section>
              )
            })}
          </div> */
}
