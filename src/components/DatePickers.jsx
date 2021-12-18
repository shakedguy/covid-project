import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

const DatePickers = ({ range }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    range && setValue(range.from);
  }, [range]);

  const changeDateHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <TextField
        id="date"
        label="From"
        type="date"
        defaultValue={value}
        value={value}
        onChange={changeDateHandler}
        sx={{ width: 220, mx: 3 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {range && range.title === "Custom" && (
        <TextField
          id="date"
          label="To"
          type="date"
          defaultValue={value}
          value={value}
          onChange={changeDateHandler}
          sx={{ width: 220, mx: 3 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    </>
  );
};

export default DatePickers;
