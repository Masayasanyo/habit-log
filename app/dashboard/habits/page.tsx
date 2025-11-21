import type { Metadata } from "next";
import GoodHabits from "@/components/containers/good-habits/GoodHabits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "習慣",
};

export default function Page() {
  return (
    <div className="h-full w-full">
      <Tabs defaultValue="good" className="h-full w-full">
        <TabsList>
          <TabsTrigger value="good">続けたい習慣</TabsTrigger>
          <TabsTrigger value="bad">辞めたい習慣</TabsTrigger>
        </TabsList>
        <TabsContent value="good">
          <GoodHabits />
        </TabsContent>
        <TabsContent value="bad"></TabsContent>
      </Tabs>
    </div>
  );
}
