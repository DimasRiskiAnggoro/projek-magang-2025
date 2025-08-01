// app/admin/layout.tsx

import AdminLayout from "@/components/layout/AdminLayout";
import React from "react";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
