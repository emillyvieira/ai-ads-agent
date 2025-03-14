export function messageController(req, res) {
  const { message } = req.body;

  return res.json([
    {message: "Olá Mundo!"},
    {message: "Olá tudo bem?"},
    {message: "Olá, como posso te ajudar?"},
    {message: "Olá Mundo`2!"},
    {message: "Olá tudo bem?"},
    {message: "Olá, como posso te ajudar?"},
    
  ]);
}