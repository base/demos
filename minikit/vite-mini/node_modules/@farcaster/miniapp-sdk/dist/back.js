export const createBack = ({ miniAppHost, emitter }) => {
    let teardownWebNavigation;
    let backCb = null;
    return {
        visible: false,
        get onback() {
            return backCb;
        },
        set onback(cb) {
            if (backCb) {
                emitter.removeListener('backNavigationTriggered', backCb);
            }
            backCb = cb;
            if (cb) {
                emitter.addListener('backNavigationTriggered', cb);
            }
        },
        async show() {
            await miniAppHost.updateBackState({
                visible: true,
            });
            this.visible = true;
        },
        async hide() {
            await miniAppHost.updateBackState({
                visible: false,
            });
            this.visible = false;
        },
        async enableWebNavigation() {
            teardownWebNavigation = setupWebBack({
                back: this,
                emitter,
            });
        },
        async disableWebNavigation() {
            teardownWebNavigation?.();
            teardownWebNavigation = undefined;
        },
    };
};
function setupWebBack({ emitter, back }) {
    const navigation = getWebNavigation();
    if (navigation) {
        return setupNavigationApi({ emitter, back, navigation });
    }
    if (typeof window !== 'undefined') {
        return setupFallback({ emitter, back, window });
    }
}
function getWebNavigation() {
    if (typeof window !== 'undefined' && window.navigation !== undefined) {
        return window.navigation;
    }
}
function setupNavigationApi({ emitter, back, navigation, }) {
    function handleNavigateSuccess() {
        if (navigation.canGoBack) {
            back.show();
        }
        else {
            back.hide();
        }
    }
    function handleBackNavigationTriggered() {
        if (back.visible && navigation.canGoBack) {
            navigation.back();
        }
    }
    navigation.addEventListener('navigatesuccess', handleNavigateSuccess);
    emitter.addListener('backNavigationTriggered', handleBackNavigationTriggered);
    return () => {
        navigation.removeEventListener('navigatesuccess', handleNavigateSuccess);
        emitter.removeListener('backNavigationTriggered', handleBackNavigationTriggered);
    };
}
function setupFallback({ emitter, back, window, }) {
    back.show();
    function handleBackNavigationTriggered() {
        if (back.visible) {
            window.history.back();
        }
    }
    emitter.addListener('backNavigationTriggered', handleBackNavigationTriggered);
    return () => {
        emitter.removeListener('backNavigationTriggered', handleBackNavigationTriggered);
    };
}
