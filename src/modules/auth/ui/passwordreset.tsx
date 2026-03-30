"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

export default function PasswordResetView() {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <Paper sx={{ p: 4, width: 400 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>

            {/* 🔐 New Password */}
            <TextField
              {...register("password", { required: "Password required" })}
              label="New Password"
              type={showPass ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message as string}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? "🙈" : "👁️"}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* 🔐 Confirm Password */}
            <TextField
              {...register("confirmPass", {
                required: "Confirm password required",
                validate: (val) =>
                  val === password || "Password mismatch",
              })}
              label="Confirm Password"
              type={showPass ? "text" : "password"}
              error={!!errors.confirmPass}
              helperText={errors.confirmPass?.message as string}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? "🙈" : "👁️"}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* 🚀 Submit */}
            <Button type="submit" variant="contained">
              Reset Password
            </Button>

          </Stack>
        </form>
      </Paper>
    </Box>
  );
}