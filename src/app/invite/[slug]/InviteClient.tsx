"use client";

import { Render, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { puckConfig } from "@/lib/puck.config";

export default function InviteClient({ data }: { data: Data }) {
  return <Render config={puckConfig} data={data} />;
}
