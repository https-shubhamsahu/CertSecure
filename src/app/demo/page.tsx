import SwitchToggleThemeDemo from "@/components/ui/toggle-theme";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoOne() {
  return (
    <div className="container py-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Theme Toggle (Demo)</CardTitle>
          <CardDescription>
            This demo shows the toggle component state UI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SwitchToggleThemeDemo />
        </CardContent>
      </Card>
    </div>
  );
}
