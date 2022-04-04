import { VFC } from "react";

const A: VFC<JSX.IntrinsicElements['a']> = ({ className, ...props }) => (
  <a className={'underline visited:text-purple-900 text-orange ' + className} {...props}></a>
);

export default A;
