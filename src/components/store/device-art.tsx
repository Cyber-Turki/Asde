import type { JSX } from "react";

import type { DeviceKind } from "@/types/store";
import {
  AdapterShape,
  AirpodsShape,
  AppletvShape,
  CaseShape,
  ChargerShape,
  HomepodShape,
} from "@/components/store/accessory-shapes";
import { IpadShape, IphoneShape, WatchShape } from "@/components/store/device-shapes";

/**
 * Product artwork — an inline SVG render chosen by `kind`. There are no
 * photographs yet: the renders are token-coloured so they sit on the lattice
 * as lit objects on the page's own ground rather than as pictures dropped on
 * it. Swap for `next/image` photography per product when it exists.
 *
 * With `title` the art is an image with a name; without it, it is decoration.
 */
export interface DeviceArtProps {
  kind: DeviceKind;
  title?: string;
  className?: string;
}

const shapes: Record<DeviceKind, () => JSX.Element> = {
  iphone: IphoneShape,
  ipad: IpadShape,
  watch: WatchShape,
  airpods: AirpodsShape,
  charger: ChargerShape,
  case: CaseShape,
  adapter: AdapterShape,
  homepod: HomepodShape,
  appletv: AppletvShape,
};

export const DeviceArt = ({ kind, title, className = "" }: DeviceArtProps) => {
  const Shape = shapes[kind];
  const named = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const };

  return (
    <div className={`flex items-center justify-center ${className}`} {...named}>
      <Shape />
    </div>
  );
};
