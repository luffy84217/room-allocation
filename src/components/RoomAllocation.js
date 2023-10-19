import React, { useState } from 'react';
import CustomInputNumber from './CustomInputNumber';

const createResult = (room) => () => {
  return Array.from({ length: room }, () => ({ adult: 1, child: 0 }));
};

const Room = (props) => {
  const handleChange = (type) => (e) => {
    props.setNum(props.index, type, +e.target.value);
  };

  return (
    <div>
      <h3>房間：{props.adult + props.child}人</h3>
      <div className="flex justify-between">
        <div>
          <span>大人</span>
          <p className="text-gray-400">年齡 20+</p>
        </div>
        <CustomInputNumber
          min={1}
          max={Math.min(props.quota, props.max) - props.child}
          step={1}
          name={`${props.id}_adult`}
          value={props.adult}
          disabled={false}
          onChange={handleChange('adult')}
          onBlur={(e) => console.log(e)}
        />
      </div>
      <div className="flex justify-between">
        <span>小孩</span>
        <CustomInputNumber
          min={0}
          max={Math.min(props.quota, props.max) - props.adult}
          step={1}
          name={`${props.id}_child`}
          value={props.child}
          disabled={false}
          onChange={handleChange('child')}
          onBlur={(e) => console.log(e)}
        />
      </div>
    </div>
  );
};

const RoomAllocation = (props) => {
  const [result, setResult] = useState(createResult(props.room));
  const remain = props.guest - result.reduce((acc, val) => acc + val.adult + val.child, 0);
  const setNum = (index, type, number) => {
    setResult((prev) => {
      const result = prev.map((room, i) => {
        if (index === i) {
          return { ...room, [type]: number };
        }
        return room;
      });
      props.onChange(result);
      return result;
    });
  };

  return (
    <div className="p-4">
      <p>住客人數：{props.guest}人／{props.room}房</p>
      <p className="p-4 my-4 bg-green-50 border border-green-200 rounded">尚未分配人數：{remain}人</p>
      {result.map((room, i) => (
        <Room
          key={`room_${i}`}
          index={i}
          adult={room.adult}
          child={room.child}
          max={4}
          quota={remain + room.adult + room.child}
          setNum={setNum}
        />
      ))}
    </div>
  );
};

export default RoomAllocation;
