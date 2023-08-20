import React from "react";

export default function Item(props) {
  return (
    <div class="card-item">
      <span>{props.title}</span>
      <span>{props.data}</span>
    </div>
  );
}
