import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import QRCode from "qrcode";

export async function POST(request: Request) {
  try {
    const { otp, verificationId } = await request.json();

    if (!otp || !verificationId) {
      return NextResponse.json(
        { message: "OTP and Verification ID are Required" },
        { status: 400 }
      );
    }

    const verification = await prisma.verification.findUnique({
      where: { id: verificationId },
    });

    if (!verification) {
      return NextResponse.json(
        { message: "Invalid Verification ID" },
        { status: 400 }
      );
    }

    if (new Date() > verification.expires) {
      await prisma.verification.delete({ where: { id: verificationId } });
      return NextResponse.json({ message: "OTP Has Expired" }, { status: 400 });
    }

    if (verification.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    const student = await prisma.student.findUnique({
      where: { rollNumber: verification.rollNumber },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student Not Found" },
        { status: 404 }
      );
    }

    await prisma.verification.delete({ where: { id: verificationId } });

    return NextResponse.json({
      message: "OTP verified successfully",
      studentId: student.id,
      rollNumber: student.rollNumber,
      qrCodeUrl: student.qrCodeUrl,
    });
  } catch (error) {
    console.error("Error in Verify-Otp:", error);
    return NextResponse.json(
      { message: "An Error Occurred While Processing Your Request" },
      { status: 500 }
    );
  }
}
