'use strict';
const Slack = require('slack-node');

module.exports = class SlackManager {

    constructor(options = {}) {
        const { webhookUri,
            username = 'Slack Webhook from Node.js',
            defaultChannel = '#general'
        } = options;

        if (!webhookUri)
            throw new Error(`Invalid webhookUri ${webhookUri}`);

        this._slack = new Slack();
        this._slack.setWebhook(webhookUri);
        this.username = username;
        this.defaultChannel = defaultChannel;
    }


    sendMessage(options = {}) {
        const { text,
            username = this.username,
            channel = this.defaultChannel
        } = options;
        return new Promise((resolve, reject) => {
            this._slack.webhook({ channel, username, text }, (err, response) => {
                if (err) return reject();
                resolve(response);
            });
        });
    }

}
