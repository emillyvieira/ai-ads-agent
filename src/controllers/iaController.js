import { GoogleGenerativeAI } from "@google/generative-ai";
import { knowledge } from "../knowledge.js";

const apiKey = process.env.GEMINI_API_KEY;  // Certifique-se de que a chave da API está configurada
const genAI = new GoogleGenerativeAI(apiKey);

// Configuração do modelo, com base nas instruções do sistema e conhecimento prévio
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `Como um especialista no curso de Análise e Desenvolvimento de Sistemas você deve responder gentilmente aos alunos informações sobre o curso, com base nas informações a seguir: \n\n${knowledge}`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function iaController(req, res) {
  try {
    const { question } = req.body;  // A pergunta do usuário vem no corpo da requisição

    // Criação da sessão de chat com o modelo generativo
    const chatSession = model.startChat({
      generationConfig,
      history: [],  // Se necessário, aqui você pode adicionar o histórico da conversa
    });

    // Enviar a pergunta e obter a resposta
    const result = await chatSession.sendMessage(question);

    // Retornar a resposta gerada pela API
    return res.json({
      question,
      response: result.response.text(),  // Extrai a resposta do modelo
    });
  } catch (error) {
    // Em caso de erro, envia uma resposta de erro
    console.error("Erro ao processar a requisição:", error);
    res.status(500).json({ error: 'Erro ao processar a resposta da API' });
  }
}
