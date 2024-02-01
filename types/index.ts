import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface UserProps {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface ClothProps {
  name: string;
  price: number;
  color: string;
  material?: string;
  size: string;
  description?: string;
  quantity?: number;
  imageUrl: string;
  otherImagesUrl?: [string];
}

export interface ClothDetailProps {
  isOpen: boolean;
  closeModal: () => void;
  cloth: ClothProps;
}