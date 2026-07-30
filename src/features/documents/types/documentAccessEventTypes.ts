import type { ChangeEvent, FormEvent } from "react";

export type AddDocumentAccessFormSubmitEvent = FormEvent<HTMLFormElement>;
export type AddDocumentAccessInputChangeEvent = ChangeEvent<HTMLInputElement>;
export type AddDocumentAccessRoleChangeEvent = ChangeEvent<HTMLSelectElement>;
export type TransferOwnershipInputChangeEvent = ChangeEvent<HTMLSelectElement>;

export type AddDocumentAccessFormSubmitHandler = (
  event: AddDocumentAccessFormSubmitEvent,
) => void;

export type AddDocumentAccessInputChangeHandler = (
  event: AddDocumentAccessInputChangeEvent,
) => void;

export type AddDocumentAccessRoleChangeHandler = (
  event: AddDocumentAccessRoleChangeEvent,
) => void;

export type TransferOwnershipInputChangeHandler = (
  event: TransferOwnershipInputChangeEvent,
) => void;
