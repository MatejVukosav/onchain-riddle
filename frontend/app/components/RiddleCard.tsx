"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function RiddleCard() {
  return (
    <Card className="w-full min-w-md shadow-xl border-none bg-white/90 backdrop-blur-md">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="text-yellow-500" size={20} />
          <CardTitle className="text-2xl font-bold text-gray-800">
            Guess the riddle?
          </CardTitle>
        </div>
        <CardDescription>Solve the puzzle to win!</CardDescription>
      </CardHeader>
      <CardContent>content</CardContent>
      <CardFooter>footer</CardFooter>
    </Card>
  );
}
