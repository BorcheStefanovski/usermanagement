'use client'

import { memo } from "react";

interface Error {
  message: string;
}

const Error = ({ message }: Error) => (
  <h2>{message}</h2>
)

export default memo(Error);