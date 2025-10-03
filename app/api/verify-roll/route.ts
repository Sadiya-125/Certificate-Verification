import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { rollNumber } = await request.json();

    if (!rollNumber) {
      return NextResponse.json(
        { message: "Roll Number is Required" },
        { status: 400 }
      );
    }

    const email = `${rollNumber}@ds.study.iitm.ac.in`;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10);

    const verification = await prisma.verification.create({
      data: {
        rollNumber,
        email,
        otp,
        expires: expirationTime,
      },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Certificate Verification OTP",
      text: `Your OTP for Certificate Verification is: ${otp}. This Code Will Expire in 10 Minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #2e7d32; text-align: center;">Certificate Verification</h2>
          <p>Hello,</p>
          <p>Your OTP for Certificate Verification is:</p>
          <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This Code Will Expire in 10 Minutes.</p>
          <p>If You Didn't Request This OTP, Please Ignore This Email.</p>
          <div style="margin-top: 30px; text-align: center; color: #666;">
            <p>Geeks for Geeks Python and AIML Session<br>Organized by Corbett House</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      message: "OTP Sent Successfully",
      verificationId: verification.id,
    });
  } catch (error) {
    console.error("Error in verify-Roll:", error);
    return NextResponse.json(
      { message: "An Error Occurred While Processing Your Request" },
      { status: 500 }
    );
  }
}
