import { NextRequest } from "next/server";
const nodemailer = require("nodemailer");

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const message = {
    from: "ailer.com",
    to: body.email,
    subject: "Password reset",
    html: `<p>Click <a href="${body.link}">here</a> to reset your password.</p>`,
    headers: {
      "X-Entity-Ref-ID": "newmail",
    },
  };

  const transporter = nodemailer.createTransport({});
};
