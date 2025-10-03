"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

export default function CertificatePage() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/student/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to Fetch Student Data");
        }

        setStudent(data);
      } catch (err: any) {
        setError(err.message || "An Error Occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      await document.fonts.ready;

      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `Certificate-${student.rollNumber}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error Downloading Certificate:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading Your Certificate...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Certificate Not Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full">
      {/* Scrollable Wrapper */}
      <div className="w-full overflow-x-auto scroll-smooth px-4 lg:justify-center lg:flex">
        <div
          ref={certificateRef}
          className="relative w-[1100px] h-[800px] shadow-lg flex-shrink-0"
        >
          {/* Background Certificate Template */}
          <img
            src="/Certificate of Participation.png"
            alt="Certificate Template"
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* Overlay Text */}
          <div className="absolute top-[325px] left-[20px] right-0 text-center">
            <h2 className="text-[50px] font-bold text-green-700">
              {student.name}
            </h2>
          </div>

          <div className="absolute top-[85.5px] right-[560px] text-center">
            <p className="text-[16px] text-gray-600">{id}</p>
          </div>

          {/* Signature */}
          <div className="absolute bottom-[130px] left-[880px]">
            <img src="/signature.jpg" alt="Signature" width={100} height={20} />
          </div>

          {/* QR Code */}
          <div className="absolute top-[105px] left-[893px]">
            {student.qrCodeUrl && (
              <img
                src={student.qrCodeUrl}
                alt="Certificate QR"
                width={120}
                height={120}
              />
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
        <Button
          onClick={downloadCertificate}
          variant="outline"
          className="w-full sm:w-auto flex-1"
        >
          Download Certificate
        </Button>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          className="w-full sm:w-auto flex-1"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
