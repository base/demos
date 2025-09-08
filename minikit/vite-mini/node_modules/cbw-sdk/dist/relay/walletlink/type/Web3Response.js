"use strict";
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorResponse = void 0;
// TODO: revisit if this is still needed
function isErrorResponse(response) {
    return response.errorMessage !== undefined;
}
exports.isErrorResponse = isErrorResponse;
