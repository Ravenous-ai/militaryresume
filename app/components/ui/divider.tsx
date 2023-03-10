export function Divider({ title }: { title: string }) {
  return (
    <div className="relative py-10">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-sm text-gray-500">{title}</span>
      </div>
    </div>
  );
}
