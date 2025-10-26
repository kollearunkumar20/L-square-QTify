import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Section from "../Section/Section";
import FAQ from "../FAQ/FAQ";
import Player from "../Player/Player";
import { getTopAlbums, getNewAlbums, getSongs } from "../../API's/qtifyApi";

function Home() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [currentSong, setCurrentSong] = useState(null); // 👈 selected song

  useEffect(() => {
    const fetchData = async () => {
      const [top, fresh, allSongs] = await Promise.all([
        getTopAlbums(),
        getNewAlbums(),
        getSongs(),
      ]);

      setTopAlbums(top);
      setNewAlbums(fresh);
      setSongs(allSongs);
      setSearchData([...top, ...fresh, ...allSongs]);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar searchData={searchData} />
      <Hero />
      <Box
        sx={{
          backgroundColor: "#121212",
          color: "#FFFFFF",
          minHeight: "100vh",
          fontFamily: "Poppins",
          pb: "120px", // ensures space for fixed player
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 6 } }}>
          <Section title="Top Albums" data={topAlbums} />
          <Section title="New Albums" data={newAlbums} />
          <Section
            title="Songs"
            data={songs}
            onSelectSong={setCurrentSong} // 👈 pass song selector
          />
        </Box>
        <FAQ />
        <Player currentSong={currentSong} /> {/* 👈 selected song sent to player */}
      </Box>
    </div>
  );
}

export default Home;
