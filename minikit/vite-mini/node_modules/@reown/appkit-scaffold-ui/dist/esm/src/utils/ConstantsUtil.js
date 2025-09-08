export const ConstantsUtil = {
    ACCOUNT_TABS: [{ label: 'Tokens' }, { label: 'NFTs' }, { label: 'Activity' }],
    SECURE_SITE_ORIGIN: (typeof process !== 'undefined' && typeof process.env !== 'undefined'
        ? process.env['NEXT_PUBLIC_SECURE_SITE_ORIGIN']
        : undefined) || 'https://secure.walletconnect.org',
    VIEW_DIRECTION: {
        Next: 'next',
        Prev: 'prev'
    },
    DEFAULT_CONNECT_METHOD_ORDER: ['email', 'social', 'wallet'],
    ANIMATION_DURATIONS: {
        HeaderText: 120,
        ModalHeight: 150,
        ViewTransition: 150
    }
};
//# sourceMappingURL=ConstantsUtil.js.map