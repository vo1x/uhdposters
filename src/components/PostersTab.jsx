import Poster from './Poster';
import CustomSelect from './Select';
import { useState } from 'react';
import langCodes from './langCodes.json';

function PostersTab(props) {
  const { posters, fileName, secondLang } = props;
  const selectOptions =
    secondLang != 'en'
      ? [
          {
            value: 0,
            label: 'English'
          },
          {
            value: 1,
            label: `${langCodes[secondLang]}`
          }
        ]
      : [
          {
            value: 0,
            label: 'English'
          }
        ];

  const [selectedOption, setSelectedOption] = useState({
    value: 0,
    label: 'English'
  });
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center">
          Poster Language:
          <CustomSelect
            options={selectOptions}
            onChange={setSelectedOption}
            placeHolder={selectedOption.label}
          />
        </div>
        {selectedOption.value === 0 ? (
          <div className="flex flex-wrap content-center justify-center gap-10">
            {posters &&
              posters
                .filter((poster) => {
                  return poster.iso_639_1 === 'en';
                })
                .map((poster, index) => <Poster key={index} data={poster} fileName={fileName} />)}
          </div>
        ) : (
          <div className="flex flex-wrap content-center justify-center gap-10">
            {posters
              .filter((poster) => {
                return poster.iso_639_1 === secondLang;
              })
              .map((poster, index) => (
                <Poster key={index} data={poster} />
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PostersTab;
