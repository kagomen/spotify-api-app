export function Pagination({ onNext, onPrev, page }) {
  return (
    <div className="mt-8 flex justify-center">
      <button disabled={onPrev == null} onClick={onPrev} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
        Prev
      </button>
      <span className="text-white font-bold py-2 px-8">{page}</span>
      <button disabled={onNext == null} onClick={onNext} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
}