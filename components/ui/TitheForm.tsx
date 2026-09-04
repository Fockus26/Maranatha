"use client";

import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { typography } from "@/theme/tokens";
import { AmountSelector } from "./AmountSelector";
import { DonationFormCard } from "./DonationFormCard";

export type ContributionType = "diezmo" | "ofrenda";
export type ContributionFrequency = "once" | "monthly";

export interface TitheFormValues {
  type: ContributionType;
  amount: number;
  frequency: ContributionFrequency;
  name: string;
  email: string;
}

export interface TitheFormProps {
  presetAmounts?: number[];
  onSubmit: (values: TitheFormValues) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

const TYPE_LABEL: Record<ContributionType, string> = { diezmo: "Diezmo", ofrenda: "Ofrenda" };
const FREQUENCY_LABEL: Record<ContributionFrequency, string> = { once: "Única vez", monthly: "Mensual" };

export function TitheForm({ presetAmounts = [25, 50, 100], onSubmit }: TitheFormProps) {
  const theme = useTheme();

  const [type, setType] = useState<ContributionType>("diezmo");
  const [frequency, setFrequency] = useState<ContributionFrequency>("once");
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const amountValid = amount > 0;
  const nameValid = name.trim().length > 0;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValid = amountValid && nameValid && emailValid;

  function handleSubmit() {
    setTouched(true);
    if (!formValid) return;
    onSubmit({ type, amount, frequency, name, email });
  }

  return (
    <DonationFormCard>
      <Box sx={{ textAlign: "center", pb: 4.5, mb: 4.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontWeight: 800, fontSize: "32px", color: theme.palette.text.primary }}>
          {amountValid ? formatCurrency(amount) : "—"}
        </Typography>
        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: "12px", color: theme.palette.text.secondary, mt: 0.25 }}>
          {TYPE_LABEL[type]} · {FREQUENCY_LABEL[frequency]}
        </Typography>
      </Box>

      <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: "12px", fontWeight: 500, color: theme.palette.text.primary, mb: 2 }}>
        Monto
      </Typography>
      <Box sx={{ mb: 3.5 }}>
        <AmountSelector presets={presetAmounts} onChange={setAmount} error={touched && !amountValid} />
      </Box>

      <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: "12px", fontWeight: 500, color: theme.palette.text.primary, mb: 2 }}>
        Tipo
      </Typography>
      <ToggleButtonGroup exclusive fullWidth value={type} onChange={(_, value) => value && setType(value)} size="small" sx={{ mb: 3.5 }}>
        <ToggleButton value="diezmo">Diezmo</ToggleButton>
        <ToggleButton value="ofrenda">Ofrenda</ToggleButton>
      </ToggleButtonGroup>

      <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: "12px", fontWeight: 500, color: theme.palette.text.primary, mb: 2 }}>
        Frecuencia
      </Typography>
      <ToggleButtonGroup exclusive fullWidth value={frequency} onChange={(_, value) => value && setFrequency(value)} size="small" sx={{ mb: 4.5 }}>
        <ToggleButton value="once">Única vez</ToggleButton>
        <ToggleButton value="monthly">Mensual</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 4.5, display: "flex", flexDirection: "column", gap: 3.5 }}>
        <TextField label="Nombre completo" fullWidth size="small" value={name} onChange={(e) => setName(e.target.value)} error={touched && !nameValid} />
        <TextField label="Correo electrónico" type="email" fullWidth size="small" value={email} onChange={(e) => setEmail(e.target.value)} error={touched && !emailValid} />
      </Box>

      <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, mt: 4.5, pt: 4.5 }}>
        <Button fullWidth variant="contained" color="secondary" onClick={handleSubmit}>
          Continuar al pago
        </Button>
      </Box>
    </DonationFormCard>
  );
}