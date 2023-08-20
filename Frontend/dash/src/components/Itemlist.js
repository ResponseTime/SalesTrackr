import React, { useEffect } from "react";
import Item from "./Item";

export default function Itemlist() {
  useEffect(() => {}, []);
  return (
    <>
      <div className="item-list">
        <Item title="test" data="test data" />
        <Item title="test" data="test data" />
        <Item title="test" data="test data" />
      </div>
    </>
  );
}
