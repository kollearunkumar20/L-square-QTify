import React from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import { truncate } from "../../helpers/helpers";
import { Tooltip } from "@mui/material";

const Listbox = styled("ul")(() => ({
  width: "100%",
  margin: 0,
  padding: 0,
  position: "absolute",
  borderRadius: "0px 0px 10px 10px",
  border: "1px solid var(--color-primary)",
  top: 60,
  height: "max-content",
  maxHeight: "500px",
  zIndex: 10,
  overflowY: "scroll",
  left: 0,
  bottom: 0,
  right: 0,
  listStyle: "none",
  backgroundColor: "var(--color-black)",
  overflow: "auto",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

function Search({ searchData, placeholder }) {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: searchData || [],
    getOptionLabel: (option) => option.title,
  });

  return (
    <div style={{ position: "relative" }}>
      <form
        className={styles.wrapper}
        onSubmit={(e) => e.preventDefault()} // ✅ prevents page navigation
      >
        <div {...getRootProps()}>
          <input
            name="album"
            className={styles.search}
            placeholder={placeholder}
            {...getInputProps()}
          />
        </div>
        <div>
          <button
            className={styles.searchButton}
            type="button" // ✅ not submit anymore
            onClick={(e) => e.preventDefault()} // do nothing
          >
            <SearchIcon />
          </button>
        </div>
      </form>

      {groupedOptions.length > 0 && (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            let artists = [];

            if (Array.isArray(option.songs)) {
              artists = option.songs.reduce((acc, song) => {
                acc.push(...(song.artists || []));
                return acc;
              }, []);
            } else if (Array.isArray(option.artists)) {
              artists = option.artists;
            }

            return (
              <li
                key={index}
                className={styles.listElement}
                {...getOptionProps({ option, index })}
              >
                <div>
                  <p className={styles.albumTitle}>{option.title}</p>
                  <p className={styles.albumArtists}>
                    {truncate(artists.join(", "), 40)}
                  </p>
                </div>
              </li>
            );
          })}
        </Listbox>
      )}
    </div>
  );
}

export default Search;
