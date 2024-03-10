"use client";

import { formatAbi, parseAbi } from "abitype";
import { Abi } from "abitype/zod";
import { CopyIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { stringify } from "viem";
import { Button } from "~/components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "~/components/ui/resizable";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";
import { cn } from "~/lib/utils";

export default function AbiConverter() {
  const { toast } = useToast();

  const [inputAbi, setInputAbi] = useState("");

  const parsedAbi = useMemo(() => {
    try {
      return parseAbi(JSON.parse(inputAbi));
    } catch (e) {
      return null;
    }
  }, [inputAbi]);

  const formattedAbi = useMemo(() => {
    try {
      const zodParse = Abi.parse(JSON.parse(inputAbi));
      return formatAbi(zodParse);
    } catch (e) {
      return null;
    }
  }, [inputAbi]);

  const abiType = useMemo(() => {
    if (parsedAbi && parsedAbi.length > 0) return "human-readable";
    if (formattedAbi && formattedAbi.length > 0) return "json-abi";
    return "invalid";
  }, [parsedAbi, formattedAbi]);

  const outputAbi = useMemo(() => {
    if (abiType === "human-readable") return parsedAbi;
    if (abiType === "json-abi") return formattedAbi;
    return null;
  }, [abiType, parsedAbi, formattedAbi]);

  const handleCopy = useCallback(async () => {
    if (!outputAbi) return;
    try {
      await window.navigator.clipboard.writeText(stringify(outputAbi));
      toast({
        title: "Success",
        description: "Copied to clipboard!",
        variant: "default",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  }, [outputAbi, toast]);

  const messageContent = useMemo(() => {
    if (inputAbi === "") return null;
    switch (abiType) {
      case "invalid":
        return "Invalid ABI";
      case "human-readable":
        return "Converting Human Readable ABI to JSON ABI";
      case "json-abi":
        return "Converting JSON ABI to Human Readable ABI";
      default:
        return "Invalid ABI";
    }
  }, [abiType, inputAbi]);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border bg-white/10 backdrop-blur-sm"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full flex-col items-start justify-center gap-2 p-6">
          <h1 className="font-semibold">Input ABI</h1>
          {messageContent && (
            <p
              className={cn(
                "text-sm font-semibold",
                messageContent === "Invalid ABI" && "text-red-400",
              )}
            >
              {messageContent}
            </p>
          )}
          <Textarea
            className="flex-1"
            value={inputAbi}
            onChange={(e) => setInputAbi(e.target.value)}
            placeholder="Paste ABI here"
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full flex-col items-start justify-center gap-2 p-6">
          <h1 className="font-semibold">Output ABI</h1>
          <div className="relative w-full flex-1">
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-0 z-10 m-2"
              disabled={!outputAbi}
              onClick={handleCopy}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
            <Textarea
              className="h-full w-full"
              value={outputAbi ? stringify(outputAbi, null, 4) : ""}
              placeholder="Waiting for valid input..."
              disabled
            />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
