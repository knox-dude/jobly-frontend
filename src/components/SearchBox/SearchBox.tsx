import { useState, ChangeEvent } from 'react';
import { Input } from 'reactstrap';

interface SearchBoxProps {
  handleSearch: (searchText: string) => void;
}

function SearchBox({handleSearch}: SearchBoxProps) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <div className='d-flex align-items-center justify-content-center pt-2'>
      <div className='d-flex align-items-center w-50 justify-content-center'>
        <Input
          type="text"
          placeholder="Enter Search Term"
          value={searchText}
          onChange={handleInputChange}
          style={{ cursor: 'text' }}
        />
      </div>
    </div>
  );
}

export default SearchBox;
