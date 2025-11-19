import { IconNotebook } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <header className="flex items-center justify-between py-5">
          <div className="flex items-center gap-2 text-primary">
            <IconNotebook className="size-5 bg-red" />
            <span className="font-semibold text-base">Habit Log</span>
          </div>
          <nav className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">ログイン</Button>
            </Link>
            <Link href="/register">
              <Button size="lg">無料ではじめる</Button>
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="py-14 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="font-bold text-4xl leading-tight md:text-5xl">
                毎日の記録を、もっと簡単に。
              </h1>
              <p className="text-lg text-muted-foreground">
                Habit Log
                は、続けたい習慣や日々の気づきを心地よく残せるシンプルな日誌アプリです。ダッシュボードで振り返り、習慣化を後押しします。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/register">
                  <Button size="lg">今すぐはじめる</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    ログイン
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-6">
          <div className="flex items-center justify-between text-muted-foreground text-sm">
            <span>© {new Date().getFullYear()} Habit Log</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
