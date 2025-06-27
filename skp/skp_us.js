var myWebchat = {

    showBotButtonOnlyPages: ['html'],
    botOpenPages: [],
    autoOpenDelay: 5000, // 5 seconds delay for auto-opening
    hasAutoOpened: false, // Track if the bot has been auto-opened in this session

    // config stuff
    webchatEndpoint: "https://endpoint-app.cognigy.ai/47207109799e0fc1d3869b47a637ede3a66602be9c5a9c0a19cbeb9a5fd5b1cb",

    configObject: {
        settings: {
            userAvatarUrl: "https://s3.eu-central-1.amazonaws.com/henkel-cognigy/webchat/avatar_20x20.png",
            disableBranding: true,
            title: "Find a Store Near You"
        }
    },
    webChat: null, // holds the webchat reference

    // add and wait for source to be loaded
    loadPluginScript: function (src, isModule = false) {
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            if(isModule) {
                script.type = 'module';
            }
            script.onerror = function () {
                reject(new Error("Cannot load script at: ".concat(script.src)));
            };
            document.body.appendChild(script);
        });
    },

    // load plugins
    loadPlugins: async function () {
        const that = this;

        const pluginsToLoad = [
            ...(["https://henkel-cognigy.s3.eu-central-1.amazonaws.com/plugins/googlemaps/location.webchat-plugin.js"]),
            ...(["https://cai.aleri-cloud.de/skp/us/src/googlemaps.webchat-plugin.js"]),
//           ...(["https://henkel-cognigy.s3.eu-central-1.amazonaws.com/plugins/googlemaps/googlemaps.webchat-plugin.js"]),
         ];// link(s) to plugin source(s)
        if (pluginsToLoad) {
            for (const url of pluginsToLoad) {
                try {
                    await that.loadPluginScript(url);
                } catch (e) {
                    console.error(e);
                }

            }
        }
    },
    // init webchat
    initMyWebchat: async function () {
        var that = this;
        await that.loadPlugins();
        if (this.showBot()) {
            initWebchat(this.webchatEndpoint, this.configObject).then(function (webchat) {
                that.webChat = webchat;
                that.adjust();
                
                // Set up auto-open functionality
                if (!that.hasAutoOpened && !that.openBot()) {
                    setTimeout(function() {
                        // Check if the chat is already open before trying to open it
                        if (that.webChat && !document.querySelector('[data-cognigy-webchat-root] [data-cognigy-webchat].webchat.webchat--open')) {
                            that.webChat.open();
                            that.hasAutoOpened = true;
                        }
                    }, that.autoOpenDelay);
                }
            });
        }
    },

    // page with bot
    showBot: function () {
        var pagesWithBot = this.showBotButtonOnlyPages.concat(this.botOpenPages);
        return showTheBot = pagesWithBot.some(this.endsWith);
    },

    // page with auto-open
    openBot: function () {
        return openBot = this.botOpenPages.some(this.endsWith);
    },

    endsWith: function (page) {
        var path = window.location.pathname;
        return path.length >= page.length && path.lastIndexOf(page) + page.length === path.length;
    },

    // scroll top solution
    addScrollListener: function () {
        var that = this;
        var webchatArea = document.querySelector("[data-cognigy-webchat-root] [data-cognigy-webchat].webchat .webchat-chat-history");
        if (webchatArea) {
            // Listen to all click events on the document
            webchatArea.addEventListener('click', function (event) {
                // If the clicked element does not have and is not contained by an element with the .scroll-top-solution-link class, ignore it
                if (event.target.closest('.scroll-top-link')) {
                    that.scrollSolutionStart();
                }
                return;
            });
        }
    },

    // scroll top solution
    scrollSolutionStart: function () {
        var solutionMarkers = document.querySelectorAll("[data-cognigy-webchat-root] [data-cognigy-webchat].webchat span.scroll-start");
        if (solutionMarkers.length > 0) {
            var element = solutionMarkers[solutionMarkers.length - 1];
            // loop getParent until get the full row
            while (!element.classList.contains("webchat-message-row")) {
                element = element.parentElement;
            }
            // scroll to element
            element.scrollIntoView({behavior: "smooth"});
        }
    },

    // send get started message
    sendGetStartedMessage: function () {
        var that = this;
        that.webChat.sendMessage("GET_STARTED", {}, {
            label: ""
        });
    },

    // adjust start behavior
    adjust: function () {
        var that = this;
        // register callbacks / analytics
        that.webChat.registerAnalyticsService(function (event) {
            // handle payload events
            if (event.type === "webchat/incoming-message") {
                if (event.payload.data && event.payload.data.addScrollListener === true) {
                    // // add scroll link on data event
                    setTimeout(function () {
                        that.scrollSolutionStart();
                    }, 1200);
                }
            }
            if (event.type === "webchat/open") {
                // Set hasAutoOpened to true whenever chat is opened
                that.hasAutoOpened = true;
                
                // scroll links needs to be added again after new open
                setTimeout(function () {
                    that.addScrollListener();
                }, 1000);
            }
            if (event.type === "webchat/close") {
                // We're keeping hasAutoOpened as true even after close
                // If you want the auto-open to happen again after manual close, uncomment:
                // that.hasAutoOpened = false;
            }
        });
        if (this.openBot()) {
            this.webChat.open();
            this.hasAutoOpened = true;
        }
    },
    
    // Optional: Method to reset the auto-open flag (if you want to allow auto-open again)
    resetAutoOpen: function() {
        this.hasAutoOpened = false;
    }
};

(function () {
    myWebchat.initMyWebchat();
})();