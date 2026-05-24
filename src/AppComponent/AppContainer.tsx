export function AppContainer({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="mx-auto flex w-full max-w-full flex-col gap-6">
      {title && (
        <h2 className="text-heading text-xl font-semibold">{title}</h2>
      )}
      {children}
    </div>
  );
}
