export const ok = (res, saved, message = "OK") => {
  return res.status(200).json({
    success: true,
    message,
    saved
  });
};

export const created = (res, saved, message = "Criado com sucesso") => {
  return res.status(201).json({
    success: true,
    message,
    saved
  });
};

export const fail = (res, message = "Erro", code = 400) => {
  return res.status(code).json({
    success: false,
    message
  });
};