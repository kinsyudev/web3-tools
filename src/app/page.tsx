import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const routes = [
  {
    name: "ABI Converter",
    description: "Convers JSON ABI to Human readable ABI and vice versa.",
    path: "/abi-converter",
  },
] as const;

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 h-full">
      {routes.map((route) => (
        <Link key={route.path} href={route.path} passHref={true}>
          <Card>
            <CardHeader>
              <CardTitle>{route.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{route.description}</CardDescription>
            </CardContent>
            <CardFooter className="group-hover: justify-end">
              <Button variant={"outline"} size={"icon"}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
