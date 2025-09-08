import { beforeEach, afterEach, describe, it, expect, mock } from "bun:test";
import { DEFAULT_CHAIN_ID } from "./constants";
import { Communicator } from "./communicator";
import { GeminiSdkEvent } from "./types";

const mockOpenPopup = mock(() => ({
  closed: false,
  focus: mock(() => {}),
  postMessage: mock(() => {}),
}) as unknown as Window);

const SDK_BACKEND_URL = "https://mock-backend.com";

const mockRequestId = "11111111-2222-3333-4444-555555555555";

describe("Communicator", () => {
  let communicator: Communicator;

  beforeEach(() => {
    communicator = new Communicator({
      appMetadata: { appLogoUrl: "https://test.com/logo.png", appName: "Test App" },
      onDisconnectCallback: () => {},
    });
  });

  afterEach(() => {
    // Reset all mocks
    mockOpenPopup.mockClear();
  });

  it("should create communicator instance", () => {
    expect(communicator).toBeDefined();
    expect(communicator).toBeInstanceOf(Communicator);
  });

  it("should have required properties", () => {
    expect(typeof communicator.postMessage).toBe("function");
    expect(typeof communicator.onMessage).toBe("function");
  });
});
