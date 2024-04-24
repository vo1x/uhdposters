import Poster from './Poster';
import Select from './Select';
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
      <div className="flex flex-col gap-3">
        <div className="mx-2 flex flex-col gap-2">
          <span className="text-base font-semibold text-slate-400">Language</span>
          <Select
            options={selectOptions}
            onChange={setSelectedOption}
            placeHolder={selectedOption.label}
            defaultValue={selectOptions[0]}
            className="rounded-md"
          />
        </div>
        {selectedOption.value === 0 ? (
          <div className="flex flex-wrap place-items-start gap-14">
            {posters &&
              posters
                .filter((poster) => {
                  return poster.iso_639_1 === 'en';
                })
                .map((poster, index) => <Poster key={index} data={poster} fileName={fileName} />)}
          </div>
        ) : (
          <div className="flex flex-wrap place-items-start gap-14">
            {posters
              .filter((poster) => {
                return poster.iso_639_1 === secondLang;
              })
              .map((poster, index) => (
                <Poster key={index} data={poster} fileName={fileName} />
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PostersTab;
