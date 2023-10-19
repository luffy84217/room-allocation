import React, { useRef, useState } from 'react';

const CustomInputNumber = (props) => {
  const [value, setValue] = useState(props.value);
  const inputRef = useRef(null);
  const incrementInterval = useRef(null);
  const decrementInterval = useRef(null);
  
  const increment = (e) => () => {
    setValue((prev) => {
      if (prev + props.step <= props.max) {
        e.target = inputRef.current;
        e.target.value = prev + props.step;
        props.onChange(e);
        return prev + props.step;
      }
      return prev;
    });
  };

  const decrement = (e) => () => {
    setValue((prev) => {
      if (prev - props.step >= props.min) {
        e.target = inputRef.current;
        e.target.value = prev - props.step;
        props.onChange(e);
        return prev - props.step;
      }
      return prev;
    });
  };

  const handleInputChange = (e) => {
    console.log('2')
    if (+e.target.value >= props.min && +e.target.value <= props.max) {
      setValue(+e.target.value);
      props.onChange(e);
    }
  };
  const handleInputBlur = (e) => {
    props.onBlur(e);
  };
  const handleMinus = (e) => {
    decrementInterval.current = setInterval(decrement(e), 200);
  };
  const handlePlus = (e) => {
    incrementInterval.current = setInterval(increment(e), 200);
  };
  const handleMouseUp = () => {
    setTimeout(() => {
      clearInterval(incrementInterval.current);
      clearInterval(decrementInterval.current);
    }, 200);
  };

  return (
    <div className="p-2">
      <button
        className="pb-2 w-12 h-12 border-blue-400 border rounded text-blue-400 text-4xl align-middle disabled:border-blue-100 disabled:text-blue-100"
        disabled={props.disabled || value <= props.min}
        onMouseDown={handleMinus}
        onMouseUp={handleMouseUp}
      >-</button>
      <input
        className="w-12 h-12 mx-2 border-gray-400 border rounded align-middle text-center"
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        name={props.name}
        min={props.min}
        max={props.max}
        step={props.step}
        value={value.toString()}
        disabled={props.disabled}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <button
        className="pb-2 w-12 h-12 border-blue-400 border rounded text-blue-400 text-4xl align-middle disabled:border-blue-100 disabled:text-blue-100"
        disabled={props.disabled || value >= props.max}
        onMouseDown={handlePlus}
        onMouseUp={handleMouseUp}
      >+</button>
    </div>
  );
};

export default CustomInputNumber;
