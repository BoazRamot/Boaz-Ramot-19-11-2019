import React, { useEffect, useState } from "react";
import Select from "react-select";
import Async, { makeAsyncSelect } from 'react-select/async';
import AsyncSelect from 'react-select/async';
import { Paper } from "@material-ui/core";

interface IProps {
  locations: any;
  resetAddress: Function;
  setCity: Function;
  resetMarker: Function;
  getLocations: any;
  markersMap: any;
}

const DropdownSelect: React.FC<IProps> = ({ 
  locations, 
  setCity, 
  getLocations,
  markersMap,
  resetMarker,
  resetAddress,
}) => {

  const [value, setValue] = useState("");

  useEffect(() => {
    if (value !== "") {
      getLocations(value);
    }
    // eslint-disable-next-line
  }, [value]);

  const loadOptions = (locations: any, callback: any) => {
    setTimeout(() => {
      callback(locations);
    }, 1000);
  };

  const handleValue = (inputValue: string) => {
    if (inputValue.search(/[^A-z\s]/ig) === -1) {
      setValue(inputValue);
    }
  };

  const handleOption = (selectedOption: any) => {
    if (selectedOption) {
      resetAddress();
      if (markersMap && markersMap.size !== 0) {
        markersMap.forEach((marker: any, user: any) => marker.setMap(null));
        resetMarker();
      }
      setCity(selectedOption)
    }
  };

  return (
    <div >
      <Paper style={{ width: '300px' }}>
        <Select
          classNamePrefix="select"
          placeholder="Search a city..."
          name="cities"
          // options={locations}
          loadOptions={loadOptions}
          onChange={selectedOption => handleOption(selectedOption)}
          inputValue={value}
          onInputChange={handleValue}
          isClearable
          isSearchable
        />
      </Paper>
    </div>
  );
}

export default DropdownSelect;
