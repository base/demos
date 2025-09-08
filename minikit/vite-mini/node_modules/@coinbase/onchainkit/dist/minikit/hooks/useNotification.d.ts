/**
 * Sends notification data to the notification proxy URL set in the MiniKit context
 * @param title - The title of the notification.
 * @param body - The body of the notification.
 * @returns boolean - true if the notification was sent successfully, false otherwise
 */
export declare function useNotification(): ({ title, body }: {
    title: string;
    body: string;
}) => Promise<boolean>;
//# sourceMappingURL=useNotification.d.ts.map