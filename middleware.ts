import useUserData from "@/hooks/useUserData";
import { NextRequest, NextResponse } from "next/server";

const { user } = useUserData();

export default function middleware(req: any) {
  if (!user) {
    return NextResponse.redirect("http://localhost:3000/")
  }
}