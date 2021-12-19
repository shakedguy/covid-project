import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { TextField, Button, Stack, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { dateValidation } from "../services/dataService";
import useInput from "../hooks/useInput";

const DatePickers = ({ onDatePicked }) => {
  const {
    value: from,
    isValid: fromIsValid,
    hasError: fromHasError,
    valueChangeHandler: fromChangedHandler,
    inputBlurHandler: fromBlurHandler,
    reset: reseFrom,
  } = useInput((value) => dateValidation(value));

  const {
    value: to,
    isValid: toIsValid,
    hasError: toHasError,
    setInput: setTo,
    valueChangeHandler: toChangedHandler,
    inputBlurHandler: toBlurHandler,
    reset: resetTo,
  } = useInput((value) => dateValidation(value));

  useEffect(() => {
    const date = new dayjs();
    setTo(date.format("YYYY-MM-DD"));
  }, []);

  useEffect(() => {
    fromIsValid && toIsValid && onDatePicked(from, to);
  }, [from, to]);

  return (
    <Stack>
      <Box sx={{ display: "flex" }}>
        <TextField
          id="date"
          label="From"
          type="date"
          value={from}
          onChange={fromChangedHandler}
          onBlur={fromBlurHandler}
          sx={{ width: 220, mx: 3 }}
          InputLabelProps={{
            shrink: true,
          }}
          error={fromHasError}
        />

        <TextField
          id="date"
          label="To"
          type="date"
          value={to}
          onChange={toChangedHandler}
          onBlur={toBlurHandler}
          sx={{ width: 220, mx: 3 }}
          InputLabelProps={{
            shrink: true,
          }}
          error={toHasError}
        />
      </Box>
    </Stack>
  );
};

export default DatePickers;
