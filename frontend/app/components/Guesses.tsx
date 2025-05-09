"use client";

import { Badge } from "@/components/ui/badge";

export interface GuessesProps {
  triedGuesses?: readonly string[];
}

export function Guesses({ triedGuesses }: GuessesProps) {
  return (
    (triedGuesses?.length ?? 0) > 0 && (
      <div className="mb-2">
        <div className="text-sm text-gray-500 mb-1">Already tried:</div>
        <div className="flex flex-wrap gap-2 max-h-30 overflow-y-auto">
          {triedGuesses?.toReversed().map((guess, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-gray-700 bg-yellow-200 border border-yellow-300 break-all whitespace-pre-line max-w-full"
            >
              {guess}
            </Badge>
          ))}
        </div>
      </div>
    )
  );
}
