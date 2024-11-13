import nodemailer from "nodemailer";

const myEmail = "jaquibatienza@gmail.com";
const emailPassword = "JAQueline2445";
export const email = async (req, res) => {
  const { correo, mensaje, asunto } = req.body;

  // Verificar que todos los campos estén presentes
  if (!correo || !mensaje || !asunto) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myEmail,
      pass: emailPassword,
    },
  });

  const mailOptions = {
    from: correo,
    to: myEmail,
    subject: asunto,
    text: mensaje,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ msg: "El correo se envió correctamente" });
  } catch (error) {
    console.log("Error al enviar correo:", error);
    res
      .status(500)
      .json({ msg: "Error interno del servidor", error: error.message });
  }
};
