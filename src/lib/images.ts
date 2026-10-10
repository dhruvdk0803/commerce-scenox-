/**
 * Product photography used in demos across the site. Generated with our image
 * pipeline as illustrative examples; never presented as client work.
 * Static imports give next/image the dimensions and a blur placeholder.
 */
import chair from "@/assets/products/chair.webp";
import chairRaw from "@/assets/products/chair-raw.webp";
import chairLife from "@/assets/products/chair-life.webp";
import chairWhite from "@/assets/products/chair-white.webp";
import bottle from "@/assets/products/bottle.webp";
import lamp from "@/assets/products/lamp.webp";
import tshirt from "@/assets/products/tshirt.webp";
import hose from "@/assets/products/hose.webp";
import speaker from "@/assets/products/speaker.webp";
import mug from "@/assets/products/mug.webp";
import rug from "@/assets/products/rug.webp";
import clock from "@/assets/products/clock.webp";
import shelf from "@/assets/products/shelf.webp";
import sneaker from "@/assets/products/sneaker.webp";
import sneakerRaw from "@/assets/products/sneaker-raw.webp";
import sneakerLife from "@/assets/products/sneaker-life.webp";
import sneakerWhite from "@/assets/products/sneaker-white.webp";
import serum from "@/assets/products/serum.webp";
import serumRaw from "@/assets/products/serum-raw.webp";
import serumLife from "@/assets/products/serum-life.webp";
import serumWhite from "@/assets/products/serum-white.webp";

export const img = {
  chair,
  chairRaw,
  chairLife,
  chairWhite,
  bottle,
  lamp,
  tshirt,
  hose,
  speaker,
  mug,
  rug,
  clock,
  shelf,
  sneaker,
  sneakerRaw,
  sneakerLife,
  sneakerWhite,
  serum,
  serumRaw,
  serumLife,
  serumWhite,
} as const;

export type ImgKey = keyof typeof img;
