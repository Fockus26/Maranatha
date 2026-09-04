"use client";

import { useState } from "react";
import { useTheme, type Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { radius, typography } from "@/theme/tokens";
import { ImageUploadField } from "./ImageUploadField";
import type { ProjectStatus } from "./ProjectCard";

export interface BudgetLineInput {
  id: string;
  label: string;
  amount: number;
}

export interface EncargadoInput {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  instagramUrl: string;
}

export interface DashboardProjectFormValues {
  title: string;
  description: string;
  imageUrl: string;
  imageFile?: File;
  goalAmount: number;
  currentAmount: number;
  deadline: string;
  budget: BudgetLineInput[];
  encargados: EncargadoInput[];
}

export interface DashboardProjectFormProps {
  initialValues?: Partial<DashboardProjectFormValues>;
  onSubmit: (values: DashboardProjectFormValues) => void;
  onCancel: () => void;
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

function sectionLabelSx(theme: Theme) {
  return {
    fontFamily: typography.fontFamily.heading,
    fontWeight: 600,
    fontSize: "14px",
    color: theme.palette.text.primary,
  };
}

export function DashboardProjectForm({ initialValues, onSubmit, onCancel }: DashboardProjectFormProps) {
  const theme = useTheme();

  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl ?? "");
  const [imageFile, setImageFile] = useState<File | undefined>(initialValues?.imageFile);
  const [goalAmount, setGoalAmount] = useState(initialValues?.goalAmount ?? 0);
  const [currentAmount, setCurrentAmount] = useState(initialValues?.currentAmount ?? 0);
  const [deadline, setDeadline] = useState(initialValues?.deadline ?? "");
  const [budget, setBudget] = useState<BudgetLineInput[]>(initialValues?.budget ?? []);
  const [encargados, setEncargados] = useState<EncargadoInput[]>(initialValues?.encargados ?? []);
  const [touched, setTouched] = useState(false);

  const status: ProjectStatus = goalAmount > 0 && currentAmount >= goalAmount ? "completed" : "active";
  const titleValid = title.trim().length > 0;
  const goalValid = goalAmount > 0;
  const deadlineValid = deadline.trim().length > 0;
  const formValid = titleValid && goalValid && deadlineValid;

  function addBudgetLine() {
    setBudget((prev) => [...prev, { id: newId(), label: "", amount: 0 }]);
  }
  function updateBudgetLine(id: string, patch: Partial<BudgetLineInput>) {
    setBudget((prev) => prev.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  }
  function removeBudgetLine(id: string) {
    setBudget((prev) => prev.filter((line) => line.id !== id));
  }

  function addEncargado() {
    setEncargados((prev) => [...prev, { id: newId(), name: "", role: "", imageUrl: "", instagramUrl: "" }]);
  }
  function updateEncargado(id: string, patch: Partial<EncargadoInput>) {
    setEncargados((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }
  function removeEncargado(id: string) {
    setEncargados((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSubmit() {
    setTouched(true);
    if (!formValid) return;
    onSubmit({ title, description, imageUrl, imageFile, goalAmount, currentAmount, deadline, budget, encargados });
  }

  return (
    <Box
      sx={{
        maxWidth: 640,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${radius.lg}px`,
        backgroundColor: theme.palette.background.paper,
        p: 6,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4.5 }}>
        <TextField label="Título del proyecto" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} error={touched && !titleValid} />

        <TextField label="Descripción" fullWidth multiline minRows={3} value={description} onChange={(e) => setDescription(e.target.value)} />

        <ImageUploadField
          label="Foto del proyecto"
          value={imageUrl}
          onChange={(value, file) => {
            setImageUrl(value);
            setImageFile(file);
          }}
        />

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <TextField
            label="Monto meta"
            type="number"
            fullWidth
            value={goalAmount || ""}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
            error={touched && !goalValid}
          />
          <TextField
            label="Fecha de cierre"
            type="date"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            error={touched && !deadlineValid}
          />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 3, alignItems: "center" }}>
          <TextField
            label="Monto recaudado"
            type="number"
            fullWidth
            value={currentAmount || ""}
            onChange={(e) => setCurrentAmount(Number(e.target.value))}
            helperText="Para registrar aportes recibidos fuera del sitio"
          />
          <Box
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              borderRadius: "20px",
              px: 2.25,
              py: 0.75,
              whiteSpace: "nowrap",
              backgroundColor: status === "completed" ? theme.palette.success.main : theme.palette.secondary.main,
              color: status === "completed" ? theme.palette.success.contrastText : theme.palette.secondary.contrastText,
            }}
          >
            {status === "completed" ? "Completado" : "Activo"}
          </Box>
        </Box>

        <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 4.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography sx={sectionLabelSx(theme)}>Presupuesto</Typography>
            <Button size="small" startIcon={<AddIcon />} onClick={addBudgetLine}>
              Agregar línea
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {budget.map((line) => (
              <Box key={line.id} sx={{ display: "grid", gridTemplateColumns: "1fr 160px auto", gap: 2 }}>
                <TextField
                  placeholder="Concepto"
                  size="small"
                  value={line.label}
                  onChange={(e) => updateBudgetLine(line.id, { label: e.target.value })}
                />
                <TextField
                  placeholder="Monto"
                  type="number"
                  size="small"
                  value={line.amount || ""}
                  onChange={(e) => updateBudgetLine(line.id, { amount: Number(e.target.value) })}
                />
                <IconButton size="small" onClick={() => removeBudgetLine(line.id)} sx={{ color: theme.palette.text.secondary }}>
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 4.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography sx={sectionLabelSx(theme)}>Encargados</Typography>
            <Button size="small" startIcon={<AddIcon />} onClick={addEncargado}>
              Agregar encargado
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {encargados.map((encargado) => (
              <Box
                key={encargado.id}
                sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: `${radius.md}px`, p: 3 }}
              >
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                  <TextField
                    label="Nombre"
                    size="small"
                    value={encargado.name}
                    onChange={(e) => updateEncargado(encargado.id, { name: e.target.value })}
                  />
                  <TextField
                    label="Rol"
                    size="small"
                    value={encargado.role}
                    onChange={(e) => updateEncargado(encargado.id, { role: e.target.value })}
                  />
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 2, alignItems: "center" }}>
                  <TextField
                    label="URL de foto"
                    size="small"
                    value={encargado.imageUrl}
                    onChange={(e) => updateEncargado(encargado.id, { imageUrl: e.target.value })}
                  />
                  <TextField
                    label="Instagram (opcional)"
                    size="small"
                    value={encargado.instagramUrl}
                    onChange={(e) => updateEncargado(encargado.id, { instagramUrl: e.target.value })}
                  />
                  <IconButton size="small" onClick={() => removeEncargado(encargado.id)} sx={{ color: theme.palette.text.secondary }}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 4.5, display: "flex", gap: 2.5, justifyContent: "flex-end" }}>
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}