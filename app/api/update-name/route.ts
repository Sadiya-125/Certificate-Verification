import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { studentId, name } = await request.json();
    
    if (!studentId || !name) {
      return NextResponse.json({ message: 'Student ID and Name are Required' }, { status: 400 });
    }
    
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: { name }
    });
    
    return NextResponse.json({ 
      message: 'Name Updated Successfully',
      student: updatedStudent
    });
  } catch (error) {
    console.error('Error Updating Name:', error);
    return NextResponse.json({ message: 'An Error Occurred While Updating the Name' }, { status: 500 });
  }
}