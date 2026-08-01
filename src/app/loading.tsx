export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-3">
          <div className="absolute inset-0 rounded-full border-3 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-3 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="text-xs text-muted font-medium">Memuat...</p>
      </div>
    </div>
  );
}
