import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Card from "../Card/Card.jsx";

const Section = ({ title, data = [], onSelectSong }) => {
  const scrollRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fetch genres if this is the Songs section
  useEffect(() => {
    if (title === "Songs") {
      fetch("https://qtify-backend.labs.crio.do/genres")
        .then((res) => res.json())
        .then((res) => setGenres([{ key: "All" }, ...res.data]))
        .catch((err) => console.error("Error fetching genres:", err));
    }
  }, [title]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleShowAllToggle = () => {
    setShowAll((prev) => !prev);
  };

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  // Filter songs based on selected genre
  const filteredData =
    title === "Songs" && selectedGenre !== "All"
      ? data.filter((item) => item.genre.key === selectedGenre)
      : data;

  return (
    <Box sx={{ mb: 6 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#FFFFFF",
            fontWeight: 600,
            fontFamily: "Poppins",
          }}
        >
          {title}
        </Typography>

        <Button
          onClick={handleShowAllToggle}
          sx={{
            textTransform: "none",
            border: "1px solid #34C94B",
            color: "#34C94B",
            borderRadius: "20px",
            px: 2,
            py: 0.5,
            "&:hover": {
              backgroundColor: "#34C94B",
              color: "#121212",
            },
          }}
        >
          {showAll ? "Collapse" : "Show All"}
        </Button>
      </Box>

      {/* Tabs for Songs Section */}
      {title === "Songs" && genres.length > 0 && (
        <Tabs
          value={selectedGenre}
          onChange={handleGenreChange}
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              color: "#fff",
              textTransform: "none",
              fontFamily: "Poppins",
            },
            "& .Mui-selected": { color: "#34C94B" },
            "& .MuiTabs-indicator": { backgroundColor: "#34C94B" },
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {genres.map((genre) => (
            <Tab key={genre.key} value={genre.key} label={genre.label || genre.key} />
          ))}
        </Tabs>
      )}

      {/* Carousel or Full Grid */}
      {!showAll ? (
        // Carousel View
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => handleScroll("left")}
            sx={{
              color: "#34C94B",
              position: "absolute",
              left: 0,
              zIndex: 2,
              backgroundColor: "#121212",
              "&:hover": { backgroundColor: "#1e1e1e" },
            }}
          >
            <ChevronLeft />
          </IconButton>

          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              pl: 6,
              pr: 6,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" }, // hides scrollbar
            }}
          >
            {filteredData.map((item) => (
              <Box key={item.id} sx={{ flex: "0 0 auto", cursor: "pointer" }}>
                <Card data={item} onClick={() => onSelectSong?.(item)} />

              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              color: "#34C94B",
              position: "absolute",
              right: 0,
              zIndex: 2,
              backgroundColor: "#121212",
              "&:hover": { backgroundColor: "#1e1e1e" },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      ) : (
        // Expanded Grid View
        <Grid container spacing={2}>
          {filteredData.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
              <Card data={item} onClick={() => onSelectSong?.(item)} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Section;
