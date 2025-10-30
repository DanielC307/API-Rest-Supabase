// Import das bibliotecas para o app

import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Configurações da aplição
//------------------------------

// Ele consegue capturar as varáveis de ambiente do arquivo .env
dotenv.config();

//Configuração do express
const app = express();

//Representação do tipo de arquivo que o server vai receber
app.use(express.json());

// CONEXÃO COM O BANCO DE DADOS
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post("/Pessoas", async (req, res) => {
  const { nome, idade, curso } = req.body;
  const { data, error } = await supabase
    .from("Pessoas")
    .insert([{ nome, idade, curso }]);
  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: "Deu certo" });
});

app.get("/Pessoas", async (req, res) => {
  const { data, error } = await supabase.from("Pessoas").select("*");

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json(data);
});

app.delete("/Pessoas:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("Pessoas")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: "ID Deletada" });
});

app.listen(3000, () => {
  console.log("O servidor subiu na porta 3000");
});
