import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SearchInput({ onInputChange, onSubmit }) {
  return (
    <section className="mb-10">
      <input
        onChange={onInputChange}
        className="bg-gray-700 w-1/3 min-w-[280px] p-2 rounded-l-md focus:outline-none"
        placeholder="探したい曲を入力してください"
      />
      <button
        onClick={onSubmit}
        className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}