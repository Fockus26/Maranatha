"use client";

import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { radius } from "@/theme/tokens";

export interface AmountSelectorProps {
  presets: number[];
  onChange: (amount: number) => void;
  customLabel?: string;
  error?: boolean;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function AmountSelector({ presets, onChange, customLabel = "Otro monto", error }: AmountSelectorProps) {
  const theme = useTheme();
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  function handlePresetClick(value: number) {
    if (selectedPreset === value) {
      setSelectedPreset(null);
      onChange(0);
      return;
    }
    setSelectedPreset(value);
    setCustomAmount("");
    onChange(value);
  }

  function handleCustomChange(value: string) {
    setCustomAmount(value);
    setSelectedPreset(null);
    onChange(value === "" ? 0 : Number(value));
  }

  return (
    <Box>
      <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${presets.length}, 1fr)`, gap: 2, mb: 3.5 }}>
        {presets.map((value) => (
          <Box
            key={value}
            onClick={() => handlePresetClick(value)}
            sx={{
              textAlign: "center",
              py: 2.5,
              borderRadius: `${radius.sm}px`,
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              border: `1px solid ${selectedPreset === value ? theme.palette.secondary.main : theme.palette.divider}`,
              backgroundColor: selectedPreset === value ? theme.palette.secondary.light + "22" : "transparent",
              color: selectedPreset === value ? theme.palette.secondary.dark : theme.palette.text.primary,
            }}
          >
            {formatCurrency(value)}
          </Box>
        ))}
      </Box>
      <TextField
        placeholder={customLabel}
        type="number"
        fullWidth
        size="small"
        value={customAmount}
        onChange={(e) => handleCustomChange(e.target.value)}
        error={error}
      />
    </Box>
  );
}