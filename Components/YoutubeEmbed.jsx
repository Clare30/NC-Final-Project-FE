import { View, Text } from "react-native";
import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";

export default function YoutubeEmbed({ video_url }) {
  const videoId = video_url.split("?v=")[1];
  return (
    <View>
      <YoutubePlayer height={170} width={250} play={false} videoId={videoId} />
    </View>
  );
}
