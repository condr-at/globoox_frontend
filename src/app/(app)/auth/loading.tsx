export default function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--app-shell-bg)] text-[var(--app-text)]">
      <div className="flex flex-col items-center gap-3">
        <span className="ios-spinner" aria-hidden="true" />
        <p className="text-sm text-[var(--app-text-muted)]">Loading...</p>
      </div>
    </div>
  );
}
