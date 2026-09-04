"use client";

import { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { radius } from "@/theme/tokens";

export interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string, file?: File) => void;
}

export function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const theme = useTheme();
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(URL.createObjectURL(file), file);
  }

  return (
    <Box>
      <Box sx={{ fontSize: "12px", fontWeight: 500, color: theme.palette.text.primary, mb: 1.5 }}>{label}</Box>

      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
        <Box
          sx={{
            width: 96,
            height: 96,
            flexShrink: 0,
            borderRadius: `${radius.md}px`,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.primary.dark,
            backgroundImage: value ? `url(${value})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Box sx={{ flex: 1 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ minHeight: 32, mb: 1.5 }}>
            <Tab value="upload" label="Subir archivo" sx={{ minHeight: 32, py: 0.5, fontSize: "12px" }} />
            <Tab value="url" label="URL" sx={{ minHeight: 32, py: 0.5, fontSize: "12px" }} />
          </Tabs>

          {tab === "upload" ? (
            <>
              <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
              <Button variant="outlined" color="primary" size="small" onClick={() => inputRef.current?.click()}>
                Elegir imagen
              </Button>
            </>
          ) : (
            <TextField
              placeholder="https://..."
              fullWidth
              size="small"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}