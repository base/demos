"use client";

import React from "react";
import ReactDOM from "react-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, Copy, ExternalLink, X } from "lucide-react";
import { toast } from "sonner";

interface TransactionModalProps {
  txHash: string;
  onClose: () => void;
}

export function TransactionModal({ txHash, onClose }: TransactionModalProps) {
  if (!txHash) return null;
  const link = `https://basescan.org/tx/${txHash}`;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-green-700 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Transaction Successful
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <CardContent>
          <p className="text-xs text-gray-600 mb-2">Transaction Hash</p>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-gray-100 p-2 rounded flex-1 overflow-x-auto whitespace-nowrap">
              {txHash}
            </code>
            <Button variant="ghost" size="icon" onClick={() => { navigator.clipboard.writeText(txHash); toast.success("Copied!"); }}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => window.open(link, "_blank")}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>,
    document.body
  );
} 