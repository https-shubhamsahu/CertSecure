"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Wand2, Copy, Check } from "lucide-react";
import { generateRulesAction, type State } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      <Wand2 className="mr-2 h-4 w-4" />
      {pending ? "Generating..." : "Generate Rules"}
    </Button>
  );
}

export default function SecurityRuleGenerator() {
  const initialState: State = { message: "", rules: "" };
  const [state, dispatch] = useFormState(generateRulesAction, initialState);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (state.rules) {
      navigator.clipboard.writeText(state.rules);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (state?.message && state.message !== "Successfully generated rules." && state.message !== "Invalid form data.") {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.message,
        });
    }
  }, [state, toast]);


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Wand2 className="w-7 h-7 text-primary" />
          <span>AI Security Rules</span>
        </CardTitle>
        <CardDescription>
          Generate Firestore security rules for certificate access control using AI.
        </CardDescription>
      </CardHeader>
      <form action={dispatch}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roles">User Roles</Label>
            <Input
              id="roles"
              name="roles"
              placeholder="e.g., admin, auditor, user"
              required
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated list of roles.
            </p>
             {state?.issues && <p className="text-sm font-medium text-destructive">{state.issues[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="certificateAccess">Certificate Access</Label>
            <Select name="certificateAccess" defaultValue="read">
              <SelectTrigger id="certificateAccess">
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read">Read-Only</SelectItem>
                <SelectItem value="write">Write-Only</SelectItem>
                <SelectItem value="read-write">Read & Write</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <SubmitButton />
          {state.rules && (
            <div className="w-full space-y-2 pt-4">
              <Label>Generated Rules</Label>
              <div className="relative">
                <pre className="p-4 rounded-md bg-muted text-muted-foreground text-xs overflow-x-auto">
                  <code>{state.rules}</code>
                </pre>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
