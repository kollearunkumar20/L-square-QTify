// src/components/Player/Player.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  Slider,
  Avatar,
} from "@mui/material";
import {
  PlayCircleFilledWhite,
  PauseCircleFilled,
  SkipNext,
  SkipPrevious,
  VolumeUp,
} from "@mui/icons-material";

function formatTime(seconds = 0) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const Player = ({ currentSong }) => {
  // duration in seconds (from song or default 3:38)
  const defaultDurationSec = 3 * 60 + 38; // 218s
  const durationSec = currentSong?.durationInMs
    ? Math.round(currentSong.durationInMs / 1000)
    : defaultDurationSec;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progressSec, setProgressSec] = useState(0);
  const intervalRef = useRef(null);

  // When currentSong changes, reset progress
  useEffect(() => {
    setProgressSec(0);
    setIsPlaying(false);
    // optionally auto-play: setIsPlaying(true);
  }, [currentSong]);

  // Advance progress when playing
  useEffect(() => {
    if (isPlaying) {
      // clear any previous
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= durationSec) {
            clearInterval(intervalRef.current);
            return durationSec;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, durationSec]);

  // Toggle play/pause
  const togglePlay = () => setIsPlaying((p) => !p);

  // Seek by slider (value is seconds)
  const onSeek = (e, value) => {
    setProgressSec(Number(value));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        bgcolor: "#121212",
        color: "#fff",
        borderTop: "2px solid #34C94B",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        py: 2,
        zIndex: 2000,
      }}
    >
      {/* Left */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
        <Avatar
          src={currentSong?.image || "https://via.placeholder.com/60"}
          alt={currentSong?.title || "Song"}
          sx={{ width: 60, height: 60, borderRadius: 2, flexShrink: 0 }}
        />
        <Box sx={{ overflow: "hidden" }}>
          <Typography fontWeight={600} fontSize="1rem" noWrap>
            {currentSong?.title || "Song name"}
          </Typography>
          <Typography color="gray" fontSize="0.9rem" noWrap>
            {currentSong?.album || "Album name"}
          </Typography>
        </Box>
      </Box>

      {/* Center controls + progress */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50%", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit">
            <SkipPrevious />
          </IconButton>

          <IconButton color="inherit" onClick={togglePlay}>
            {isPlaying ? <PauseCircleFilled sx={{ fontSize: 40 }} /> : <PlayCircleFilledWhite sx={{ fontSize: 40 }} />}
          </IconButton>

          <IconButton color="inherit">
            <SkipNext />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
          <Typography variant="body2" sx={{ width: 48, textAlign: "right" }}>
            {formatTime(progressSec)}
          </Typography>

          <Slider
            value={Math.min(progressSec, durationSec)}
            min={0}
            max={durationSec}
            onChange={onSeek}
            sx={{
              color: "#34C94B",
              mx: 1,
              flexGrow: 1,
              "& .MuiSlider-thumb": { width: 12, height: 12 },
            }}
          />

          <Typography variant="body2" sx={{ width: 48, textAlign: "left" }}>
            {formatTime(durationSec)}
          </Typography>
        </Box>
      </Box>

      {/* Right */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 200, justifyContent: "flex-end" }}>
        <VolumeUp />
      </Box>
    </Box>
  );
};

export default Player;
