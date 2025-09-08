import { rpcErrors } from "@metamask/rpc-errors";

import { POPUP_HEIGHT, POPUP_WIDTH } from "../constants";

export const openPopup = (url: URL): Window => {
  const left = (window.innerWidth - POPUP_WIDTH) / 2 + window.screenX;
  const top = (window.innerHeight - POPUP_HEIGHT) / 2 + window.screenY;

  const popupId = `gemini_wallet_${crypto.randomUUID()}`;
  const popup = window.open(
    url,
    popupId,
    `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, left=${left}, top=${top}`,
  );

  popup?.focus();

  if (!popup) {
    throw rpcErrors.internal("Pop up window failed to open");
  }

  return popup;
};

export const closePopup = (popup: Window | undefined) => {
  if (popup && !popup.closed) {
    popup.close();
  }
};
