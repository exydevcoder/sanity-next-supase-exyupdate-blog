import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import React from "react";

// Force dynamic rendering to prevent prerender errors
export const dynamic = 'force-dynamic'

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}