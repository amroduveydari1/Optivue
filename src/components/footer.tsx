export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/30">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <p className="text-[11px] text-muted-foreground/60">
          &copy; {new Date().getFullYear()} Optivue
        </p>
        <p className="text-[11px] text-muted-foreground/60">
          Powered by Lighthouse
        </p>
      </div>
    </footer>
  );
}
