"use client";

import React, { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div className="base-card flex items-center gap-4">
      <button onClick={() => setCount(count + 1)}  type="button" className="bg-blue-500 px-3 py-1.5 text-white rounded cursor-pointer">Add </button>
      <div>Count {count}</div>
    </div>
  );
}
