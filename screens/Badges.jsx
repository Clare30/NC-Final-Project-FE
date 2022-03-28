import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import BadgeCard from "../Components/BadgeCard";

export default function Badges() {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    setCounts([
      { name: "butterfly", count: 1 },
      { name: "frog", count: 10 },
      { name: "deer", count: 20 },
    ]);
  }, []);

  return (
    <View style={styles.control}>
      <ScrollView>
        <Text>My Badges</Text>

        {counts.map((count) => {
          return <BadgeCard key={count.name} count={count} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});
