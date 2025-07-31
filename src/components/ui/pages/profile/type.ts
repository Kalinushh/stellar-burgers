import { ChangeEvent, SyntheticEvent } from 'react';

export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
  isNameEditable: boolean;
  isEmailEditable: boolean;
  isPasswordEditable: boolean;
  setIsNameEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEmailEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPasswordEditable: React.Dispatch<React.SetStateAction<boolean>>;
};
