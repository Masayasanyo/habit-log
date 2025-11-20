import GoodHabits from "@/components/containers/good-habits/GoodHabits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "習慣",
};

export default function Page() {
  return (
    <div className="w-full">
      <Tabs defaultValue="good">
        <TabsList>
          <TabsTrigger value="good">続けたい習慣</TabsTrigger>
          <TabsTrigger value="bad">やめたい習慣</TabsTrigger>
        </TabsList>
        <TabsContent value="good">
          <GoodHabits />
        </TabsContent>
        <TabsContent value="bad"></TabsContent>
      </Tabs>
    </div>
  );
}
